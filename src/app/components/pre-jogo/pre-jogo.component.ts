import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreJogoService } from '../../services/pre-jogo.service';
import { ConfigService } from '../../services/config.service';
import { JogadorService } from '../../services/jogador.service';
import { ParametroService } from '../../services/parametro.service';
import { Globals } from '../../app.globals';
import { ErrorHelper } from '../../helpers/error.helper';
import { Subscription } from 'rxjs';
import { RelogioService } from '../../services/relogio.service';

@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  providers: [PreJogoService, JogadorService, ConfigService, ParametroService, RelogioService],
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit, OnDestroy {
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
  tempo: string;

  estruturaRelogio: any = null;
  segundosRelogio: number;
  minutosRelogio: number;
  nivelAtualRelogio: any = null;
  statusRelogio: string;

  listarEstruturaSubscription: Subscription;
  consultarRelogioSubscription: Subscription;

  constructor(
    private preJogoService: PreJogoService,
    private jogadorService: JogadorService,
    private parametroService: ParametroService,
    private router: Router,
    private config: ConfigService,
    public globals: Globals,
    private errorHelper: ErrorHelper,
    private relogioService: RelogioService,
  ) { }

  ngOnInit() {
    this.consultar();
    this.listarJogadores();
    this.consultarParametro();

    this.logado = this.config.usuarioLogado();

    this.listarEstrutura();

    setInterval(() => {
      this.consultarRelogio();
    }, 500);

    //this.mostraRelogio();
  }

  ngOnDestroy(): void {
    if (this.listarEstruturaSubscription)
      this.listarEstruturaSubscription.unsubscribe();

    if (this.consultarRelogioSubscription)
      this.consultarRelogioSubscription.unsubscribe();
  }

  listarEstrutura(){
    this.globals.isLoading = true;
    this.listarEstruturaSubscription = this.relogioService.listarEstrutura()
        .subscribe(estrutura => { 
          this.estruturaRelogio = estrutura; 
          this.globals.isLoading = false;
        });
  }

  consultarRelogio(){
    this.consultarRelogioSubscription = this.relogioService.consultar()
        .subscribe(relogio => { 
          var secsAtual;

          if (relogio.inicioRelogio){
              var agora = Math.floor(Date.now() / 1000);
              var span_secs = (agora - relogio.inicioRelogio);

              secsAtual = span_secs + relogio.segundos;
          } else {
              secsAtual = relogio.segundos;
          } 

          this.nivelAtualRelogio = this.getNivel(secsAtual);

          var elapsed_secs = (secsAtual - this.nivelAtualRelogio.segsInicio);

          var curr_secs = this.nivelAtualRelogio.segs - elapsed_secs;

          this.minutosRelogio = (Math.floor(curr_secs / 60));
          this.segundosRelogio = (curr_secs % 60);
          this.statusRelogio = relogio.status;
        });
  }

  listarJogadores(){
    this.globals.isLoading = true;
    this.jogadorService.lista()
        .subscribe((jogs) => { 
          this.jogadores = jogs; 
          this.globals.isLoading = false; 
        }, error => this.errorHelper.handle(error));
  }

  consultarParametro(){
    this.parametroService.consultar()
        .subscribe(parametro => this.parametro = parametro
                  ,error => this.errorHelper.handle(error));
  }

  jogadoresRestantes() : number{
    return this.participantes.filter((par) => !par.eliminado).length;
  }

  stackTotal() : number{
    const qtdRebuys = this.participantes.reduce((qtd, par) => qtd += par.rebuy, 0);

    return (this.participantes.length * this.parametro.qtdFichasBuyIn)
        + (qtdRebuys * this.parametro.qtdFichasBuyIn)
        + (this.participantes.filter((par) => par.timeChip).length * this.parametro.qtdFichasTimeChip);
  }

  stackMedio() : number{
    const jogadoresRestantes = this.jogadoresRestantes();

    return jogadoresRestantes > 0 ? this.stackTotal() / jogadoresRestantes : 0;
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
            this.globals.isLoading = false;
          }, error => {
            if (error.error.message != "Pré jogo não encontrado"){
              this.errorHelper.handle(error);
            }
          });
  }

  limpaMensagens(){
    this.mensagem = null;
    this.erro = null;
  }

  salvar(){
    var dataAgora = new Date();
    this.globals.isLoading = true;

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
      this.globals.isLoading = true;

      this.preJogoService.cancelar()
        .subscribe((preJogoSalvo) => {
                      this.mostraSucesso("Pré Jogo cancelado!");
                      this.preJogo = null;
                      this.mesas = [-1];
                      this.removerTodos();
                      this.globals.isLoading = false;
                   },
                   (err) => {
                      this.mostraErro(err);
                   });
    }
  }

  sortear(){
    if (confirm('Deseja realizar o sorteio?')){
      this.globals.isLoading = true;
      var qtdEliminados = this.participantes.filter((par) => par.eliminado).length;
      this.preJogoService.sortear(qtdEliminados > 0)
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
      this.globals.isLoading = true;
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
    this.globals.isLoading = true;
    this.preJogoService.alterar(jogador)
      .subscribe((preJogoSalvo) => {
                    this.consultar();
                    this.limpaMensagens();
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

  timeChip(jogador){
    jogador.timeChip = !jogador.timeChip;

    this.alterar(jogador);
  }

  pontoExtra(jogador){
    jogador.pontoExtra = !jogador.pontoExtra;

    this.alterar(jogador);
  }

  maisRebuy(jogador){
    jogador.rebuy++;

    this.alterar(jogador);
  }

  adicionar(jogador){
    if (this.lateRegister){
      this.globals.isLoading = true;
      this.preJogoService.adicionarJogador({ nomeJogador: jogador.nome, rebuy: 0, eliminado: false, qtdVezesDealer: jogador.qtdVezesDealer, socio: jogador.socio })
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

      this.participantes.push({ nomeJogador: jogador.nome, rebuy: 0, eliminado: false, qtdVezesDealer: jogador.qtdVezesDealer, socio: jogador.socio });
    }
  }

  incluirRegulares(){
    var socios = this.jogadores.filter(jog => jog.socio);

    if (socios.length > 0){
      socios.forEach(socio => {
        this.adicionar(socio);
      });
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
        this.globals.isLoading = true;
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
    this.globals.isLoading = false;
  }

  mostraSucesso(mensagem){
    this.mensagem = mensagem;
    this.globals.isLoading = false;
  }

  getNivel(segs){
    let nivelAtual;

    if (this.estruturaRelogio){
        this.estruturaRelogio.every(nivel => {
            if (nivel.segsFim < segs){
                return true;
            } else {
                nivelAtual = nivel;
                return false
            }
        });
    }

    return nivelAtual;
  }

}
