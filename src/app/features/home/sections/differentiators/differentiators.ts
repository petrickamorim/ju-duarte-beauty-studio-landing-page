import { Component, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { Differentiator } from '../../models/differentiator.model';

@Component({
  selector: 'app-differentiators',
  standalone: true,
  imports: [SectionHeaderComponent, WhatsappButtonComponent],
  templateUrl: './differentiators.html',
  styleUrl: './differentiators.scss',
})
export class DifferentiatorsComponent {
  readonly items = signal<Differentiator[]>([
    { icon: '✨', text: 'Atendimento personalizado para cada cliente' },
    { icon: '🏆', text: 'Produção com acabamento profissional' },
    { icon: '💳', text: 'Parcelamento em até 3x sem juros' },
    { icon: '🚗', text: 'Atendimento em studio e a domicílio' },
    { icon: '📸', text: 'Produção ideal para fotos e eventos' },
    { icon: '⏰', text: 'Pontualidade e respeito ao seu tempo' },
  ]);
}
