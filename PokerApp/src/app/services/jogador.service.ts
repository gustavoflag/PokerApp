import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class JogadorService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

      this.baseUrlService = this.configService.getUrlService();
  }

  lista(){
    return this.http.get(this.baseUrlService + '/jogador');
  }

  classificacao(){
    return this.http.get(this.baseUrlService + '/classificacao');
  }

  inserir(jogador): Observable<any>{
    return this.http.post(`${this.baseUrlService}/jogador`, JSON.stringify(jogador), { headers: this.configService.getHeaders() });
  }

  alterar(jogador): Observable<any>{
    return this.http.put(`${this.baseUrlService}/jogador/${jogador._id}`, JSON.stringify(jogador), { headers: this.configService.getHeaders() });
  }

  excluir(jogador): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/jogador/${jogador._id}`, { headers: this.configService.getHeaders() });
  }
}
