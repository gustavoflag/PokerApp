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

  /*alterar(parametro): Observable<any>{
    return this.http.put(`${this.baseUrlService}/jogo`, JSON.stringify(parametro), { headers: this.configService.getHeaders() });
  }*/

}