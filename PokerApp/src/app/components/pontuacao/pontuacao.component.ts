import { Component, OnInit } from '@angular/core';
import { PontuacaoService } from '../../services/pontuacao.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  providers: [PontuacaoService, ConfigService],
  styleUrls: ['./pontuacao.component.css']
})
export class PontuacaoComponent implements OnInit {
  pontuacoes: any = null;

  constructor(private pontuacaoService: PontuacaoService
             ,private router: Router){ }

  ngOnInit() {
    this.pontuacaoService.lista().subscribe(pont => this.pontuacoes = pont);
  }

  insere(){
    this.pontuacaoService.insere(21, 0)
        .subscribe(result => {
            if (result === false) {
                //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                //this.erro = `Usuário ${currentUser.login} logado OK! token: ${currentUser.token}`;
                this.router.navigate(['/login']);
            } else {
                //this.erro = 'Usuário ou senha Inválido!';
                //this.loading = false;
            }
        });
  }
}
