import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenHelper } from '../helpers/token.helper';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private tokenHelper: TokenHelper
  ) { }

  canActivate() {
    const currentUser = localStorage.getItem('currentUser') || '';

    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    const token = JSON.parse(currentUser).token;

    if (this.tokenHelper.isTokenExpired(token)) {
      this.router.navigate(['/login'], { queryParams: { expired: true } });
      return false;
    }

    return true;
  }
}
