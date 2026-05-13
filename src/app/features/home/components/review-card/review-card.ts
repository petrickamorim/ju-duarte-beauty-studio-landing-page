import { Component, input } from '@angular/core';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-review-card',
  standalone: true,
  template: `
    <article class="review-card">
      <div class="review-card__stars" aria-label="Avaliação 5 estrelas" role="img">
        @for (star of stars; track $index) {
          <span aria-hidden="true">★</span>
        }
      </div>
      <blockquote class="review-card__text">
        <p>"{{ review().text }}"</p>
      </blockquote>
      <footer class="review-card__author">
        <strong>{{ review().author }}</strong>
        @if (review().role) {
          <span class="review-card__role">{{ review().role }}</span>
        }
      </footer>
    </article>
  `,
  styleUrl: './review-card.scss',
})
export class ReviewCardComponent {
  readonly review = input.required<Review>();
  readonly stars = Array(5);
}
