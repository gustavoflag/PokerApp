import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';

@Injectable()
export class JogadorService {
  constructor(private http: HttpClientService) {
  }

  lista(){
    return this.http.get('jogador');
  }

  consultar(idJogador: any){
    return this.http.get(`jogador/${idJogador}`);
  }

  classificacao(){
    return this.http.get('classificacao');
  }

  classificacaoOrdenada(ordem: any){
    return this.http.get(`classificacao/${ordem}`);
  }

  classificacaoRookies(){
    return this.http.get('classificacaoRookies');
  }

  classificacaoRookiesOrdenada(ordem: any){
    return this.http.get(`classificacaoRookies/${ordem}`);
  }

  classificacaoMes(ano: any, mes: any){
    return this.http.get(`classificacaoMes/${ano}/${mes}`);
  }

  classificacaoTodosMeses(){
    return this.http.get('classificacaoTodosMeses');
  }

  inserir(jogador: any): Observable<any>{
    return this.http.post(`jogador`, jogador);
  }

  alterar(jogador: any): Observable<any>{
    return this.http.put(`jogador`, jogador);
  }

  excluir(jogador: any): Observable<any>{
    return this.http.delete(`jogador`, jogador);
  }
}
