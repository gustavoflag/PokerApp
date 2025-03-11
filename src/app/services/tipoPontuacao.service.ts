import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';


@Injectable()
export class TipoPontuacaoService {

  constructor(private http: HttpClientService) { }

  listar(){
    return this.http.get(`tipoPontuacao`);
  }

  inserir(pontuacao: any): Observable<any>{
    return this.http.post(`tipoPontuacao`, pontuacao);
  }

  alterar(pontuacao: any): Observable<any>{
    return this.http.put(`tipoPontuacao`, pontuacao);
  }

  excluir(pontuacao: any): Observable<any>{
    return this.http.delete(`tipoPontuacao`, pontuacao);
  }
}
