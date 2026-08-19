import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import {
  Columna,
  DOMINIOS,
  Dominio,
  DominioId,
  LIENZO,
  REFERENCIAS_EXTERNAS,
  RELACIONES,
  TABLAS,
  TOTAL_COLUMNAS,
  TOTAL_FK,
  Tabla,
} from '../../data/erd-data';
import {
  descargar,
  escalaSegura,
  esperarPintado,
  inlinarEstilos,
  serializar,
  svgAPng,
} from '../../util/exportar';

/** Estado visual de un nodo o arista bajo el foco actual. */
type Estado = 'normal' | 'seleccionada' | 'vecina' | 'coincide' | 'apagada';

interface NodoVista {
  t: Tabla;
  estado: Estado;
  color: string;
  /** Etiqueta de columnas, p. ej. "12 col · 5 fk". */
  resumen: string;
}

interface AristaVista {
  id: string;
  de: string;
  a: string;
  d: string;
  punta: string;
  estado: Estado;
  etiqueta: string;
  lx: number;
  ly: number;
  color: string;
}

const ESCALA_MIN = 0.12;
const ESCALA_MAX = 3;
/** Zoom fijo al enfocar una tabla, acorde al indicador de porcentaje. */
const ESCALA_FOCO = 1.4;

@Component({
  selector: 'app-erd-slide',
  standalone: true,
  templateUrl: './erd-slide.html',
  styleUrl: './erd-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErdSlide {
  private readonly lienzoRef = viewChild.required<ElementRef<HTMLElement>>('lienzo');
  private readonly grafoRef = viewChild.required<ElementRef<SVGSVGElement>>('grafo');

  readonly LIENZO = LIENZO;
  readonly dominios = DOMINIOS;
  readonly totalTablas = TABLAS.length;
  readonly totalColumnas = TOTAL_COLUMNAS;
  readonly totalFk = TOTAL_FK;
  readonly externas = REFERENCIAS_EXTERNAS;

  // ---------------------------------------------------------------- estado

  readonly escala = signal(0.3);
  readonly tx = signal(0);
  readonly ty = signal(0);

  readonly seleccionada = signal<string | null>(null);
  readonly sobrevolada = signal<string | null>(null);
  readonly busqueda = signal('');
  readonly dominioActivo = signal<DominioId | null>(null);
  readonly arrastrando = signal(false);
  readonly exportando = signal(false);
  /** Escala que corresponde a "ajustar"; sirve de referencia para el minimapa. */
  private readonly escalaAjuste = signal(0.3);
  readonly animando = signal(false);

  /** Vista general guardada al entrar en una tabla, para restaurarla al salir. */
  private vistaPrevia: { escala: number; tx: number; ty: number } | null = null;
  private temporizador: ReturnType<typeof setTimeout> | undefined;

  // ---------------------------------------------------------------- índices

  private readonly porId = new Map<string, Tabla>(TABLAS.map((t) => [t.id, t]));
  private readonly colorDominio = new Map<DominioId, string>(
    DOMINIOS.map((d) => [d.id, d.color]),
  );
  private readonly vecinos = new Map<string, Set<string>>();
  /** Geometría de aristas: estática, se calcula una sola vez. */
  private readonly geometria: Omit<AristaVista, 'estado' | 'color'>[] = [];

  constructor() {
    for (const t of TABLAS) this.vecinos.set(t.id, new Set());
    for (const r of RELACIONES) {
      this.vecinos.get(r.de)?.add(r.a);
      this.vecinos.get(r.a)?.add(r.de);
    }
    this.geometria = this.construirGeometria();
    queueMicrotask(() => this.ajustar());
  }

  // ---------------------------------------------------------------- vistas

  readonly detalle = computed(() => {
    const id = this.seleccionada();
    return id ? (this.porId.get(id) ?? null) : null;
  });

  /** Tablas a las que apunta la seleccionada (FK salientes). */
  readonly salientes = computed(() => {
    const id = this.seleccionada();
    return id ? RELACIONES.filter((r) => r.de === id && r.a !== id) : [];
  });

  /** Tablas que apuntan a la seleccionada (FK entrantes). */
  readonly entrantes = computed(() => {
    const id = this.seleccionada();
    return id ? RELACIONES.filter((r) => r.a === id && r.de !== id) : [];
  });

  readonly externasDe = computed(() => {
    const id = this.seleccionada();
    return id ? this.externas.filter((e) => e.de === id) : [];
  });

  /** Ids que coinciden con la búsqueda (vacío si no hay término). */
  private readonly coincidencias = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    if (q.length < 2) return new Set<string>();
    return new Set(
      TABLAS.filter(
        (t) =>
          t.id.includes(q) || t.cols.some((c) => c.n.includes(q)),
      ).map((t) => t.id),
    );
  });

  readonly numCoincidencias = computed(() => this.coincidencias().size);

  /** Foco activo: la selección manda; si no, el hover. */
  private readonly foco = computed(() => this.seleccionada() ?? this.sobrevolada());

  readonly nodos = computed<NodoVista[]>(() => {
    const seleccionadaId = this.seleccionada();
    const foco = this.foco();
    const vecinos = foco ? this.vecinos.get(foco) : null;
    const coincide = this.coincidencias();
    const dom = this.dominioActivo();

    return TABLAS.map((t) => {
      let estado: Estado = 'normal';
      if (foco) {
        // ojo: 'seleccionada' oculta el nodo (lo reemplaza el expandido) y le
        // quita pointer-events, así que solo aplica a la selección real por
        // clic; el simple hover no debe apagar el propio nodo bajo el cursor
        if (t.id === seleccionadaId) estado = 'seleccionada';
        else if (t.id === foco || vecinos?.has(t.id)) estado = 'vecina';
        else estado = 'apagada';
      } else if (coincide.size) {
        estado = coincide.has(t.id) ? 'coincide' : 'apagada';
      } else if (dom) {
        estado = t.dominio === dom ? 'coincide' : 'apagada';
      }

      const fks = t.cols.filter((c) => c.fk).length;
      return {
        t,
        estado,
        color: this.colorDominio.get(t.dominio)!,
        resumen: fks ? `${t.cols.length} col · ${fks} fk` : `${t.cols.length} col`,
      };
    });
  });

  /** Telón de fondo: una región por dominio, con su rótulo. */
  readonly regiones = computed(() => {
    const foco = this.foco();
    const dom = foco ? this.porId.get(foco)!.dominio : this.dominioActivo();
    return this.dominios.map((d) => ({
      d,
      apagada: dom !== null && d.id !== dom,
    }));
  });

  readonly aristas = computed<AristaVista[]>(() => {
    const foco = this.foco();
    const coincide = this.coincidencias();
    const dom = this.dominioActivo();

    return this.geometria.map((g) => {
      let estado: Estado = 'normal';
      if (foco) {
        estado = g.de === foco || g.a === foco ? 'vecina' : 'apagada';
      } else if (coincide.size) {
        estado = coincide.has(g.de) || coincide.has(g.a) ? 'coincide' : 'apagada';
      } else if (dom) {
        const dDe = this.porId.get(g.de)!.dominio;
        const dA = this.porId.get(g.a)!.dominio;
        estado = dDe === dom || dA === dom ? 'coincide' : 'apagada';
      }
      return { ...g, estado, color: this.colorDominio.get(this.porId.get(g.a)!.dominio)! };
    });
  });

  /** Columnas de la tabla enfocada, para dibujarlas dentro del nodo. */
  readonly nodoExpandido = computed(() => {
    const t = this.detalle();
    if (!t) return null;
    const filas = t.cols;
    const ancho = Math.max(t.w, 320);
    const alto = 34 + filas.length * 19 + 10;
    return {
      t,
      filas,
      ancho,
      alto,
      x: t.x - ancho / 2,
      y: t.y - alto / 2,
      color: this.colorDominio.get(t.dominio)!,
    };
  });

  readonly transform = computed(
    () => `translate(${this.tx()},${this.ty()}) scale(${this.escala()})`,
  );

  /** Rectángulo del viewport en coordenadas del lienzo, para el minimapa. */
  readonly viewport = computed(() => {
    const s = this.escala();
    const el = this.lienzoRef().nativeElement;
    return {
      x: -this.tx() / s,
      y: -this.ty() / s,
      w: el.clientWidth / s,
      h: el.clientHeight / s,
    };
  });

  readonly porcentaje = computed(() => Math.round(this.escala() * 100));

  /** El minimapa solo aporta cuando el lienzo ya no cabe entero en pantalla. */
  readonly minimapaVisible = computed(() => this.escala() > this.escalaAjuste() * 1.15);

  // ---------------------------------------------------------------- acciones

  seleccionar(id: string, event?: Event): void {
    event?.stopPropagation();
    if (this.seleccionada() === id) {
      this.limpiarSeleccion();
    } else {
      this.irA(id);
    }
  }

  /**
   * Entra en una tabla: la centra y acerca lo justo para que sus columnas se
   * lean. Guarda la vista general para poder volver a ella al deseleccionar.
   */
  irA(id: string): void {
    if (!this.seleccionada()) {
      this.vistaPrevia = { escala: this.escala(), tx: this.tx(), ty: this.ty() };
    }
    this.seleccionada.set(id);
    // el panel lateral encoge el lienzo: hay que medir después de pintarlo
    requestAnimationFrame(() => this.centrarEnExpandido(id));
  }

  /**
   * Doble clic sobre una columna FK dentro de la tabla expandida: salta a la
   * tabla referenciada por esa clave foránea.
   */
  irATablaDeColumna(id: string, c: Columna, event: Event): void {
    if (!c.fk) return;
    event.stopPropagation();
    const r = RELACIONES.find((rel) => rel.de === id && rel.cols.includes(c.n));
    if (r) this.irA(r.a);
  }

  limpiarSeleccion(): void {
    if (!this.seleccionada()) return;
    this.seleccionada.set(null);
    const previa = this.vistaPrevia;
    this.vistaPrevia = null;
    if (!previa) return;
    requestAnimationFrame(() => {
      this.animar();
      this.escala.set(previa.escala);
      this.tx.set(previa.tx);
      this.ty.set(previa.ty);
    });
  }

  alternarDominio(id: DominioId): void {
    this.limpiarSeleccion();
    this.dominioActivo.update((actual) => (actual === id ? null : id));
  }

  onBusqueda(event: Event): void {
    this.limpiarSeleccion();
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  /** Enter en el buscador: salta a la primera coincidencia. */
  saltarAPrimera(): void {
    const primera = TABLAS.find((t) => this.coincidencias().has(t.id));
    if (primera) this.irA(primera.id);
  }

  ajustar(): void {
    const el = this.lienzoRef().nativeElement;
    const s = Math.min(el.clientWidth / LIENZO.ancho, el.clientHeight / LIENZO.alto) * 0.94;
    this.vistaPrevia = null;
    this.escalaAjuste.set(s);
    this.escala.set(s);
    this.tx.set((el.clientWidth - LIENZO.ancho * s) / 2);
    this.ty.set((el.clientHeight - LIENZO.alto * s) / 2);
  }

  /** Zoom con los botones: mantiene fijo el centro del viewport. */
  zoom(factor: number): void {
    const el = this.lienzoRef().nativeElement;
    this.aplicarZoom(factor, el.clientWidth / 2, el.clientHeight / 2);
  }

  /** Centra la tabla y hace zoom fijo a 140% para que sus columnas se lean. */
  private centrarEnExpandido(id: string): void {
    const t = this.porId.get(id);
    if (!t) return;
    const el = this.lienzoRef().nativeElement;
    this.animar();
    this.escala.set(ESCALA_FOCO);
    this.tx.set(el.clientWidth / 2 - t.x * ESCALA_FOCO);
    this.ty.set(el.clientHeight / 2 - t.y * ESCALA_FOCO);
  }

  /** Marca el próximo cambio de vista como animado (transición CSS). */
  private animar(): void {
    this.animando.set(true);
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => this.animando.set(false), 420);
  }

  private aplicarZoom(factor: number, px: number, py: number): void {
    const previa = this.escala();
    const nueva = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, previa * factor));
    if (nueva === previa) return;
    const k = nueva / previa;
    // el punto (px,py) de pantalla queda anclado bajo el cursor
    this.tx.update((v) => px - (px - v) * k);
    this.ty.update((v) => py - (py - v) * k);
    this.escala.set(nueva);
  }

  // --------------------------------------------------------------- exportar

  /**
   * Descarga el diagrama completo. Se exporta siempre el esquema entero y sin
   * atenuar: el filtro de dominio, la búsqueda y la tabla seleccionada se
   * apartan durante la captura y se restauran después. La vista (zoom y
   * desplazamiento) no se toca, porque el archivo lleva su propio encuadre.
   */
  async exportar(formato: 'svg' | 'png'): Promise<void> {
    if (this.exportando()) return;
    this.exportando.set(true);

    const previo = {
      seleccionada: this.seleccionada(),
      sobrevolada: this.sobrevolada(),
      busqueda: this.busqueda(),
      dominio: this.dominioActivo(),
    };
    this.seleccionada.set(null);
    this.sobrevolada.set(null);
    this.busqueda.set('');
    this.dominioActivo.set(null);

    try {
      await esperarPintado();
      const { texto, ancho, alto } = this.construirSvg();
      if (formato === 'svg') {
        descargar(new Blob([texto], { type: 'image/svg+xml;charset=utf-8' }), 'esquema-base-datos.svg');
      } else {
        const png = await svgAPng(texto, ancho, alto, escalaSegura(ancho, alto, 2));
        descargar(png, 'esquema-base-datos.png');
      }
    } finally {
      this.seleccionada.set(previo.seleccionada);
      this.sobrevolada.set(previo.sobrevolada);
      this.busqueda.set(previo.busqueda);
      this.dominioActivo.set(previo.dominio);
      this.exportando.set(false);
    }
  }

  /**
   * Clona el SVG en pantalla y lo vuelve autónomo: encuadre propio (la caja
   * real del contenido, sin la transformación de la vista), fondo opaco y los
   * estilos calculados escritos en cada nodo, porque las hojas de estilo del
   * componente no viajan con el archivo.
   */
  private construirSvg(): { texto: string; ancho: number; alto: number } {
    const svg = this.grafoRef().nativeElement;
    const mundo = svg.querySelector<SVGGElement>('g.mundo')!;
    const caja = mundo.getBBox();
    const margen = 48;
    const ancho = Math.ceil(caja.width + margen * 2);
    const alto = Math.ceil(caja.height + margen * 2);
    const x = Math.floor(caja.x - margen);
    const y = Math.floor(caja.y - margen);

    const clon = svg.cloneNode(true) as SVGSVGElement;
    inlinarEstilos(svg, clon);
    clon.querySelector('g.mundo')?.removeAttribute('transform');
    clon.setAttribute('width', `${ancho}`);
    clon.setAttribute('height', `${alto}`);
    clon.setAttribute('viewBox', `${x} ${y} ${ancho} ${alto}`);

    const fondo = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    fondo.setAttribute('x', `${x}`);
    fondo.setAttribute('y', `${y}`);
    fondo.setAttribute('width', `${ancho}`);
    fondo.setAttribute('height', `${alto}`);
    fondo.setAttribute('fill', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#faf3e6');
    clon.insertBefore(fondo, clon.firstChild);

    return { texto: serializar(clon), ancho, alto };
  }

  // ---------------------------------------------------------------- entrada

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    this.animando.set(false);
    const caja = this.lienzoRef().nativeElement.getBoundingClientRect();
    const factor = Math.exp(-event.deltaY * 0.0016);
    this.aplicarZoom(factor, event.clientX - caja.left, event.clientY - caja.top);
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    // clic sobre una tabla: no capturar el puntero, para que el (click) del
    // nodo llegue sin retargetear (setPointerCapture desvía click y cursor)
    if ((event.target as Element).closest('[data-nodo]')) return;
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    this.arrastrando.set(true);

    let ultimoX = event.clientX;
    let ultimoY = event.clientY;
    let movido = 0;

    const mover = (e: PointerEvent) => {
      const dx = e.clientX - ultimoX;
      const dy = e.clientY - ultimoY;
      ultimoX = e.clientX;
      ultimoY = e.clientY;
      movido += Math.abs(dx) + Math.abs(dy);
      this.tx.update((v) => v + dx);
      this.ty.update((v) => v + dy);
    };

    const soltar = () => {
      el.releasePointerCapture(event.pointerId);
      el.removeEventListener('pointermove', mover);
      el.removeEventListener('pointerup', soltar);
      el.removeEventListener('pointercancel', soltar);
      this.arrastrando.set(false);
      // un clic limpio sobre el fondo deselecciona; un arrastre no
      if (movido < 4 && (event.target as Element).closest('[data-nodo]') === null) {
        this.limpiarSeleccion();
      }
    };

    el.addEventListener('pointermove', mover);
    el.addEventListener('pointerup', soltar);
    el.addEventListener('pointercancel', soltar);
  }

  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    const enCampo = (event.target as HTMLElement)?.tagName === 'INPUT';
    if (event.key === 'Escape') {
      this.limpiarSeleccion();
      this.dominioActivo.set(null);
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

  // ---------------------------------------------------------------- geometría

  /**
   * Traza cada FK como curva entre bordes de rectángulo. Las aristas paralelas
   * (mismo par de tablas) se abren en abanico para no superponerse, y las
   * autorreferencias se dibujan como bucle sobre el nodo.
   */
  private construirGeometria(): Omit<AristaVista, 'estado' | 'color'>[] {
    const usos = new Map<string, number>();
    const total = new Map<string, number>();
    for (const r of RELACIONES) {
      const k = [r.de, r.a].sort().join('|');
      total.set(k, (total.get(k) ?? 0) + 1);
    }

    return RELACIONES.map((r) => {
      const A = this.porId.get(r.de)!;
      const B = this.porId.get(r.a)!;
      const etiqueta = `${r.cols.join(', ')} · ${r.onDelete}`;

      if (r.de === r.a) {
        const w = A.w / 2;
        const h = A.h / 2;
        const x0 = A.x + w * 0.45;
        const x1 = A.x + w;
        const y = A.y - h;
        const d = `M ${x0} ${y} C ${x0} ${y - 58}, ${x1 + 54} ${y - 42}, ${x1 + 6} ${A.y - h * 0.25}`;
        return {
          id: r.id, de: r.de, a: r.a, d,
          punta: this.punta(x1 + 30, A.y - h * 0.9, x1 + 6, A.y - h * 0.25),
          etiqueta, lx: A.x + w * 0.9, ly: y - 46,
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

      return {
        id: r.id, de: r.de, a: r.a,
        d: `M ${ini.x} ${ini.y} Q ${cx} ${cy} ${fin.x} ${fin.y}`,
        punta: this.punta(cx, cy, fin.x, fin.y),
        etiqueta,
        lx: 0.25 * ini.x + 0.5 * cx + 0.25 * fin.x,
        ly: 0.25 * ini.y + 0.5 * cy + 0.25 * fin.y,
      };
    });
  }

  /** Punto donde la recta centro→(hx,hy) corta el borde del rectángulo. */
  private borde(t: Tabla, hx: number, hy: number, hueco: number): { x: number; y: number } {
    const dx = hx - t.x;
    const dy = hy - t.y;
    const hw = t.w / 2;
    const hh = t.h / 2;
    const largo = Math.hypot(dx, dy) || 1;
    const ux = dx / largo;
    const uy = dy / largo;
    const escala = Math.min(
      Math.abs(ux) < 1e-6 ? Infinity : hw / Math.abs(ux),
      Math.abs(uy) < 1e-6 ? Infinity : hh / Math.abs(uy),
    );
    return { x: t.x + ux * (escala + hueco), y: t.y + uy * (escala + hueco) };
  }

  /** Triángulo de 9px en (x,y), orientado según viene desde (dx,dy). */
  private punta(dx: number, dy: number, x: number, y: number): string {
    const ang = Math.atan2(y - dy, x - dx);
    const l = 9;
    const w = 0.42;
    const p1 = `${x - l * Math.cos(ang - w)},${y - l * Math.sin(ang - w)}`;
    const p2 = `${x - l * Math.cos(ang + w)},${y - l * Math.sin(ang + w)}`;
    return `${x},${y} ${p1} ${p2}`;
  }

  // ---------------------------------------------------------------- helpers

  dominioDe(id: string): Dominio {
    const t = this.porId.get(id)!;
    return this.dominios.find((d) => d.id === t.dominio)!;
  }

  gradoDe(id: string): number {
    return this.porId.get(id)?.grado ?? 0;
  }
}
