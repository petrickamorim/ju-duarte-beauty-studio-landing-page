import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Domínio de produção — base das URLs canônicas e do Open Graph */
export const SITE_URL = 'https://juduartebeautystudio.com';

export interface DadosPagina {
  readonly titulo: string;
  readonly descricao: string;
  /** Caminho da página, ex.: '/' ou '/servicos/noivas' */
  readonly caminho: string;
}

/**
 * Atualiza título, descrição, canonical e Open Graph/Twitter de cada página.
 * Os valores padrão (home) vêm do próprio index.html, que segue sendo a fonte única.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /** Valores originais do index.html, guardados para restaurar na home */
  private readonly padrao = {
    titulo: this.title.getTitle(),
    descricao: this.meta.getTag('name="description"')?.content ?? '',
    ogTitulo: this.meta.getTag('property="og:title"')?.content ?? '',
    ogDescricao: this.meta.getTag('property="og:description"')?.content ?? '',
  };

  /** Página inicial: restaura os textos originais e aponta a URL para a raiz */
  definirHome(): void {
    this.title.setTitle(this.padrao.titulo);
    this.meta.updateTag({ name: 'description', content: this.padrao.descricao });
    this.meta.updateTag({ property: 'og:title', content: this.padrao.ogTitulo });
    this.meta.updateTag({ property: 'og:description', content: this.padrao.ogDescricao });
    this.meta.updateTag({ name: 'twitter:title', content: this.padrao.ogTitulo });
    this.meta.updateTag({ name: 'twitter:description', content: this.padrao.ogDescricao });
    this.definirUrl('/');
  }

  definirPagina({ titulo, descricao, caminho }: DadosPagina): void {
    this.title.setTitle(titulo);
    this.meta.updateTag({ name: 'description', content: descricao });
    this.meta.updateTag({ property: 'og:title', content: titulo });
    this.meta.updateTag({ property: 'og:description', content: descricao });
    this.meta.updateTag({ name: 'twitter:title', content: titulo });
    this.meta.updateTag({ name: 'twitter:description', content: descricao });
    this.definirUrl(caminho);
  }

  /** Canonical + og:url sempre iguais e absolutos, sem query string nem âncora */
  private definirUrl(caminho: string): void {
    const limpo = caminho.split(/[?#]/)[0];
    const url = SITE_URL + (limpo.startsWith('/') ? limpo : `/${limpo}`);

    this.meta.updateTag({ property: 'og:url', content: url });

    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
}
