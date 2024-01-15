import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';
import { Jogo } from '../models';


@Injectable()
export class JogoService {
  constructor(private http: HttpClientService) {}

  listar(){
    return this.http.get<Jogo[]>(`jogo`);
  }

  consultar(idJogo: string){
    return this.http.get<Jogo>(`jogo/${idJogo}`);
  }

  inserir(jogo: Jogo): Observable<Jogo>{
    return this.http.post<Jogo>(`jogo`, jogo);
  }

  excluir(jogo: Jogo): Observable<Jogo>{
    return this.http.delete(`jogo`, jogo);
  }

  alterar(jogo: Jogo): Observable<Jogo>{
    return this.http.put<Jogo>(`jogo`, jogo);
  }

  quantidade(): Observable<number>{
    return this.http.get(`quantidadeJogos`);
  }

}
