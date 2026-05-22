import { WHATSAPP_NUMBER } from '../../../core/constants/contact.constants';

export interface ServicoDetalhe {
  readonly slug: string;
  readonly nome: string;
  readonly icone: string;
  readonly tagline: string;
  readonly descricao: string;
  readonly itens: readonly {
    readonly titulo: string;
    readonly descricao: string;
  }[];
  readonly mensagemWhatsApp: string;
  readonly tituloPagina: string;
  readonly temFormularioOrcamento?: true;
}

const BASE_WA = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

export const SERVICOS_DETALHE: readonly ServicoDetalhe[] = [
  {
    slug: 'maquiagem',
    nome: 'Maquiagem',
    icone: '💄',
    tagline: 'Realce a sua beleza para cada ocasião especial',
    descricao:
      'Maquiagem profissional com técnicas modernas e produtos de alta qualidade, pensada para durar e fotografar bem. Cada atendimento é personalizado de acordo com o seu tom de pele, estilo e evento.',
    itens: [
      {
        titulo: 'Maquiagem Social',
        descricao: 'Ideal para eventos, formaturas, aniversários e ocasiões especiais.',
      },
      {
        titulo: 'Maquiagem Glam',
        descricao: 'Visual mais elaborado com contorno, iluminação e delineado impactante.',
      },
      {
        titulo: 'Maquiagem Noiva',
        descricao: 'Produção cuidadosa, duradoura e pensada para o altar e as fotos.',
      },
      {
        titulo: 'Preparação de Pele',
        descricao: 'Preparação personalizada para um acabamento impecável e duradouro.',
      },
      {
        titulo: 'Maquiagem para Madrinhas e Convidadas',
        descricao: 'Atendimento em grupo disponível com horários planejados.',
      },
    ],
    mensagemWhatsApp: encodeURIComponent(
      'Olá! Gostaria de agendar uma maquiagem profissional. Poderia me passar mais informações?',
    ),
    tituloPagina: 'Maquiagem Profissional | Ju Duarte Beauty Studio',
  },
  {
    slug: 'noivas',
    nome: 'Noivas & Debutantes',
    icone: '👰',
    tagline: 'O maior dia da sua vida merece um cuidado único e exclusivo',
    descricao:
      'Atendimento completo e personalizado para noivas e debutantes. Com planejamento detalhado, teste incluído e toda a atenção que o grande momento exige — do casamento à festa de 15 anos, você estará em mãos experientes e carinhosas.',
    itens: [
      {
        titulo: 'Pacote Completo Make + Penteado',
        descricao: 'Produção completa com maquiagem e penteado alinhados ao seu estilo e tema.',
      },
      {
        titulo: 'Teste Incluído',
        descricao: 'Sessão prévia para definir o look ideal antes do grande dia.',
      },
      {
        titulo: 'Atendimento Exclusivo',
        descricao: 'Dedicação total no dia do evento, sem pressa e com todo o cuidado.',
      },
      {
        titulo: 'Visita ao Local',
        descricao: 'Possibilidade de atendimento no local do evento ou na sua casa.',
      },
      {
        titulo: 'Consultoria de Produção',
        descricao: 'Orientação sobre o visual completo: acessórios, véu ou coroa e harmonização.',
      },
    ],
    mensagemWhatsApp: encodeURIComponent(
      'Olá! Gostaria de saber mais sobre o pacote para noivas e debutantes. Pode me passar informações sobre disponibilidade e valores?',
    ),
    tituloPagina: 'Noivas & Debutantes | Ju Duarte Beauty Studio',
    temFormularioOrcamento: true,
  },
  {
    slug: 'penteado',
    nome: 'Penteado',
    icone: '💇‍♀️',
    tagline: 'Penteados que completam a sua produção com elegância',
    descricao:
      'Penteados profissionais para todos os tipos de eventos e ocasiões. Técnicas modernas e clássicas combinadas para criar o visual perfeito, do coque mais elaborado ao semi-preso descomplicado.',
    itens: [
      {
        titulo: 'Penteado Social',
        descricao: 'Para festas, formaturas, eventos corporativos e aniversários.',
      },
      {
        titulo: 'Penteado para Noivas',
        descricao: 'Produções sofisticadas e duradouras para o grande dia.',
      },
      {
        titulo: 'Penteado para Madrinhas',
        descricao: 'Atendimento em grupo com harmonia e agilidade.',
      },
      {
        titulo: 'Técnicas Modernas e Clássicas',
        descricao: 'Trança, coque, ondas, semi-preso e outras técnicas disponíveis.',
      },
      {
        titulo: 'Acabamento com Produtos Premium',
        descricao: 'Produtos de fixação e brilho profissionais para durabilidade total.',
      },
    ],
    mensagemWhatsApp: encodeURIComponent(
      'Olá! Gostaria de agendar um penteado. Poderia me informar a disponibilidade e valores?',
    ),
    tituloPagina: 'Penteado Profissional | Ju Duarte Beauty Studio',
  },
  {
    slug: 'unhas-em-gel',
    nome: 'Unhas em Gel',
    icone: '💅',
    tagline: 'Unhas impecáveis com acabamento duradouro e delicado',
    descricao:
      'Procedimentos de unhas com técnicas modernas em gel, proporcionando durabilidade, beleza e acabamento impecável. Atendimento personalizado para cada formato, comprimento e estilo.',
    itens: [
      {
        titulo: 'Alongamento em Gel',
        descricao: 'Unhas alongadas com gel de alta qualidade, resistentes e naturais.',
      },
      {
        titulo: 'Alongamento Molde F1',
        descricao: 'Técnica com molde para formato preciso e resultado impecável.',
      },
      {
        titulo: 'Blindagem',
        descricao: 'Proteção e fortalecimento da unha natural com camada de gel.',
      },
      {
        titulo: 'Esmaltação em Gel',
        descricao: 'Cor duradoura e brilhosa com acabamento de gel sem danificar a unha.',
      },
      {
        titulo: 'Manutenção',
        descricao: 'Reequilíbrio e reposição para manter o resultado sempre perfeito.',
      },
    ],
    mensagemWhatsApp: encodeURIComponent(
      'Olá! Gostaria de agendar um procedimento de unhas em gel. Pode me passar informações sobre disponibilidade e valores?',
    ),
    tituloPagina: 'Unhas em Gel | Ju Duarte Beauty Studio',
  },
] as const;

export function buscarServicoPorSlug(slug: string): ServicoDetalhe | undefined {
  return SERVICOS_DETALHE.find((s) => s.slug === slug);
}

export function gerarUrlWhatsApp(servico: ServicoDetalhe): string {
  return `${BASE_WA}${servico.mensagemWhatsApp}`;
}
