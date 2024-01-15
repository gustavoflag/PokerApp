import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';
import { Jogador } from '../models';

@Injectable()
export class JogadorService {
  constructor(private http: HttpClientService) { }

  lista(){
    return this.http.get<Jogador[]>('jogador');
  }

  consultar(idJogador: Jogador){
    return this.http.get(`jogador/${idJogador}`);
  }

  classificacao(){
    return this.http.get<Jogador[]>('classificacao');
  }

  classificacaoOrdenada(ordem: string){
    return this.http.get<Jogador[]>(`classificacao/${ordem}`);
  }

  classificacaoRookies(){
    return this.http.get<Jogador[]>('classificacaoRookies');
  }

  classificacaoRookiesOrdenada(ordem: string){
    return this.http.get<Jogador[]>(`classificacaoRookies/${ordem}`);
  }

  classificacaoMes(ano: string, mes: string){
    return this.http.get<Jogador[]>(`classificacaoMes/${ano}/${mes}`);
  }

  classificacaoTodosMeses(){
    return this.http.get('classificacaoTodosMeses');
  }

  inserir(jogador: Jogador): Observable<Jogador>{
    return this.http.post(`jogador`, jogador);
  }

  alterar(jogador: Jogador): Observable<Jogador>{
    return this.http.put(`jogador`, jogador);
  }

  excluir(jogador: Jogador): Observable<any>{
    return this.http.delete(`jogador`, jogador);
  }
}
