import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';


@Injectable()
export class JogoService {
  constructor(private http: HttpClientService) {}

  listar(){
    return this.http.get(`jogo`);
  }

  consultar(idJogo: any){
    return this.http.get(`jogo/${idJogo}`);
  }

  inserir(jogo: any): Observable<any>{
    return this.http.post(`jogo`, jogo);
  }

  excluir(jogo: any): Observable<any>{
    return this.http.delete(`jogo`, jogo);
  }

  alterar(jogo: any): Observable<any>{
    return this.http.put(`jogo`, jogo);
  }

  quantidade(): Observable<any>{
    return this.http.get(`quantidadeJogos`);
  }

}
