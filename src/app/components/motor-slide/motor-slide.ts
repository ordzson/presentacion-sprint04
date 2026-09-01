import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AVISOS,
  CONTRATOS,
  Contrato,
  DISPARADORES,
  FRONTERAS,
  Fase,
  HILOS,
  HiloId,
  PARALELO,
  VALIDACIONES,
  BUCLE,
  CADENA,
  CAPAS,
  CAPA_DE_PROYECTO,
  CIFRAS,
  CODIGOS_VERIFICADOR,
  Comprobacion,
  ETAPAS,
  Etapa,
  FASES,
  NIVELES,
  ORDENES,
  PIEZAS,
  TOCA_BASE,
  TRAMOS,
} from '../../data/motor-data';

@Component({
  selector: 'app-motor-slide',
  standalone: true,
  templateUrl: './motor-slide.html',
  styleUrl: './motor-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotorSlide {
  readonly etapas = ETAPAS;
  readonly hilos = HILOS;
  readonly paralelo = PARALELO;
  readonly disparadores = DISPARADORES;
  readonly contratos = CONTRATOS;
  readonly validaciones = VALIDACIONES;
  readonly fases = FASES;
  readonly capas = CAPAS;
  readonly tramos = TRAMOS;
  readonly piezas = PIEZAS;
  readonly cadena = CADENA;
  readonly bucle = BUCLE;
  readonly ordenes = ORDENES;
  readonly avisos = AVISOS;
  readonly codigos = CODIGOS_VERIFICADOR;
  readonly niveles = NIVELES;
  readonly cifras = CIFRAS;

  /**
   * El mapa se dibuja por fases y no etapa a etapa, porque cada fase es un tramo de
   * tiempo entero: dentro del de fondo hay que poder pintar, sobre las diez filas de
   * golpe, lo que el hilo web sigue haciendo mientras tanto.
   */
  readonly grupos: { fase: Fase; etapas: Etapa[] }[] = FASES.map((fase) => ({
    fase,
    etapas: ETAPAS.filter((e) => e.fase === fase.id),
  }));

  /** Las etapas que dejan una advertencia de lectura, para la lista de avisos del mapa. */
  readonly etapasConNota = ETAPAS.filter((e) => e.siFalla || e.noHace);

  /**
   * En qué carril se dibuja la etapa. El mapa tiene una columna por capa, así que
   * el zigzag de las cajas es literalmente el paso de la información de una a otra.
   */
  columnaDe(e: Etapa): number {
    const capa = CAPA_DE_PROYECTO[e.proyecto];
    return this.capas.findIndex((c) => c.id === capa) + 1;
  }

  /** Qué hace esta etapa contra Postgres, si es que hace algo. */
  base(e: Etapa): string {
    return TOCA_BASE[e.id] ?? '';
  }

  /** Los tipos que entran o salen, en una sola línea. */
  tipos(datos: { tipo: string }[]): string {
    return datos.map((d) => d.tipo).join(' + ');
  }

  /** Quién ejecuta la etapa. La lectura la pide otra vez el hilo de la petición. */
  hiloDe(e: Etapa): HiloId {
    return this.faseDe(e).hilo;
  }

  nombreFrontera(c: Contrato): string {
    return FRONTERAS[c.frontera];
  }

  colorDeFase(id: string): string {
    return this.fases.find((f) => f.id === id)?.color ?? '#6b6153';
  }

  faseDe(e: Etapa) {
    return this.fases.find((f) => f.id === e.fase) ?? this.fases[0];
  }

  /**
   * El puente entre dos etapas seguidas: las líneas de rejilla que la barra tiene que
   * cruzar. Cuando las dos están en la misma capa la barra es corta; cuando no, se ve
   * exactamente qué frontera cruza el dato. La columna 1 es el carril de hilos.
   */
  puente(anterior: Etapa, actual: Etapa): { inicio: number; fin: number } {
    const a = this.columnaDe(anterior);
    const b = this.columnaDe(actual);
    return { inicio: Math.min(a, b) + 1, fin: Math.max(a, b) + 2 };
  }

  comprobacionesDe(nivel: Comprobacion['nivel']): Comprobacion[] {
    return this.bucle.filter((c) => c.nivel === nivel);
  }
}
