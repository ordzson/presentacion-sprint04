import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';
import {
  ARISTAS,
  Arista,
  CAPAS,
  CAPAS_POR_ID,
  Capa,
  CapaId,
  DONDE_TOCAR,
  LEYENDA_ARISTAS,
  MATRIZ,
  PUERTOS_NODO,
  RANURAS,
  RANURAS_POR_ID,
  RECORRIDOS,
  REGLAS,
  RanuraId,
  Recorrido,
} from '../../data/architecture-data';

type Vista = 'mapa' | 'patron' | 'recorridos' | 'porque';

/** Carril del diagrama de secuencia. */
interface Carril {
  id: RanuraId;
  x: number;
  titulo: string;
  proyecto: string;
  color: string;
  /** Los carriles que este recorrido no toca se dibujan apagados: eso también informa. */
  usado: boolean;
}

interface Flecha {
  n: number;
  y: number;
  x1: number;
  x2: number;
  /** Centro y ancho del rótulo, para el fondo que tapa la línea de vida. */
  mx: number;
  ancho: number;
  etiqueta: string;
  vuelta: boolean;
  fondo: boolean;
  propia: boolean;
  color: string;
}

interface GeoSecuencia {
  alto: number;
  carriles: Carril[];
  flechas: Flecha[];
  /** Altura del corte «aquí termina la petición web», o nulo si el recorrido no sale de ella. */
  corte: number | null;
}

const PRIMERA = 30;
const SALTO = 46;

@Component({
  selector: 'app-architecture-slide',
  standalone: true,
  templateUrl: './architecture-slide.html',
  styleUrl: './architecture-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureSlide {
  readonly capas = CAPAS;
  readonly aristas = ARISTAS;
  readonly leyenda = LEYENDA_ARISTAS;
  readonly puertosNodo = PUERTOS_NODO;
  readonly ranuras = RANURAS;
  readonly recorridos = RECORRIDOS;
  readonly matriz = MATRIZ;
  readonly reglas = REGLAS;
  readonly dondeTocar = DONDE_TOCAR;

  readonly vista = signal<Vista>('mapa');
  readonly capaActiva = signal<CapaId>('aplicacion');
  readonly ranuraActiva = signal<RanuraId>('puerto');
  readonly recorridoActivo = signal<string>('aulas');
  readonly pasoActivo = signal<number>(1);
  readonly filaActiva = signal<number>(-1);

  readonly capa = computed<Capa>(() => CAPAS_POR_ID[this.capaActiva()]);
  readonly ranura = computed(() => RANURAS_POR_ID[this.ranuraActiva()]);

  readonly recorrido = computed<Recorrido>(
    () => this.recorridos.find((r) => r.id === this.recorridoActivo()) ?? this.recorridos[0],
  );

  readonly paso = computed(() => {
    const pasos = this.recorrido().pasos;
    return pasos.find((p) => p.n === this.pasoActivo()) ?? pasos[0];
  });

  /** Geometría del diagrama de secuencia del recorrido elegido. */
  readonly geo = computed<GeoSecuencia>(() => {
    const r = this.recorrido();
    const usados = new Set<RanuraId>();
    for (const p of r.pasos) {
      usados.add(p.de);
      usados.add(p.a);
    }

    const carriles: Carril[] = this.ranuras.map((ranura) => ({
      id: ranura.id,
      x: ranura.x,
      titulo: ranura.titulo,
      proyecto: ranura.corta ?? CAPAS_POR_ID[ranura.capa].proyecto.replace('Horarios.', ''),
      color: CAPAS_POR_ID[ranura.capa].color,
      usado: usados.has(ranura.id),
    }));

    const x = (id: RanuraId) => RANURAS_POR_ID[id].x;
    let corte: number | null = null;

    const flechas: Flecha[] = r.pasos.map((p, i) => {
      const y = PRIMERA + i * SALTO;
      if (p.fondo && corte === null) corte = y - SALTO / 2 - 4;
      const x1 = x(p.de);
      const x2 = x(p.a);
      const propia = p.de === p.a;
      return {
        n: p.n,
        y,
        x1,
        x2,
        propia,
        mx: propia ? x1 + 58 : (x1 + x2) / 2,
        ancho: p.etiqueta.length * 5.4 + 14,
        etiqueta: p.etiqueta,
        vuelta: p.vuelta === true,
        fondo: p.fondo === true,
        color: r.color,
      };
    });

    return {
      alto: PRIMERA + r.pasos.length * SALTO + 8,
      carriles,
      flechas,
      corte,
    };
  });

  capaPorId(id: CapaId): Capa {
    return CAPAS_POR_ID[id];
  }

  /** «Horarios.Aplicacion» → «Aplicacion»: en las cajas del diagrama no cabe el prefijo. */
  nombreCorto(id: CapaId): string {
    return CAPAS_POR_ID[id].proyecto.replace('Horarios.', '');
  }

  /** Una arista se atenúa cuando hay una capa elegida y la arista no la toca. */
  aristaViva(a: Arista): boolean {
    const id = this.capaActiva();
    return a.de === id || a.a === id || (id === 'aplicacion' && a.a === 'puertos');
  }

  verVista(v: Vista): void {
    this.vista.set(v);
  }

  verCapa(id: CapaId): void {
    this.capaActiva.set(id);
  }

  verRanura(id: RanuraId): void {
    this.ranuraActiva.set(id);
  }

  verFila(i: number): void {
    this.filaActiva.set(this.filaActiva() === i ? -1 : i);
  }

  verRecorrido(id: string): void {
    this.recorridoActivo.set(id);
    this.pasoActivo.set(1);
  }

  verPaso(n: number): void {
    if (n >= 1 && n <= this.recorrido().pasos.length) this.pasoActivo.set(n);
  }

  /** Índice del recorrido, para leer la columna que le toca en la matriz. */
  indiceRecorrido(id: string): number {
    return this.recorridos.findIndex((r) => r.id === id);
  }

  /**
   * Flechas para recorrer el ejemplo paso a paso. La navegación entre slides usa
   * PageUp/PageDown, así que aquí no hay choque.
   */
  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (this.vista() !== 'recorridos') return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
      this.verPaso(this.pasoActivo() + 1);
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      this.verPaso(this.pasoActivo() - 1);
    else return;
    event.preventDefault();
  }
}
