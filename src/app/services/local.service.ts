import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClientService.service';
import { Local } from '../models/local';
import { Observable } from 'rxjs';

@Injectable()
export class LocalService {

  constructor(private httpClient: HttpClientService) {}

  listar(){
    return this.httpClient.get<Local[]>('local');
  }

  inserir(local: Local){
    return this.httpClient.post('local', local);
  }

  alterar(local: Local){
    return this.httpClient.put<Local>('local', local);
  }

  excluir(local: Local){
    return this.httpClient.delete('local', local);
  }
}
