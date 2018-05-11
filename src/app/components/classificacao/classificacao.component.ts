import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  providers: [JogadorService, ConfigService],
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {
  jogadores: any = null;
  rookies: boolean = false;
  ordem: string = null;

  constructor(private jogadorService: JogadorService){ }

  ngOnInit() {
    this.rookies = false;
    this.listarGeral();
  }

  ordenar(ordem) {
    this.ordem = ordem;

    if (!this.rookies){
      this.jogadorService.classificacaoOrdenada(ordem).subscribe(jogs => this.jogadores = jogs);
    } else {
      this.jogadorService.classificacaoRookiesOrdenada(ordem).subscribe(jogs => this.jogadores = jogs);
    }
  }

  listarGeral() {
    this.jogadorService.classificacao().subscribe(jogs => this.jogadores = jogs);
  }

  listarRookies() {
    this.jogadorService.classificacaoRookies().subscribe(jogs => this.jogadores = jogs);
  }

  qtdLugarJogador(jogador, lugar): Number{
    var historicoJogo = jogador.historicoJogos.find(function(element, index, array) { return element.lugar === lugar });
    if (historicoJogo)
      return historicoJogo.quantidade;
    else
      return 0;
  }

  altRookies(){
    this.rookies = !this.rookies;
    this.ordem = null;

    if (!this.rookies){
      this.listarGeral();
    } else {
      this.listarRookies();
    }
  }
}
