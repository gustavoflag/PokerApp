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

  lista(){
    return this.http.get(this.baseUrlService + '/pontuacao');
  }

  insere(): Observable<boolean>{
    const head = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `JWT ${localStorage.token}`);
    try
    {
      return this.http.post(`${this.configService.getUrlService()}/pontuacao`, '{ "lugar":"20", "pontos":"0" }', { headers: head }).map((response) => {
        if (response.status === 401){
          return false;
        } else {
          return true;
        }
      });
    }
    catch(ex){
      return false;
    }

  }
}
