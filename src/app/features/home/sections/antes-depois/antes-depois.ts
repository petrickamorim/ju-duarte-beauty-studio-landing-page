import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { WHATSAPP_URL } from '../../../../core/constants/contact.constants';

interface TransformacaoItem {
  readonly titulo: string;
  readonly servico: string;
  readonly seedAntes: string;
  readonly seedDepois: string;
  readonly altAntes: string;
  readonly altDepois: string;
}

const TRANSFORMACOES: readonly TransformacaoItem[] = [
  {
    titulo: 'Maquiagem de Noiva',
    servico: 'Maquiagem + Penteado',
    seedAntes: 'antes-noiva-natural-a',
    seedDepois: 'depois-noiva-glamour-d',
    altAntes: 'Noiva antes da produção profissional',
    altDepois: 'Noiva com maquiagem e penteado prontos para o altar',
  },
  {
    titulo: 'Penteado Elaborado',
    servico: 'Penteado Social',
    seedAntes: 'antes-cabelo-solto-b',
    seedDepois: 'depois-coque-fino-e',
    altAntes: 'Cabelo natural antes do penteado profissional',
    altDepois: 'Penteado sofisticado finalizado com perfeição',
  },
  {
    titulo: 'Unhas em Gel',
    servico: 'Alongamento em Gel',
    seedAntes: 'antes-unhas-curtas-c',
    seedDepois: 'depois-unhas-gel-f',
    altAntes: 'Unhas naturais curtas antes do procedimento',
    altDepois: 'Unhas em gel alongadas com acabamento impecável',
  },
];

@Component({
  selector: 'app-antes-depois',
  standalone: true,
  imports: [SectionHeaderComponent, WhatsappButtonComponent],
  templateUrl: './antes-depois.html',
  styleUrl: './antes-depois.scss',
})
export class AntesDepoisComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly el = inject(ElementRef) as ElementRef<HTMLElement>;

  readonly transformacoes = TRANSFORMACOES;
  readonly whatsappUrl = WHATSAPP_URL;

  // Posição percentual do divisor por índice de card (0-100)
  readonly posicoes = signal<Record<number, number>>({});

  // Índice do card que está sendo arrastado; null = nenhum
  readonly arrastando = signal<number | null>(null);

  private moveHandler: ((e: MouseEvent | TouchEvent) => void) | null = null;
  private upHandler: (() => void) | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.limparListeners());
  }

  getPosicao(indice: number): number {
    return this.posicoes()[indice] ?? 50;
  }

  iniciarDrag(event: MouseEvent | TouchEvent, indice: number): void {
    event.preventDefault();
    this.arrastando.set(indice);

    const container = this.obterContainer(indice);
    if (!container) return;

    const rect = container.getBoundingClientRect();

    this.moveHandler = (e: MouseEvent | TouchEvent) => {
      this.moverDrag(e, indice, rect);
    };

    this.upHandler = () => {
      this.pararDrag();
    };

    document.addEventListener('mousemove', this.moveHandler);
    document.addEventListener('touchmove', this.moveHandler, { passive: false });
    document.addEventListener('mouseup', this.upHandler);
    document.addEventListener('touchend', this.upHandler);
  }

  moverDrag(event: MouseEvent | TouchEvent, indice: number, rect: DOMRect): void {
    if (this.arrastando() !== indice) return;

    let clientX: number;
    if (event instanceof TouchEvent) {
      event.preventDefault();
      clientX = event.touches[0].clientX;
    } else {
      clientX = event.clientX;
    }

    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(95, Math.max(5, raw));

    this.posicoes.update((prev) => ({ ...prev, [indice]: clamped }));
  }

  pararDrag(): void {
    this.arrastando.set(null);
    this.limparListeners();
  }

  private limparListeners(): void {
    if (this.moveHandler) {
      document.removeEventListener('mousemove', this.moveHandler);
      document.removeEventListener('touchmove', this.moveHandler);
      this.moveHandler = null;
    }
    if (this.upHandler) {
      document.removeEventListener('mouseup', this.upHandler);
      document.removeEventListener('touchend', this.upHandler);
      this.upHandler = null;
    }
  }

  private obterContainer(indice: number): Element | null {
    const containers = this.el.nativeElement.querySelectorAll(
      '.antes-depois__slider-container'
    );
    return containers[indice] ?? null;
  }

  imagemUrl(seed: string): string {
    return `https://picsum.photos/seed/${seed}/600/420`;
  }
}
