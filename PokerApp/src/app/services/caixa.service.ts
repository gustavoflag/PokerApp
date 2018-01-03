import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

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

  inserir(lancamentoCaixa): Observable<any>{
    return this.http.post(`${this.baseUrlService}/lancamentoCaixa`, JSON.stringify(lancamentoCaixa), { headers: this.configService.getHeaders() });
  }

  alterar(lancamentoCaixa): Observable<any>{
    return this.http.put(`${this.baseUrlService}/lancamentoCaixa/${lancamentoCaixa._id}`, JSON.stringify(lancamentoCaixa), { headers: this.configService.getHeaders() });
  }

  excluir(lancamentoCaixa): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/lancamentoCaixa/${lancamentoCaixa._id}`, { headers: this.configService.getHeaders() });
  }
}
