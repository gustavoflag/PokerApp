import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PontuacaoService {
  private baseUrlService:string = '';
  private token:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  lista(){
    return this.http.get(`${this.baseUrlService}/pontuacao`);
  }

  insere(lugar:number, pontos:number): Observable<any>{

    const head = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `JWT ${this.token}`);

    return this.http.post(`${this.baseUrlService}/pontuacao`, JSON.stringify({ lugar:lugar, pontos:pontos }), { headers: head })
      .map((response) => {
        if (response.status === 401){
          return false;
        } else {
          return true;
        }
      });
  }
}
