import { Injectable, signal } from '@angular/core';

export interface PostInstagram {
  readonly id: string;
  readonly media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  readonly media_url: string;
  readonly thumbnail_url?: string;
  readonly permalink: string;
  readonly caption?: string;
  readonly timestamp: string;
}

interface RespostaInstagram {
  data?: PostInstagram[];
  error?: { message: string };
}

interface EntradaCache {
  posts: PostInstagram[];
  expira: number;
}

const CHAVE_CACHE = 'ig_feed_cache';
const TTL_MS = 60 * 60 * 1000; // 1 hora

@Injectable({ providedIn: 'root' })
export class InstagramServico {
  readonly posts = signal<PostInstagram[]>([]);
  readonly carregando = signal(true);
  readonly comErro = signal(false);

  async carregar(): Promise<void> {
    const cache = this.#lerCache();
    if (cache) {
      this.posts.set(cache);
      this.carregando.set(false);
      return;
    }

    try {
      const res = await fetch('/api/instagram');
      const dados = (await res.json()) as RespostaInstagram;

      if (!res.ok || dados.error) throw new Error(dados.error?.message ?? 'Erro desconhecido');

      const posts = (dados.data ?? []).slice(0, 12);
      this.posts.set(posts);
      this.#salvarCache(posts);
    } catch {
      this.comErro.set(true);
    } finally {
      this.carregando.set(false);
    }
  }

  imagemUrl(post: PostInstagram): string {
    return post.media_type === 'VIDEO' && post.thumbnail_url
      ? post.thumbnail_url
      : post.media_url;
  }

  #lerCache(): PostInstagram[] | null {
    try {
      const raw = localStorage.getItem(CHAVE_CACHE);
      if (!raw) return null;
      const entrada = JSON.parse(raw) as EntradaCache;
      if (Date.now() > entrada.expira) return null;
      return entrada.posts;
    } catch {
      return null;
    }
  }

  #salvarCache(posts: PostInstagram[]): void {
    try {
      const entrada: EntradaCache = { posts, expira: Date.now() + TTL_MS };
      localStorage.setItem(CHAVE_CACHE, JSON.stringify(entrada));
    } catch {
      // localStorage pode estar indisponível em SSR ou modo privado
    }
  }
}
