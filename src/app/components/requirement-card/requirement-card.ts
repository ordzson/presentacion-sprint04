import { Component, input, output } from '@angular/core';
import { Requirement } from '../../data/requirements-data';

@Component({
  selector: 'app-requirement-card',
  standalone: true,
  templateUrl: './requirement-card.html',
  styleUrl: './requirement-card.css',
})
export class RequirementCard {
  requirement = input.required<Requirement>();
  expanded = input(false);
  toggle = output<string>();

  onToggle(): void {
    if (!this.requirement().contexto?.length) {
      return;
    }
    this.toggle.emit(this.requirement().id);
  }
}
