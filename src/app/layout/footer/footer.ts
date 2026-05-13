import { Component } from '@angular/core';
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_URL,
  PHONE_DISPLAY,
} from '../../core/constants/contact.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly instagramHandle = INSTAGRAM_HANDLE;
  readonly instagramUrl = INSTAGRAM_URL;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly phone = PHONE_DISPLAY;
}
