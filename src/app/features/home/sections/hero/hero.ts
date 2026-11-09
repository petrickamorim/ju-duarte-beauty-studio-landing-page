import { Component } from '@angular/core';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { RolarParaDirective } from '../../../../shared/directives/rolar-para';
import { WHATSAPP_URL } from '../../../../core/constants/contact.constants';
import { GOOGLE_NOTA, GOOGLE_TOTAL_AVALIACOES } from '../../../../core/dados/avaliacoes.dados';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [WhatsappButtonComponent, RolarParaDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  readonly whatsappUrl = WHATSAPP_URL;
  readonly googleNota = GOOGLE_NOTA;
  readonly googleTotal = GOOGLE_TOTAL_AVALIACOES;
}
