import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button';
import {
  ADDRESS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../../../../core/constants/contact.constants';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionHeaderComponent, WhatsappButtonComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  readonly address = ADDRESS;
  readonly phone = PHONE_DISPLAY;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly instagramUrl = INSTAGRAM_URL;
  readonly instagramHandle = INSTAGRAM_HANDLE;
  readonly mapsUrl = MAPS_URL;

  readonly hours = [
    { days: 'Terça a Sexta', time: '09:00 às 20:00' },
    { days: 'Sábado', time: '08:00 às 19:00' },
    { days: 'Segunda e Domingo', time: 'Sob consulta' },
  ] as const;
}
