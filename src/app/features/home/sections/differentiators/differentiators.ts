import { Component, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { IconeComponent } from '../../../../shared/components/icone/icone';
import { Differentiator } from '../../models/differentiator.model';

@Component({
  selector: 'app-differentiators',
  standalone: true,
  imports: [SectionHeaderComponent, WhatsappButtonComponent, IconeComponent],
  templateUrl: './differentiators.html',
  styleUrl: './differentiators.scss',
})
export class DifferentiatorsComponent {
  readonly items = signal<Differentiator[]>([
    { icon: 'brilho', text: 'Atendimento personalizado para cada cliente' },
    { icon: 'selo', text: 'Produção com acabamento profissional' },
    { icon: 'cartao', text: 'Parcelamento em até 3x sem juros' },
    { icon: 'casa', text: 'Atendimento em studio e a domicílio' },
    { icon: 'camera', text: 'Produção ideal para fotos e eventos' },
    { icon: 'relogio', text: 'Pontualidade e respeito ao seu tempo' },
  ]);
}
