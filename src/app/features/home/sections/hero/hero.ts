import { Component } from '@angular/core';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { WHATSAPP_URL } from '../../../../core/constants/contact.constants';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [WhatsappButtonComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  readonly whatsappUrl = WHATSAPP_URL;
}
