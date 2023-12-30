import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocalService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

    this.baseUrlService = this.configService.getUrlService();
  }

  listar(){
    return this.http.get(`${this.baseUrlService}/local`);
  }

  inserir(local: any): Observable<any>{
    return this.http.post(`${this.baseUrlService}/local`, JSON.stringify(local), { headers: this.configService.getHeaders() });
  }

  alterar(local: any): Observable<any>{
    return this.http.put(`${this.baseUrlService}/local/${local._id}`, JSON.stringify(local), { headers: this.configService.getHeaders() });
  }

  excluir(local: any): Observable<any>{
    return this.http.delete(`${this.baseUrlService}/local/${local._id}`, { headers: this.configService.getHeaders() });
  }
}
