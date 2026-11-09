import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Ícones de traço fino (estilo outline) usados no lugar de emojis.
 * Cada ícone é uma lista de elementos SVG desenhados num viewBox 24×24.
 */
type Forma =
  | { readonly tipo: 'path'; readonly d: string }
  | { readonly tipo: 'circle'; readonly cx: number; readonly cy: number; readonly r: number }
  | {
      readonly tipo: 'rect';
      readonly x: number;
      readonly y: number;
      readonly w: number;
      readonly h: number;
      readonly rx: number;
    };

const p = (d: string): Forma => ({ tipo: 'path', d });
const c = (cx: number, cy: number, r: number): Forma => ({ tipo: 'circle', cx, cy, r });
const r = (x: number, y: number, w: number, h: number, rx: number): Forma => ({
  tipo: 'rect',
  x,
  y,
  w,
  h,
  rx,
});

const ICONES = {
  // Anel de noivado com brilho
  noiva: [
    c(12, 15, 6),
    p('M9.5 5.5 12 9l2.5-3.5L13.3 4h-2.6z'),
    p('M9.5 5.5h5'),
    p('M19 3v2.5M17.75 4.25h2.5'),
  ],
  // Batom
  maquiagem: [r(7.5, 13, 9, 8, 1.5), p('M8.75 13v-2.5h6.5V13'), p('M9.75 10.5V6l4.5-2.5v7')],
  // Secador
  penteado: [p('M14.5 6.5H20v5h-5.5'), c(9.5, 9, 5.5), c(9.5, 9, 1.75), p('M8 14.3 7 21h3.5l1-6.3')],
  // Esmalte
  unhas: [
    r(9.75, 2.5, 4.5, 5.5, 1),
    p('M7 12.5a3.5 3.5 0 0 1 3.5-3.5h3a3.5 3.5 0 0 1 3.5 3.5v6a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 7 18.5z'),
    p('M9 9h6'),
    p('M10 12.5v4'),
  ],
  casa: [p('M3 10.5 12 3l9 7.5V21H3z'), p('M9 21v-6h6v6')],
  cartao: [r(3, 6, 18, 13, 2), p('M3 10h18')],
  relogio: [c(12, 12, 9), p('M12 7v5l3 2')],
  coracao: [p('M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z')],
  brilho: [
    p('M12 3v4M12 17v4M3 12h4M17 12h4'),
    p('m6.3 6.3 2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1'),
  ],
  selo: [c(12, 9, 6), p('m8.5 13.5-1.5 7.5 5-3 5 3-1.5-7.5')],
  camera: [p('M4 8h3l2-3h6l2 3h3v11H4z'), c(12, 13, 3.5)],
  pin: [p('M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z'), c(12, 9, 2.5)],
  telefone: [
    p('M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'),
  ],
  instagram: [r(3, 3, 18, 18, 5), c(12, 12, 4), c(17.5, 6.5, 0.5)],
} as const satisfies Record<string, readonly Forma[]>;

export type IconeNome = keyof typeof ICONES;

@Component({
  selector: 'app-icone',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.width]="tamanho()"
      [attr.height]="tamanho()"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="traco()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (forma of formas(); track $index) {
        @switch (forma.tipo) {
          @case ('path') {
            <path [attr.d]="forma.d" />
          }
          @case ('circle') {
            <circle [attr.cx]="forma.cx" [attr.cy]="forma.cy" [attr.r]="forma.r" />
          }
          @case ('rect') {
            <rect
              [attr.x]="forma.x"
              [attr.y]="forma.y"
              [attr.width]="forma.w"
              [attr.height]="forma.h"
              [attr.rx]="forma.rx"
            />
          }
        }
      }
    </svg>
  `,
  styleUrl: './icone.scss',
})
export class IconeComponent {
  readonly nome = input.required<IconeNome>();
  readonly tamanho = input<number>(24);
  readonly traco = input<number>(1.5);

  protected readonly formas = computed<readonly Forma[]>(() => ICONES[this.nome()]);
}
