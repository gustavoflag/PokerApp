import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';

@Injectable()
export class AgendamentoService {
  constructor(private http: HttpClientService) {
  }

  listar(){
    return this.http.get(`agendamento`);
  }

  inserir(agendamento: any): Observable<any>{
    return this.http.post(`agendamento`, agendamento);
  }

  alterar(agendamento: any): Observable<any>{
    return this.http.put(`agendamento`, agendamento);
  }

  excluir(agendamento: any): Observable<any>{
    return this.http.delete(`agendamento`, agendamento);
  }
}
