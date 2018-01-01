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

  constructor(private jogadorService: JogadorService){ }

  ngOnInit() {
    this.rookies = false;
    this.listarGeral();
  }

  listarGeral() {
    this.jogadorService.classificacao().subscribe(jogs => this.jogadores = jogs);
  }

  listarRookies() {
    this.jogadorService.classificacaoRookies().subscribe(jogs => this.jogadores = jogs);
  }

  altRookies(){
    this.rookies = !this.rookies;

    if (!this.rookies){
      this.listarGeral();
    } else {
      this.listarRookies();
    }
  }
}
