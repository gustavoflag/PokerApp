import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private baseUrlService:string = '';
  private token: string;

  constructor(private http: HttpClient,
              private configService: ConfigService) {

      this.baseUrlService = this.configService.getUrlService();
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }

  login(login: string, senha: string): Observable<any> {
    const head = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

    return this.http.post(`${this.baseUrlService}/auth/login`, JSON.stringify({ login: login, senha: senha }), { headers: head });
  }

  logout(): void {
      this.token = null;
      localStorage.removeItem('currentUser');
  }
}
