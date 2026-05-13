import { Component, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { WHATSAPP_URL } from '../../../../core/constants/contact.constants';

interface Pergunta {
  readonly pergunta: string;
  readonly resposta: string;
}

const PERGUNTAS: readonly Pergunta[] = [
  {
    pergunta: 'Faz atendimento a domicílio?',
    resposta:
      'Sim! Realizo atendimentos a domicílio para noivas, madrinhas e grupos. Entre em contato pelo WhatsApp para verificar disponibilidade e área de cobertura em São Paulo.',
  },
  {
    pergunta: 'Quanto dura o procedimento?',
    resposta:
      'Depende do serviço: maquiagem social leva de 1h a 1h30, penteado de 40min a 1h, pacote noiva (make + penteado) de 2h a 2h30 e unhas em gel de 1h a 2h. No agendamento, informo o tempo exato para o seu procedimento.',
  },
  {
    pergunta: 'Tem manutenção de unhas?',
    resposta:
      'Sim! Ofereço manutenção para unhas em gel, incluindo reequilíbrio e reposição. O prazo ideal para manutenção é entre 3 e 4 semanas após o procedimento inicial. Consulte valores pelo WhatsApp.',
  },
  {
    pergunta: 'Aceita cartão?',
    resposta:
      'Sim! Aceito cartão de crédito (parcelamos em até 3x sem juros), débito e Pix. Pagamento à vista em dinheiro também é aceito.',
  },
  {
    pergunta: 'Preciso agendar com antecedência?',
    resposta:
      'Para datas comuns, recomendo agendar com pelo menos 1 semana de antecedência. Para noivas e datas especiais (carnaval, formaturas, fim de ano), o ideal é reservar com 1 a 3 meses de antecedência, pois as vagas são limitadas.',
  },
  {
    pergunta: 'Faz teste de noiva?',
    resposta:
      'Sim! O teste de noiva é fundamental e já está incluído no pacote. Ele é realizado com antecedência para definirmos juntas o look ideal — maquiagem, penteado e todos os detalhes para o grande dia.',
  },
];

@Component({
  selector: 'app-perguntas-frequentes',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './perguntas-frequentes.html',
  styleUrl: './perguntas-frequentes.scss',
})
export class PerguntasFrequentesComponent {
  readonly perguntas = PERGUNTAS;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly abertaIndice = signal<number | null>(null);

  alternar(indice: number): void {
    this.abertaIndice.update((atual) => (atual === indice ? null : indice));
  }
}
