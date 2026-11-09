/**
 * Garante que o site sempre abra no topo da página inicial.
 *
 * Sem isso, uma URL com âncora (ex.: `/#servicos`, que ficava na barra após clicar
 * em "Ver serviços") ou a restauração de rolagem do navegador ao recarregar faziam
 * o site abrir no meio da página.
 *
 * Deve rodar ANTES do bootstrap do Angular (ver main.ts).
 */
export function iniciarNoTopo(): void {
  if (typeof window === 'undefined') return;

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  if (window.location.hash) {
    const { pathname, search } = window.location;
    history.replaceState(history.state, '', pathname + search);
  }

  window.scrollTo(0, 0);
}
