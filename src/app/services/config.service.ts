import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { env } from 'process';

@Injectable()
export class ConfigService {
  private urlService: string;
  private urlRelogioService: string;
  private urlAuthService: string;

  constructor(private http: HttpClient){
    this.urlService = environment.API_URI;
    this.urlRelogioService = environment.API_RELOGIO_URI;
    this.urlAuthService = environment.API_AUTH_URI;
  }

  getUrlService(): string {
    return this.urlService;
  }

  getUrlRelogioService(): string {
    return this.urlRelogioService;
  }

  getUrlAuthService(): string {
    return this.urlAuthService;
  }

  getHeaders(): HttpHeaders {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `JWT ${token}`);
  }

  usuarioLogado(): boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token){
      return true;
    }

    return false;
  }

  getTheme(): Observable<any> {
    return this.http.get(this.urlService + '/tema');
  }
}
