import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div
      class="section-header"
      [class.section-header--centered]="centered()"
      [class.section-header--refinado]="refinado()"
    >
      @if (eyebrow()) {
        <p class="section-header__eyebrow">{{ eyebrow() }}</p>
      }
      <h2 class="section-header__title">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="section-header__subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styleUrl: './section-header.scss',
})
export class SectionHeaderComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input<string>('');
  readonly subtitle = input<string>('');
  readonly centered = input<boolean>(true);
  /** Visual do redesign: título mais leve, eyebrow com linha, sem margem inferior */
  readonly refinado = input<boolean>(false);
}
