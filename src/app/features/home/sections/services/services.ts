import { Component, signal } from '@angular/core';
import { ServiceCardComponent } from '../../components/service-card/service-card';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header';
import { ServiceItem } from '../../models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceCardComponent, SectionHeaderComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  readonly services = signal<ServiceItem[]>([
    {
      name: 'Maquiagem',
      icon: '💄',
      description:
        'Maquiagem profissional para eventos, fotos, formaturas, madrinhas, convidadas e noivas.',
      highlights: [
        'Preparação de pele personalizada',
        'Acabamento profissional e duradouro',
        'Produção pensada para fotos e eventos',
        'Opções social, glam e noiva',
      ],
    },
    {
      name: 'Penteado',
      icon: '💇‍♀️',
      description: 'Penteados para eventos, noivas, madrinhas e ocasiões especiais.',
      highlights: [
        'Penteados sociais e para festas',
        'Produções completas para noivas',
        'Técnicas modernas e clássicas',
      ],
    },
    {
      name: 'Noivas',
      icon: '👰',
      description:
        'Atendimento completo para o grande dia, com organização, cuidado e sofisticação.',
      highlights: [
        'Pacote completo make + penteado',
        'Teste de noiva incluído',
        'Atendimento exclusivo e personalizado',
        'Visita ao local disponível',
      ],
    },
    {
      name: 'Unhas em Gel',
      icon: '💅',
      description: 'Procedimentos com acabamento delicado, moderno e resistente.',
      highlights: [
        'Alongamento em gel',
        'Alongamento molde F1',
        'Blindagem',
        'Esmaltação em gel',
        'Manutenção',
      ],
    },
  ]);
}
