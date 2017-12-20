import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {
  private baseUrlService:string = '';

  constructor(private http: HttpClient,
              private configService: ConfigService) {

      this.baseUrlService = this.configService.getUrlService();
  }

  login(){

    /*const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');

    const options = new RequestOptions({headers: headers});*/

    const head = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    return this.http.post(this.baseUrlService + '/auth/login','{ "login": "admin", "senha": "1234" }', { headers: head });
  }
}
