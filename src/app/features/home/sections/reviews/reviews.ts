import { Component, signal } from '@angular/core';
import { ReviewCardComponent } from '../../components/review-card/review-card';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReviewCardComponent, SectionHeaderComponent],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class ReviewsComponent {
  readonly reviews = signal<Review[]>([
    {
      author: 'Rosangela Simões',
      text: 'A profissional mais dedicada, detalhista e impecável. Não troco por nada!',
      rating: 5,
    },
    {
      author: 'Mariana Ferreira',
      text: 'Profissional maravilhosa, muito cuidadosa e talentosa. Minhas unhas ficaram exatamente como eu queria!',
      rating: 5,
    },
    {
      author: 'Tatiane Campanher',
      text: 'Simplesmente maravilhosa! Trabalho com muito profissionalismo e atenção aos detalhes.',
      rating: 5,
    },
    {
      author: 'Cristina Ravelli',
      text: 'Extremamente caprichosa e muito carinhosa no atendimento. Minhas mãos ficam sempre lindas!',
      rating: 5,
    },
    {
      author: 'Paula Cris',
      text: 'Amei fazer unha e cabelo, trabalham com muito profissionalismo e amor!',
      rating: 5,
    },
    {
      author: 'Caroline Psicóloga',
      text: 'Além de excelente profissional, é uma fofa. Super recomendo!',
      rating: 5,
    },
    {
      author: 'Belinha Vinhas',
      text: 'Maquiagens fantásticas, muito capricho e atenção em cada detalhe.',
      rating: 5,
    },
  ]);
}
