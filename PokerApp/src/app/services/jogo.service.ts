import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class JogoService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();

  }

  listar(){
    return this.http.get(`${this.baseUrlService}/jogo`);
  }

  inserir(jogo): Observable<any>{
    return this.http.post(`${this.baseUrlService}/jogo`, JSON.stringify(jogo), { headers: this.configService.getHeaders() });
  }

  excluir(jogo): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/jogo/${jogo._id}`, { headers: this.configService.getHeaders() });
  }

  alterar(jogo): Observable<any>{
    return this.http.put(`${this.baseUrlService}/jogo/${jogo._id}`, JSON.stringify(jogo), { headers: this.configService.getHeaders() });
  }

}
