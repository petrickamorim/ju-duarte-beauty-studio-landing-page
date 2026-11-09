import { Component } from '@angular/core';
import { IconeComponent, IconeNome } from '../../../../shared/components/icone/icone';

interface ItemConfianca {
  readonly icone: IconeNome;
  readonly texto: string;
}

@Component({
  selector: 'app-faixa-confianca',
  standalone: true,
  imports: [IconeComponent],
  templateUrl: './faixa-confianca.html',
  styleUrl: './faixa-confianca.scss',
})
export class FaixaConfiancaComponent {
  readonly itens: readonly ItemConfianca[] = [
    { icone: 'casa', texto: 'Studio e a domicílio' },
    { icone: 'cartao', texto: 'Até 3x sem juros' },
    { icone: 'relogio', texto: 'Pontualidade garantida' },
    { icone: 'coracao', texto: 'Atendimento personalizado' },
  ];
}
