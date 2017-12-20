import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class JogadorService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

      this.baseUrlService = this.configService.getUrlService();
  }

  lista(){
    return this.http.get(this.baseUrlService + '/jogador');
  }
}
