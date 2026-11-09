import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  buscarServicoPorSlug,
  gerarUrlWhatsApp,
} from '../../dados/servicos-detalhe.dados';
import { FormularioOrcamentoNoivaComponent } from '../../componentes/formulario-orcamento-noiva/formulario-orcamento-noiva';
import { IconeComponent } from '../../../../shared/components/icone/icone';
import { RolarParaDirective } from '../../../../shared/directives/rolar-para';

@Component({
  selector: 'app-detalhe-servico',
  standalone: true,
  imports: [RouterLink, FormularioOrcamentoNoivaComponent, IconeComponent, RolarParaDirective],
  templateUrl: './detalhe-servico.html',
  styleUrl: './detalhe-servico.scss',
})
export class DetalheServicoComponent {
  readonly slug = input<string>('');

  readonly servico = computed(() => buscarServicoPorSlug(this.slug()));

  readonly urlWhatsApp = computed(() => {
    const s = this.servico();
    return s ? gerarUrlWhatsApp(s) : '#';
  });
}
