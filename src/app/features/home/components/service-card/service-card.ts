import { Component, input } from '@angular/core';
import { ServiceItem } from '../../models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  template: `
    <article class="service-card">
      <div class="service-card__icon" aria-hidden="true">{{ service().icon }}</div>
      <h3 class="service-card__title">{{ service().name }}</h3>
      <p class="service-card__description">{{ service().description }}</p>
      @if (service().highlights.length > 0) {
        <ul class="service-card__list" aria-label="Destaques do serviço">
          @for (highlight of service().highlights; track highlight) {
            <li class="service-card__list-item">{{ highlight }}</li>
          }
        </ul>
      }
    </article>
  `,
  styleUrl: './service-card.scss',
})
export class ServiceCardComponent {
  readonly service = input.required<ServiceItem>();
}
