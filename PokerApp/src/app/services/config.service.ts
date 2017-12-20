import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private urlService:string;

  constructor(){
      this.urlService = 'http://127.0.0.1:3000';
  }

  getUrlService(): string {
      return this.urlService;
  }
}
