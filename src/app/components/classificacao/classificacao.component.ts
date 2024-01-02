import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services';
import { Globals } from '../../app.globals';
import { ErrorHelper } from '../../helpers/error.helper';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  providers: [JogadorService],
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent implements OnInit {
  jogadores: any = null;
  rookies: boolean = false;
  ordem: string | null = null;

  constructor(
    private jogadorService: JogadorService,
    public globals: Globals,
    private errorHelper: ErrorHelper){ 
      this.globals.isLoading = true;
  }

  ngOnInit() {
    this.rookies = false;
    this.listarGeral();
  }

  ordenar(ordem: any) {
    this.ordem = ordem;
    this.globals.isLoading = true;

    if (!this.rookies){
      this.jogadorService.classificacaoOrdenada(ordem).subscribe(jogs => { this.jogadores = jogs; this.globals.isLoading = false; });
    } else {
      this.jogadorService.classificacaoRookiesOrdenada(ordem).subscribe(jogs => { this.jogadores = jogs; this.globals.isLoading = false; });
    }
  }

  listarGeral() {
    this.globals.isLoading = true;
    this.jogadorService.classificacao()
      .subscribe(jogs => { 
        this.jogadores = jogs; 
        this.globals.isLoading = false; 
      }, error => this.errorHelper.handle(error));
  }

  listarRookies() {
    this.globals.isLoading = true;
    this.jogadorService.classificacaoRookies()
      .subscribe(jogs => { 
        this.jogadores = jogs; 
        this.globals.isLoading = false; 
      }, error => this.errorHelper.handle(error));
  }

  qtdLugarJogador(jogador: any, lugar: any): Number{
    var historicoJogo = jogador.historicoJogos.find(function(element: any, index: any, array: any) { return element.lugar === lugar });
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

  abreNovaAba(url: any){
    window.open(url, "_blank");
  }
}
