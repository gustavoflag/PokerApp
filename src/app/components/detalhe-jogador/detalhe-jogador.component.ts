import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-detalhe-jogador',
  templateUrl: './detalhe-jogador.component.html',
  providers: [JogadorService, ConfigService],
  styleUrls: ['./detalhe-jogador.component.css']
})
export class DetalheJogadorComponent implements OnInit {
  idJogador: any = null;
  jogador: any = null;

  constructor(private activatedRoute: ActivatedRoute
             ,private jogadorService: JogadorService
             ,public config:ConfigService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idJogador = params['id'];

      if (this.idJogador)
        this.consultar(this.idJogador);
    });
  }

  consultar(idJogador){
    this.jogadorService.consultar(idJogador)
        .subscribe(jogador => { this.jogador = jogador });
  }
}
