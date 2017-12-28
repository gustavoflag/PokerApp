import { Component, OnInit } from '@angular/core';
import { JogoService } from '../../services/jogo.service';
import { ConfigService } from '../../services/config.service';
import { JogadorService } from '../../services/jogador.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  providers: [JogoService, JogadorService, ConfigService],
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  jogos: any = null;
  jogoEdicao: any = { data: '28/12/2017' };
  jogadores: any = null;
  jogadoresNoJogo: any = [];
  participantes: any = [];
  mensagem: string = null;
  erro: string = null;
  loading: boolean = false;

  constructor(private jogoService: JogoService
             ,private jogadorService: JogadorService) { }

  ngOnInit() {
    this.listar();
    this.listarJogadores();
  }

  listar(){
    this.limpaMensagens();
    this.jogoEdicao = null;
    this.jogoService.listar()
        .subscribe(jogs => { this.loading = false; this.jogos = jogs });
  }

  listarJogadores(){
    this.jogadorService.lista()
        .subscribe(jogs => this.jogadores = jogs);
  }

  novo(){
    this.limpaMensagens();
    this.jogoEdicao = { };
  }

  salvar(){
    if (this.loading == false){
      this.loading = true;
      this.jogoService.inserir({ data: this.jogoEdicao.data, participantes: this.participantes }).subscribe(
        data => this.mostraSucesso("Jogo inserido com sucesso!"),
        err => this.mostraErro(err));
    }
  }

  adicionar(jogador){
    this.jogadoresNoJogo.push(jogador);

    var indexRemove = this.jogadores.indexOf(jogador);
    this.jogadores.splice(indexRemove, 1);

    this.participantes.push({ nomeJogador: jogador.nome, lugar: this.jogadoresNoJogo.length });
  }

  remover(index){
    this.jogadores.push(this.jogadoresNoJogo[index]);
    this.jogadoresNoJogo.splice(index, 1);
    this.participantes.splice(index, 1);

    for (var i = 0; i < this.participantes.length; i++){
      this.participantes[i].lugar = i + 1;
    }
  }

  removerTodos(){
    for (var i = 0; i < this.jogadoresNoJogo.length; i++){
      this.jogadores.push(this.jogadoresNoJogo[i]);
    }

    this.jogadoresNoJogo = [];
    this.participantes = [];
  }

  subir(index){
    var jogAux = this.jogadoresNoJogo[index];
    this.jogadoresNoJogo[index] = this.jogadoresNoJogo[index-1];
    this.jogadoresNoJogo[index-1] = jogAux;

    var partAux = this.participantes[index];
    this.participantes[index] = this.participantes[index-1];
    this.participantes[index-1] = partAux;

    this.participantes[index].lugar = index + 1;
    this.participantes[index-1].lugar = index;
  }

  rebuy(participante){
    participante.rebuy = !participante.rebuy;
  }

  limpaMensagens(){
    this.mensagem = null;
    this.erro = null;
  }

  mostraErro(err){
    if (err.error.message){
      this.erro = `Erro: ${err.error.message}`;
    } else if (err.error.errmsg){
      this.erro = `Erro: ${err.error.errmsg}`;
    }
    this.loading = false;
  }

  mostraSucesso(mensagem){
    this.mensagem = mensagem;
    this.listar();
    this.listarJogadores();
    this.jogadoresNoJogo = [];
    this.participantes = [];
  }
}
