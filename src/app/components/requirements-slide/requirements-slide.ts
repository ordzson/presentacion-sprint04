import { Component, computed, signal } from '@angular/core';
import {
  CATEGORY_META,
  RequirementCategory,
  seccionesPorCategoria,
} from '../../data/requirements-data';
import { RequirementCard } from '../requirement-card/requirement-card';

@Component({
  selector: 'app-requirements-slide',
  standalone: true,
  imports: [RequirementCard],
  templateUrl: './requirements-slide.html',
  styleUrl: './requirements-slide.css',
})
export class RequirementsSlide {
  readonly categorias: RequirementCategory[] = ['RF', 'RN', 'RNF', 'CA'];
  readonly meta = CATEGORY_META;

  activa = signal<RequirementCategory>('RF');
  expandidoId = signal<string | null>(null);
  headerOculto = signal(false);

  secciones = computed(() => seccionesPorCategoria(this.activa()));

  seleccionar(categoria: RequirementCategory): void {
    this.activa.set(categoria);
    this.expandidoId.set(null);
  }

  onScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const scrollTop = el.scrollTop;

    if (scrollTop <= 4) {
      this.headerOculto.set(false);
    } else {
      this.headerOculto.set(true);
    }
  }

  onToggle(id: string): void {
    this.expandidoId.update((actual) => (actual === id ? null : id));
  }
}
