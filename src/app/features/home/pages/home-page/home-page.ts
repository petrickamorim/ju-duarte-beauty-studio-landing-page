import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero';
import { ServicesComponent } from '../../sections/services/services';
import { ReviewsComponent } from '../../sections/reviews/reviews';
import { DifferentiatorsComponent } from '../../sections/differentiators/differentiators';
import { PerguntasFrequentesComponent } from '../../sections/perguntas-frequentes/perguntas-frequentes';
import { ContactComponent } from '../../sections/contact/contact';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    ReviewsComponent,
    DifferentiatorsComponent,
    PerguntasFrequentesComponent,
    ContactComponent,
  ],
  template: `
    <main id="main-content">
      <app-hero />
      <app-services />
      <app-reviews />
      <app-differentiators />
      <app-perguntas-frequentes />
      <app-contact />
    </main>
  `,
})
export class HomePageComponent {}
