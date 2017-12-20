export class Pontuacao {
  lugar: number;
  pontos: number;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
