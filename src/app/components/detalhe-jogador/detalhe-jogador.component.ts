import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { JogoService } from '../../services/jogo.service';
import { ConfigService } from '../../services/config.service';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-detalhe-jogador',
  templateUrl: './detalhe-jogador.component.html',
  providers: [JogadorService, ConfigService, JogoService],
  styleUrls: ['./detalhe-jogador.component.css']
})
export class DetalheJogadorComponent implements OnInit {
  idJogador: any = null;
  jogador: any = null;
  totalJogos: number = 0;

  height: number = 1;
  width: number = 4;

  public lineChartData: any[] = [];
  public lineChartLabels: any[] = [];

  public lineChartOptions: (any) = {
    responsive: true,
    scales: {
      y: {
         title: {
            display: true,
            text: 'Pontos'
         }
      },
      x: {
        title: {
           display: true,
           text: 'Etapa'
        }
     }
   }
  };

  constructor(private activatedRoute: ActivatedRoute
             ,private jogadorService: JogadorService
             ,private jogoService: JogoService
             ,public config:ConfigService
             ,public globals: Globals) { 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idJogador = params['id'];

      if (this.idJogador)
        this.consultar(this.idJogador);

      this.jogoService.quantidade().subscribe(qtd => { this.totalJogos = qtd });
    });
  }

  consultar(idJogador: any){
    this.globals.isLoading = true;
    this.jogadorService.consultar(idJogador)
        .subscribe(jogador => { 
          this.jogador = jogador; 
          this.globals.isLoading = false; 

          this.lineChartLabels = [];
          var pontuacoes: any = [];

          this.jogador.pontuacaoEtapas.forEach((etapa: any) => {
            this.lineChartLabels.push(etapa.etapa.toString());
            pontuacoes.push(etapa.pontos);
          });

          this.lineChartData = [
            { 
              data: pontuacoes, 
              label: 'Pontos', 
              lineTension: 0.1,
              fill: false,
              borderColor: '#f89406',
              backgroundColor: '#f89406',
              pointBorderColor: '#f89406',
              pointBackgroundColor: '#f89406',
              radius: 2,
              borderWidth: 3,
            }
          ];

        });
  }
}
