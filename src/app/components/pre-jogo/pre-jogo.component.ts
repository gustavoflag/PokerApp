import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Globals } from '../../app.globals';
import { ErrorHelper } from '../../helpers/error.helper';
import { Subscription } from 'rxjs';
import { 
  JogadorService, 
  PreJogoService, 
  ParametroService, 
  ConfigService, 
  RelogioService 
} from '../../services';
@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  providers: [PreJogoService, JogadorService, ParametroService, RelogioService],
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit, OnDestroy {
  preJogo: any = null;
  jogadores: any = null;
  jogadoresNoJogo: any = [];
  participantes: any = [];
  mensagem: string | null = null;
  erro: string | null = null;
  parametro: any = null;
  logado: boolean = false;
  mesas: any = [-1];
  lateRegister: boolean = false;
  tempo: string = '';

  consultaRelogioInterval: any = null;
  estruturaRelogio: any = null;
  segundosRelogio: number | null = null;
  minutosRelogio: number | null = null;
  nivelAtualRelogio: any = null;
  statusRelogio: string | null = null;
  premiacaoPrimeiro: number | null = null;
  premiacaoSegundo: number | null = null;
  premiacaoTerceiro: number | null = null;
  valorMaleta: number | null = null;

  listarEstruturaSubscription: Subscription | null = null;
  consultarRelogioSubscription: Subscription | null = null;

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
    this.logado = this.config.usuarioLogado();

    var indiceRelogio = 1;

    // this.consultaRelogioInterval = setInterval(() => {
    //   this.consultarRelogio(indiceRelogio);
    //   indiceRelogio++;
    //   if (indiceRelogio === 10) {
    //     indiceRelogio = 0;
    //   }
    // }, 500);
  }

  ngOnDestroy(): void {
    if (this.consultaRelogioInterval)
      clearInterval(this.consultaRelogioInterval);

    if (this.listarEstruturaSubscription)
      this.listarEstruturaSubscription.unsubscribe();

    if (this.consultarRelogioSubscription)
      this.consultarRelogioSubscription.unsubscribe();
  }

  listarEstrutura() {
    this.listarEstruturaSubscription = this.relogioService.listarEstrutura()
      .subscribe(estrutura => {
        this.estruturaRelogio = estrutura;
      });
  }

  consultarRelogio(indice: number) {
    this.consultarRelogioSubscription = this.relogioService.consultar(indice)
      .subscribe(relogio => {
        var secsAtual;

        if (relogio.inicioRelogio) {
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

  jogadoresRestantes(): number {
    return this.participantes.filter((par: any) => !par.eliminado).length;
  }

  stackTotal(): number {
    if (!this.parametro) {
      return 0;
    }

    const qtdRebuys = this.participantes.reduce((qtd: any, par: any) => qtd += par.rebuy, 0);

    return (this.participantes.length * this.parametro.qtdFichasBuyIn)
      + (qtdRebuys * this.parametro.qtdFichasBuyIn)
      + (this.participantes.filter((par: any) => par.timeChip).length * this.parametro.qtdFichasTimeChip);
  }

  stackMedio(): number {
    const jogadoresRestantes = this.jogadoresRestantes();

    return jogadoresRestantes > 0 ? this.stackTotal() / jogadoresRestantes : 0;
  }

  temRedraw(): boolean {
    if (!this.parametro) {
      return false;
    }

    var qtdRestantes = this.jogadoresRestantes();
    var qtdEliminados = this.participantes.filter((par: any) => par.eliminado).length;

    if (this.parametro.jogadoresRedraw
      && (!this.preJogo.sorteado
        || (qtdEliminados > 0 && this.parametro.jogadoresRedraw === qtdRestantes))) {
      return true;
    }

    return false;
  }

  consultar() {
    this.globals.isLoading = true;
    this.listarEstrutura();
    this.parametroService.consultar()
      .subscribe(parametro => { 
        this.parametro = parametro

        this.preJogoService.consultar()
          .subscribe((preJogo) => {
            this.jogadorService.lista()
              .subscribe((jogs: any) => {
                this.jogadores = jogs;
                this.globals.isLoading = false;
              }, error => this.errorHelper.handle(error));

            if (preJogo){
              this.preJogo = preJogo;
              this.participantes = preJogo.participantes;
              this.mesas = new Array(preJogo.qtdMesas);
              if (preJogo.estimativaPremio) {
                this.premiacaoPrimeiro = preJogo.estimativaPremio.premiacaoPrimeiro;
                this.premiacaoSegundo = preJogo.estimativaPremio.premiacaoSegundo;
                this.premiacaoTerceiro = preJogo.estimativaPremio.premiacaoTerceiro ? preJogo.estimativaPremio.premiacaoTerceiro : 0;
                this.valorMaleta = preJogo.estimativaPremio.valorMaleta;
              } else {
                this.premiacaoPrimeiro = 0;
                this.premiacaoSegundo = 0;
                this.premiacaoTerceiro = 0;
                this.valorMaleta = 0;
              }
            }
          }, error => {
            if (error.error.message != "Pré jogo não encontrado") {
              this.errorHelper.handle(error);
            }
          });
        }
        , error => this.errorHelper.handle(error));
  }

  limpaMensagens() {
    this.mensagem = null;
    this.erro = null;
  }

  salvar() {
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

  cancelar() {
    if (confirm('Deseja mesmo cancelar?')) {
      this.globals.isLoading = true;

      this.preJogoService.cancelar(this.preJogo)
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

  sortear() {
    if (confirm('Deseja realizar o sorteio?')) {
      this.globals.isLoading = true;
      var qtdEliminados = this.participantes.filter((par: any) => par.eliminado).length;
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

  finalizar() {
    if (confirm('Deseja finalizar o jogo?')) {
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

  alterar(jogador: any) {
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

  alterarDealer(jogador: any) {
    this.globals.isLoading = true;
    this.preJogoService.alterarDealer(jogador)
      .subscribe((preJogoSalvo) => {
        this.consultar();
        this.limpaMensagens();
      },
        (err) => {
          this.mostraErro(err);
        });
  }

  eliminar(jogador: any) {
    jogador.eliminado = !jogador.eliminado;
    if (jogador.eliminado) {
      jogador.lugar = this.participantes.filter((par: any) => !par.eliminado).length + 1;
    } else {
      jogador.lugar = null;
    }

    this.alterar(jogador);
  }

  rebuy(jogador: any) {
    jogador.rebuy = (jogador.rebuy > 0 ? 0 : 1);

    this.alterar(jogador);
  }

  pago(jogador: any) {
    jogador.pago = !jogador.pago;

    this.alterar(jogador);
  }

  timeChip(jogador: any) {
    jogador.timeChip = !jogador.timeChip;

    this.alterar(jogador);
  }

  dealer(jogador: any) {
    this.alterarDealer(jogador);
  }

  pontoExtra(jogador: any) {
    jogador.pontoExtra = !jogador.pontoExtra;

    this.alterar(jogador);
  }

  maisRebuy(jogador: any) {
    jogador.rebuy++;

    this.alterar(jogador);
  }

  adicionar(jogador: any) {
    if (this.lateRegister) {
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

  incluirRegulares() {
    var socios = this.jogadores.filter((jog: any) => jog.socio);

    if (socios.length > 0) {
      socios.forEach((socio: any) => {
        this.adicionar(socio);
      });
    }
  }

  remover(jogador: any) {
    if (!this.preJogo) {
      var index = this.participantes.indexOf(jogador);

      this.jogadores.push(this.jogadoresNoJogo[index]);
      this.jogadoresNoJogo.splice(index, 1);
      this.participantes.splice(index, 1);
    } else {
      if (confirm('Deseja realmente excluir o jogador?')) {
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

  getMesa(indMesa: any) {
    return this.participantes.filter((p: any) => p.mesa === indMesa || !p.mesa);
  }

  removerTodos() {
    this.jogadoresNoJogo = [];
    this.participantes = [];
  }

  subir(index: any) {
    var jogAux = this.jogadoresNoJogo[index];
    this.jogadoresNoJogo[index] = this.jogadoresNoJogo[index - 1];
    this.jogadoresNoJogo[index - 1] = jogAux;

    var partAux = this.participantes[index];
    this.participantes[index] = this.participantes[index - 1];
    this.participantes[index - 1] = partAux;

    this.participantes[index].lugar = index + 1;
    this.participantes[index - 1].lugar = index;
  }

  mostraErro(err: any) {
    if (err.error.message) {
      this.erro = `Erro: ${err.error.message}`;
    } else if (err.error.errmsg) {
      this.erro = `Erro: ${err.error.errmsg}`;
    }
    this.globals.isLoading = false;
    setTimeout(() => {
      this.erro = '';
    }, 5000);
  }

  mostraSucesso(mensagem: any) {
    this.mensagem = mensagem;
    this.globals.isLoading = false;
    setTimeout(() => {
      this.mensagem = '';
    }, 5000);
  }

  getNivel(segs: any) {
    let nivelAtual;

    if (this.estruturaRelogio) {
      this.estruturaRelogio.every((nivel: any) => {
        if (nivel.segsFim < segs) {
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
