export class Jogador {
  _id!: string;
  nome!: string;
  dataCriacao?: Date;
  rookie?: boolean;
  jogos?: number;
  pontos?: number;
  valorInvestido?: number;
  valorRecebido?: number;
  historicoJogos?: [{
    lugar: number;
    quantidade: number;
  }];
  titulos?: [{
    ano: number
  }];
  pontuacaoEtapas?: [{
    etapa: number;
    pontos: number;
  }];
  pontosPorJogo?: number;
  mediaPosicao?: number;
  //vitorias?: []
  qtdVitorias?: number;
  qtdHUs?: number;
  qtdPontuacaoes?: number;
  posicaoHU?: number;
  posicaoPontuacoes?: number; 
  posicaoPontosPorJogo?: number;
  posicaoMediaPosicao?: number;
  posicaoRanking?: number;
  posicaoVitorias?: number;
  socio?: boolean;
  classificacao?: number;
  qtdVezesDealer?: number;
  foto?: string;
  pontosExtra?: number;
}