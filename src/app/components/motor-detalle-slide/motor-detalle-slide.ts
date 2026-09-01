import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  BandaDetalle,
  CAPAS_DETALLE,
  DetalleMotor,
  FRONTERAS_DETALLE,
  HILOS_DETALLE,
  MOMENTOS_REGLA,
  ORIGENES_FALLO,
  PasoDetalle,
  Peticion,
  ReglaDetalle,
  FalloDetalle,
} from '../../data/motor-detalle-data';

/**
 * Sub-slide de la slide 5. Las cinco comparten componente porque comparten forma: un mapa
 * de pasos por capa y por hilo, y debajo lo que el mapa no cabe —qué se pide a quién, qué
 * regla lo decide, qué estructura lo recuerda, y qué le pasa a un dato suelto frente al
 * lote entero—. Nada se esconde detrás de una interacción: todo está en la misma página.
 */
@Component({
  selector: 'app-motor-detalle-slide',
  standalone: true,
  templateUrl: './motor-detalle-slide.html',
  styleUrl: './motor-detalle-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotorDetalleSlide {
  readonly detalle = input.required<DetalleMotor>();

  readonly capas = CAPAS_DETALLE;
  readonly hilos = HILOS_DETALLE;

  /**
   * El mapa se dibuja por bandas y no paso a paso, porque cada banda es un tramo de tiempo
   * entero: lo que la separa de la siguiente es quién la dispara y cuándo termina, y eso
   * hay que poder leerlo sobre todas sus filas de golpe.
   */
  readonly grupos = computed<{ banda: BandaDetalle; pasos: PasoDetalle[] }[]>(() =>
    this.detalle().bandas.map((banda) => ({
      banda,
      pasos: this.detalle().pasos.filter((p) => p.banda === banda.id),
    })),
  );

  /** Los pasos que dejan una advertencia de lectura, para la lista del pie del mapa. */
  readonly pasosConNota = computed(() => this.detalle().pasos.filter((p) => p.siFalla));

  /** En qué carril se dibuja el paso. El zigzag de las cajas es el paso de una capa a otra. */
  columnaDe(p: PasoDetalle): number {
    return this.capas.findIndex((c) => c.id === p.capa) + 1;
  }

  bandaDe(p: PasoDetalle): BandaDetalle {
    return this.detalle().bandas.find((b) => b.id === p.banda) ?? this.detalle().bandas[0];
  }

  hiloDe(p: PasoDetalle): string {
    return this.bandaDe(p).hilo;
  }

  colorDeBanda(id: string): string {
    return this.detalle().bandas.find((b) => b.id === id)?.color ?? '#6b6153';
  }

  nombreFrontera(p: Peticion): string {
    return FRONTERAS_DETALLE[p.frontera];
  }

  nombreMomento(r: ReglaDetalle): string {
    return MOMENTOS_REGLA[r.momento];
  }

  nombreOrigen(f: FalloDetalle): string {
    return ORIGENES_FALLO[f.origen];
  }

  /**
   * El puente entre dos pasos seguidos: las líneas de rejilla que la barra tiene que cruzar.
   * Cuando los dos están en la misma capa la barra es corta; cuando no, se ve exactamente
   * qué frontera cruza la información. La columna 1 es el carril de hilos.
   */
  puente(anterior: PasoDetalle, actual: PasoDetalle): { inicio: number; fin: number } {
    const a = this.columnaDe(anterior);
    const b = this.columnaDe(actual);
    return { inicio: Math.min(a, b) + 1, fin: Math.max(a, b) + 2 };
  }
}
