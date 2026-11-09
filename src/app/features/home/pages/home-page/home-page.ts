import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero';
import { FaixaConfiancaComponent } from '../../sections/faixa-confianca/faixa-confianca';
import { ReviewsComponent } from '../../sections/reviews/reviews';
import { GaleriaComponent } from '../../sections/galeria/galeria';
import { ServicesComponent } from '../../sections/services/services';
import { AntesDepoisComponent } from '../../sections/antes-depois/antes-depois';
import { DifferentiatorsComponent } from '../../sections/differentiators/differentiators';
import { InstagramComponent } from '../../sections/instagram/instagram';
import { PerguntasFrequentesComponent } from '../../sections/perguntas-frequentes/perguntas-frequentes';
import { CtaFinalComponent } from '../../sections/cta-final/cta-final';

// Ordem do Redesign A: Hero → Confiança → Serviços → Portfólio → Avaliações → …
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    FaixaConfiancaComponent,
    ReviewsComponent,
    GaleriaComponent,
    ServicesComponent,
    AntesDepoisComponent,
    DifferentiatorsComponent,
    InstagramComponent,
    PerguntasFrequentesComponent,
    CtaFinalComponent,
  ],
  template: `
    <main id="main-content">
      <app-hero />
      <app-faixa-confianca />
      <app-services />
      <app-galeria />
      <app-reviews />
      <app-antes-depois />
      <app-differentiators />
      <app-instagram />
      <app-perguntas-frequentes />
      <app-cta-final />
    </main>
  `,
})
export class HomePageComponent {}
