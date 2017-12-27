import { Component, OnInit } from '@angular/core';
import { JogoService } from '../../services/jogo.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  providers: [JogoService, ConfigService],
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  jogos: any = null;
  jogoEdicao: any = null;
  mensagem: string = null;
  erro: string = null;

  constructor(private jogoService: JogoService) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.jogoEdicao = null;
    this.jogoService.listar()
        .subscribe(jogs => this.jogos = jogs);
  }

}
