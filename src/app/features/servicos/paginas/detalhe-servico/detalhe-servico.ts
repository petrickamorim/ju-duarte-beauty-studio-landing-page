import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  buscarServicoPorSlug,
  gerarUrlWhatsApp,
} from '../../dados/servicos-detalhe.dados';
import { FormularioOrcamentoNoivaComponent } from '../../componentes/formulario-orcamento-noiva/formulario-orcamento-noiva';
import { IconeComponent } from '../../../../shared/components/icone/icone';
import { RolarParaDirective } from '../../../../shared/directives/rolar-para';
import { SeoService } from '../../../../core/seo/seo.service';

@Component({
  selector: 'app-detalhe-servico',
  standalone: true,
  imports: [RouterLink, FormularioOrcamentoNoivaComponent, IconeComponent, RolarParaDirective],
  templateUrl: './detalhe-servico.html',
  styleUrl: './detalhe-servico.scss',
})
export class DetalheServicoComponent {
  private readonly seo = inject(SeoService);

  readonly slug = input<string>('');

  readonly servico = computed(() => buscarServicoPorSlug(this.slug()));

  readonly urlWhatsApp = computed(() => {
    const s = this.servico();
    return s ? gerarUrlWhatsApp(s) : '#';
  });

  constructor() {
    // Título, descrição, canonical e og:url próprios de cada serviço
    effect(() => {
      const s = this.servico();
      if (!s) return;
      this.seo.definirPagina({
        titulo: s.tituloPagina,
        descricao: s.tagline,
        caminho: `/servicos/${s.slug}`,
      });
    });
  }
}
