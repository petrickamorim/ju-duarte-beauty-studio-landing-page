import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
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
  { src: '/imagens/galeria/unhas/unha01.jpeg', categoria: 'Unhas', alt: 'Unhas em gel com acabamento impecável', largura: 400, altura: 480 },
  { src: '/imagens/galeria/unhas/unha02.jpeg', categoria: 'Unhas', alt: 'Esmaltação em gel com design elegante', largura: 400, altura: 540 },
  { src: '/imagens/galeria/unhas/unha03.jpeg', categoria: 'Unhas', alt: 'Alongamento em gel natural e resistente', largura: 400, altura: 400 },
  { src: '/imagens/galeria/unhas/unha04.jpeg', categoria: 'Unhas', alt: 'Blindagem em gel com acabamento sofisticado', largura: 400, altura: 600 },

  // Maquiagem — 4 fotos
  { src: '/imagens/galeria/maquiagem/maquiagem01.jpeg', categoria: 'Maquiagem', alt: 'Maquiagem social elegante para evento', largura: 400, altura: 520 },
  { src: '/imagens/galeria/maquiagem/maquiagem02.jpeg', categoria: 'Maquiagem', alt: 'Make glamourosa com acabamento impecável', largura: 400, altura: 460 },
  { src: '/imagens/galeria/maquiagem/maquiagem03.jpeg', categoria: 'Maquiagem', alt: 'Maquiagem natural iluminada para fotos', largura: 400, altura: 580 },
  { src: '/imagens/galeria/maquiagem/maquiagem04.jpeg', categoria: 'Maquiagem', alt: 'Produção completa de maquiagem profissional', largura: 400, altura: 420 },

  // Penteados — 4 fotos
  { src: '/imagens/galeria/penteados/penteado01.jpeg', categoria: 'Penteados', alt: 'Penteado elaborado para evento especial', largura: 400, altura: 545 },
  { src: '/imagens/galeria/penteados/penteado02.jpeg', categoria: 'Penteados', alt: 'Coque sofisticado com acabamento perfeito', largura: 400, altura: 440 },
  { src: '/imagens/galeria/penteados/penteado03.jpeg', categoria: 'Penteados', alt: 'Penteado elegante para ocasião especial', largura: 400, altura: 500 },
  { src: '/imagens/galeria/penteados/penteado04.jpeg', categoria: 'Penteados', alt: 'Penteado exclusivo com acabamento premium', largura: 400, altura: 480 },
];

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class GaleriaComponent {
  private readonly el = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;

  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappMessage = encodeURIComponent('Olá, gostaria de agendar um horário!');
  readonly categorias: readonly Categoria[] = ['Todas', 'Unhas', 'Maquiagem', 'Penteados'];
  readonly categoriaAtiva = signal<Categoria>('Todas');

  readonly fotosFiltradas = computed<readonly FotoGaleria[]>(() => {
    const ativa = this.categoriaAtiva();
    return ativa === 'Todas' ? FOTOS : FOTOS.filter((f) => f.categoria === ativa);
  });

  readonly lightboxAberto = signal(false);
  readonly fotoAtiva = signal<FotoGaleria | null>(null);
  readonly indiceAtivo = signal(0);
  readonly cardAtivo = signal<number | null>(null);

  private timeoutToque: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    afterNextRender(() => this.#iniciarObserver());

    // Re-observa itens quando o filtro muda (DOM é atualizado após o signal)
    effect(() => {
      this.fotosFiltradas(); // lê para registrar dependência
      setTimeout(() => this.#observarItens(), 50);
    });

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  #iniciarObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('galeria__item--visivel');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    this.#observarItens();
  }

  #observarItens(): void {
    if (!this.observer) return;
    const itens = this.el.nativeElement.querySelectorAll('.galeria__item:not(.galeria__item--visivel)');
    itens.forEach((item) => this.observer!.observe(item));
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
  onEscape(): void { if (this.lightboxAberto()) this.fecharLightbox(); }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void { if (this.lightboxAberto()) this.navegarLightbox(-1); }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void { if (this.lightboxAberto()) this.navegarLightbox(1); }

  imagemUrl(foto: FotoGaleria): string { return foto.src; }
}
