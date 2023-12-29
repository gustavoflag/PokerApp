import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';


@Injectable()
export class CaixaService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();

  }

  listar(){
    return this.http.get(`${this.baseUrlService}/lancamentoCaixa`);
  }

  inserir(lancamentoCaixa: any): Observable<any>{
    return this.http.post(`${this.baseUrlService}/lancamentoCaixa`, JSON.stringify(lancamentoCaixa), { headers: this.configService.getHeaders() });
  }

  alterar(lancamentoCaixa: any): Observable<any>{
    return this.http.put(`${this.baseUrlService}/lancamentoCaixa/${lancamentoCaixa._id}`, JSON.stringify(lancamentoCaixa), { headers: this.configService.getHeaders() });
  }

  excluir(lancamentoCaixa: any): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/lancamentoCaixa/${lancamentoCaixa._id}`, { headers: this.configService.getHeaders() });
  }

  saldoCaixa(): Observable<any>{
    return this.http.get(`${this.baseUrlService}/saldoCaixa`, { headers: this.configService.getHeaders() });
  }
}
