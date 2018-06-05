import { Component, OnInit } from '@angular/core';
import { PreJogoService } from '../../services/pre-jogo.service';
import { ConfigService } from '../../services/config.service';
import { JogadorService } from '../../services/jogador.service';

@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  providers: [PreJogoService, JogadorService, ConfigService],
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit {
  preJogo: any = null
  jogadores: any = null;
  jogadoresNoJogo: any = [];
  mensagem: string = null;
  erro: string = null;

  constructor(private preJogoService: PreJogoService
             ,private jogadorService: JogadorService
             ,private config: ConfigService) { }

  ngOnInit() {
    this.listarJogadores();
  }

  listarJogadores(){
    this.jogadorService.lista()
        .subscribe(jogs => this.jogadores = jogs);
  }

  consultar(){
    this.limpaMensagens();
    this.preJogo = null;
    this.preJogoService.consultar()
        .subscribe((preJogo) => this.preJogo = preJogo);
  }

  limpaMensagens(){
    this.mensagem = null;
    this.erro = null;
  }

  salvar(){

  }

  mostraErro(err){
    if (err.error.message){
      this.erro = `Erro: ${err.error.message}`;
    } else if (err.error.errmsg){
      this.erro = `Erro: ${err.error.errmsg}`;
    }
  }

  mostraSucesso(mensagem){
    this.mensagem = mensagem;
    this.consultar();
    this.listarJogadores();
    this.jogadoresNoJogo = [];
  }

}
