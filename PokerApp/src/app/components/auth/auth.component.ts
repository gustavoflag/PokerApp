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
                this.erro = 'Usuário ou senha OK!';
                //this.router.navigate(['/']);
            } else {
                this.erro = 'Usuário ou senha inválido';
                //this.loading = false;
            }
        });

  }
}
