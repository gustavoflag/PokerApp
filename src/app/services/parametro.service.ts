import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpClientService.service';

@Injectable()
export class ParametroService {

  constructor(private http: HttpClientService) { }

  consultar(){
    return this.http.get(`parametro`);
  }

  alterar(parametro: any): Observable<any>{
    return this.http.put(`parametro`, parametro);
  }
}
