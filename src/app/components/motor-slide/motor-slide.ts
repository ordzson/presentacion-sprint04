import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  afterRenderEffect,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  CADENA,
  COHORTES_GRILLA,
  DIAGNOSTICOS,
  ENTRADA,
  HERRAMIENTAS,
  HORAS_GRILLA,
  PASOS,
  PERIODOS_GRILLA,
  PIEZAS_POR_ID,
  Pieza,
  PiezaId,
  REGLAS_BLANDAS,
  REGLAS_DURAS,
} from '../../data/motor-data';

type Vista = 'cadena' | 'ejemplo' | 'reglas';

@Component({
  selector: 'app-motor-slide',
  standalone: true,
  templateUrl: './motor-slide.html',
  styleUrl: './motor-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MotorSlide {
  readonly cadena = CADENA;
  readonly herramientas = HERRAMIENTAS;
  readonly pasos = PASOS;
  readonly entrada = ENTRADA;
  readonly reglasDuras = REGLAS_DURAS;
  readonly reglasBlandas = REGLAS_BLANDAS;
  readonly diagnosticos = DIAGNOSTICOS;

  readonly cohortesGrilla = COHORTES_GRILLA;
  readonly periodosGrilla = PERIODOS_GRILLA;
  readonly horasGrilla = HORAS_GRILLA;

  /** Lo que viaja por cada flecha de la cadena, en el mismo orden que las piezas. */
  readonly cargas: Record<PiezaId, string> = {
    expansor: 'SesionRequeridaMotor[]',
    instantanea: 'InstantaneaMotor',
    motor: 'ResultadoMotor',
    verificador: 'ResultadoVerificacion',
    catalogo: '',
    reglas: '',
    ocupacion: '',
    evaluador: '',
    costo: '',
  };

  readonly vista = signal<Vista>('cadena');
  readonly piezaActiva = signal<PiezaId>('motor');
  readonly pasoActivo = signal<number>(1);

  readonly pieza = computed<Pieza>(() => PIEZAS_POR_ID[this.piezaActiva()]);
  readonly paso = computed(() => this.pasos.find((p) => p.n === this.pasoActivo()) ?? this.pasos[0]);
  readonly piezaDelPaso = computed<Pieza>(() => PIEZAS_POR_ID[this.paso().pieza]);

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    // La lista de pasos no cabe entera: al avanzar con las flechas el paso activo
    // se quedaría fuera de la parte visible.
    afterRenderEffect({
      write: () => {
        this.pasoActivo();
        this.host.nativeElement
          .querySelector('.paso-item.activo')
          ?.scrollIntoView({ block: 'nearest' });
      },
    });
  }

  piezaPorId(id: PiezaId): Pieza {
    return PIEZAS_POR_ID[id];
  }

  verVista(v: Vista): void {
    this.vista.set(v);
  }

  verPieza(id: PiezaId): void {
    this.piezaActiva.set(id);
  }

  verPaso(n: number): void {
    if (n >= 1 && n <= this.pasos.length) this.pasoActivo.set(n);
  }

  /**
   * Flechas para recorrer el ejemplo. La navegación entre slides usa PageUp/PageDown,
   * así que aquí no hay choque.
   */
  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (this.vista() !== 'ejemplo') return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') this.verPaso(this.pasoActivo() + 1);
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') this.verPaso(this.pasoActivo() - 1);
    else return;
    event.preventDefault();
  }
}
