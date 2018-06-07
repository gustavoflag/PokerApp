import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable()
export class PreJogoService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();

  }

  consultar() : Observable<any>{
    return this.http.get(`${this.baseUrlService}/preJogo`);
  }

  inserir(preJogo): Observable<any>{
    return this.http.post(`${this.baseUrlService}/preJogo`, JSON.stringify(preJogo), { headers: this.configService.getHeaders() });
  }

  alterar(jogador): Observable<any>{
    return this.http.put(`${this.baseUrlService}/preJogo`, JSON.stringify(jogador), { headers: this.configService.getHeaders() });
  }

  sortear(): Observable<any>{
    return this.http.post(`${this.baseUrlService}/preJogo/sortear`, null, { headers: this.configService.getHeaders() });
  }

  gerarJogo(): Observable<any>{
    return this.http.post(`${this.baseUrlService}/preJogo/gerarJogo`, null, { headers: this.configService.getHeaders() });
  }

  cancelar(): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/preJogo`, { headers: this.configService.getHeaders() });
  }
}
