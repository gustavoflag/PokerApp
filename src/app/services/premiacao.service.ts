import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';


@Injectable()
export class PremiacaoService {
  private baseUrlService:string = '';

  constructor(private http: HttpClientService) { }

  listar(){
    return this.http.get(`premiacao`);
  }

  inserir(premiacao: any): Observable<any>{
    return this.http.post(`premiacao`, premiacao);
  }

  alterar(premiacao: any): Observable<any>{
    return this.http.put(`premiacao`, premiacao);
  }

  excluir(premiacao: any): Observable<any>{
    return this.http.delete(`premiacao`, premiacao);
  }
}
