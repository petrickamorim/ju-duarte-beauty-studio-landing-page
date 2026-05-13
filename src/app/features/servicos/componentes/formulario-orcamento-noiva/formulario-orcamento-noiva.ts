import { Component, computed, signal } from '@angular/core';
import { WHATSAPP_NUMBER } from '../../../../core/constants/contact.constants';

type ErrosFormulario = Partial<{
  nomeNoiva: string;
  dataCasamento: string;
  tipoCerimonia: string;
  servicos: string;
  telefone: string;
}>;

@Component({
  selector: 'app-formulario-orcamento-noiva',
  standalone: true,
  templateUrl: './formulario-orcamento-noiva.html',
  styleUrl: './formulario-orcamento-noiva.scss',
})
export class FormularioOrcamentoNoivaComponent {
  readonly nomeNoiva = signal('');
  readonly dataCasamento = signal('');
  readonly tipoCerimonia = signal('');
  readonly servicoMake = signal(false);
  readonly servicoPenteado = signal(false);
  readonly telefone = signal('');
  readonly mensagem = signal('');

  readonly erros = signal<ErrosFormulario>({});
  readonly enviado = signal(false);
  readonly aberto = signal(false);

  readonly dataMinima = new Date().toISOString().split('T')[0];

  private readonly servicosSelecionados = computed(() => {
    const lista: string[] = [];
    if (this.servicoMake()) lista.push('Maquiagem');
    if (this.servicoPenteado()) lista.push('Penteado');
    return lista;
  });

  private validar(): boolean {
    const e: ErrosFormulario = {};

    if (!this.nomeNoiva().trim()) e.nomeNoiva = 'Informe o nome da noiva.';
    if (!this.dataCasamento()) e.dataCasamento = 'Informe a data do casamento.';
    if (!this.tipoCerimonia()) e.tipoCerimonia = 'Selecione o tipo de cerimônia.';
    if (this.servicosSelecionados().length === 0) e.servicos = 'Selecione pelo menos um serviço.';
    if (this.telefone().replace(/\D/g, '').length < 10)
      e.telefone = 'Informe um número de WhatsApp válido (com DDD).';

    this.erros.set(e);
    return Object.keys(e).length === 0;
  }

  enviar(): void {
    if (!this.validar()) return;

    const dataFormatada = new Date(this.dataCasamento() + 'T12:00:00').toLocaleDateString(
      'pt-BR',
      { day: '2-digit', month: 'long', year: 'numeric' },
    );

    const linhas = [
      '✨ *Solicitação de Orçamento — Pacote Noivas*',
      '',
      `👰 *Nome da noiva:* ${this.nomeNoiva().trim()}`,
      `📅 *Data do casamento:* ${dataFormatada}`,
      `⛪ *Tipo de cerimônia:* ${this.tipoCerimonia()}`,
      `💄 *Serviços desejados:* ${this.servicosSelecionados().join(' + ')}`,
      `📱 *WhatsApp para contato:* ${this.telefone().trim()}`,
    ];

    if (this.mensagem().trim()) {
      linhas.push(`💬 *Mensagem:* ${this.mensagem().trim()}`);
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    this.enviado.set(true);
  }

  novoOrcamento(): void {
    this.nomeNoiva.set('');
    this.dataCasamento.set('');
    this.tipoCerimonia.set('');
    this.servicoMake.set(false);
    this.servicoPenteado.set(false);
    this.telefone.set('');
    this.mensagem.set('');
    this.erros.set({});
    this.enviado.set(false);
  }
}
