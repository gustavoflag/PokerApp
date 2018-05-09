import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { JogoService } from '../../services/jogo.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-detalhe-jogador',
  templateUrl: './detalhe-jogador.component.html',
  providers: [JogadorService, ConfigService, JogoService],
  styleUrls: ['./detalhe-jogador.component.css']
})
export class DetalheJogadorComponent implements OnInit {
  idJogador: any = null;
  jogador: any = null;
  totalJogos: Number = null;

  constructor(private activatedRoute: ActivatedRoute
             ,private jogadorService: JogadorService
             ,private jogoService: JogoService
             ,public config:ConfigService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idJogador = params['id'];

      if (this.idJogador)
        this.consultar(this.idJogador);

      this.jogoService.quantidade().subscribe(qtd => { this.totalJogos = qtd });
    });
  }

  consultar(idJogador){
    this.jogadorService.consultar(idJogador)
        .subscribe(jogador => { this.jogador = jogador });
  }
}
