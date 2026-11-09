import { Component, computed, input } from '@angular/core';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-review-card',
  standalone: true,
  template: `
    <figure class="review-card">
      <span class="review-card__aspas" aria-hidden="true">“</span>
      <blockquote class="review-card__text">
        <p>{{ review().text }}</p>
      </blockquote>
      <figcaption class="review-card__author">
        <span class="review-card__author-info">
          <strong>{{ review().author }}</strong>
          @if (review().date) {
            <span class="review-card__date">{{ review().date }}</span>
          }
        </span>
        <span class="review-card__stars" role="img" [attr.aria-label]="rotuloNota()">
          {{ estrelas() }}
        </span>
      </figcaption>
    </figure>
  `,
  styleUrl: './review-card.scss',
})
export class ReviewCardComponent {
  readonly review = input.required<Review>();
  readonly estrelas = computed(() => '★'.repeat(this.review().rating));
  readonly rotuloNota = computed(() => `Avaliação ${this.review().rating} de 5 estrelas`);
}
