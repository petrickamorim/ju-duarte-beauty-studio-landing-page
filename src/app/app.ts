import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer';
import { WhatsappFloatingComponent } from './layout/whatsapp-floating/whatsapp-floating';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, WhatsappFloatingComponent],
  template: `
    <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
    <router-outlet />
    <app-footer />
    <app-whatsapp-floating />
  `,
  styleUrl: './app.scss',
})
export class App {}
