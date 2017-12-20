import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  providers: [JogadorService, ConfigService],
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {
  jogadores: any = null;

  constructor(private jogadorService: JogadorService){ }

  ngOnInit() {
    this.jogadorService.lista().subscribe(jogs => this.jogadores = jogs);
  }
}
