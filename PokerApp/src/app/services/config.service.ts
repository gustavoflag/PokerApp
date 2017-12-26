import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private urlService:string;

  constructor(){
      this.urlService = 'http://127.0.0.1:3000';
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
