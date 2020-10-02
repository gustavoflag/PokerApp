import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';


@Injectable()
export class ParametroService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();

  }

  consultar(){
    return this.http.get(`${this.baseUrlService}/parametro`);
  }

  alterar(parametro): Observable<any>{
    return this.http.put(`${this.baseUrlService}/parametro`, JSON.stringify(parametro), { headers: this.configService.getHeaders() });
  }
}
