import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { Globals } from '../../app.globals';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-controle-dealer',
  templateUrl: './controle-dealer.component.html',
  providers: [JogadorService, ConfigService],
  styleUrls: ['./controle-dealer.component.css']
})
export class ControleDealerComponent implements OnInit {
  jogadores: any = null;
  minimoVezesDealer: number = 999;

  constructor(private jogadorService: JogadorService
    ,public globals: Globals){ }

  ngOnInit() {
    this.globals.isLoading = true;
    this.jogadorService.classificacaoOrdenada('D')
      .subscribe(jogs => { 
          this.jogadores = jogs; 
          this.globals.isLoading = false;

          this.minimoVezesDealer = this.jogadores.reduce((min, par) => par.qtdVezesDealer < min ? par.qtdVezesDealer : min, this.jogadores[0].qtdVezesDealer);
      });
  }

}
