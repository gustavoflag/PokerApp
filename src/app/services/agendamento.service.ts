import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AgendamentoService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();
  }

  listar(){
    return this.http.get(`${this.baseUrlService}/agendamento`);
  }

  inserir(agendamento: any): Observable<any>{
    return this.http.post(`${this.baseUrlService}/agendamento`, JSON.stringify(agendamento), { headers: this.configService.getHeaders() });
  }

  alterar(agendamento: any): Observable<any>{
    return this.http.put(`${this.baseUrlService}/agendamento/${agendamento._id}`, JSON.stringify(agendamento), { headers: this.configService.getHeaders() });
  }

  excluir(agendamento: any): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/agendamento/${agendamento._id}`, { headers: this.configService.getHeaders() });
  }
}
