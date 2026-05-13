import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ReviewCardComponent } from '../../components/review-card/review-card';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { AVALIACOES } from '../../../../core/dados/avaliacoes.dados';

const POR_PAGINA = 8;
const DURACAO_MS = 25_000;
const FADE_MS = 350;

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReviewCardComponent, SectionHeaderComponent],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class ReviewsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly todas = AVALIACOES;
  private readonly totalPaginas = Math.ceil(this.todas.length / POR_PAGINA);

  readonly paginaAtual = signal(0);
  readonly saindo = signal(false);

  readonly visiveis = computed(() => {
    const inicio = this.paginaAtual() * POR_PAGINA;
    return this.todas.slice(inicio, inicio + POR_PAGINA);
  });

  readonly totalAvaliacoes = this.todas.length;

  ngOnInit(): void {
    const intervalo = setInterval(() => this.#avancar(), DURACAO_MS);
    this.destroyRef.onDestroy(() => clearInterval(intervalo));
  }

  #avancar(): void {
    this.saindo.set(true);
    setTimeout(() => {
      this.paginaAtual.update((p) => (p + 1) % this.totalPaginas);
      this.saindo.set(false);
    }, FADE_MS);
  }

  irParaPagina(indice: number): void {
    if (indice === this.paginaAtual()) return;
    this.saindo.set(true);
    setTimeout(() => {
      this.paginaAtual.set(indice);
      this.saindo.set(false);
    }, FADE_MS);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i);
  }
}
