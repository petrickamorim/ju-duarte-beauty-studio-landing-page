import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceItem } from '../../models/service.model';
import { IconeComponent } from '../../../../shared/components/icone/icone';

/** Serviços com página própria (orçamento) — só eles exibem "Ver detalhes" */
const SLUGS_COM_DETALHES: readonly string[] = ['noivas'];

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink, IconeComponent],
  template: `
    <!-- 5 faixas alinhadas entre os cards (subgrid): topo, título, descrição, lista, link -->
    <article class="service-card">
      <div class="service-card__topo">
        <span class="service-card__icone-wrap">
          <app-icone [nome]="service().icon" [tamanho]="26" [traco]="1.25" />
        </span>
        <span class="service-card__numero" aria-hidden="true">{{ numero() }}</span>
      </div>
      <h3 class="service-card__title">{{ service().name }}</h3>
      <p class="service-card__description">{{ service().description }}</p>
      <div class="service-card__inclui">
        @if (service().highlights.length > 0) {
          <p class="service-card__inclui-rotulo" [id]="'inclui-' + service().slug">Inclui</p>
          <ul class="service-card__list" [attr.aria-labelledby]="'inclui-' + service().slug">
            @for (highlight of service().highlights; track highlight) {
              <li class="service-card__list-item">{{ highlight }}</li>
            }
          </ul>
        }
      </div>
      @if (temDetalhes()) {
        <a
          class="service-card__cta"
          [routerLink]="['/servicos', service().slug]"
          [attr.aria-label]="'Ver detalhes e orçamento de ' + service().name"
        >
          Ver detalhes <span aria-hidden="true">→</span>
        </a>
      }
    </article>
  `,
  styleUrl: './service-card.scss',
})
export class ServiceCardComponent {
  readonly service = input.required<ServiceItem>();
  /** Posição na lista (1, 2, 3…) exibida como "01", "02"… */
  readonly posicao = input<number>(1);

  readonly numero = computed(() => String(this.posicao()).padStart(2, '0'));
  readonly temDetalhes = computed(() => SLUGS_COM_DETALHES.includes(this.service().slug));
}
