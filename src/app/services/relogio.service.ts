import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';


@Injectable()
export class RelogioService {
  private baseUrlService: string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlRelogioService();
  }

  listarEstrutura(){
    return this.http.get(`${this.baseUrlService}/estruturaRelogio`);
  }

  consultar(): Observable<any>{
    return this.http.get(`${this.baseUrlService}/relogio`);
  }

  iniciar(): Observable<any>{
    return this.http.post(`${this.baseUrlService}/relogio`, {}, { headers: this.configService.getHeaders() });
  }

  parar(): Observable<any>{
    return this.http.put(`${this.baseUrlService}/relogio`, {}, { headers: this.configService.getHeaders() });
  }

  reiniciar(): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/relogio`, { headers: this.configService.getHeaders() });
  }

  voltarBlind(nivelBlind): Observable<any>{
    return this.http.put(`${this.baseUrlService}/relogio/voltar`, { nivelBlind }, { headers: this.configService.getHeaders() });
  }

  reiniciarBlind(nivelBlind): Observable<any>{
    return this.http.patch(`${this.baseUrlService}/relogio/voltar`, { nivelBlind }, { headers: this.configService.getHeaders() });
  }

  avancarBlind(nivelBlind): Observable<any>{
    return this.http.patch(`${this.baseUrlService}/relogio/avancar`, { nivelBlind }, { headers: this.configService.getHeaders() });
  }
}
