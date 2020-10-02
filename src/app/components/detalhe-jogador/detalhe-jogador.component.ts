import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { JogoService } from '../../services/jogo.service';
import { ConfigService } from '../../services/config.service';
import { Globals } from '../../app.globals';
//import { ChartDataSets, ChartOptions } from 'chart.js';
//import { Color } from 'ng2-charts';

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

  height: number = 1;
  width: number = 4;

   /*
  public lineChartData: ChartDataSets[];
  public lineChartLabels: any[];

  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Pontos'
         }
      }],
      xAxes: [{
        scaleLabel: {
           display: true,
           labelString: 'Etapa'
        }
     }]
   }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#f89406',
      backgroundColor: 'rgba(255,0,0,0)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0)',
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  */

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

  consultar(idJogador){
    this.globals.isLoading = true;
    this.jogadorService.consultar(idJogador)
        .subscribe(jogador => { 
          this.jogador = jogador; 
          this.globals.isLoading = false; 

          // this.lineChartLabels = [];
          // var pontuacoes = [];

          // this.jogador.pontuacaoEtapas.forEach(etapa => {
          //   this.lineChartLabels.push(etapa.etapa.toString());
          //   pontuacoes.push(etapa.pontos);
          // });

          // console.log('pontuacoes', pontuacoes);

          // this.lineChartData = [
          //   { data: pontuacoes, label: 'Pontos', lineTension: 0 }
          // ];

        });
  }
}
