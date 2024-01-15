import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JogoService, ConfigService, JogadorService } from '../../services';
import { Globals } from '../../app.globals';
import { Jogo } from '../../models/jogo';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  providers: [JogoService, JogadorService],
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  jogos: Jogo[] = [];
  jogoEdicao: any = { data: '28/12/2017' };
  jogadores: any = null;
  jogadoresNoJogo: any = [];
  participantes: any = [];
  mensagem: string | null = null;
  erro: string | null = null;
  loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute
             ,private jogoService: JogoService
             ,private jogadorService: JogadorService
             ,private router: Router
             ,public config:ConfigService
             ,public globals: Globals) { }

  ngOnInit() {
    let idJogo = null;

    this.activatedRoute.params.subscribe((params: Params) => {
      idJogo = params['id'];

      if (idJogo){
        this.consultar(idJogo);
      } else {
        this.listar();
      }
    });
  }

  listar(){
    this.globals.isLoading = true;
    this.limpaMensagens();
    this.jogoEdicao = null;
    this.jogoService.listar()
        .subscribe(jogs => { 
          this.loading = false; 
          this.jogos = jogs; 
          this.globals.isLoading = false; 
        });
  }

  consultar(idJogo: any){
    this.globals.isLoading = true;
    this.limpaMensagens();
    this.jogoEdicao = null;
    this.jogoService.consultar(idJogo)
        .subscribe(jogo => { this.loading = false; this.jogos.push(jogo); this.globals.isLoading = false; });
  }

  listarJogadores(){
    this.globals.isLoading = true;
    this.jogadorService.lista()
        .subscribe(jogs => { this.jogadores = jogs; this.globals.isLoading = false; });
  }

  novo(){
    this.limpaMensagens();
    this.jogoEdicao = { };
    this.listarJogadores();
    //this.router.navigate(['/prejogo']);
  }

  excluir(jogo: any){
    //console.log("jogo:" ,jogo);
    var confirma = confirm('Deseja mesmo excluir esse jogo?');
    if (confirma == true){
      this.globals.isLoading = true;
      this.jogoService.excluir(jogo).subscribe(
        data => { this.mostraSucesso("Jogo excluído com sucesso!"); this.globals.isLoading = false; },
        err => this.mostraErro(err));
    }
  }

  editar(jogo: any){
    /*this.participantes = jogo.participantes;

    this.jogadorService.lista().subscribe(jogs =>
        {
          this.jogadores = jogs;

          jogo.participantes.forEach(function (participante){

          });

        });
      */
  }

  salvar(){
    if (this.loading == false){
      this.loading = true;
      //if (!this.jogoEdicao._id){
        this.inserir();
      /*} else {
        this.alterar();
      }*/
    }
  }

  inserir(){
    this.globals.isLoading = true;
    this.jogoService.inserir({ _id: '', data: this.jogoEdicao.data, participantes: this.participantes }).subscribe(
      data => { this.mostraSucesso("Jogo inserido com sucesso!"); this.globals.isLoading = false; },
      err => this.mostraErro(err));
  }

  alterar(){
    this.globals.isLoading = true;
    this.jogoService.alterar({ _id: this.jogoEdicao._id, data: this.jogoEdicao.data, participantes: this.participantes }).subscribe(
      data => { this.mostraSucesso("Jogo alterado com sucesso!"); this.globals.isLoading = false; },
      err => this.mostraErro(err));
  }

  adicionar(jogador: any){
    this.jogadoresNoJogo.push(jogador);

    var indexRemove = this.jogadores.indexOf(jogador);
    this.jogadores.splice(indexRemove, 1);

    this.participantes.push({ nomeJogador: jogador.nome, lugar: this.jogadoresNoJogo.length, rebuy: 0 });
  }

  remover(index: any){
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

  subir(index: any){
    var jogAux = this.jogadoresNoJogo[index];
    this.jogadoresNoJogo[index] = this.jogadoresNoJogo[index-1];
    this.jogadoresNoJogo[index-1] = jogAux;

    var partAux = this.participantes[index];
    this.participantes[index] = this.participantes[index-1];
    this.participantes[index-1] = partAux;

    this.participantes[index].lugar = index + 1;
    this.participantes[index-1].lugar = index;
  }

  rebuy(participante: any){
    participante.rebuy = (participante.rebuy > 0 ? 0 : 1);
  }

  maisRebuy(participante: any){
    participante.rebuy++;
  }

  limpaMensagens(){
    this.mensagem = null;
    this.erro = null;
  }

  mostraErro(err: any){
    if (err.error.message){
      this.erro = `Erro: ${err.error.message}`;
    } else if (err.error.errmsg){
      this.erro = `Erro: ${err.error.errmsg}`;
    }
    this.loading = false;

    this.globals.isLoading = false;
  }

  mostraSucesso(mensagem: any){
    this.mensagem = mensagem;
    this.listar();
    this.listarJogadores();
    this.jogadoresNoJogo = [];
    this.participantes = [];
  }
}
