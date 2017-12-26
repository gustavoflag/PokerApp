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

  constructor(private jogadorService: JogadorService){ }

  ngOnInit() {
    this.jogadorService.classificacao().subscribe(jogs => this.jogadores = jogs);
  }

}
