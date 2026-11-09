import { Component } from '@angular/core';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import { IconeComponent } from '../../../../shared/components/icone/icone';
import { ADDRESS, MAPS_URL, WHATSAPP_URL } from '../../../../core/constants/contact.constants';

@Component({
  selector: 'app-cta-final',
  standalone: true,
  imports: [WhatsappButtonComponent, IconeComponent],
  templateUrl: './cta-final.html',
  styleUrl: './cta-final.scss',
})
export class CtaFinalComponent {
  readonly endereco = ADDRESS;
  readonly mapsUrl = MAPS_URL;
  readonly whatsappMessage = `${WHATSAPP_URL}?text=Ol%C3%A1%2C%20vi%20o%20site%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio!`;
}
