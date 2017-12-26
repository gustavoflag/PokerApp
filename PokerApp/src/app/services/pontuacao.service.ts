import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PontuacaoService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();

  }

  listar(){
    return this.http.get(`${this.baseUrlService}/pontuacao`);
  }

  inserir(pontuacao): Observable<any>{
    return this.http.post(`${this.baseUrlService}/pontuacao`, JSON.stringify(pontuacao), { headers: this.configService.getHeaders() });
  }

  alterar(pontuacao): Observable<any>{
    return this.http.put(`${this.baseUrlService}/pontuacao/${pontuacao._id}`, JSON.stringify(pontuacao), { headers: this.configService.getHeaders() });
  }

  excluir(pontuacao): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/pontuacao/${pontuacao._id}`, { headers: this.configService.getHeaders() });
  }
}
