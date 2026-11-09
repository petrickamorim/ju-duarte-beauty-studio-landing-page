import { Directive, HostBinding, HostListener, inject, input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

/**
 * Link para uma seção da página inicial que rola até ela SEM gravar `#ancora` na URL.
 * Assim, recarregar ou reabrir o site sempre começa no topo.
 *
 * Uso: `<a appRolarPara="servicos">Serviços</a>`
 * O `href` continua existindo (`/#servicos`) para acessibilidade e "abrir em nova aba".
 */
@Directive({
  selector: 'a[appRolarPara]',
  standalone: true,
})
export class RolarParaDirective {
  private readonly router = inject(Router);
  private readonly scroller = inject(ViewportScroller);

  readonly appRolarPara = input.required<string>();

  @HostBinding('attr.href')
  get href(): string {
    return `/#${this.appRolarPara()}`;
  }

  @HostListener('click', ['$event'])
  async onClick(evento: MouseEvent): Promise<void> {
    // Ctrl/Cmd/Shift + clique: deixa o navegador abrir em nova aba/janela normalmente
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0) return;
    evento.preventDefault();

    const naHome = this.router.url.split(/[?#]/)[0] === '/';
    if (!naHome) {
      await this.router.navigateByUrl('/');
      // Aguarda a home (lazy) renderizar antes de procurar a seção
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    this.scroller.scrollToAnchor(this.appRolarPara());
  }
}
