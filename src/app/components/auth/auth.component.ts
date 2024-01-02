import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../../app.globals';
import { map } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  providers: [AuthService],
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  model: any = {};
  erro: string = '';
  loading = false;
  mensagem: string | null = null;

  constructor(
     private authService: AuthService
    ,private router: Router
    ,public globals: Globals
    ,private activatedRoute: ActivatedRoute
  ) { 
    activatedRoute.queryParams.pipe(map(p => p['expired'])).subscribe(expired => {
      if (expired) {
        this.mensagem = 'Sua sessão expirou, faça login novamente.';
      }
    });
  }

  ngOnInit(){
  }

  login(){
    this.globals.isLoading = true;
    this.authService.login(this.model.usuario, this.model.senha)
        .subscribe(
          (data) => {
            console.log(data);
            let token = data && data.token;

            if (token)
                localStorage.setItem('currentUser', JSON.stringify({ login: this.model.usuario, token: token }));

            this.globals.isLoading = false;

            this.router.navigate(['/']);
          },
          (err) => {
            this.erro = err.error.message;
            this.globals.isLoading = false;
          });
  }
}
