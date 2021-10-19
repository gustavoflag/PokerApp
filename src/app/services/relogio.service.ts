import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';


@Injectable()
export class RelogioService {
  private baseUrlService: string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();
  }

  listarEstrutura(){
    return this.http.get(`${this.baseUrlService}/estruturaRelogio`);
  }

  consultar(): Observable<any>{
    return this.http.get(`${this.baseUrlService}/relogio`);
  }

  iniciar(): Observable<any>{
    return this.http.post(`${this.baseUrlService}/relogio`, { headers: this.configService.getHeaders() });
  }

  parar(): Observable<any>{
    return this.http.put(`${this.baseUrlService}/relogio`, { headers: this.configService.getHeaders() });
  }

  reiniciar(): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/relogio`, { headers: this.configService.getHeaders() });
  }

  voltarBlind(): Observable<any>{
    return this.http.patch(`${this.baseUrlService}/relogio/voltar`, { headers: this.configService.getHeaders() });
  }

  avancarBlind(): Observable<any>{
    return this.http.patch(`${this.baseUrlService}/relogio/avancar`, { headers: this.configService.getHeaders() });
  }
}
