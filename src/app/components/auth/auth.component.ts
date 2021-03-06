import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  providers: [AuthService, ConfigService],
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  model: any = {};
  erro: string = '';
  loading = false;

  constructor(private authService: AuthService
             ,private router: Router
             ,public globals: Globals) { }

  ngOnInit(){
  }

  login(){
    this.globals.isLoading = true;
    this.authService.login(this.model.usuario, this.model.senha)
        .subscribe(
          (data) => {
            //console.log(data);
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
