import { Component, HostListener, signal } from '@angular/core';
import { ArchitectureSlide } from './components/architecture-slide/architecture-slide';
import { ErdSlide } from './components/erd-slide/erd-slide';
import { InterfaceSlide } from './components/interface-slide/interface-slide';
import { RequirementsSlide } from './components/requirements-slide/requirements-slide';

@Component({
  selector: 'app-root',
  imports: [RequirementsSlide, ErdSlide, ArchitectureSlide, InterfaceSlide],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly slides = [
    { n: 1, titulo: 'Requerimientos' },
    { n: 2, titulo: 'Base de datos' },
    { n: 3, titulo: 'Arquitectura' },
    { n: 4, titulo: 'Interfaz' },
  ];

  readonly actual = signal(1);

  ir(n: number): void {
    if (n >= 1 && n <= this.slides.length) this.actual.set(n);
  }

  /**
   * Navegación con PageUp/PageDown y dígitos. Se evitan las flechas porque
   * la slide del esquema las necesita para desplazar el lienzo.
   */
  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if ((event.target as HTMLElement)?.tagName === 'INPUT') return;
    if (event.key === 'PageDown') this.ir(this.actual() + 1);
    else if (event.key === 'PageUp') this.ir(this.actual() - 1);
    else if (/^[1-9]$/.test(event.key)) this.ir(Number(event.key));
    else return;
    event.preventDefault();
  }
}
