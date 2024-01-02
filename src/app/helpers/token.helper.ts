import { Injectable } from "@angular/core";

@Injectable()
export class TokenHelper {
  constructor() {
  }

  public isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}