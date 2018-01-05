import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
  private urlService:string;

  constructor(){
      this.urlService = environment.API_URI;
  }

  getUrlService(): string {
      return this.urlService;
  }

  getHeaders(): HttpHeaders{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `JWT ${token}`);
  }
}
