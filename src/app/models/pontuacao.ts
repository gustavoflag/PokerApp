export class Pontuacao {
  lugar: number | undefined;
  pontos: number | undefined;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
