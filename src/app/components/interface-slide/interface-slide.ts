import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';
import {
  CAPAS_CSS,
  CAPTURAS,
  Captura,
  DECISIONES,
  METRICAS,
  PALETA,
} from '../../data/interface-data';

type Vista = 'pantallas' | 'sistema' | 'decisiones';

@Component({
  selector: 'app-interface-slide',
  standalone: true,
  templateUrl: './interface-slide.html',
  styleUrl: './interface-slide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterfaceSlide {
  readonly capturas = CAPTURAS;
  readonly capas = CAPAS_CSS;
  readonly paleta = PALETA;
  readonly decisiones = DECISIONES;
  readonly metricas = METRICAS;

  readonly vista = signal<Vista>('pantallas');
  readonly indice = signal(0);

  /** El visor a pantalla completa se abre a propósito: la demo en vivo va después. */
  readonly ampliada = signal(false);

  readonly captura = computed<Captura>(() => this.capturas[this.indice()]);

  verVista(v: Vista): void {
    this.vista.set(v);
    this.ampliada.set(false);
  }

  ver(i: number): void {
    if (i >= 0 && i < this.capturas.length) this.indice.set(i);
  }

  ampliar(): void {
    this.ampliada.set(true);
  }

  cerrar(): void {
    this.ampliada.set(false);
  }

  /**
   * Flechas para recorrer las capturas y Escape para cerrar el visor ampliado.
   * La navegación entre slides usa PageUp/PageDown, así que no hay choque.
   */
  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.ampliada()) {
      this.cerrar();
      event.preventDefault();
      return;
    }
    if (this.vista() !== 'pantallas') return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') this.ver(this.indice() + 1);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') this.ver(this.indice() - 1);
    else return;
    event.preventDefault();
  }
}
