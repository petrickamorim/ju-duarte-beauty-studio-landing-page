import { Component } from '@angular/core';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { WHATSAPP_URL } from '../../../../core/constants/contact.constants';

@Component({
  selector: 'app-cta-final',
  standalone: true,
  imports: [WhatsappButtonComponent],
  templateUrl: './cta-final.html',
  styleUrl: './cta-final.scss',
})
export class CtaFinalComponent {
  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappMessage =
    `${WHATSAPP_URL}?text=Ol%C3%A1%2C%20vi%20o%20site%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio!`;
}
