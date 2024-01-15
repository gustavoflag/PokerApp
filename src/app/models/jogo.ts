export class Jogo {
  _id!: string;
  participantes!: [{
    nomeJogador: string;
    lugar: number;
    pontos: number;
    valorInvestido?: number;
    valorRecebido?: number;
    rebuy?: number;
    jogosCampeonato?: number;
    pontosCampeonato?: number;
    qtdVezesDealer?: number;
    dealer?: boolean;
    pontoExtra?: boolean;
    qtdPontosExtra?: number;
  }];
  data!: Date;
  valorMaleta?: number;
  numero?: number;
}