import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';


@Injectable()
export class PontuacaoService {

  constructor(private http: HttpClientService) { }

  listar(){
    return this.http.get(`pontuacao`);
  }

  inserir(pontuacao: any): Observable<any>{
    return this.http.post(`pontuacao`, pontuacao);
  }

  alterar(pontuacao: any): Observable<any>{
    return this.http.put(`pontuacao`, pontuacao);
  }

  excluir(pontuacao: any): Observable<any>{
    return this.http.delete(`pontuacao`, pontuacao);
  }
}
