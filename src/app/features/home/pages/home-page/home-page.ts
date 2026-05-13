import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero';
import { ReviewsComponent } from '../../sections/reviews/reviews';
import { GaleriaComponent } from '../../sections/galeria/galeria';
import { ServicesComponent } from '../../sections/services/services';
import { AntesDepoisComponent } from '../../sections/antes-depois/antes-depois';
import { DifferentiatorsComponent } from '../../sections/differentiators/differentiators';
import { InstagramComponent } from '../../sections/instagram/instagram';
import { PerguntasFrequentesComponent } from '../../sections/perguntas-frequentes/perguntas-frequentes';
import { CtaFinalComponent } from '../../sections/cta-final/cta-final';
import { ContactComponent } from '../../sections/contact/contact';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    ReviewsComponent,
    GaleriaComponent,
    ServicesComponent,
    AntesDepoisComponent,
    DifferentiatorsComponent,
    InstagramComponent,
    PerguntasFrequentesComponent,
    CtaFinalComponent,
    ContactComponent,
  ],
  template: `
    <main id="main-content">
      <app-hero />
      <app-reviews />
      <app-galeria />
      <app-services />
      <app-antes-depois />
      <app-differentiators />
      <app-instagram />
      <app-perguntas-frequentes />
      <app-cta-final />
      <app-contact />
    </main>
  `,
})
export class HomePageComponent {}
