import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  NgZone,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  CAPAS,
  CLASES,
  Capa,
  CapaId,
  Clase,
  LIENZO,
  MODULOS,
  Miembro,
  RELACIONES,
  TOTAL_MIEMBROS,
  TOTAL_RELACIONES,
  TipoClase,
  TipoRelacion,
} from '../../data/clases-data';
import { descargar, escalaSegura } from '../../util/exportar';
import type { DocClase, DocMiembro } from '../../data/clases-docs';

/*
 * El grafo se pinta en un <canvas>, no en SVG. Con 278 nodos y 543 aristas —
 * muchas de ellas punteadas — el árbol SVG eran ~2.400 formas que el navegador
 * volvía a rasterizar entera en cada cuadro de un arrastre, y cada recorte
 * montaba y desmontaba cientos de nodos del DOM. En canvas un cuadro es un
 * recorrido sobre dos arreglos: sin DOM, sin detección de cambios, sin
 * reconciliación. El resto de la slide (barra, panel, minimapa) sigue en
 * Angular, que es donde el DOM sí aporta.
 */

/** Códigos de estado visual. Enteros para poder usarlos como índice de cubeta. */
const N_NORMAL = 0;
const N_SEL = 1;
const N_VECINA = 2;
const N_COINCIDE = 3;
const N_APAGADA = 4;

/** Estados de arista: sin 'seleccionada'. */
const A_NORMAL = 0;
const A_VECINA = 1;
const A_COINCIDE = 2;
const A_APAGADA = 3;

interface Arista {
  id: string;
  de: string;
  a: string;
  tipo: TipoRelacion;
  capaIdx: number;
  color: string;
  etiqueta: string;
  lx: number;
  ly: number;
  /** true: cúbica (autorreferencia); false: cuadrática. */
  cubica: boolean;
  sx: number;
  sy: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
  ex: number;
  ey: number;
  /** Los dos vértices traseros de la punta de flecha; el tercero es (ex,ey). */
  t1x: number;
  t1y: number;
  t2x: number;
  t2y: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

interface Fila {
  m: Miembro;
  /** Nombre sin la lista de parámetros: la clave con que se busca su doc. */
  nombre: string;
  /** Firma y tipo ya recortados al ancho de su columna. */
  texto: string;
  tipo: string;
  destino: string | null;
  doc: boolean;
}

/** Doc de un miembro ya resuelta: si venía de un puerto, de cuál. */
interface DocResuelta {
  d: DocMiembro;
  origen: string | null;
}

/** Un texto partido en trozos de prosa y trozos de código (los `acentos`). */
interface Trozo {
  cod: boolean;
  v: string;
}

interface Expandido {
  c: Clase;
  filas: Fila[];
  restantes: number;
  ancho: number;
  alto: number;
  x: number;
  y: number;
  color: string;
}

const ESCALA_MIN = 0.08;
const ESCALA_MAX = 3;
/** Zoom fijo al enfocar una clase, acorde al indicador de porcentaje. */
const ESCALA_FOCO = 1.4;
/** Miembros que caben en el nodo expandido antes de resumir el resto. */
const MAX_FILAS = 24;
const ALTO_FILA = 19;

/**
 * Umbrales de detalle: por debajo de cada escala el texto correspondiente mide
 * menos de ~4 px y no se lee, así que no se dibuja.
 */
const LOD_RESUMEN = 0.55;
const LOD_NOMBRE = 0.34;
const LOD_MODULO = 0.25;
/** Bajo esta escala los guiones miden menos de un píxel: se trazan continuos. */
const LOD_GUION = 0.3;

const MS_ANIM = 420;

/** Escala del PNG exportado, antes del recorte por los límites del navegador. */
const ESCALA_EXPORT = 1.25;

const MONO = "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace";
const SERIF = "'Times New Roman', Times, Georgia, serif";

const COLOR = {
  bg: '#faf3e6',
  texto: '#3a3229',
  muted: '#6b6153',
  faint: '#8c8171',
  acento: '#3f6fd6',
  metodo: '#8b52d9',
  prop: '#3f6fd6',
  alerta: '#c2504b',
};

const KINDS: { id: TipoClase; label: string }[] = [
  { id: 'clase', label: 'clases' },
  { id: 'record', label: 'records' },
  { id: 'interfaz', label: 'interfaces' },
  { id: 'enum', label: 'enums' },
];

const REL_LABEL: Record<TipoRelacion, string> = {
  hereda: 'hereda de',
  implementa: 'implementa',
  depende: 'depende de',
  usa: 'usa',
};

/** Trazo de cada tipo de relación en estado normal (equivale al CSS anterior). */
const TRAZO: Record<TipoRelacion, { dash: number[]; alfa: number; ancho: number }> = {
  usa: { dash: [2, 5], alfa: 0.24, ancho: 1.4 },
  depende: { dash: [9, 5], alfa: 0.42, ancho: 1.4 },
  implementa: { dash: [14, 6], alfa: 0.62, ancho: 1.4 },
  hereda: { dash: [], alfa: 0.7, ancho: 2 },
};

/** Guion del borde del nodo según el tipo. */
const GUION_KIND: Partial<Record<TipoClase, number[]>> = {
  interfaz: [6, 4],
  enum: [2, 3],
};

const TIPOS: TipoRelacion[] = ['hereda', 'implementa', 'depende', 'usa'];

function aRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

/** El equivalente en canvas de color-mix(..., transparent): mismo color, menos alfa. */
function alfa(hex: string, a: number): string {
  const [r, g, b] = aRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

/** Mezcla opaca: `t` es la proporción de `b`. */
function mezcla(a: string, b: string, t: number): string {
  const [r1, g1, b1] = aRgb(a);
  const [r2, g2, b2] = aRgb(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${m(r1, r2)},${m(g1, g2)},${m(b1, b2)})`;
}

function suave(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Parte un texto de la doc en párrafos y, dentro de cada uno, separa lo que va
 * entre acentos graves. Se hace una vez por texto mostrado y el resultado se
 * queda en un computed: la plantilla solo recorre arreglos ya hechos, sin
 * innerHTML ni sanitizador de por medio.
 */
function trozos(texto: string): Trozo[][] {
  return texto.split(/\n+/).map((parrafo) =>
    parrafo
      .split('`')
      .map((v, i) => ({ cod: i % 2 === 1, v }))
      .filter((t) => t.v !== ''),
  );
}

@Component({
  selector: 'app-clases-slide',
  standalone: true,
  templateUrl: './clases-slide.html',
  styleUrl: './clases-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClasesSlide {
  private readonly lienzoRef = viewChild.required<ElementRef<HTMLElement>>('lienzo');
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly miniRef = viewChild.required<ElementRef<HTMLCanvasElement>>('mini');
  private readonly pctRef = viewChild.required<ElementRef<HTMLElement>>('pct');

  readonly capas = CAPAS;
  readonly modulos = MODULOS;
  readonly relLabel = REL_LABEL;
  readonly totalClases = CLASES.length;
  readonly totalMiembros = TOTAL_MIEMBROS;
  readonly totalRelaciones = TOTAL_RELACIONES;

  // ------------------------------------------------------------ estado UI
  // Sólo lo que la plantilla necesita vive en señales; la vista del lienzo no,
  // porque cambia 60 veces por segundo y no debe disparar detección de cambios.

  readonly seleccionada = signal<string | null>(null);
  readonly busqueda = signal('');
  readonly capaActiva = signal<CapaId | null>(null);
  readonly kindActivo = signal<TipoClase | null>(null);
  /** Miembro abierto en el panel, por su nombre sin parámetros. */
  readonly miembroSel = signal<string | null>(null);
  /** Miembro sin doc que acaba de recibir un clic: destella y no abre nada. */
  readonly destello = signal<string | null>(null);
  /** Índice de documentación; nulo mientras su módulo no ha llegado. */
  readonly docs = signal<Record<string, DocClase> | null>(null);
  readonly exportando = signal(false);

  /** Vista viva: la fuente de verdad del lienzo. Nunca pasa por Angular. */
  private readonly vista = { escala: 0.2, tx: 0, ty: 0 };
  private escalaAjuste = 0.2;
  private sobrevolada: string | null = null;
  /** Copia sin señal de miembroSel: el pintado no debe leer señales. */
  private miembroPintado: string | null = null;
  private destelloPintado: string | null = null;
  private destelloTimer: ReturnType<typeof setTimeout> | null = null;
  private cargaDocs: Promise<unknown> | null = null;
  private vistaPrevia: { escala: number; tx: number; ty: number } | null = null;

  private ctx: CanvasRenderingContext2D | null = null;
  private miniCtx: CanvasRenderingContext2D | null = null;
  private miniFondo: HTMLCanvasElement | null = null;
  private dpr = 1;
  private anchoCss = 0;
  private altoCss = 0;
  private cuadroPendiente = false;
  private vivo = true;
  private arrastrando = false;
  private pctPintado = -1;
  private miniVisible: boolean | null = null;
  private cursor = '';
  private caja = new DOMRect();
  private anim: {
    s0: number; tx0: number; ty0: number;
    s1: number; tx1: number; ty1: number;
    t0: number;
  } | null = null;

  // ------------------------------------------------------------ índices

  private readonly porId = new Map<string, Clase>(CLASES.map((c) => [c.id, c]));
  private readonly colorCapa = new Map<CapaId, string>(CAPAS.map((c) => [c.id, c.color]));
  private readonly idxCapa = new Map<CapaId, number>(CAPAS.map((c, i) => [c.id, i]));
  private readonly zona = inject(NgZone);

  private readonly capaPorId = new Map<string, Capa>(
    CLASES.map((c) => [c.id, CAPAS.find((x) => x.id === c.capa)!]),
  );
  private readonly vecinos = new Map<string, Set<string>>();
  private readonly destinoMiembro = new Map<string, string>();
  private readonly aristas: Arista[] = [];
  private readonly resumenes = CLASES.map((c) => `${c.kind} · ${c.miembros.length}`);
  private readonly colorNodo = CLASES.map((c) => this.colorCapa.get(c.capa)!);
  private readonly kindIdx = CLASES.map((c) => KINDS.findIndex((k) => k.id === c.kind));
  private readonly capaIdxNodo = CLASES.map((c) => this.idxCapa.get(c.capa)!);

  /** Estilos por capa, calculados una vez: nada de armar cadenas por cuadro. */
  private readonly estiloCapa = CAPAS.map((c) => ({
    regionRelleno: alfa(c.color, 0.07),
    regionBorde: alfa(c.color, 0.24),
    regionTexto: alfa(c.color, 0.42),
    modRelleno: alfa(c.color, 0.06),
    modBorde: alfa(c.color, 0.34),
    modTexto: alfa(c.color, 0.68),
    modTextoN: alfa(c.color, 0.42),
    modRellenoOn: alfa(c.color, 0.12),
    modBordeOn: alfa(c.color, 0.58),
    modTextoOn: alfa(c.color, 0.88),
    nodoRellenoOn: mezcla(COLOR.bg, c.color, 0.18),
  }));

  /** Rejilla uniforme para el hit-testing: sustituye al hit-testing del SVG. */
  private readonly CELDA = 320;
  private readonly cols = Math.ceil(LIENZO.ancho / this.CELDA) + 1;
  private readonly rejilla: number[][] = [];

  // cubetas reutilizadas cada cuadro (sin asignaciones en el bucle de pintado)
  private readonly visN: number[] = [];
  private readonly estN = new Uint8Array(CLASES.length);
  private readonly cubN: number[][] = [];
  private readonly cubA: number[][] = [];
  private readonly cubP: number[][] = [];

  readonly kinds = KINDS.map((k) => ({ ...k, n: CLASES.filter((c) => c.kind === k.id).length }));

  constructor() {
    for (const c of CLASES) this.vecinos.set(c.id, new Set());
    for (const r of RELACIONES) {
      this.vecinos.get(r.de)?.add(r.a);
      this.vecinos.get(r.a)?.add(r.de);
      for (const v of r.via) {
        const clave = `${r.de}·${v}`;
        if (!this.destinoMiembro.has(clave)) this.destinoMiembro.set(clave, r.a);
      }
    }
    this.aristas = this.construirGeometria();
    this.construirRejilla();

    for (let i = 0; i < CAPAS.length * KINDS.length * 5; i++) this.cubN.push([]);
    for (let i = 0; i < CAPAS.length * TIPOS.length * 4; i++) this.cubA.push([]);
    for (let i = 0; i < CAPAS.length * 4; i++) this.cubP.push([]);

    // cualquier cambio de estado que afecte al dibujo pide un cuadro
    effect(() => {
      this.seleccionada();
      this.coincidencias();
      this.capaActiva();
      this.kindActivo();
      this.calcularExpandido();
      this.programarPintado();
    });

    inject(DestroyRef).onDestroy(() => {
      this.vivo = false;
      if (this.destelloTimer) clearTimeout(this.destelloTimer);
      const el = this.lienzoRef().nativeElement;
      el.removeEventListener('wheel', this.onWheel);
      el.removeEventListener('pointerdown', this.onPointerDown);
      el.removeEventListener('pointermove', this.onPointerMove);
      el.removeEventListener('pointerleave', this.onPointerLeave);
      el.removeEventListener('dblclick', this.onDobleClic);
    });

    afterNextRender(() => this.iniciar());
  }

  // ------------------------------------------------------------ panel lateral

  readonly detalle = computed(() => {
    const id = this.seleccionada();
    return id ? (this.porId.get(id) ?? null) : null;
  });

  readonly salientes = computed(() => {
    const id = this.seleccionada();
    return id ? RELACIONES.filter((r) => r.de === id && r.a !== id) : [];
  });

  readonly entrantes = computed(() => {
    const id = this.seleccionada();
    return id ? RELACIONES.filter((r) => r.a === id && r.de !== id) : [];
  });

  private readonly coincidencias = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    if (q.length < 2) return new Set<string>();
    return new Set(
      CLASES.filter(
        (c) =>
          c.nombre.toLowerCase().includes(q) ||
          c.ns.toLowerCase().includes(q) ||
          c.miembros.some((m) => m.n.toLowerCase().includes(q)),
      ).map((c) => c.id),
    );
  });

  readonly numCoincidencias = computed(() => this.coincidencias().size);

  // ------------------------------------------------------------ documentación
  //
  // Los textos /// del código C# viven en su propio módulo (unos 230 kB de
  // prosa). El grafo no los necesita para pintarse, así que no entran en el
  // paquete de arranque: se piden en cuanto el navegador está ocioso y quedan
  // en memoria. A partir de ahí cada consulta es un par de accesos a objeto.

  /**
   * Trae el módulo de documentación. Repetir la llamada no repite la descarga:
   * la primera deja la promesa guardada y las demás se cuelgan de ella.
   */
  private cargarDocs(): void {
    this.cargaDocs ??= import('../../data/clases-docs')
      .then((m) => {
        if (!this.vivo) return;
        this.docs.set(m.DOCS);
        // las filas del nodo expandido marcan cuáles traen doc
        this.calcularExpandido();
        this.programarPintado();
      })
      .catch(() => {
        this.cargaDocs = null;          // reintentar en el siguiente clic
      });
  }

  /**
   * La doc de un miembro. Un adaptador no repite lo que ya explica su puerto:
   * guarda una referencia y aquí se sigue hasta el tipo que sí la escribió.
   */
  private buscarDoc(
    docs: Record<string, DocClase>,
    clase: string,
    nombre: string,
  ): DocResuelta | null {
    let d = docs[clase]?.m?.[nombre];
    let origen: string | null = null;
    for (let i = 0; d?.h && i < 4; i++) {
      origen = d.h;
      d = docs[origen]?.m?.[nombre];
    }
    return d ? { d, origen } : null;
  }

  /** Resumen de la clase seleccionada, ya partido en párrafos. */
  readonly docClase = computed(() => {
    const id = this.seleccionada();
    const s = id ? this.docs()?.[id]?.s : undefined;
    return s ? trozos(s) : null;
  });

  /** Los miembros del panel: todos, con su nombre limpio y si tienen doc. */
  readonly miembrosPanel = computed(() => {
    const c = this.detalle();
    if (!c) return [];
    const docs = this.docs();
    return c.miembros.map((m) => {
      const nombre = m.n.split('(')[0];
      return {
        m,
        nombre,
        /** La lista de parámetros, aparte: se pinta apagada tras el nombre. */
        args: m.n.slice(nombre.length),
        doc: !!(docs && this.buscarDoc(docs, c.id, nombre)),
        destino: this.destinoDe(c.id, m),
      };
    });
  });

  readonly numDocumentados = computed(() => this.miembrosPanel().filter((f) => f.doc).length);

  /** La doc del miembro abierto, con sus textos ya troceados. */
  readonly docMiembro = computed(() => {
    const c = this.detalle();
    const nombre = this.miembroSel();
    const docs = this.docs();
    if (!c || !nombre || !docs) return null;
    const r = this.buscarDoc(docs, c.id, nombre);
    if (!r) return null;
    return {
      firma: r.d.f ?? null,
      linea: r.d.l ?? null,
      origen: r.origen,
      resumen: r.d.s ? trozos(r.d.s) : null,
      params: (r.d.p ?? []).map(([n, t]) => ({ n, t: trozos(t) })),
      excepciones: (r.d.e ?? []).map(([n, t]) => ({ n, t: trozos(t) })),
      devuelve: r.d.r ? trozos(r.d.r) : null,
    };
  });

  /** El archivo donde vive la doc mostrada: el propio, o el del puerto. */
  readonly archivoDoc = computed(() => {
    const origen = this.docMiembro()?.origen;
    const c = origen ? this.porId.get(origen) : this.detalle();
    return c?.archivo ?? '';
  });

  // ------------------------------------------------------------ arranque

  private iniciar(): void {
    const cv = this.canvasRef().nativeElement;
    this.ctx = cv.getContext('2d', { alpha: true });
    this.miniCtx = this.miniRef().nativeElement.getContext('2d');

    /*
     * Los eventos del lienzo se registran a mano y fuera de Angular: una
     * rueda o un arrastre disparan decenas de eventos por segundo y ninguno
     * necesita detección de cambios; lo único que cambian es el canvas.
     */
    const el = this.lienzoRef().nativeElement;
    this.zona.runOutsideAngular(() => {
      el.addEventListener('wheel', this.onWheel, { passive: false });
      el.addEventListener('pointerdown', this.onPointerDown);
      el.addEventListener('pointermove', this.onPointerMove);
      el.addEventListener('pointerleave', this.onPointerLeave);
      el.addEventListener('dblclick', this.onDobleClic);
    });

    this.medir();
    this.ajustar();

    // la doc se pide con el navegador ya ocioso: cuando llegue el primer clic
    // suele estar en memoria y el panel la enseña sin espera
    const ocioso = (window as { requestIdleCallback?: (cb: () => void) => void })
      .requestIdleCallback;
    if (ocioso) ocioso(() => this.cargarDocs());
    else setTimeout(() => this.cargarDocs(), 1200);

    // el texto en canvas se mide y se pinta con la fuente ya cargada
    document.fonts?.ready.then(() => {
      if (!this.vivo) return;
      this.calcularExpandido();
      this.programarPintado();
    });
  }

  /** Ajusta el tamaño físico del canvas al del contenedor y al DPR. */
  private medir(): void {
    const el = this.lienzoRef().nativeElement;
    const cv = this.canvasRef().nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.caja = el.getBoundingClientRect();
    this.anchoCss = el.clientWidth;
    this.altoCss = el.clientHeight;
    cv.width = Math.max(1, Math.round(this.anchoCss * this.dpr));
    cv.height = Math.max(1, Math.round(this.altoCss * this.dpr));
    cv.style.width = `${this.anchoCss}px`;
    cv.style.height = `${this.altoCss}px`;

    const mini = this.miniRef().nativeElement;
    const mw = mini.clientWidth || 1;
    const mh = mini.clientHeight || 1;
    const w = Math.round(mw * this.dpr);
    const h = Math.round(mh * this.dpr);
    if (!this.miniFondo || mini.width !== w || mini.height !== h) {
      mini.width = w;
      mini.height = h;
      this.miniFondo = this.pintarMiniFondo(mw, mh);
    }
  }

  /** El fondo del minimapa son 278 rectángulos fijos: se pinta una vez. */
  private pintarMiniFondo(w: number, h: number): HTMLCanvasElement {
    const off = document.createElement('canvas');
    off.width = Math.round(w * this.dpr);
    off.height = Math.round(h * this.dpr);
    const ctx = off.getContext('2d')!;
    const s = Math.min(w / LIENZO.ancho, h / LIENZO.alto);
    ctx.setTransform(s * this.dpr, 0, 0, s * this.dpr, 0, 0);
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < CLASES.length; i++) {
      const c = CLASES[i];
      ctx.fillStyle = this.colorNodo[i];
      ctx.fillRect(c.x - c.w / 2, c.y - c.h / 2, c.w, c.h);
    }
    return off;
  }

  // ------------------------------------------------------------ acciones

  seleccionar(id: string): void {
    if (untracked(this.seleccionada) === id) this.limpiarSeleccion();
    else this.irA(id);
  }

  irA(id: string): void {
    if (!untracked(this.seleccionada)) {
      this.vistaPrevia = { ...this.vista };
    }
    this.seleccionada.set(id);
    this.ponerMiembro(null);
    this.cargarDocs();
    this.sobrevolada = null;
    const c = this.porId.get(id);
    if (!c) return;
    // el panel lateral encoge el lienzo: hay que medir después de pintarlo
    requestAnimationFrame(() => {
      if (!this.vivo) return;
      // clase nueva, panel desde arriba: si no, se abre a media lectura
      document.querySelector('.panel')?.scrollTo(0, 0);
      this.medir();
      this.animarA(ESCALA_FOCO, this.anchoCss / 2 - c.x * ESCALA_FOCO, this.altoCss / 2 - c.y * ESCALA_FOCO);
    });
  }

  limpiarSeleccion(): void {
    if (!untracked(this.seleccionada)) return;
    this.seleccionada.set(null);
    this.ponerMiembro(null);
    const previa = this.vistaPrevia;
    this.vistaPrevia = null;
    if (!previa) return;
    requestAnimationFrame(() => {
      if (!this.vivo) return;
      this.medir();
      this.animarA(previa.escala, previa.tx, previa.ty);
    });
  }

  /**
   * Abre la doc de un miembro en el panel, o la cierra si ya estaba abierta.
   * El lienzo resalta la misma fila, así que las dos vistas van a la par.
   */
  alternarMiembro(nombre: string): void {
    if (untracked(this.miembroSel) === nombre) {
      this.ponerMiembro(null);
      return;
    }
    if (!this.tieneDoc(nombre)) {
      this.parpadear(nombre);
      return;
    }
    this.ponerMiembro(nombre);
  }

  /**
   * Un miembro sin comentario /// no tiene nada que enseñar: en vez de abrir un
   * panel vacío, la fila destella en rojo y todo se queda como estaba.
   * Mientras la doc no ha llegado se deja abrir: el panel avisa que está cargando.
   */
  private tieneDoc(nombre: string): boolean {
    if (!untracked(this.docs)) return true;
    return !!untracked(this.miembrosPanel).find((f) => f.nombre === nombre)?.doc;
  }

  private parpadear(nombre: string): void {
    if (this.destelloTimer) clearTimeout(this.destelloTimer);
    this.destello.set(nombre);
    this.destelloPintado = nombre;
    this.programarPintado();
    this.destelloTimer = setTimeout(() => {
      this.destelloTimer = null;
      if (!this.vivo) return;
      this.destello.set(null);
      this.destelloPintado = null;
      this.programarPintado();
    }, 620);
  }

  private ponerMiembro(nombre: string | null): void {
    if (untracked(this.miembroSel) === nombre) return;
    this.miembroSel.set(nombre);
    this.miembroPintado = nombre;
    this.programarPintado();
  }

  /** Desde el lienzo: abre el miembro y lo deja a la vista en el panel. */
  private abrirMiembroDelLienzo(nombre: string): void {
    if (!this.tieneDoc(nombre)) {
      this.parpadear(nombre);
      return;
    }
    this.ponerMiembro(nombre);
    requestAnimationFrame(() => {
      document
        .getElementById(`m-${nombre}`)
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  alternarCapa(id: CapaId): void {
    this.limpiarSeleccion();
    this.capaActiva.update((a) => (a === id ? null : id));
  }

  alternarKind(id: TipoClase): void {
    this.limpiarSeleccion();
    this.kindActivo.update((a) => (a === id ? null : id));
  }

  onBusqueda(event: Event): void {
    this.limpiarSeleccion();
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  saltarAPrimera(): void {
    const coincide = this.coincidencias();
    const primera = CLASES.find((c) => coincide.has(c.id));
    if (primera) this.irA(primera.id);
  }

  ajustar(): void {
    this.medir();
    const s = Math.min(this.anchoCss / LIENZO.ancho, this.altoCss / LIENZO.alto) * 0.94;
    this.vistaPrevia = null;
    this.escalaAjuste = s;
    this.anim = null;
    this.vista.escala = s;
    this.vista.tx = (this.anchoCss - LIENZO.ancho * s) / 2;
    this.vista.ty = (this.altoCss - LIENZO.alto * s) / 2;
    this.programarPintado();
  }

  zoom(factor: number): void {
    this.anim = null;
    this.aplicarZoom(factor, this.anchoCss / 2, this.altoCss / 2);
  }

  private aplicarZoom(factor: number, px: number, py: number): void {
    const previa = this.vista.escala;
    const nueva = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, previa * factor));
    if (nueva === previa) return;
    const k = nueva / previa;
    this.vista.tx = px - (px - this.vista.tx) * k;
    this.vista.ty = py - (py - this.vista.ty) * k;
    this.vista.escala = nueva;
    this.programarPintado();
  }

  /** Salto animado a una vista: interpolación propia, sin transición CSS. */
  private animarA(s1: number, tx1: number, ty1: number): void {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      this.vista.escala = s1;
      this.vista.tx = tx1;
      this.vista.ty = ty1;
      this.anim = null;
      this.programarPintado();
      return;
    }
    this.anim = {
      s0: this.vista.escala, tx0: this.vista.tx, ty0: this.vista.ty,
      s1, tx1, ty1,
      t0: performance.now(),
    };
    this.programarPintado();
  }

  // ----------------------------------------------------------- exportar

  /**
   * Descarga el diagrama entero como PNG. Se repinta el lienzo completo en un
   * canvas aparte a escala 1 (donde todos los niveles de detalle están por
   * encima de su umbral, así que salen todos los rótulos) y sin filtros: la
   * capa, el tipo, la búsqueda y la clase seleccionada se apartan durante la
   * captura y se restauran después. La vista en pantalla no se toca.
   */
  async exportarPng(): Promise<void> {
    if (this.exportando()) return;
    this.exportando.set(true);

    const previo = {
      seleccionada: untracked(this.seleccionada),
      busqueda: untracked(this.busqueda),
      capa: untracked(this.capaActiva),
      kind: untracked(this.kindActivo),
      sobrevolada: this.sobrevolada,
    };
    this.seleccionada.set(null);
    this.busqueda.set('');
    this.capaActiva.set(null);
    this.kindActivo.set(null);
    this.sobrevolada = null;

    const off = document.createElement('canvas');
    try {
      const factor = escalaSegura(LIENZO.ancho, LIENZO.alto, ESCALA_EXPORT);
      off.width = Math.round(LIENZO.ancho * factor);
      off.height = Math.round(LIENZO.alto * factor);
      const ctx = off.getContext('2d');
      if (!ctx) return;
      // el factor va como si fuera el dpr: el encuadre es el lienzo entero
      this.pintarEscena(ctx, 1, 0, 0, LIENZO.ancho, LIENZO.alto, factor, COLOR.bg);
      const blob = await new Promise<Blob | null>((r) => off.toBlob(r, 'image/png'));
      if (blob) descargar(blob, 'diagrama-clases.png');
    } finally {
      // un lienzo de decenas de megapíxeles no se recicla solo: se vacía
      off.width = 0;
      off.height = 0;
      this.seleccionada.set(previo.seleccionada);
      this.busqueda.set(previo.busqueda);
      this.capaActiva.set(previo.capa);
      this.kindActivo.set(previo.kind);
      this.sobrevolada = previo.sobrevolada;
      this.exportando.set(false);
      this.programarPintado();
    }
  }

  // ------------------------------------------------------------ pintado

  private programarPintado(): void {
    if (this.cuadroPendiente || !this.vivo) return;
    this.cuadroPendiente = true;
    requestAnimationFrame(() => {
      this.cuadroPendiente = false;
      if (!this.vivo || !this.ctx) return;
      if (this.anim) this.avanzarAnim();
      this.pintar();
      if (this.anim) this.programarPintado();
    });
  }

  private avanzarAnim(): void {
    const a = this.anim!;
    const t = Math.min(1, (performance.now() - a.t0) / MS_ANIM);
    const k = suave(t);
    this.vista.escala = a.s0 + (a.s1 - a.s0) * k;
    this.vista.tx = a.tx0 + (a.tx1 - a.tx0) * k;
    this.vista.ty = a.ty0 + (a.ty1 - a.ty0) * k;
    if (t >= 1) this.anim = null;
  }

  private pintar(): void {
    const { escala: s, tx, ty } = this.vista;
    const w = this.anchoCss;
    const h = this.altoCss;

    this.pintarEscena(this.ctx!, s, tx, ty, w, h, this.dpr, null);
    this.pintarMini(-tx / s, -ty / s, w / s, h / s);

    const pct = Math.round(s * 100);
    if (pct !== this.pctPintado) {
      this.pctRef().nativeElement.textContent = `${pct}%`;
      this.pctPintado = pct;
    }
  }

  /**
   * Pinta el grafo con el contexto y el encuadre que se le den. La vista en
   * pantalla y la exportación comparten este método: sólo cambian el lienzo de
   * destino y el fondo (el PNG no puede salir transparente).
   */
  private pintarEscena(
    ctx: CanvasRenderingContext2D,
    s: number,
    tx: number,
    ty: number,
    w: number,
    h: number,
    dpr: number,
    fondo: string | null,
  ): void {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (fondo) {
      ctx.fillStyle = fondo;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.setTransform(s * dpr, 0, 0, s * dpr, tx * dpr, ty * dpr);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'butt';

    const vx = -tx / s;
    const vy = -ty / s;
    const vw = w / s;
    const vh = h / s;
    const vx1 = vx + vw;
    const vy1 = vy + vh;

    const sel = untracked(this.seleccionada);
    const foco = sel ?? this.sobrevolada;
    const vecinos = foco ? this.vecinos.get(foco)! : null;
    const coincide = untracked(this.coincidencias);
    const hayCoincide = coincide.size > 0;
    const capa = untracked(this.capaActiva);
    const kind = untracked(this.kindActivo);
    const capaFoco = foco ? this.porId.get(foco)!.capa : capa;
    const claseFoco = foco ? this.porId.get(foco)! : null;

    this.pintarRegiones(ctx, s, capaFoco, claseFoco);
    this.pintarAristas(ctx, s, vx, vy, vx1, vy1, foco, coincide, hayCoincide, capa);
    this.pintarNodos(ctx, s, vx, vy, vx1, vy1, sel, foco, vecinos, coincide, hayCoincide, capa, kind);
    if (sel) this.pintarEtiquetasArista(ctx, s, vx, vy, vx1, vy1, foco!);
    this.pintarExpandido(ctx);
  }

  private pintarRegiones(
    ctx: CanvasRenderingContext2D,
    s: number,
    capaFoco: CapaId | null,
    claseFoco: Clase | null,
  ): void {
    for (let i = 0; i < CAPAS.length; i++) {
      const c = CAPAS[i];
      const e = this.estiloCapa[i];
      ctx.globalAlpha = capaFoco !== null && c.id !== capaFoco ? 0.28 : 1;
      ctx.beginPath();
      ctx.roundRect(c.x, c.y, c.w, c.h, 26);
      ctx.fillStyle = e.regionRelleno;
      ctx.fill();
      ctx.strokeStyle = e.regionBorde;
      ctx.lineWidth = 1.5;
      ctx.setLineDash(s > LOD_GUION ? [10, 7] : []);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = e.regionTexto;
      ctx.font = `700 34px ${SERIF}`;
      ctx.textAlign = 'left';
      ctx.fillText(c.label, c.x + 22, c.y + 46);
    }

    for (const m of MODULOS) {
      const i = this.idxCapa.get(m.capa)!;
      const e = this.estiloCapa[i];
      const activa = claseFoco !== null && m.capa === claseFoco.capa && m.label === claseFoco.modulo;
      ctx.globalAlpha = capaFoco !== null && m.capa !== capaFoco ? 0.22 : 1;
      ctx.beginPath();
      ctx.roundRect(m.x, m.y, m.w, m.h, 14);
      ctx.fillStyle = activa ? e.modRellenoOn : e.modRelleno;
      ctx.fill();
      ctx.strokeStyle = activa ? e.modBordeOn : e.modBorde;
      ctx.lineWidth = activa ? 2 : 1.2;
      ctx.stroke();
      if (s >= LOD_MODULO) {
        ctx.font = `650 22px ${SERIF}`;
        (ctx as unknown as { letterSpacing: string }).letterSpacing = '1.76px';
        ctx.textAlign = 'left';
        const et = m.label.toUpperCase();
        ctx.fillStyle = activa ? e.modTextoOn : e.modTexto;
        ctx.fillText(et, m.x + 4, m.y - 9);
        const dx = ctx.measureText(et).width + 8;
        ctx.fillStyle = e.modTextoN;
        ctx.font = `500 22px ${SERIF}`;
        ctx.fillText(`${m.clases}`, m.x + 4 + dx, m.y - 9);
        (ctx as unknown as { letterSpacing: string }).letterSpacing = '0px';
      }
    }
    ctx.globalAlpha = 1;
  }

  /**
   * Las aristas se agrupan por (capa, tipo, estado) y cada grupo se traza de
   * una vez: 543 llamadas a stroke() pasan a ser, como mucho, unas pocas
   * decenas, y el guion sólo se configura una vez por grupo.
   */
  private pintarAristas(
    ctx: CanvasRenderingContext2D,
    s: number,
    vx: number, vy: number, vx1: number, vy1: number,
    foco: string | null,
    coincide: Set<string>,
    hayCoincide: boolean,
    capa: CapaId | null,
  ): void {
    for (const b of this.cubA) b.length = 0;
    for (const b of this.cubP) b.length = 0;
    const conPunta = s >= LOD_RESUMEN;
    const conGuion = s >= LOD_GUION;

    for (let i = 0; i < this.aristas.length; i++) {
      const g = this.aristas[i];
      if (g.x1 < vx || g.x0 > vx1 || g.y1 < vy || g.y0 > vy1) continue;

      let est = A_NORMAL;
      if (foco) {
        est = g.de === foco || g.a === foco ? A_VECINA : A_APAGADA;
      } else if (hayCoincide) {
        est = coincide.has(g.de) || coincide.has(g.a) ? A_COINCIDE : A_APAGADA;
      } else if (capa) {
        const cDe = this.porId.get(g.de)!.capa;
        const cA = this.porId.get(g.a)!.capa;
        est = cDe === capa || cA === capa ? A_COINCIDE : A_APAGADA;
      }
      const ti = TIPOS.indexOf(g.tipo);
      this.cubA[(g.capaIdx * TIPOS.length + ti) * 4 + est].push(i);
      if (conPunta) this.cubP[g.capaIdx * 4 + est].push(i);
    }

    for (let ci = 0; ci < CAPAS.length; ci++) {
      const color = CAPAS[ci].color;
      for (let ti = 0; ti < TIPOS.length; ti++) {
        const trazo = TRAZO[TIPOS[ti]];
        for (let est = 0; est < 4; est++) {
          const cubeta = this.cubA[(ci * TIPOS.length + ti) * 4 + est];
          if (!cubeta.length) continue;
          ctx.strokeStyle = color;
          ctx.globalAlpha =
            est === A_APAGADA ? 0.05 : est === A_VECINA ? 1 : est === A_COINCIDE ? 0.75 : trazo.alfa;
          ctx.lineWidth = est === A_VECINA ? 2.6 : trazo.ancho;
          ctx.setLineDash(est === A_VECINA || !conGuion ? [] : trazo.dash);
          ctx.beginPath();
          for (const i of cubeta) {
            const g = this.aristas[i];
            ctx.moveTo(g.sx, g.sy);
            if (g.cubica) ctx.bezierCurveTo(g.c1x, g.c1y, g.c2x, g.c2y, g.ex, g.ey);
            else ctx.quadraticCurveTo(g.c1x, g.c1y, g.ex, g.ey);
          }
          ctx.stroke();
        }
      }
      for (let est = 0; est < 4; est++) {
        const cubeta = this.cubP[ci * 4 + est];
        if (!cubeta.length) continue;
        ctx.fillStyle = color;
        ctx.globalAlpha = est === A_APAGADA ? 0.05 : est === A_VECINA ? 1 : est === A_COINCIDE ? 0.75 : 0.5;
        ctx.beginPath();
        for (const i of cubeta) {
          const g = this.aristas[i];
          ctx.moveTo(g.ex, g.ey);
          ctx.lineTo(g.t1x, g.t1y);
          ctx.lineTo(g.t2x, g.t2y);
          ctx.closePath();
        }
        ctx.fill();
      }
    }
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  private pintarEtiquetasArista(
    ctx: CanvasRenderingContext2D,
    s: number,
    vx: number, vy: number, vx1: number, vy1: number,
    foco: string,
  ): void {
    if (s < LOD_NOMBRE) return;
    ctx.font = `11px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = COLOR.bg;
    ctx.fillStyle = COLOR.muted;
    for (const g of this.aristas) {
      if (g.de !== foco && g.a !== foco) continue;
      if (g.x1 < vx || g.x0 > vx1 || g.y1 < vy || g.y0 > vy1) continue;
      ctx.strokeText(g.etiqueta, g.lx, g.ly);
      ctx.fillText(g.etiqueta, g.lx, g.ly);
    }
  }

  private pintarNodos(
    ctx: CanvasRenderingContext2D,
    s: number,
    vx: number, vy: number, vx1: number, vy1: number,
    sel: string | null,
    foco: string | null,
    vecinos: Set<string> | null,
    coincide: Set<string>,
    hayCoincide: boolean,
    capa: CapaId | null,
    kind: TipoClase | null,
  ): void {
    for (const b of this.cubN) b.length = 0;
    this.visN.length = 0;
    const conGuion = s >= LOD_GUION;

    for (let i = 0; i < CLASES.length; i++) {
      const c = CLASES[i];
      const hw = c.w / 2;
      const hh = c.h / 2;
      if (c.x + hw < vx || c.x - hw > vx1 || c.y + hh < vy || c.y - hh > vy1) continue;

      let est = N_NORMAL;
      if (foco) {
        if (c.id === sel) est = N_SEL;
        else if (c.id === foco || vecinos?.has(c.id)) est = N_VECINA;
        else est = N_APAGADA;
      } else if (hayCoincide) {
        est = coincide.has(c.id) ? N_COINCIDE : N_APAGADA;
      } else if (capa || kind) {
        const ok = (!capa || c.capa === capa) && (!kind || c.kind === kind);
        est = ok ? N_COINCIDE : N_APAGADA;
      }
      this.estN[i] = est;
      if (est === N_SEL) continue; // lo reemplaza el nodo expandido
      this.visN.push(i);
      this.cubN[(this.capaIdxNodo[i] * KINDS.length + this.kindIdx[i]) * 5 + est].push(i);
    }

    for (let ci = 0; ci < CAPAS.length; ci++) {
      const color = CAPAS[ci].color;
      const e = this.estiloCapa[ci];
      for (let ki = 0; ki < KINDS.length; ki++) {
        const guion = GUION_KIND[KINDS[ki].id];
        for (let est = 0; est < 5; est++) {
          const cubeta = this.cubN[(ci * KINDS.length + ki) * 5 + est];
          if (!cubeta.length) continue;
          const resaltado = est === N_VECINA || est === N_COINCIDE;
          ctx.globalAlpha = est === N_APAGADA ? 0.13 : 1;

          ctx.beginPath();
          for (const i of cubeta) {
            const c = CLASES[i];
            ctx.roundRect(c.x - c.w / 2, c.y - c.h / 2, c.w, c.h, 7);
          }
          ctx.fillStyle = resaltado ? e.nodoRellenoOn : COLOR.bg;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = resaltado ? 2.4 : 1.4;
          ctx.setLineDash(guion && conGuion ? guion : []);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          for (const i of cubeta) {
            const c = CLASES[i];
            ctx.roundRect(c.x - c.w / 2, c.y - c.h / 2, c.w, 4, 2);
          }
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;

    if (s < LOD_NOMBRE) return;
    const conResumen = s >= LOD_RESUMEN;
    ctx.textAlign = 'center';
    ctx.font = `600 12.5px ${MONO}`;
    ctx.fillStyle = COLOR.texto;
    let alfaActual = 1;
    for (const i of this.visN) {
      const a = this.estN[i] === N_APAGADA ? 0.13 : 1;
      if (a !== alfaActual) {
        ctx.globalAlpha = a;
        alfaActual = a;
      }
      const c = CLASES[i];
      ctx.fillText(c.nombre, c.x, c.y - 1);
    }
    if (conResumen) {
      ctx.font = `9.5px ${MONO}`;
      ctx.fillStyle = COLOR.faint;
      alfaActual = 1;
      ctx.globalAlpha = 1;
      for (const i of this.visN) {
        const a = this.estN[i] === N_APAGADA ? 0.13 : 1;
        if (a !== alfaActual) {
          ctx.globalAlpha = a;
          alfaActual = a;
        }
        const c = CLASES[i];
        ctx.fillText(this.resumenes[i], c.x, c.y + c.h / 2 - 11);
      }
    }
    ctx.globalAlpha = 1;
  }

  private pintarExpandido(ctx: CanvasRenderingContext2D): void {
    const x = this.expandido;
    if (!x) return;
    ctx.save();
    ctx.translate(x.x, x.y);

    ctx.shadowColor = 'rgba(58,50,41,0.28)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.beginPath();
    ctx.roundRect(0, 0, x.ancho, x.alto, 8);
    ctx.fillStyle = COLOR.bg;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = x.color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, x.ancho, x.alto, 8);
    ctx.clip();
    ctx.fillStyle = x.color;
    ctx.fillRect(0, 0, x.ancho, 26);
    ctx.restore();

    ctx.textAlign = 'left';
    ctx.font = `700 13px ${MONO}`;
    ctx.fillStyle = '#fff';
    ctx.fillText(`${x.c.abst ? 'abstract ' : ''}${x.c.kind} ${x.c.nombre}`, 10, 18);
    ctx.textAlign = 'right';
    ctx.font = `11px ${MONO}`;
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText(`${x.c.miembros.length}`, x.ancho - 10, 18);

    for (let i = 0; i < x.filas.length; i++) {
      const f = x.filas[i];
      const y = 34 + i * ALTO_FILA;
      const abierta = this.miembroPintado === f.nombre;
      const rechazada = this.destelloPintado === f.nombre;
      const activa = this.filaSobre === i || abierta;

      // la fila abierta es la que el panel está explicando
      if (abierta) {
        ctx.fillStyle = alfa(COLOR.acento, 0.1);
        ctx.fillRect(2, y - 2, x.ancho - 4, ALTO_FILA);
      }
      // sin doc: el clic no abre nada y la fila lo dice en rojo
      if (rechazada) {
        ctx.fillStyle = alfa(COLOR.alerta, 0.16);
        ctx.fillRect(2, y - 2, x.ancho - 4, ALTO_FILA);
      }

      ctx.textAlign = 'left';
      ctx.font = `10px ${MONO}`;
      // icono sólido = el miembro trae documentación; apagado = no la tiene
      ctx.fillStyle = !f.doc
        ? alfa(COLOR.faint, 0.45)
        : f.m.k === 'metodo'
          ? COLOR.metodo
          : f.m.k === 'prop'
            ? COLOR.prop
            : COLOR.faint;
      ctx.fillText(f.m.k === 'metodo' ? 'ƒ' : f.m.k === 'valor' ? '·' : '◆', 10, y + 11);

      ctx.font = `${f.m.est ? 'italic ' : ''}11.5px ${MONO}`;
      ctx.fillStyle = rechazada ? COLOR.alerta : activa ? COLOR.acento : COLOR.texto;
      ctx.fillText(f.texto, 30, y + 11);

      ctx.textAlign = 'right';
      ctx.font = `10.5px ${MONO}`;
      ctx.fillStyle = rechazada ? COLOR.alerta : activa ? COLOR.acento : COLOR.faint;
      ctx.fillText(f.tipo, x.ancho - 10, y + 11);

      if (this.filaSobre === i) {
        ctx.strokeStyle = COLOR.acento;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(30, y + 13);
        ctx.lineTo(x.ancho - 10, y + 13);
        ctx.stroke();
      }
    }

    if (x.restantes > 0) {
      ctx.textAlign = 'left';
      ctx.font = `10.5px ${MONO}`;
      ctx.fillStyle = COLOR.faint;
      ctx.fillText(`+ ${x.restantes} miembros más`, 30, 34 + x.filas.length * ALTO_FILA + 11);
    }
    ctx.restore();
  }

  private pintarMini(vx: number, vy: number, vw: number, vh: number): void {
    const mini = this.miniRef().nativeElement;
    const visible = this.vista.escala > this.escalaAjuste * 1.15;
    if (visible !== this.miniVisible) {
      mini.classList.toggle('oculto', !visible);
      this.miniVisible = visible;
    }
    if (!visible || !this.miniCtx || !this.miniFondo) return;

    const ctx = this.miniCtx;
    const w = mini.width / this.dpr;
    const h = mini.height / this.dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, mini.width, mini.height);
    ctx.drawImage(this.miniFondo, 0, 0);
    const s = Math.min(w / LIENZO.ancho, h / LIENZO.alto);
    ctx.setTransform(s * this.dpr, 0, 0, s * this.dpr, 0, 0);
    ctx.fillStyle = alfa(COLOR.acento, 0.12);
    ctx.fillRect(vx, vy, vw, vh);
    ctx.strokeStyle = COLOR.acento;
    ctx.lineWidth = 14;
    ctx.strokeRect(vx, vy, vw, vh);
  }

  // ------------------------------------------------------------ expandido

  private expandido: Expandido | null = null;
  private filaSobre = -1;

  private calcularExpandido(): void {
    const c = untracked(this.seleccionada) ? this.porId.get(untracked(this.seleccionada)!) : null;
    if (!c) {
      this.expandido = null;
      this.filaSobre = -1;
      return;
    }
    const visibles = c.miembros.slice(0, MAX_FILAS);
    const restantes = c.miembros.length - visibles.length;
    const ctx = this.ctx;
    let ancho = 280;
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = `11.5px ${MONO}`;
      let maxN = 0;
      for (const m of visibles) maxN = Math.max(maxN, ctx.measureText(m.n).width);
      ctx.font = `10.5px ${MONO}`;
      let maxT = 0;
      for (const m of visibles) maxT = Math.max(maxT, ctx.measureText(m.t).width);
      ctx.font = `700 13px ${MONO}`;
      const tit = ctx.measureText(`${c.abst ? 'abstract ' : ''}${c.kind} ${c.nombre}`).width;
      ancho = Math.max(30 + maxN + 16 + maxT + 10, tit + 60, 280);
    } else {
      ancho = Math.max(
        ...visibles.map((m) => (m.n.length + m.t.length) * 6.6 + 66),
        c.nombre.length * 8.4 + 90,
        280,
      );
    }
    ancho = Math.min(ancho, 620);
    const alto = 34 + (visibles.length + (restantes > 0 ? 1 : 0)) * ALTO_FILA + 10;
    const docs = untracked(this.docs);

    /*
     * Con el ancho ya tope, una firma larga se metía encima de la columna del
     * tipo. El recorte se calcula aquí, una vez por clase abierta, y no en cada
     * cuadro: el pintado solo dibuja cadenas ya medidas.
     */
    const util = ancho - 40;
    this.expandido = {
      c,
      filas: visibles.map((m) => {
        const nombre = m.n.split('(')[0];
        const anchoTipo = ctx ? Math.min(this.medir1(ctx, m.t, 10.5), util * 0.42) : 0;
        return {
          m,
          nombre,
          texto: ctx ? this.recortar(ctx, m.n, util - anchoTipo - 8, 11.5) : m.n,
          tipo: ctx ? this.recortar(ctx, m.t, anchoTipo, 10.5) : m.t,
          destino: this.destinoDe(c.id, m),
          doc: !!(docs && this.buscarDoc(docs, c.id, nombre)),
        };
      }),
      restantes,
      ancho,
      alto,
      x: c.x - ancho / 2,
      y: c.y - alto / 2,
      color: this.colorCapa.get(c.capa)!,
    };
    this.filaSobre = -1;
  }

  destinoDe(id: string, m: Miembro): string | null {
    return this.destinoMiembro.get(`${id}·${m.n.split('(')[0]}`) ?? null;
  }

  /** Ancho del texto en la fuente mono del tamaño dado. */
  private medir1(ctx: CanvasRenderingContext2D, texto: string, px: number): number {
    ctx.font = `${px}px ${MONO}`;
    return ctx.measureText(texto).width;
  }

  /**
   * Recorta con puntos suspensivos hasta que quepa. La fuente es monoespaciada,
   * así que basta una regla de tres sobre el ancho medido: sin bucle de prueba.
   */
  private recortar(
    ctx: CanvasRenderingContext2D,
    texto: string,
    max: number,
    px: number,
  ): string {
    const ancho = this.medir1(ctx, texto, px);
    if (ancho <= max || !texto) return texto;
    const caben = Math.max(1, Math.floor((max / ancho) * texto.length) - 1);
    return texto.slice(0, caben) + '…';
  }

  // ------------------------------------------------------------ hit-testing

  private construirRejilla(): void {
    const filas = Math.ceil(LIENZO.alto / this.CELDA) + 1;
    for (let i = 0; i < this.cols * filas; i++) this.rejilla.push([]);
    for (let i = 0; i < CLASES.length; i++) {
      const c = CLASES[i];
      const cx0 = Math.max(0, Math.floor((c.x - c.w / 2) / this.CELDA));
      const cx1 = Math.min(this.cols - 1, Math.floor((c.x + c.w / 2) / this.CELDA));
      const cy0 = Math.max(0, Math.floor((c.y - c.h / 2) / this.CELDA));
      const cy1 = Math.min(filas - 1, Math.floor((c.y + c.h / 2) / this.CELDA));
      for (let cy = cy0; cy <= cy1; cy++) {
        for (let cx = cx0; cx <= cx1; cx++) this.rejilla[cy * this.cols + cx].push(i);
      }
    }
  }

  /**
   * Coordenadas de pantalla → mundo. La caja del lienzo se guarda al medir:
   * pedirla en cada pointermove forzaba un cálculo de estilo por evento.
   */
  private aMundo(clientX: number, clientY: number): { x: number; y: number } {
    const caja = this.caja;
    return {
      x: (clientX - caja.left - this.vista.tx) / this.vista.escala,
      y: (clientY - caja.top - this.vista.ty) / this.vista.escala,
    };
  }

  private claseEn(wx: number, wy: number): Clase | null {
    const cx = Math.floor(wx / this.CELDA);
    const cy = Math.floor(wy / this.CELDA);
    if (cx < 0 || cy < 0 || cx >= this.cols) return null;
    const celda = this.rejilla[cy * this.cols + cx];
    if (!celda) return null;
    for (let k = celda.length - 1; k >= 0; k--) {
      const c = CLASES[celda[k]];
      if (
        wx >= c.x - c.w / 2 && wx <= c.x + c.w / 2 &&
        wy >= c.y - c.h / 2 && wy <= c.y + c.h / 2
      ) {
        return c;
      }
    }
    return null;
  }

  /** Índice de fila del nodo expandido bajo el punto, o -1. */
  private filaEn(wx: number, wy: number): number {
    const x = this.expandido;
    if (!x) return -1;
    if (wx < x.x || wx > x.x + x.ancho || wy < x.y || wy > x.y + x.alto) return -1;
    const i = Math.floor((wy - x.y - 34 + 13) / ALTO_FILA);
    return i >= 0 && i < x.filas.length ? i : -1;
  }

  private dentroExpandido(wx: number, wy: number): boolean {
    const x = this.expandido;
    return (
      !!x && wx >= x.x && wx <= x.x + x.ancho && wy >= x.y && wy <= x.y + x.alto
    );
  }

  private ponerCursor(v: string): void {
    if (v === this.cursor) return;
    this.cursor = v;
    this.lienzoRef().nativeElement.style.cursor = v;
  }

  // ------------------------------------------------------------ entrada

  private readonly onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    this.anim = null;
    const caja = this.caja;
    this.aplicarZoom(
      Math.exp(-event.deltaY * 0.0016),
      event.clientX - caja.left,
      event.clientY - caja.top,
    );
  };

  private readonly onPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    event.preventDefault();
    this.anim = null;
    const el = event.currentTarget as HTMLElement;
    // el puntero puede haberse ido ya (o ser sintético): capturarlo es opcional
    try {
      el.setPointerCapture(event.pointerId);
    } catch {
      /* sin captura: el arrastre sigue funcionando dentro del lienzo */
    }
    this.arrastrando = true;
    this.ponerCursor('grabbing');

    let ultimoX = event.clientX;
    let ultimoY = event.clientY;
    let movido = 0;

    const mover = (e: PointerEvent) => {
      this.vista.tx += e.clientX - ultimoX;
      this.vista.ty += e.clientY - ultimoY;
      movido += Math.abs(e.clientX - ultimoX) + Math.abs(e.clientY - ultimoY);
      ultimoX = e.clientX;
      ultimoY = e.clientY;
      this.programarPintado();
    };

    const soltar = (e: PointerEvent) => {
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        /* no se llegó a capturar */
      }
      el.removeEventListener('pointermove', mover);
      el.removeEventListener('pointerup', soltar);
      el.removeEventListener('pointercancel', soltar);
      this.arrastrando = false;
      this.ponerCursor('grab');
      if (movido >= 4) return;
      const p = this.aMundo(e.clientX, e.clientY);
      // dentro del nodo expandido el clic abre el miembro, nunca deselecciona
      if (this.dentroExpandido(p.x, p.y)) {
        const fila = this.filaEn(p.x, p.y);
        if (fila >= 0) {
          const nombre = this.expandido!.filas[fila].nombre;
          this.zona.run(() => this.abrirMiembroDelLienzo(nombre));
        }
        return;
      }
      const c = this.claseEn(p.x, p.y);
      this.zona.run(() => {
        if (c) this.seleccionar(c.id);
        else this.limpiarSeleccion();
      });
    };

    el.addEventListener('pointermove', mover);
    el.addEventListener('pointerup', soltar);
    el.addEventListener('pointercancel', soltar);
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (this.arrastrando) return;
    const p = this.aMundo(event.clientX, event.clientY);

    const fila = this.filaEn(p.x, p.y);
    if (fila !== this.filaSobre) {
      this.filaSobre = fila;
      this.programarPintado();
    }
    if (this.dentroExpandido(p.x, p.y)) {
      this.ponerCursor(fila >= 0 ? 'pointer' : 'default');
      if (this.sobrevolada !== null) {
        this.sobrevolada = null;
        this.programarPintado();
      }
      return;
    }

    const c = this.claseEn(p.x, p.y);
    const id = c ? c.id : null;
    this.ponerCursor(id ? 'pointer' : 'grab');
    if (id !== this.sobrevolada && !untracked(this.seleccionada)) {
      this.sobrevolada = id;
      this.programarPintado();
    }
  };

  private readonly onPointerLeave = (): void => {
    if (this.sobrevolada === null && this.filaSobre === -1) return;
    this.sobrevolada = null;
    this.filaSobre = -1;
    this.programarPintado();
  };

  /** Doble clic sobre un miembro cuyo tipo es otra clase: salta a ella. */
  private readonly onDobleClic = (event: MouseEvent): void => {
    const p = this.aMundo(event.clientX, event.clientY);
    const fila = this.filaEn(p.x, p.y);
    if (fila < 0) return;
    const destino = this.expandido!.filas[fila].destino;
    if (destino) this.zona.run(() => this.irA(destino));
  };

  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    const enCampo = (event.target as HTMLElement)?.tagName === 'INPUT';
    if (event.key === 'Escape') {
      // primero se cierra la doc abierta; el segundo Escape suelta la clase
      if (untracked(this.miembroSel)) {
        this.ponerMiembro(null);
        return;
      }
      this.limpiarSeleccion();
      this.capaActiva.set(null);
      this.kindActivo.set(null);
      return;
    }
    if (enCampo) return;
    if (event.key === '+' || event.key === '=') this.zoom(1.25);
    else if (event.key === '-') this.zoom(0.8);
    else if (event.key === '0') this.ajustar();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.ajustar();
  }

  // ------------------------------------------------------------ geometría

  /**
   * Traza cada relación como curva entre bordes de rectángulo. Las relaciones
   * paralelas (mismo par de clases) se abren en abanico para no superponerse,
   * y las autorreferencias se dibujan como bucle sobre el nodo.
   */
  private construirGeometria(): Arista[] {
    const usos = new Map<string, number>();
    const total = new Map<string, number>();
    for (const r of RELACIONES) {
      const k = [r.de, r.a].sort().join('|');
      total.set(k, (total.get(k) ?? 0) + 1);
    }

    return RELACIONES.map((r) => {
      const A = this.porId.get(r.de)!;
      const B = this.porId.get(r.a)!;
      const capaIdx = this.idxCapa.get(B.capa)!;
      const base = {
        id: r.id, de: r.de, a: r.a,
        tipo: r.tipo, capaIdx, color: this.colorCapa.get(B.capa)!,
        etiqueta: `${REL_LABEL[r.tipo]}${r.via.length ? ` · ${r.via.join(', ')}` : ''}`,
      };

      if (r.de === r.a) {
        const w = A.w / 2;
        const h = A.h / 2;
        const sx = A.x + w * 0.45;
        const bx = A.x + w;
        const sy = A.y - h;
        const ex = bx + 6;
        const ey = A.y - h * 0.25;
        const t = this.punta(bx + 30, A.y - h * 0.9, ex, ey);
        return {
          ...base,
          cubica: true,
          sx, sy,
          c1x: sx, c1y: sy - 58,
          c2x: bx + 54, c2y: sy - 42,
          ex, ey,
          ...t,
          lx: A.x + w * 0.9, ly: sy - 46,
          x0: sx - 10, y0: sy - 70, x1: bx + 70, y1: A.y,
        };
      }

      const k = [r.de, r.a].sort().join('|');
      const n = total.get(k)!;
      const orden = usos.get(k) ?? 0;
      usos.set(k, orden + 1);
      // abanico centrado: 0 para arista única, ±38, ±76… para paralelas
      const curva = n === 1 ? 0 : (orden - (n - 1) / 2) * 76;

      const mx = (A.x + B.x) / 2;
      const my = (A.y + B.y) / 2;
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const largo = Math.hypot(dx, dy) || 1;
      const cx = mx + (-dy / largo) * curva;
      const cy = my + (dx / largo) * curva;

      const ini = this.borde(A, cx, cy, 2);
      const fin = this.borde(B, cx, cy, 9);
      const t = this.punta(cx, cy, fin.x, fin.y);

      return {
        ...base,
        cubica: false,
        sx: ini.x, sy: ini.y,
        c1x: cx, c1y: cy, c2x: cx, c2y: cy,
        ex: fin.x, ey: fin.y,
        ...t,
        lx: 0.25 * ini.x + 0.5 * cx + 0.25 * fin.x,
        ly: 0.25 * ini.y + 0.5 * cy + 0.25 * fin.y,
        // la curva cuadrática no sale de la envolvente de sus tres puntos
        x0: Math.min(ini.x, cx, fin.x), y0: Math.min(ini.y, cy, fin.y),
        x1: Math.max(ini.x, cx, fin.x), y1: Math.max(ini.y, cy, fin.y),
      };
    });
  }

  /** Punto donde la recta centro→(hx,hy) corta el borde del rectángulo. */
  private borde(c: Clase, hx: number, hy: number, hueco: number): { x: number; y: number } {
    const dx = hx - c.x;
    const dy = hy - c.y;
    const largo = Math.hypot(dx, dy) || 1;
    const ux = dx / largo;
    const uy = dy / largo;
    const escala = Math.min(
      Math.abs(ux) < 1e-6 ? Infinity : c.w / 2 / Math.abs(ux),
      Math.abs(uy) < 1e-6 ? Infinity : c.h / 2 / Math.abs(uy),
    );
    return { x: c.x + ux * (escala + hueco), y: c.y + uy * (escala + hueco) };
  }

  /** Vértices traseros del triángulo de 9 px que apunta a (x,y) viniendo de (dx,dy). */
  private punta(dx: number, dy: number, x: number, y: number) {
    const ang = Math.atan2(y - dy, x - dx);
    const l = 9;
    const w = 0.42;
    return {
      t1x: x - l * Math.cos(ang - w), t1y: y - l * Math.sin(ang - w),
      t2x: x - l * Math.cos(ang + w), t2y: y - l * Math.sin(ang + w),
    };
  }

  // ------------------------------------------------------------ helpers

  capaDe(id: string): Capa {
    return this.capaPorId.get(id)!;
  }

  nombreDe(id: string): string {
    return this.porId.get(id)?.nombre ?? id;
  }

  gradoDe(id: string): number {
    return this.porId.get(id)?.grado ?? 0;
  }
}
