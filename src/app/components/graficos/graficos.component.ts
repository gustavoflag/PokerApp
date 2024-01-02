import { Component, OnInit } from '@angular/core';
import { Globals } from '../../app.globals';
import { JogoService, JogadorService } from '../../services';
import { ErrorHelper } from '../../helpers/error.helper';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  providers: [JogadorService, JogoService],
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  jogadores: any = [];
  quantidadeJogos: number = 0;
  qtdSelecionados: number = 0;

  public lineChartData: any[] = [{ data: [], label: '', lineTension: 0 }];
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

  selecionaJogador(jogador: any){
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
        var etapaIndex = jogador.pontuacaoEtapas.map(function(e: any){ return e.etapa }).indexOf(i);
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

      const serie = {
        data: pontuacoes,
        label: jogador.nome, 
        lineTension: 0.1,
        fill: false,
        borderColor: cor,
        backgroundColor: cor,
        pointBorderColor: cor,
        pointBackgroundColor: cor,
        radius: 2,
        borderWidth: 3,
      }
  
      if (!this.lineChartData[0].data || this.lineChartData[0].data.length == 0){
        this.lineChartData[0] = serie;
      } else {
        this.lineChartData.push(serie);
      }

      this.qtdSelecionados++;
    } else {
      if (this.lineChartData.length > 1){
        const index = this.lineChartData.map(function(e) { return e.label; }).indexOf(jogador.nome);
        this.lineChartData.splice(index, 1);
      } else {
        this.lineChartData[0] = { data: [], label: '', lineTension: 0 };
      }

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

      jogsArray.forEach((jogador: any) => {
        if (jogador.pontuacaoEtapas && jogador.pontuacaoEtapas.length > 0){
          this.jogadores.push(jogador);
        }
      });
      
      this.globals.isLoading = false; 
    }, error => this.errorHelper.handle(error));
  }

}
