import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { PreJogoService } from '../services/pre-jogo.service';
import { Globals } from '../app.globals';
import { ErrorHelper } from '../helpers/error.helper';
import { TokenHelper } from '../helpers/token.helper';
declare const require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService, ConfigService, PreJogoService, TokenHelper],
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  nomeUsuario: string | null = null;
  navAberta: boolean = false;
  tema: string = '';
  tempoReal: boolean = false;
  showConfig: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private preJogoService: PreJogoService,
    public config: ConfigService,
    public globals: Globals,
    private tokenHelper: TokenHelper,
    private errorHelper: ErrorHelper,
  ){ }

  ngOnInit() {
    this.preJogoService.consultar().subscribe(preJogo => {
      if (preJogo !== null){
        this.tempoReal = true;
      } else {
        this.tempoReal = false;
      }
    }, error => {
      if (error.status != 440){
        console.log('erro na chamada do tempo real', error);
      }
    });

    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = currentUser && currentUser.token;

    if (this.tokenHelper.isTokenExpired(token)) {
      this.router.navigate(['/login'], { queryParams: { expired: true } });
    } 
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
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
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
