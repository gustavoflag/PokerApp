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

  constructor(private authService: AuthService
             ,private router: Router){ }

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser){
      this.nomeUsuario = currentUser.login;
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
    this.nomeUsuario = null;
  }
}
