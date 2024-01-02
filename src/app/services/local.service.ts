import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClientService.service';

@Injectable()
export class LocalService {

  constructor(private httpClient: HttpClientService) {}

  listar(){
    return this.httpClient.get('local');
  }

  inserir(local: any){
    return this.httpClient.post('local', local);
  }

  alterar(local: any){
    return this.httpClient.put('local', local);
  }

  excluir(local: any){
    return this.httpClient.delete('local', local);
  }
}
