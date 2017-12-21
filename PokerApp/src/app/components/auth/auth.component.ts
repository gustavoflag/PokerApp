import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(){
  }

  login(){
    this.authService.login(this.model.usuario, this.model.senha)
        .subscribe(result => {
            if (result === true) {
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                //this.erro = `Usuário ${currentUser.login} logado OK! token: ${currentUser.token}`;
                //this.router.navigate(['/']);
            } else {
                //this.erro = 'Usuário ou senha Inválido!';
                //this.loading = false;
            }
        });

  }
}
