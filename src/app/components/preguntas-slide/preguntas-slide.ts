import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { Inline, ITEMS, Item, META, SECCIONES } from '../../data/preguntas-data';

/** Trozo de texto listo para pintar: es un `Inline` con la marca de coincidencia. */
interface Trozo extends Inline {
  /** Coincide con la búsqueda. */
  m?: 1;
}

interface Fila {
  it: Item;
  tit: Trozo[];
  resumen: Trozo[];
}

interface Grupo {
  clave: string;
  titulo: string;
  color: string;
  filas: Fila[];
}

/**
 * Minúsculas y sin tildes, conservando la longitud original: los índices del
 * texto normalizado tienen que seguir sirviendo para resaltar sobre el texto
 * de verdad.
 */
function norm(s: string): string {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    out += (c.length ? c[0] : s[i]).toLowerCase();
  }
  return out;
}

/**
 * Palabras que no aportan al filtro. Sin esta lista, buscar «por qué se borra»
 * resaltaría cada «se» suelto de las respuestas.
 */
const VACIAS = new Set([
  'de', 'la', 'el', 'en', 'un', 'una', 'los', 'las', 'del', 'al', 'se', 'es',
  'lo', 'que', 'por', 'con', 'sin', 'su', 'sus', 'para', 'como', 'mas', 'muy',
  'qué', 'que', 'hay', 'son', 'ser', 'no', 'si', 'y', 'o', 'a',
]);

@Component({
  selector: 'app-preguntas-slide',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './preguntas-slide.html',
  styleUrl: './preguntas-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreguntasSlide {
  private readonly listaRef = viewChild.required<ElementRef<HTMLElement>>('lista');

  readonly META = META;
  readonly secciones = SECCIONES;

  // ---------------------------------------------------------------- estado

  readonly busqueda = signal('');
  readonly secActiva = signal<string | null>(null);
  readonly seleccionado = signal<string | null>(null);
  /** Pila de elementos visitados, para deshacer un salto por referencia. */
  private readonly vueltas = signal<string[]>([]);

  // ---------------------------------------------------------------- índices

  private readonly porId = new Map<string, Item>(ITEMS.map((i) => [i.id, i]));
  private readonly color = new Map<string, string>(SECCIONES.map((s) => [s.id, s.color]));
  private readonly labelSec = new Map<string, string>(SECCIONES.map((s) => [s.id, s.label]));

  /** Título, resumen y claves de cada elemento: es la búsqueda de todos los días. */
  private readonly cabeza = new Map<string, string>(
    ITEMS.map((i) => [i.id, norm(`${i.titulo} ${i.resumen} ${i.claves}`)]),
  );
  /** Todo el cuerpo. Se arma la primera vez que hace falta, que casi nunca es. */
  private fondo: Map<string, string> | null = null;

  // ---------------------------------------------------------------- vistas

  private readonly terminos = computed(() =>
    norm(this.busqueda().trim())
      .split(/\s+/)
      .filter((t) => t.length >= 2 && !VACIAS.has(t)),
  );

  /**
   * Coincidencias. Primero busca en el título, el resumen y las claves —que es
   * como se busca «la pregunta sobre X»—; si eso no devuelve nada, reintenta
   * dentro del cuerpo completo de las respuestas.
   */
  private readonly resultado = computed(() => {
    const sec = this.secActiva();
    const base = sec ? ITEMS.filter((i) => i.seccion === sec) : ITEMS;
    const terminos = this.terminos();
    if (!terminos.length) return { lista: base, enFondo: false };

    const lista = base.filter((i) => {
      const t = this.cabeza.get(i.id)!;
      return terminos.every((q) => t.includes(q));
    });
    if (lista.length) return { lista, enFondo: false };

    if (!this.fondo) this.fondo = new Map(ITEMS.map((i) => [i.id, norm(i.texto)]));
    const enFondo = base.filter((i) => {
      const t = this.fondo!.get(i.id)!;
      return terminos.every((q) => t.includes(q));
    });
    return { lista: enFondo, enFondo: enFondo.length > 0 };
  });

  readonly coincidencias = computed(() => this.resultado().lista.length);
  readonly buscoEnFondo = computed(() => this.resultado().enFondo);

  /** Resultados agrupados por sección y subsección, en el orden del documento. */
  readonly grupos = computed<Grupo[]>(() => {
    const terminos = this.terminos();
    const salida: Grupo[] = [];
    let actual: Grupo | null = null;

    for (const it of this.resultado().lista) {
      const clave = `${it.seccion}·${it.grupo}`;
      if (!actual || actual.clave !== clave) {
        actual = {
          clave,
          titulo: it.grupo,
          color: this.color.get(it.seccion) ?? 'var(--border)',
          filas: [],
        };
        salida.push(actual);
      }
      actual.filas.push({
        it,
        tit: this.marcarInline(it.tit, terminos),
        resumen: this.marcar(it.resumen, terminos),
      });
    }
    return salida;
  });

  readonly detalle = computed(() => {
    const id = this.seleccionado();
    return id ? (this.porId.get(id) ?? null) : null;
  });

  readonly colorDetalle = computed(() => {
    const it = this.detalle();
    return it ? (this.color.get(it.seccion) ?? 'var(--border)') : 'var(--border)';
  });

  readonly etiquetaSec = computed(() => {
    const it = this.detalle();
    return it ? (this.labelSec.get(it.seccion) ?? '') : '';
  });

  /**
   * Subsección del elemento, para la ruta de la ficha. Se deja en blanco
   * cuando el grupo es el título de la sección, que ya está en la etiqueta.
   */
  readonly subgrupo = computed(() => {
    const it = this.detalle();
    return it && /^\d/.test(it.grupo) ? it.grupo : '';
  });

  readonly puedeVolver = computed(() => this.vueltas().length > 0);

  /** Vecinos dentro de la lista visible: el recorrido natural de la ficha. */
  private readonly vecinos = computed(() => {
    const lista = this.resultado().lista;
    const i = lista.findIndex((x) => x.id === this.seleccionado());
    return {
      anterior: i > 0 ? lista[i - 1] : null,
      siguiente: i !== -1 && i < lista.length - 1 ? lista[i + 1] : null,
    };
  });

  readonly anterior = computed(() => this.vecinos().anterior);
  readonly siguiente = computed(() => this.vecinos().siguiente);

  // ---------------------------------------------------------------- acciones

  seleccionar(id: string): void {
    this.seleccionado.set(id);
    this.vueltas.set([]);
  }

  alternarSeccion(id: string): void {
    this.secActiva.update((a) => (a === id ? null : id));
  }

  onBusqueda(event: Event): void {
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  limpiar(): void {
    this.busqueda.set('');
    this.secActiva.set(null);
  }

  /** Enter en el buscador: abre la primera coincidencia. */
  abrirPrimera(): void {
    const primera = this.resultado().lista[0];
    if (primera) this.seleccionar(primera.id);
  }

  /**
   * Salto por una referencia del texto («ver P24»). Guarda de dónde se venía y
   * suelta el filtro si el destino no está entre lo que se está mirando.
   */
  irARef(ref: string): void {
    const destino =
      this.porId.get(ref) ??
      // una referencia a una sección entera cae en su nota de entrada
      this.porId.get(`${ref}-intro`) ??
      ITEMS.find((i) => i.seccion === ref);
    if (!destino) return;
    const desde = this.seleccionado();
    // si el destino no está entre lo que se está mirando, se suelta el filtro:
    // aterrizar en una ficha que el índice no muestra desorienta
    if (!this.resultado().lista.some((i) => i.id === destino.id)) {
      this.secActiva.set(null);
      this.busqueda.set('');
    }
    this.seleccionado.set(destino.id);
    if (desde) this.vueltas.update((v) => [...v, desde]);
    this.desplazarAlActivo();
  }

  volver(): void {
    const v = this.vueltas();
    if (!v.length) return;
    this.seleccionado.set(v[v.length - 1]);
    this.vueltas.set(v.slice(0, -1));
    this.desplazarAlActivo();
  }

  /** ↑/↓ recorren la lista visible sin sacar el foco del buscador. */
  mover(paso: number): void {
    const lista = this.resultado().lista;
    if (!lista.length) return;
    const i = lista.findIndex((x) => x.id === this.seleccionado());
    const siguiente = i === -1 ? 0 : Math.min(lista.length - 1, Math.max(0, i + paso));
    this.seleccionar(lista[siguiente].id);
    this.desplazarAlActivo();
  }

  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.puedeVolver()) this.volver();
      else this.seleccionado.set(null);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      this.mover(event.key === 'ArrowDown' ? 1 : -1);
      event.preventDefault();
    }
  }

  // ---------------------------------------------------------------- privado

  private desplazarAlActivo(): void {
    // el índice sigue a la ficha: pintado y desplazamiento van en el mismo tic
    setTimeout(() => {
      this.listaRef()
        .nativeElement.querySelector('.fila.activa')
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  /** Resalta las coincidencias dentro de un texto ya troceado. */
  private marcarInline(trozos: Inline[], terminos: string[]): Trozo[] {
    if (!terminos.length) return trozos;
    return trozos.flatMap((t) => this.marcar(t.t, terminos).map((x) => ({ ...t, ...x })));
  }

  private marcar(texto: string, terminos: string[]): Trozo[] {
    if (!terminos.length) return [{ t: texto }];
    const plano = norm(texto);
    const marcado = new Array<boolean>(texto.length).fill(false);
    for (const q of terminos) {
      let i = plano.indexOf(q);
      while (i !== -1) {
        for (let k = i; k < i + q.length; k++) marcado[k] = true;
        i = plano.indexOf(q, i + q.length);
      }
    }
    const salida: Trozo[] = [];
    let inicio = 0;
    for (let i = 1; i <= texto.length; i++) {
      if (i === texto.length || marcado[i] !== marcado[inicio]) {
        const trozo: Trozo = { t: texto.slice(inicio, i) };
        if (marcado[inicio]) trozo.m = 1;
        salida.push(trozo);
        inicio = i;
      }
    }
    return salida.length ? salida : [{ t: texto }];
  }
}
