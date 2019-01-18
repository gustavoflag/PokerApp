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
  mesas: any = [-1];
  lateRegister: boolean = false;
  isLoading: boolean = false;

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
    var qtdEliminados = this.participantes.filter((par) => par.eliminado).length;

    if (this.parametro.jogadoresRedraw
        && (!this.preJogo.sorteado
            || (qtdEliminados > 0 && this.parametro.jogadoresRedraw === qtdRestantes))){
            return true;
    }

    return false;
  }

  consultar(){
    this.preJogoService.consultar()
        .subscribe((preJogo) => {
            this.preJogo = preJogo;
            this.participantes = preJogo.participantes;
            this.mesas = new Array(preJogo.qtdMesas);
            this.isLoading = false;
          });
  }

  limpaMensagens(){
    this.mensagem = null;
    this.erro = null;
  }

  salvar(){
    var dataAgora = new Date();
    this.isLoading = true;

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
      this.isLoading = true;

      this.preJogoService.cancelar()
        .subscribe((preJogoSalvo) => {
                      this.mostraSucesso("Pré Jogo cancelado!");
                      this.preJogo = null;
                      this.mesas = [-1];
                      this.removerTodos();
                      this.isLoading = false;
                   },
                   (err) => {
                      this.mostraErro(err);
                   });
    }
  }

  sortear(){
    if (confirm('Deseja realizar o sorteio?')){
      this.isLoading = true;
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
      this.isLoading = true;
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
    this.isLoading = true;
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

  pago(jogador){
    jogador.pago = !jogador.pago;

    this.alterar(jogador);
  }

  maisRebuy(jogador){
    jogador.rebuy++;

    this.alterar(jogador);
  }

  adicionar(jogador){
    if (this.lateRegister){
      this.isLoading = true;
      this.preJogoService.adicionarJogador({ nomeJogador: jogador.nome, rebuy: 0, eliminado: false })
        .subscribe((preJogoSalvo) => {
                      this.lateRegister = false;
                      this.mostraSucesso(preJogoSalvo.message);
                      this.consultar();
                   },
                   (err) => {
                      this.mostraErro(err);
                   });
    } else {
      this.jogadoresNoJogo.push(jogador);

      var indexRemove = this.jogadores.indexOf(jogador);
      this.jogadores.splice(indexRemove, 1);

      this.participantes.push({ nomeJogador: jogador.nome, rebuy: 0, eliminado: false });
    }
  }

  remover(jogador){
    if (!this.preJogo){
      var index = this.participantes.indexOf(jogador);

      this.jogadores.push(this.jogadoresNoJogo[index]);
      this.jogadoresNoJogo.splice(index, 1);
      this.participantes.splice(index, 1);
    } else {
      if (confirm('Deseja realmente excluir o jogador?')){
        this.isLoading = true;
        this.preJogoService.excluirJogador(jogador)
          .subscribe((preJogoSalvo) => {
                        this.consultar();
                     },
                     (err) => {
                        this.mostraErro(err);
                     });
      }
    }
  }

  getMesa(indMesa){
    return this.participantes.filter((p) => p.mesa === indMesa || !p.mesa);
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
