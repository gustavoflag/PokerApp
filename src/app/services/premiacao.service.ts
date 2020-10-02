import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';


@Injectable()
export class PremiacaoService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();

  }

  listar(){
    return this.http.get(`${this.baseUrlService}/premiacao`);
  }

  inserir(premiacao): Observable<any>{
    return this.http.post(`${this.baseUrlService}/premiacao`, JSON.stringify(premiacao), { headers: this.configService.getHeaders() });
  }

  alterar(premiacao): Observable<any>{
    return this.http.put(`${this.baseUrlService}/premiacao/${premiacao._id}`, JSON.stringify(premiacao), { headers: this.configService.getHeaders() });
  }

  excluir(premiacao): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/premiacao/${premiacao._id}`, { headers: this.configService.getHeaders() });
  }
}
