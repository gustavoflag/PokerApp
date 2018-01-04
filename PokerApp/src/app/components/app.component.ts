import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService, ConfigService],
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  nomeUsuario: string = null;
  navAberta: boolean = false;

  constructor(private authService: AuthService
             ,private router: Router){ }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
    this.nomeUsuario = null;
    this.router.navigate(['/']);
  }

  logado() : boolean{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token){
      this.nomeUsuario = currentUser.login;
      return true;
    }

    this.nomeUsuario = null;
    return false;
  }

  toggleNavbar(){
    this.navAberta = !this.navAberta;
  }
}
