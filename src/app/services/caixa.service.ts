import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';

@Injectable()
export class CaixaService {
  constructor(private httpClient: HttpClientService) {}

  listar(conta: string){
    return this.httpClient.get(`lancamentoCaixa/conta/${conta}`);
  }

  inserir(lancamentoCaixa: any): Observable<any>{
    return this.httpClient.post('lancamentoCaixa', lancamentoCaixa);
  }

  alterar(lancamentoCaixa: any): Observable<any>{
    return this.httpClient.put('lancamentoCaixa', lancamentoCaixa);
  }

  excluir(lancamentoCaixa: any): Observable<any>{
    return this.httpClient.delete('lancamentoCaixa', lancamentoCaixa);
  }

  saldoCaixa(conta: string){
    return this.httpClient.get<number>(`saldoCaixa/${conta}`);
  }
}
