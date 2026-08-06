import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  signal,
} from '@angular/core';
import {
  BENEFICIOS,
  CAPAS,
  CAPAS_POR_ID,
  Capa,
  CapaId,
  FLUJO,
  REGLAS,
} from '../../data/architecture-data';

type Vista = 'capas' | 'flujo' | 'porque';

@Component({
  selector: 'app-architecture-slide',
  standalone: true,
  templateUrl: './architecture-slide.html',
  styleUrl: './architecture-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureSlide {
  readonly capas = CAPAS;
  readonly flujo = FLUJO;
  readonly reglas = REGLAS;
  readonly beneficios = BENEFICIOS;

  /** Capas del diagrama, de arriba hacia abajo. Contratos va aparte: cruza todas. */
  readonly pila: CapaId[] = ['blazor', 'aplicacion', 'scheduler', 'infraestructura', 'datos'];
  readonly contratos = CAPAS_POR_ID['contratos'];
  readonly dominio = CAPAS_POR_ID['dominio'];

  readonly vista = signal<Vista>('capas');
  readonly capaActiva = signal<CapaId>('aplicacion');
  readonly pasoActivo = signal<number>(1);

  readonly capa = computed<Capa>(() => CAPAS_POR_ID[this.capaActiva()]);
  readonly paso = computed(() => this.flujo.find((p) => p.n === this.pasoActivo()) ?? this.flujo[0]);
  readonly capaDelPaso = computed<Capa>(() => CAPAS_POR_ID[this.paso().capa]);

  capaPorId(id: CapaId): Capa {
    return CAPAS_POR_ID[id];
  }

  verVista(v: Vista): void {
    this.vista.set(v);
  }

  verCapa(id: CapaId): void {
    this.capaActiva.set(id);
  }

  verPaso(n: number): void {
    if (n >= 1 && n <= this.flujo.length) this.pasoActivo.set(n);
  }

  /**
   * Flechas para recorrer el ejemplo paso a paso. La navegación entre slides usa
   * PageUp/PageDown, así que aquí no hay choque.
   */
  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (this.vista() !== 'flujo') return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') this.verPaso(this.pasoActivo() + 1);
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') this.verPaso(this.pasoActivo() - 1);
    else return;
    event.preventDefault();
  }
}
