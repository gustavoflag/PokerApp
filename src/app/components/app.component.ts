import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
declare const require: any;

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
  tema: string;

  constructor(private authService: AuthService
             ,private router: Router
             ,public config: ConfigService){ }

  ngOnInit() {
    this.config.getTheme().subscribe(tema => {
      this.tema = tema;
      require(`style-loader!../../themes/${tema}.css`);
      require(`style-loader!../../styles.css`);
    });
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    var confirma = confirm('Deseja mesmo sair?');
    if (confirma){
      this.authService.logout();
      this.nomeUsuario = null;
      this.router.navigate(['/']);
    }
  }

  logado() : boolean{
    if (this.config.usuarioLogado()){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
