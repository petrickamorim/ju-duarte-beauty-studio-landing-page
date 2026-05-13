import {
  Component,
  HostListener,
  computed,
  signal,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { WHATSAPP_URL } from '../../../../core/constants/contact.constants';

type Categoria = 'Todas' | 'Unhas' | 'Maquiagem' | 'Penteados' | 'Noivas';

interface FotoGaleria {
  readonly seed: string;
  readonly categoria: Categoria;
  readonly alt: string;
  readonly largura: number;
  readonly altura: number;
}

const FOTOS: readonly FotoGaleria[] = [
  // Unhas — 4 fotos
  { seed: 'unhas-gel-01', categoria: 'Unhas', alt: 'Unhas em gel alongamento com acabamento espelhado', largura: 400, altura: 480 },
  { seed: 'unhas-francesa-02', categoria: 'Unhas', alt: 'Esmaltação em gel francesa clássica', largura: 400, altura: 540 },
  { seed: 'unhas-nailart-03', categoria: 'Unhas', alt: 'Nail art com detalhes florais em gel', largura: 400, altura: 395 },
  { seed: 'unhas-blindagem-04', categoria: 'Unhas', alt: 'Blindagem em gel com glitter rosê', largura: 400, altura: 600 },

  // Maquiagem — 4 fotos
  { seed: 'make-social-05', categoria: 'Maquiagem', alt: 'Maquiagem social elegante para evento noturno', largura: 400, altura: 520 },
  { seed: 'make-glamour-06', categoria: 'Maquiagem', alt: 'Make glamourosa com olho esfumado dourado', largura: 400, altura: 460 },
  { seed: 'make-natural-07', categoria: 'Maquiagem', alt: 'Maquiagem natural iluminada para fotos', largura: 400, altura: 580 },
  { seed: 'make-editorial-08', categoria: 'Maquiagem', alt: 'Produção editorial com lábio vermelho', largura: 400, altura: 410 },

  // Penteados — 4 fotos
  { seed: 'pent-festa-09', categoria: 'Penteados', alt: 'Penteado elaborado com ondas para festa', largura: 400, altura: 545 },
  { seed: 'pent-coque-10', categoria: 'Penteados', alt: 'Coque sofisticado com trança para casamento', largura: 400, altura: 440 },
  { seed: 'pent-tranca-11', categoria: 'Penteados', alt: 'Trança lateral volumosa para madrinha', largura: 400, altura: 500 },
  { seed: 'pent-semi-12', categoria: 'Penteados', alt: 'Semisolto com cachos definidos e acessórios', largura: 400, altura: 380 },

  // Noivas — 4 fotos
  { seed: 'noiva-classica-13', categoria: 'Noivas', alt: 'Produção clássica de noiva com véu longo', largura: 400, altura: 560 },
  { seed: 'noiva-moderna-14', categoria: 'Noivas', alt: 'Look moderno de noiva com make smokey', largura: 400, altura: 490 },
  { seed: 'noiva-rustica-15', categoria: 'Noivas', alt: 'Penteado e make para casamento rústico', largura: 400, altura: 430 },
  { seed: 'noiva-completa-16', categoria: 'Noivas', alt: 'Produção completa noiva: make, penteado e unhas', largura: 400, altura: 600 },
];

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class GaleriaComponent {
  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappMessage = encodeURIComponent('Olá, gostaria de agendar um horário!');

  readonly categorias: readonly Categoria[] = ['Todas', 'Unhas', 'Maquiagem', 'Penteados', 'Noivas'];

  readonly categoriaAtiva = signal<Categoria>('Todas');

  readonly fotosFiltradas = computed<readonly FotoGaleria[]>(() => {
    const ativa = this.categoriaAtiva();
    return ativa === 'Todas' ? FOTOS : FOTOS.filter((f) => f.categoria === ativa);
  });

  // Lightbox state
  readonly lightboxAberto = signal(false);
  readonly fotoAtiva = signal<FotoGaleria | null>(null);
  readonly indiceAtivo = signal(0);

  selecionarCategoria(categoria: Categoria): void {
    this.categoriaAtiva.set(categoria);
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
    if (this.lightboxAberto()) {
      this.fecharLightbox();
    }
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    if (this.lightboxAberto()) {
      this.navegarLightbox(-1);
    }
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    if (this.lightboxAberto()) {
      this.navegarLightbox(1);
    }
  }

  imagemUrl(seed: string, largura: number, altura: number): string {
    return `https://picsum.photos/seed/${seed}/${largura}/${altura}`;
  }

  imagemUrlLightbox(seed: string): string {
    return `https://picsum.photos/seed/${seed}/900/700`;
  }
}
