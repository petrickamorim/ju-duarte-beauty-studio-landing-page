import { Review } from '../../features/home/models/review.model';

// Resumo exibido no perfil do Google — atualize aqui quando o número mudar
// (usado no badge do Hero e no resumo da seção de Avaliações)
export const GOOGLE_NOTA = '5,0';
export const GOOGLE_TOTAL_AVALIACOES = 29;

// Avaliações reais do Google (transcritas do perfil), da mais recente para a mais antiga.
// Adicione novas entradas no TOPO do array conforme chegam.
// Sem data: o Google só mostra datas relativas ("2 meses atrás"), que ficariam desatualizadas.
export const AVALIACOES: readonly Review[] = [
  // ~2 meses
  {
    author: 'Graziela Paribello',
    text: 'Atendimento excelente, a Júlia fez uma maquiagem impecável que TODOS elogiaram... Recomendo e voltarei com certeza!',
    rating: 5,
  },
  {
    author: 'Cristiane Valverde Uchoa Pizii',
    text: 'Profissional atenciosa, simpática e faz um trabalho maravilhoso! Super indico.',
    rating: 5,
  },

  // ~5 meses
  {
    author: 'Alice Oliveira',
    text: 'A Júlia é simplesmente maravilhosa! Super pontual, atenciosa e extremamente profissional. Fez minhas unhas, maquiagem e cabelo com muito capricho e ficou tudo impecável. Dá pra perceber o cuidado e talento em cada detalhe.',
    rating: 5,
  },
  {
    author: 'Dinalva Almeida',
    text: 'A Júlia é uma ótima profissional. Fiz make e penteado com ela e em ambos ela arrasou.',
    rating: 5,
  },
  {
    author: 'Amanda',
    text: 'Além de ótima profissional... super atenciosa e carinhosa.',
    rating: 5,
  },

  // ~9–10 meses
  {
    author: 'Rosangela Simões',
    text: 'A profissional mais dedicada, mais detalhista, impecável, não troco por nada, não gosto de fazer propaganda, pq ela já quase sem horário, aí fazendo propaganda vai piorar, só vão ela é maraaaaaa',
    rating: 5,
  },
  {
    author: 'Mariana Ferreira',
    text: 'Profissional maravilhosa, muito cuidadosa e talentosa. Minhas unhas ficaram exatamente como eu queria!',
    rating: 5,
  },
  {
    author: 'Lola Rocha',
    text: 'Para minha formatura de EM precisava de uma profissional realmente boa e que fizesse com que eu me sentisse segura. Logo lembrei dos vídeos do insta da Ju e agendei com ela. Quando ela virou o espelho pra mim no final eu estava mto linda. As cores que ela usou ficaram perfeitas no meu tom e meus olhos ficaram lindos lindos. Aquele dia me senti uma princesa de verdade.',
    rating: 5,
  },

  // ~1 ano
  {
    author: 'Tatiane Campanher',
    text: 'Simplesmente maravilhosa. Seu trabalho sempre com muito profissionalismo e talento. Desde maquiagem e unha não tenho o que falar, somente elogios, nos atende com calma e tudo que faz sempre com muitos detalhes. Parabéns sempre pelo seu crescimento profissional!',
    rating: 5,
  },
  {
    author: 'Caroline Psicóloga',
    text: 'Fiz a unha do pé com a Julia, e eu amei... além de excelente profissional ela é uma fofa. Super recomendo!!',
    rating: 5,
  },
  {
    author: 'Paula Cris',
    text: 'Amei fazer a unha com a Júlia e amei também fazer meu cabelo com a mãezinha dela! São uns amores e trabalham com muito profissionalismo e amor! Indico muito o trabalho delas! Vale muito a pena!',
    rating: 5,
  },
  {
    author: 'Cristina Ravelli',
    text: 'Adoro fazer minhas unhas com a Júlia, ela é extremamente caprichosa e nos trata com muito carinho! Júlia, obrigada por deixar minhas mãos sempre lindas!',
    rating: 5,
  },
  {
    author: 'Maria José Pineiro Noro',
    text: 'Ameiii ameiii a maquiagem da Júlia, excelente profissional, habilidosa, maravilhosa e além de tudo linda!!! Super indico!!!',
    rating: 5,
  },
  {
    author: 'Aparecida Maria da Costa',
    text: 'Excelente profissional, gosto muito do serviço prestado.',
    rating: 5,
  },
  {
    author: 'Juliana Gonçalves de Aguiar',
    text: 'Muito legal!!!! Recomendo!!!!!',
    rating: 5,
  },

  // ~2 anos
  {
    author: 'Thayná Izabella Arantes',
    text: 'Faço make com a Ju há alguns anos e sou apaixonada no trabalho dela!! O resultado sempre fica lindo e dura muito!!',
    rating: 5,
  },
  {
    author: 'Belinha Vinhas',
    text: 'Fiz maquiagem normal e depois para uma festa de Halloween. As maquiagens ficaram fantásticas.',
    rating: 5,
  },
  {
    author: 'Marcella Athina',
    text: 'Excelente profissional, super atenciosa e atendimento impecável, voltaria mil vezes.',
    rating: 5,
  },
  {
    author: 'Maria Eduarda',
    text: 'Atendimento maravilhoso, me senti muito importante nesse lugar!! Indico sem pensar duas vezes.',
    rating: 5,
  },
  {
    author: 'Fátima Resende',
    text: 'Foi ótimo, embora não conhecia o trabalho, mas fiquei satisfeita. Deu tudo certo cabelo, maquiagem, indico o trabalho. Muito obrigada.',
    rating: 5,
  },
  {
    author: 'Sarah Arantes',
    text: 'Minhas duas irmãs já se maquiaram com ela e amaram o resultado!',
    rating: 5,
  },
  {
    author: 'Cilesia Amorim',
    text: 'Maravilhosa, muito atenciosa e dedicada no que faz.',
    rating: 5,
  },
  {
    author: 'Gislene Fritoli',
    text: 'Ótimo atendimento, maquiagem perfeita.',
    rating: 5,
  },
];
