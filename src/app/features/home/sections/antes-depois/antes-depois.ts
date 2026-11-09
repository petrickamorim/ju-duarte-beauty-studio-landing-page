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

/**
 * Enquadramento de uma foto dentro do quadro 3:4 (valores em % do quadro,
 * medidos com a foto em `object-fit: cover`, sem zoom).
 * O ponto de foco (x, y) é levado até o `alvo` do item e ampliado por `zoom`,
 * para que o rosto/mão fique na MESMA posição e tamanho no antes e no depois.
 * Regra para não sobrar faixa vazia: zoom ≥ alvo/foco e ≥ (100−alvo)/(100−foco), em x e em y.
 */
interface Enquadramento {
  readonly x: number;
  readonly y: number;
  readonly zoom: number;
}

interface TransformacaoItem {
  readonly titulo: string;
  readonly servico: string;
  readonly imagemAntes: string;
  readonly imagemDepois: string;
  readonly altAntes: string;
  readonly altDepois: string;
  /** Onde o foco das duas fotos deve ficar no quadro (%) */
  readonly alvo: { readonly x: number; readonly y: number };
  readonly enquadramentoAntes: Enquadramento;
  readonly enquadramentoDepois: Enquadramento;
}

const TRANSFORMACOES: readonly TransformacaoItem[] = [
  {
    titulo: 'Maquiagem Social',
    servico: 'Maquiagem Social',
    imagemAntes: '/imagens/antes-depois/ad-maquiagemSocial/antes_maquiagemSocial.jpeg',
    imagemDepois: '/imagens/antes-depois/ad-maquiagemSocial/depois_maquiagemSocial.jpeg',
    altAntes: 'Antes da maquiagem social profissional',
    altDepois: 'Maquiagem social elegante finalizada com perfeição',
    alvo: { x: 55, y: 55 },
    enquadramentoAntes: { x: 51, y: 60, zoom: 1.15 },
    enquadramentoDepois: { x: 59.6, y: 45, zoom: 1.46 },
  },
  {
    titulo: 'Unhas em Gel',
    servico: 'Alongamento em Gel',
    imagemAntes: '/imagens/antes-depois/ad-unha/antes_unha.jpeg',
    imagemDepois: '/imagens/antes-depois/ad-unha/depois_unha.jpeg',
    altAntes: 'Unhas naturais antes do procedimento em gel',
    altDepois: 'Unhas em gel alongadas com acabamento impecável',
    alvo: { x: 48, y: 53 },
    enquadramentoAntes: { x: 48, y: 53, zoom: 1 },
    enquadramentoDepois: { x: 48, y: 53, zoom: 1 },
  },
  {
    titulo: 'Make Completa',
    servico: 'Maquiagem Social',
    imagemAntes: '/imagens/antes-depois/ad-maquiagemSocial02/antes_maquiagemSocial02.jpeg',
    imagemDepois: '/imagens/antes-depois/ad-maquiagemSocial02/depois_maquiagemSocial02.jpeg',
    altAntes: 'Antes da produção completa de maquiagem',
    altDepois: 'Produção completa de maquiagem com resultado impecável',
    alvo: { x: 50, y: 45 },
    enquadramentoAntes: { x: 46, y: 51.4, zoom: 1.58 },
    enquadramentoDepois: { x: 51, y: 47.5, zoom: 1.05 },
  },
];

/** Variáveis CSS consumidas por `.antes-depois__imagem-*` no SCSS */
function estiloEnquadramento(
  e: Enquadramento,
  alvo: TransformacaoItem['alvo'],
): Record<string, string> {
  return {
    '--foco-x': `${e.x}%`,
    '--foco-y': `${e.y}%`,
    '--alvo-x': `${alvo.x}%`,
    '--alvo-y': `${alvo.y}%`,
    '--zoom': `${e.zoom}`,
  };
}

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

  imagemUrl(path: string): string {
    return path;
  }

  readonly estiloEnquadramento = estiloEnquadramento;
}
