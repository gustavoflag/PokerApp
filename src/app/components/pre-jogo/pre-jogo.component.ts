import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PreJogoService } from '../../services/pre-jogo.service';
import { ConfigService } from '../../services/config.service';
import { JogadorService } from '../../services/jogador.service';
import { ParametroService } from '../../services/parametro.service';

@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  providers: [PreJogoService, JogadorService, ConfigService, ParametroService],
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit {
  preJogo: any = null;
  jogadores: any = null;
  jogadoresNoJogo: any = [];
  participantes: any = [];
  mensagem: string = null;
  erro: string = null;
  parametro: any = null;
  logado: boolean;

  constructor(private preJogoService: PreJogoService
             ,private jogadorService: JogadorService
             ,private parametroService: ParametroService
             ,private router: Router
             ,private config: ConfigService) { }

  ngOnInit() {
    this.consultar();
    this.listarJogadores();
    this.consultarParametro();

    this.logado = this.config.usuarioLogado();
  }

  listarJogadores(){
    this.jogadorService.lista()
        .subscribe((jogs) => this.jogadores = jogs);
  }

  consultarParametro(){
    this.parametroService.consultar()
        .subscribe((parametro) => this.parametro = parametro);
  }

  jogadoresRestantes() : number{
    return this.participantes.filter((par) => !par.eliminado).length;
  }

  temRedraw() : boolean{
    var qtdRestantes = this.jogadoresRestantes();

    if (this.parametro.jogadoresRedraw
        && (this.participantes.filter((par) => par.eliminado).length === 0
            || this.parametro.jogadoresRedraw === qtdRestantes)){
            return true;
    }

    return false;
  }

  consultar(){
    this.preJogoService.consultar()
        .subscribe((preJogo) => {
            this.preJogo = preJogo;
            this.participantes = preJogo.participantes;
          });
  }

  limpaMensagens(){
    this.mensagem = null;
    this.erro = null;
  }

  salvar(){
    var dataAgora = new Date();

    this.preJogoService.inserir({ data: dataAgora, participantes: this.participantes })
      .subscribe((preJogoSalvo) => {
                    this.mostraSucesso("Pré Jogo salvo com sucesso!");
                    this.consultar();
                 },
                 (err) => {
                    this.mostraErro(err);
                 });
  }

  cancelar(){
    if (confirm('Deseja mesmo cancelar?')){
      this.preJogoService.cancelar()
        .subscribe((preJogoSalvo) => {
                      this.mostraSucesso("Pré Jogo cancelado!");
                      this.consultar();
                   },
                   (err) => {
                      this.mostraErro(err);
                   });
    }
  }

  sortear(){
    if (confirm('Deseja realizar o sorteio?')){
      this.preJogoService.sortear()
        .subscribe((preJogoSalvo) => {
                      this.mostraSucesso("Sorteio realizado!");
                      this.consultar();
                   },
                   (err) => {
                      this.mostraErro(err);
                   });
    }
  }

  finalizar(){
    if (confirm('Deseja finalizar o jogo?')){
      this.preJogoService.gerarJogo()
        .subscribe((preJogoSalvo) => {
                      this.router.navigate(['/jogo']);
                   },
                   (err) => {
                      this.mostraErro(err);
                   });
    }
  }

  alterar(jogador){
    this.preJogoService.alterar(jogador)
      .subscribe((preJogoSalvo) => {
                    this.consultar();
                 },
                 (err) => {
                    this.mostraErro(err);
                 });
  }

  eliminar(jogador){
    jogador.eliminado = !jogador.eliminado;
    if (jogador.eliminado){
      jogador.lugar = this.participantes.filter((par) => !par.eliminado).length + 1;
    } else {
      jogador.lugar = null;
    }

    this.alterar(jogador);
  }

  rebuy(jogador){
    jogador.rebuy = (jogador.rebuy > 0 ? 0 : 1);

    this.alterar(jogador);
  }

  maisRebuy(jogador){
    jogador.rebuy++;

    this.alterar(jogador);
  }

  adicionar(jogador){
    this.jogadoresNoJogo.push(jogador);

    var indexRemove = this.jogadores.indexOf(jogador);
    this.jogadores.splice(indexRemove, 1);

    this.participantes.push({ nomeJogador: jogador.nome, rebuy: 0, eliminado: false });
  }

  remover(index){
    if (!this.preJogo){
      this.jogadores.push(this.jogadoresNoJogo[index]);
      this.jogadoresNoJogo.splice(index, 1);
      this.participantes.splice(index, 1);
    } else {
      if (confirm('Deseja realmente excluir o jogador?')){
        this.preJogoService.excluirJogador(this.participantes[index])
          .subscribe((preJogoSalvo) => {
                        this.consultar();
                     },
                     (err) => {
                        this.mostraErro(err);
                     });
      }
    }
  }

  removerTodos(){
    this.jogadoresNoJogo = [];
    this.participantes = [];

    this.listarJogadores();
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


  mostraErro(err){
    if (err.error.message){
      this.erro = `Erro: ${err.error.message}`;
    } else if (err.error.errmsg){
      this.erro = `Erro: ${err.error.errmsg}`;
    }
  }

  mostraSucesso(mensagem){
    this.mensagem = mensagem;
  }

}
