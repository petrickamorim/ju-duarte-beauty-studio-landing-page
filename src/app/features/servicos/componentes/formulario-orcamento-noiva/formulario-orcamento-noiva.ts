import { Component, computed, signal } from '@angular/core';
import { WHATSAPP_NUMBER } from '../../../../core/constants/contact.constants';

type TipoEvento = 'noiva' | 'debutante';

type ErrosFormulario = Partial<{
  nome: string;
  dataCasamento: string;
  cidadeEvento: string;
}>;

@Component({
  selector: 'app-formulario-orcamento-noiva',
  standalone: true,
  templateUrl: './formulario-orcamento-noiva.html',
  styleUrl: './formulario-orcamento-noiva.scss',
})
export class FormularioOrcamentoNoivaComponent {
  readonly tipoEvento = signal<TipoEvento>('noiva');
  readonly nome = signal('');
  readonly dataCasamento = signal('');
  readonly cidadeEvento = signal('');

  readonly erros = signal<ErrosFormulario>({});
  readonly enviado = signal(false);
  readonly aberto = signal(false);

  readonly dataMinima = new Date().toISOString().split('T')[0];

  readonly labelNome = computed(() =>
    this.tipoEvento() === 'noiva' ? 'Nome da noiva' : 'Nome da debutante',
  );

  readonly labelData = computed(() =>
    this.tipoEvento() === 'noiva' ? 'Data do casamento' : 'Data da festa',
  );

  readonly placeholderNome = computed(() =>
    this.tipoEvento() === 'noiva' ? 'Seu nome completo' : 'Nome da debutante',
  );

  private validar(): boolean {
    const e: ErrosFormulario = {};
    const isNoiva = this.tipoEvento() === 'noiva';

    if (!this.nome().trim())
      e.nome = isNoiva ? 'Informe o nome da noiva.' : 'Informe o nome da debutante.';
    if (!this.dataCasamento())
      e.dataCasamento = isNoiva ? 'Informe a data do casamento.' : 'Informe a data da festa.';
    if (!this.cidadeEvento().trim()) e.cidadeEvento = 'Informe a cidade do evento.';

    this.erros.set(e);
    return Object.keys(e).length === 0;
  }

  enviar(): void {
    if (!this.validar()) return;

    const dataFormatada = new Date(this.dataCasamento() + 'T12:00:00').toLocaleDateString(
      'pt-BR',
      { day: '2-digit', month: 'long', year: 'numeric' },
    );

    const isNoiva = this.tipoEvento() === 'noiva';
    const labelNome = isNoiva ? 'Nome da Noiva' : 'Nome da Debutante';
    const labelData = isNoiva ? 'Data do Casamento' : 'Data da Festa';
    const intro = isNoiva
      ? 'Gostaria de solicitar um orçamento para o meu casamento.'
      : 'Gostaria de solicitar um orçamento para festa de 15 anos.';

    const sep = '━'.repeat(15); // ━━━━━━━━━━━━━━━

    const linhas = [
      '*JU DUARTE BEAUTY STUDIO*',
      '',
      'Olá! ' + intro,
      '',
      sep,
      '',
      '*' + labelNome + '*',
      this.nome().trim(),
      '',
      '*' + labelData + '*',
      dataFormatada,
      '',
      '*Cidade do Evento*',
      this.cidadeEvento().trim(),
      '',
      sep,
      '',
      'Aguardo retorno.',
    ];

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(linhas.join('\n'))}`;

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.enviado.set(true);
  }

  novoOrcamento(): void {
    this.tipoEvento.set('noiva');
    this.nome.set('');
    this.dataCasamento.set('');
    this.cidadeEvento.set('');
    this.erros.set({});
    this.enviado.set(false);
  }
}
