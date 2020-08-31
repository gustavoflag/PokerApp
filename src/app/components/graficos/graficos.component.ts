import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { JogadorService } from '../../services/jogador.service';
import { Globals } from '../../app.globals';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { JogoService } from '../../services/jogo.service';
import { ErrorHelper } from '../../helpers/error.helper';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  providers: [JogadorService, ConfigService, JogoService],
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  jogadores: any = [];
  quantidadeJogos: number;
  qtdSelecionados: number = 0;

  public lineChartData: ChartDataSets[] = [{ data: [], label: '', lineTension: 0 }];
  public lineChartLabels: any[] = [];

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
    
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  //

  cores = [
    "#007bff",
    "#6f42c1",
    "#5bc0de",
    "#62c462",
    "#f89406",
    "#ee5f5b",
    "#f8e806",
    "#9cd8eb",
    "#c142a6",
    "#647ab6"];

  constructor(
    private jogadorService: JogadorService,
    private jogoService: JogoService,
    public globals: Globals,
    private errorHelper: ErrorHelper,
  ) {
      this.getQuantidadeJogos();
      this.getJogadores();
  }

  ngOnInit() {
    
  }

  selecionaJogador(jogador){
    if (!jogador.selecionado && this.qtdSelecionados == 10){
      alert('Máximo de 10 jogadores por gráfico');
      return;
    }

    jogador.selecionado = !jogador.selecionado;

    this.lineChartLabels = [];
    var pontuacoes = [];

    for (var i = 0; i <= this.quantidadeJogos; i++){
      this.lineChartLabels.push(i.toString());
    }

    if (jogador.selecionado){
      var cor = this.cores[Math.floor(Math.random() * this.cores.length)];

      this.cores.splice(this.cores.indexOf(cor), 1);

      jogador.corGrafico = cor;

      for (var i = 0; i <= this.quantidadeJogos; i++){
        var etapaIndex = jogador.pontuacaoEtapas.map(function(e){ return e.etapa }).indexOf(i);
        var etapaSelecionada = jogador.pontuacaoEtapas[etapaIndex];
        var pontosEtapa = 0;
        if (!etapaSelecionada){
          if (pontuacoes.length > 0){
            pontosEtapa = pontuacoes[pontuacoes.length - 1];
          }
        } else {
          pontosEtapa = etapaSelecionada.pontos;
        }

        pontuacoes.push(pontosEtapa);
      }

      this.lineChartColors.push({
        borderColor: cor,
        backgroundColor: 'rgba(255,0,0,0)',
      });
  
      if (!this.lineChartData[0].data || this.lineChartData[0].data.length == 0){
        this.lineChartData[0] = { data: pontuacoes, label: jogador.nome, lineTension: 0 };
      } else {
        this.lineChartData.push({ data: pontuacoes, label: jogador.nome, lineTension: 0 });
      }

      this.lineChartLegend = true;
      this.qtdSelecionados++;
    } else {
      if (this.lineChartData.length > 1){
        const index = this.lineChartData.map(function(e) { return e.label; }).indexOf(jogador.nome);
        this.lineChartData.splice(index, 1);
      } else {
        this.lineChartData[0] = { data: [], label: '', lineTension: 0 };
        this.lineChartLegend = false;
      }

      const indexCor = this.lineChartColors.map(function(e) { return e.borderColor; }).indexOf(jogador.corGrafico);
      this.lineChartColors.splice(indexCor, 1);
      this.cores.push(jogador.corGrafico);
      jogador.corGrafico = "#eeeeee";
      this.qtdSelecionados--;
    }
    
  }

  getQuantidadeJogos(){
    this.jogoService.quantidade().subscribe(qtd => { 
      this.quantidadeJogos = qtd;

      this.lineChartLabels = [];
      for (var i = 0; i <= this.quantidadeJogos; i++){
        this.lineChartLabels.push(i.toString());
      }
    }, error => this.errorHelper.handle(error));
  }

  getJogadores(){
    this.globals.isLoading = true;
    this.jogadorService.classificacao().subscribe(jogs => {

      var jogsArray:any = jogs;

      jogsArray.forEach(jogador => {
        if (jogador.pontuacaoEtapas && jogador.pontuacaoEtapas.length > 0){
          this.jogadores.push(jogador);
        }
      });
      
      this.globals.isLoading = false; 
    }, error => this.errorHelper.handle(error));
  }

}
