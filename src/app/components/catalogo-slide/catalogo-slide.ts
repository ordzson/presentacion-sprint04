import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { CATEGORIAS, CategoriaId, META, OBJETOS, Objeto } from '../../data/catalogo-data';

/** Trozo de texto con marca de coincidencia y de código, para pintarlo. */
interface Trozo {
  t: string;
  /** Coincide con la búsqueda. */
  m: boolean;
  /** Venía entre acentos graves: es un identificador del esquema. */
  c: boolean;
}

interface Fila {
  o: Objeto;
  nombre: Trozo[];
  desc: Trozo[];
}

interface Grupo {
  clave: string;
  titulo: string;
  color: string;
  filas: Fila[];
}

/** Token del resaltado de SQL: `c` es la clase CSS. */
interface Token {
  t: string;
  c: string;
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
 * Palabras que no aportan al filtro. Sin esta lista, buscar «dos clases a la
 * vez» resaltaría cada «la» suelta de las descripciones.
 */
const VACIAS = new Set([
  'de', 'la', 'el', 'en', 'un', 'una', 'los', 'las', 'del', 'al', 'se', 'es',
  'lo', 'que', 'por', 'con', 'sin', 'su', 'sus', 'para', 'como', 'mas', 'muy',
]);

const CLAVES =
  'CREATE|OR|REPLACE|TABLE|VIEW|INDEX|UNIQUE|TRIGGER|FUNCTION|PROCEDURE|SCHEMA|EXTENSION|TYPE|ENUM|POLICY|COMMENT|ALTER|ADD|DROP|ONLY|RETURNS|LANGUAGE|AS|BEGIN|END|DECLARE|IF|THEN|ELSIF|ELSE|LOOP|FOREACH|RAISE|EXCEPTION|RETURN|SELECT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|CROSS|LATERAL|ON|AND|NOT|NULL|IS|IN|EXISTS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|DISTINCT|UNION|ALL|CASE|WHEN|CONSTRAINT|PRIMARY|KEY|FOREIGN|REFERENCES|CASCADE|RESTRICT|ACTION|DEFAULT|CHECK|EXCLUDE|USING|ENABLE|ROW|LEVEL|SECURITY|DEFINER|INVOKER|FOR|TO|WITH|WITHOUT|GENERATED|ALWAYS|STORED|BEFORE|AFTER|EACH|EXECUTE|STRICT|DO|CONFLICT|EXCLUDED|RETURNING|COALESCE|GREATEST|LEAST|TRUE|FALSE|STABLE|VOLATILE|IMMUTABLE|ASC|DESC|OVER|PARTITION|FILTER|GRANT|REVOKE|OF';

const TIPOS =
  'uuid|text|jsonb|json|boolean|integer|bigint|smallint|numeric|date|timestamp|time|zone|inet|bytea|character|varying|varchar|int4range|trigger|void|record|serial|real|double|precision|interval';

const RESALTADO = new RegExp(
  `(--[^\\n]*)|('(?:[^']|'')*')|(\\b\\d+(?:\\.\\d+)?\\b)|\\b(${CLAVES})\\b|\\b(${TIPOS})\\b`,
  'gi',
);

@Component({
  selector: 'app-catalogo-slide',
  standalone: true,
  templateUrl: './catalogo-slide.html',
  styleUrl: './catalogo-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoSlide {
  private readonly listaRef = viewChild.required<ElementRef<HTMLElement>>('lista');

  readonly META = META;
  readonly categorias = CATEGORIAS;

  readonly totalTablas = OBJETOS.filter((o) => o.cat === 'tabla').length;
  readonly totalFunciones = OBJETOS.filter((o) => o.cat === 'funcion').length;
  readonly totalTriggers = OBJETOS.filter((o) => o.cat === 'trigger').length;
  readonly totalPoliticas = OBJETOS.filter(
    (o) => o.cat === 'rls' && o.grupo !== 'Activación de RLS',
  ).length;

  // ---------------------------------------------------------------- estado

  readonly busqueda = signal('');
  readonly catActiva = signal<CategoriaId | null>(null);
  readonly seleccionado = signal<string | null>(null);
  readonly copiado = signal(false);

  // ---------------------------------------------------------------- índices

  private readonly porId = new Map<string, Objeto>(OBJETOS.map((o) => [o.id, o]));
  private readonly color = new Map<CategoriaId, string>(
    CATEGORIAS.map((c) => [c.id, c.color]),
  );
  /** Texto buscable de cada objeto: nombre, descripción, grupo, tabla y claves. */
  private readonly texto = new Map<string, string>(
    OBJETOS.map((o) => [
      o.id,
      norm(
        `${o.nombre} ${o.desc} ${o.detalle} ${o.grupo} ${o.tabla} ${o.nota} ${o.claves} ` +
          o.pasos.join(' '),
      ),
    ]),
  );
  /** Cuerpo SQL normalizado. Se arma la primera vez que hace falta. */
  private sqlIndex: Map<string, string> | null = null;
  private temporizador: ReturnType<typeof setTimeout> | undefined;

  // ---------------------------------------------------------------- vistas

  private readonly terminos = computed(() =>
    norm(this.busqueda().trim())
      .split(/\s+/)
      .filter((t) => t.length >= 2 && !VACIAS.has(t)),
  );

  /**
   * Coincidencias. Primero busca en nombre y descripción —que es como se busca
   * "por lo que hace"—; si eso no devuelve nada, reintenta dentro del SQL.
   */
  private readonly resultado = computed(() => {
    const cat = this.catActiva();
    const base = cat ? OBJETOS.filter((o) => o.cat === cat) : OBJETOS;
    const terminos = this.terminos();
    if (!terminos.length) return { lista: base, enSql: false };

    const lista = base.filter((o) => {
      const t = this.texto.get(o.id)!;
      return terminos.every((q) => t.includes(q));
    });
    if (lista.length) return { lista, enSql: false };

    if (!this.sqlIndex) {
      this.sqlIndex = new Map(OBJETOS.map((o) => [o.id, norm(o.sql)]));
    }
    const enSql = base.filter((o) => {
      const t = this.sqlIndex!.get(o.id)!;
      return terminos.every((q) => t.includes(q));
    });
    return { lista: enSql, enSql: enSql.length > 0 };
  });

  readonly coincidencias = computed(() => this.resultado().lista.length);
  readonly buscoEnSql = computed(() => this.resultado().enSql);

  /** Resultados agrupados por subcategoría, en el orden del catálogo. */
  readonly grupos = computed<Grupo[]>(() => {
    const terminos = this.terminos();
    const salida: Grupo[] = [];
    let actual: Grupo | null = null;

    for (const o of this.resultado().lista) {
      const clave = `${o.cat}·${o.grupo}`;
      if (!actual || actual.clave !== clave) {
        // el rótulo lleva la categoría delante: «Horarios» significa una cosa en
        // las tablas y otra en las claves foráneas
        const cat = CATEGORIAS.find((c) => c.id === o.cat)!;
        const titulo = cat.label === o.grupo ? o.grupo : `${cat.label} · ${o.grupo}`;
        actual = { clave, titulo, color: cat.color, filas: [] };
        salida.push(actual);
      }
      actual.filas.push({
        o,
        nombre: this.trozos(o.nombre, terminos),
        desc: this.trozos(o.desc, terminos),
      });
    }
    return salida;
  });

  readonly detalle = computed(() => {
    const id = this.seleccionado();
    return id ? (this.porId.get(id) ?? null) : null;
  });

  readonly colorDetalle = computed(() => {
    const o = this.detalle();
    return o ? this.color.get(o.cat)! : 'var(--border)';
  });

  /** Descripción de la ficha, ya troceada para pintar los identificadores. */
  readonly descFicha = computed(() => {
    const o = this.detalle();
    return o ? this.trozos(o.desc, []) : [];
  });

  readonly detalleFicha = computed(() => {
    const o = this.detalle();
    return o && o.detalle ? this.trozos(o.detalle, []) : [];
  });

  /** Los pasos de la función abierta, troceados como el resto de los textos. */
  readonly pasosFicha = computed(() => {
    const o = this.detalle();
    return o ? o.pasos.map((paso) => this.trozos(paso, [])) : [];
  });

  readonly etiquetaCat = computed(() => {
    const o = this.detalle();
    return o ? (CATEGORIAS.find((c) => c.id === o.cat)?.label ?? '') : '';
  });

  /** El SQL del objeto abierto, troceado para colorearlo. */
  readonly tokens = computed<Token[]>(() => {
    const o = this.detalle();
    if (!o) return [];
    const salida: Token[] = [];
    let ultimo = 0;
    RESALTADO.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = RESALTADO.exec(o.sql)) !== null) {
      if (m.index > ultimo) salida.push({ t: o.sql.slice(ultimo, m.index), c: '' });
      const clase = m[1] ? 'com' : m[2] ? 'str' : m[3] ? 'num' : m[4] ? 'kw' : 'tip';
      salida.push({ t: m[0], c: clase });
      ultimo = m.index + m[0].length;
    }
    if (ultimo < o.sql.length) salida.push({ t: o.sql.slice(ultimo), c: '' });
    return salida;
  });

  // ---------------------------------------------------------------- acciones

  seleccionar(id: string): void {
    this.seleccionado.set(id);
    this.copiado.set(false);
  }

  alternarCategoria(id: CategoriaId): void {
    this.catActiva.update((a) => (a === id ? null : id));
  }

  onBusqueda(event: Event): void {
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  limpiar(): void {
    this.busqueda.set('');
    this.catActiva.set(null);
  }

  /** Click en la tabla de un objeto: deja en pantalla todo lo que la toca. */
  filtrarPorTabla(tabla: string): void {
    this.catActiva.set(null);
    this.busqueda.set(tabla);
  }

  /** Enter en el buscador: abre la primera coincidencia. */
  abrirPrimera(): void {
    const primera = this.resultado().lista[0];
    if (primera) this.seleccionar(primera.id);
  }

  /** ↑/↓ recorren la lista visible sin sacar el foco del buscador. */
  mover(paso: number): void {
    const lista = this.resultado().lista;
    if (!lista.length) return;
    const i = lista.findIndex((o) => o.id === this.seleccionado());
    const siguiente = i === -1 ? 0 : Math.min(lista.length - 1, Math.max(0, i + paso));
    this.seleccionar(lista[siguiente].id);
    this.listaRef()
      .nativeElement.querySelector('.fila.activa')
      ?.scrollIntoView({ block: 'nearest' });
  }

  async copiar(): Promise<void> {
    const o = this.detalle();
    if (!o) return;
    await navigator.clipboard.writeText(o.sql);
    this.copiado.set(true);
    clearTimeout(this.temporizador);
    this.temporizador = setTimeout(() => this.copiado.set(false), 1600);
  }

  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.seleccionado.set(null);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      this.mover(event.key === 'ArrowDown' ? 1 : -1);
      event.preventDefault();
    }
  }

  // ---------------------------------------------------------------- privado

  /**
   * Trocea el texto en dos ejes: lo que va entre acentos graves se pinta como
   * identificador, y lo que coincide con la búsqueda se resalta.
   */
  private trozos(texto: string, terminos: string[]): Trozo[] {
    const salida: Trozo[] = [];
    texto.split('`').forEach((parte, i) => {
      if (parte) salida.push(...this.marcar(parte, i % 2 === 1, terminos));
    });
    return salida.length ? salida : [{ t: '', m: false, c: false }];
  }

  private marcar(texto: string, codigo: boolean, terminos: string[]): Trozo[] {
    if (!terminos.length) return [{ t: texto, m: false, c: codigo }];
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
        salida.push({ t: texto.slice(inicio, i), m: marcado[inicio], c: codigo });
        inicio = i;
      }
    }
    return salida;
  }
}
