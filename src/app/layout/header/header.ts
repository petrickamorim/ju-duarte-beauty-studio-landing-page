import { Component, HostListener, inject, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WHATSAPP_URL } from '../../core/constants/contact.constants';
import { RolarParaDirective } from '../../shared/directives/rolar-para';

interface LinkSecao {
  readonly rotulo: string;
  readonly ancora: string;
}

/** Altura do cabeçalho fixo — usada para compensar a rolagem até as âncoras */
const ALTURA_HEADER = 72;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RolarParaDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private readonly scroller = inject(ViewportScroller);

  readonly whatsappUrl = WHATSAPP_URL;
  readonly menuAberto = signal(false);

  readonly links: readonly LinkSecao[] = [
    { rotulo: 'Serviços', ancora: 'servicos' },
    { rotulo: 'Portfólio', ancora: 'portfolio' },
    { rotulo: 'Avaliações', ancora: 'avaliacoes' },
    { rotulo: 'Diferenciais', ancora: 'diferenciais' },
    { rotulo: 'Dúvidas', ancora: 'faq' },
    { rotulo: 'Contato', ancora: 'contato' },
  ];

  constructor() {
    // Evita que o cabeçalho fixo cubra o título da seção ao navegar por âncora
    this.scroller.setOffset([0, ALTURA_HEADER]);
  }

  alternarMenu(): void {
    this.menuAberto.update((aberto) => !aberto);
  }

  fecharMenu(): void {
    this.menuAberto.set(false);
  }

  /** Logo: volta ao topo (inclusive quando já está na página inicial) */
  irParaTopo(): void {
    this.fecharMenu();
    this.scroller.scrollToPosition([0, 0]);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.fecharMenu();
  }
}
