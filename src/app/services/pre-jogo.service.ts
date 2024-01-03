import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';

@Injectable()
export class PreJogoService {

  constructor(private http: HttpClientService) { }

  consultar() : Observable<any>{
    return this.http.get(`preJogo`);
  } 

  inserir(preJogo: any): Observable<any>{
    return this.http.post(`preJogo`, preJogo);
  } 

  alterar(jogador: any): Observable<any>{
    return this.http.put(`preJogo`, jogador, false);
  }
  
  alterarDealer(jogador: any): Observable<any>{
    return this.http.post(`preJogo/alterarDealer`, jogador);
  } 

  sortear(redraw: boolean = false): Observable<any>{
    return this.http.post(`preJogo/sortear`, { redraw });
  }

  gerarJogo(): Observable<any>{
    return this.http.post(`preJogo/gerarJogo`, {});
  }

  cancelar(preJogo: any): Observable<any>{
    return this.http.delete(`preJogo`, preJogo, false);
  }

  excluirJogador(jogador: any): Observable<any>{
    return this.http.post(`preJogo/excluirJogador`, jogador);
  }

  adicionarJogador(jogador: any): Observable<any>{
    return this.http.post(`preJogo/adicionarJogador`, jogador);
  }
}