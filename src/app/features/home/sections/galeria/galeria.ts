import {
  Component,
  DestroyRef,
  HostListener,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { WHATSAPP_URL } from '../../../../core/constants/contact.constants';

type Categoria = 'Todas' | 'Unhas' | 'Maquiagem' | 'Penteados';

interface FotoGaleria {
  readonly src: string;
  readonly categoria: Categoria;
  readonly alt: string;
  readonly largura: number;
  readonly altura: number;
}

const FOTOS: readonly FotoGaleria[] = [
  // Unhas — 4 fotos
  {
    src: '/imagens/galeria/unhas/unha01.jpeg',
    categoria: 'Unhas',
    alt: 'Unhas em gel com acabamento impecável',
    largura: 400,
    altura: 480,
  },
  {
    src: '/imagens/galeria/unhas/unha02.jpeg',
    categoria: 'Unhas',
    alt: 'Esmaltação em gel com design elegante',
    largura: 400,
    altura: 540,
  },
  {
    src: '/imagens/galeria/unhas/unha03.jpeg',
    categoria: 'Unhas',
    alt: 'Alongamento em gel natural e resistente',
    largura: 400,
    altura: 400,
  },
  {
    src: '/imagens/galeria/unhas/unha04.jpeg',
    categoria: 'Unhas',
    alt: 'Blindagem em gel com acabamento sofisticado',
    largura: 400,
    altura: 600,
  },

  // Maquiagem — 4 fotos
  {
    src: '/imagens/galeria/maquiagem/maquiagem01.jpeg',
    categoria: 'Maquiagem',
    alt: 'Maquiagem social elegante para evento',
    largura: 400,
    altura: 520,
  },
  {
    src: '/imagens/galeria/maquiagem/maquiagem02.jpeg',
    categoria: 'Maquiagem',
    alt: 'Make glamourosa com acabamento impecável',
    largura: 400,
    altura: 460,
  },
  {
    src: '/imagens/galeria/maquiagem/maquiagem03.jpeg',
    categoria: 'Maquiagem',
    alt: 'Maquiagem natural iluminada para fotos',
    largura: 400,
    altura: 580,
  },
  {
    src: '/imagens/galeria/maquiagem/maquiagem04.jpeg',
    categoria: 'Maquiagem',
    alt: 'Produção completa de maquiagem profissional',
    largura: 400,
    altura: 420,
  },

  // Penteados — 4 fotos
  {
    src: '/imagens/galeria/penteados/penteado01.jpeg',
    categoria: 'Penteados',
    alt: 'Penteado elaborado para evento especial',
    largura: 400,
    altura: 545,
  },
  {
    src: '/imagens/galeria/penteados/penteado02.jpeg',
    categoria: 'Penteados',
    alt: 'Coque sofisticado com acabamento perfeito',
    largura: 400,
    altura: 440,
  },
  {
    src: '/imagens/galeria/penteados/penteado03.jpeg',
    categoria: 'Penteados',
    alt: 'Penteado elegante para ocasião especial',
    largura: 400,
    altura: 500,
  },
  {
    src: '/imagens/galeria/penteados/penteado04.jpeg',
    categoria: 'Penteados',
    alt: 'Penteado exclusivo com acabamento premium',
    largura: 400,
    altura: 480,
  },
];

interface ItemGaleria {
  readonly foto: FotoGaleria;
  /** Índice da foto na lista filtrada (usado pelo lightbox e pelo toque) */
  readonly indice: number;
}

// Breakpoints espelham $bp-tablet / $bp-desktop do styles.scss
const MQ_TABLET = '(min-width: 768px)';
const MQ_DESKTOP = '(min-width: 1024px)';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [SectionHeaderComponent, WhatsappButtonComponent],
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class GaleriaComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappMessage = encodeURIComponent('Olá, gostaria de agendar um horário!');
  readonly categorias: readonly Categoria[] = ['Todas', 'Unhas', 'Maquiagem', 'Penteados'];
  readonly categoriaAtiva = signal<Categoria>('Todas');

  readonly fotosFiltradas = computed<readonly FotoGaleria[]>(() => {
    const ativa = this.categoriaAtiva();
    return ativa === 'Todas' ? FOTOS : FOTOS.filter((f) => f.categoria === ativa);
  });

  /** Nº de colunas do masonry — 2 mobile, 3 tablet, 4 desktop */
  readonly qtdColunas = signal(2);

  /**
   * Masonry com colunas explícitas (estilo Pinterest): cada foto vai para a
   * coluna mais baixa. Substitui o `columns` do CSS, que no mobile (Safari/iOS)
   * deixava fotos sem pintar (brancas) até receberem um toque.
   */
  readonly colunas = computed<ItemGaleria[][]>(() => {
    const qtd = this.qtdColunas();
    const colunas: ItemGaleria[][] = Array.from({ length: qtd }, () => []);
    const alturas = new Array<number>(qtd).fill(0);

    this.fotosFiltradas().forEach((foto, indice) => {
      const destino = alturas.indexOf(Math.min(...alturas));
      colunas[destino].push({ foto, indice });
      alturas[destino] += foto.altura / foto.largura;
    });

    return colunas;
  });

  readonly lightboxAberto = signal(false);
  readonly fotoAtiva = signal<FotoGaleria | null>(null);
  readonly indiceAtivo = signal(0);
  readonly cardAtivo = signal<number | null>(null);

  private timeoutToque: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    afterNextRender(() => this.#observarBreakpoints());
  }

  #observarBreakpoints(): void {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const tablet = window.matchMedia(MQ_TABLET);
    const desktop = window.matchMedia(MQ_DESKTOP);
    const atualizar = () => this.qtdColunas.set(desktop.matches ? 4 : tablet.matches ? 3 : 2);

    atualizar();
    tablet.addEventListener('change', atualizar);
    desktop.addEventListener('change', atualizar);

    this.destroyRef.onDestroy(() => {
      tablet.removeEventListener('change', atualizar);
      desktop.removeEventListener('change', atualizar);
    });
  }

  selecionarCategoria(categoria: Categoria): void {
    this.categoriaAtiva.set(categoria);
  }

  tocarCard(indice: number): void {
    if (this.timeoutToque) clearTimeout(this.timeoutToque);
    this.cardAtivo.set(indice);
    this.timeoutToque = setTimeout(() => this.cardAtivo.set(null), 1400);
  }

  soltarCard(): void {
    if (this.timeoutToque) clearTimeout(this.timeoutToque);
    this.timeoutToque = setTimeout(() => this.cardAtivo.set(null), 800);
  }

  abrirLightbox(foto: FotoGaleria, indice: number): void {
    this.fotoAtiva.set(foto);
    this.indiceAtivo.set(indice);
    this.lightboxAberto.set(true);
    document.body.style.overflow = 'hidden';
  }

  fecharLightbox(): void {
    this.lightboxAberto.set(false);
    this.fotoAtiva.set(null);
    document.body.style.overflow = '';
  }

  navegarLightbox(direcao: 1 | -1): void {
    const fotos = this.fotosFiltradas();
    const total = fotos.length;
    if (total === 0) return;
    const novoIndice = (this.indiceAtivo() + direcao + total) % total;
    this.indiceAtivo.set(novoIndice);
    this.fotoAtiva.set(fotos[novoIndice]);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightboxAberto()) this.fecharLightbox();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    if (this.lightboxAberto()) this.navegarLightbox(-1);
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    if (this.lightboxAberto()) this.navegarLightbox(1);
  }

  imagemUrl(foto: FotoGaleria): string {
    return foto.src;
  }
}
