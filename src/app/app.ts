import { Component, HostListener, computed, signal } from '@angular/core';
import { ArchitectureSlide } from './components/architecture-slide/architecture-slide';
import { CatalogoSlide } from './components/catalogo-slide/catalogo-slide';
import { ClasesSlide } from './components/clases-slide/clases-slide';
import { ErdSlide } from './components/erd-slide/erd-slide';
import { InterfaceSlide } from './components/interface-slide/interface-slide';
import { MotorDetalleSlide } from './components/motor-detalle-slide/motor-detalle-slide';
import { MotorSlide } from './components/motor-slide/motor-slide';
import { PreguntasSlide } from './components/preguntas-slide/preguntas-slide';
import { RequirementsSlide } from './components/requirements-slide/requirements-slide';
import { SUBSLIDES_MOTOR } from './data/motor-detalle-data';

/** La primera sub-slide del motor. Las cinco van seguidas a partir de aquí. */
const PRIMERA_SUBSLIDE = 6;

@Component({
  selector: 'app-root',
  imports: [
    RequirementsSlide,
    ErdSlide,
    ClasesSlide,
    ArchitectureSlide,
    MotorSlide,
    MotorDetalleSlide,
    InterfaceSlide,
    CatalogoSlide,
    PreguntasSlide,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /**
   * El deck es plano, pero tiene grupos: las cinco sub-slides del motor pertenecen al
   * grupo 5, igual que la slide del recorrido. El grupo es lo que siguen los dígitos del
   * teclado, para que pulsar 6 siga llevando a «Interfaz» como antes de partirlo.
   */
  readonly slides = [
    { n: 1, grupo: 1, titulo: 'Requerimientos', sub: false },
    { n: 2, grupo: 2, titulo: 'Base de datos', sub: false },
    { n: 3, grupo: 3, titulo: 'Diagrama de clases', sub: false },
    { n: 4, grupo: 4, titulo: 'Arquitectura', sub: false },
    { n: 5, grupo: 5, titulo: 'Motor', sub: false },
    { n: 6, grupo: 5, titulo: '5.1 · Asignación de aulas', sub: true },
    { n: 7, grupo: 5, titulo: '5.2 · Docente duplicado', sub: true },
    { n: 8, grupo: 5, titulo: '5.3 · Aula ocupada', sub: true },
    { n: 9, grupo: 5, titulo: '5.4 · Cruce de horarios', sub: true },
    { n: 10, grupo: 5, titulo: '5.5 · Consulta de horarios', sub: true },
    { n: 11, grupo: 6, titulo: 'Interfaz', sub: false },
    { n: 12, grupo: 7, titulo: 'Script de la base', sub: false },
    { n: 13, grupo: 8, titulo: 'Preguntas y glosario', sub: false },
  ];

  readonly actual = signal(1);

  /** El detalle que toca pintar cuando la slide actual es una de las cinco del motor. */
  readonly detalleActual = computed(() => SUBSLIDES_MOTOR[this.actual() - PRIMERA_SUBSLIDE]);

  ir(n: number): void {
    if (n >= 1 && n <= this.slides.length) this.actual.set(n);
  }

  /** El dígito lleva al grupo, no a la slide: las sub-slides se recorren con las flechas. */
  irAGrupo(grupo: number): void {
    const primera = this.slides.find((s) => s.grupo === grupo);
    if (primera) this.actual.set(primera.n);
  }

  /**
   * Navegación con PageUp/PageDown y dígitos. Se evitan las flechas porque
   * las slides del esquema y del catálogo las necesitan (desplazar el lienzo,
   * recorrer el índice).
   */
  @HostListener('window:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if ((event.target as HTMLElement)?.tagName === 'INPUT') return;
    if (event.key === 'PageDown') this.ir(this.actual() + 1);
    else if (event.key === 'PageUp') this.ir(this.actual() - 1);
    else if (/^[1-9]$/.test(event.key)) this.irAGrupo(Number(event.key));
    else return;
    event.preventDefault();
  }
}
