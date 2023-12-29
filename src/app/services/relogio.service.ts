import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';


@Injectable()
export class RelogioService {
  private baseUrlService: string = '';
  private baseUrlService0: string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlRelogioService();
    this.baseUrlService0 = this.baseUrlService.replace('{index}', '0');
  }

  listarEstrutura(){
    return this.http.get(`${this.baseUrlService0}/server/estruturaRelogio`);
  }

  consultar(index: number): Observable<any>{
    return this.http.get(`${this.baseUrlService.replace('{index}', index.toString())}/relogio`);
  }

  iniciar(): Observable<any>{
    return this.http.post(`${this.baseUrlService0}/server/relogio`, {}, { headers: this.configService.getHeaders() });
  }

  parar(): Observable<any>{
    return this.http.put(`${this.baseUrlService0}/server/relogio`, {}, { headers: this.configService.getHeaders() });
  }

  reiniciar(): Observable<any>{
    return this.http.delete(`${this.baseUrlService0}/server/relogio`, { headers: this.configService.getHeaders() });
  }

  voltarBlind(nivelBlind: any): Observable<any>{
    return this.http.put(`${this.baseUrlService0}/server/relogio/voltar`, { nivelBlind }, { headers: this.configService.getHeaders() });
  }

  reiniciarBlind(nivelBlind: any): Observable<any>{
    return this.http.patch(`${this.baseUrlService0}/server/relogio/voltar`, { nivelBlind }, { headers: this.configService.getHeaders() });
  }

  avancarBlind(nivelBlind: any): Observable<any>{
    return this.http.patch(`${this.baseUrlService0}/server/relogio/avancar`, { nivelBlind }, { headers: this.configService.getHeaders() });
  }
}
