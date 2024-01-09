import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../app.globals';
import { ErrorHelper } from '../../helpers/error.helper';
import { CaixaService, ConfigService } from '../../services';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  providers: [CaixaService],
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {
  contas: any[] = [
    {
      conta: 'premio',
      nome: 'Prêmio',
      lancamentosCaixa: [],
      saldoAtual: 0
    }, 
    {
      conta: 'caixa',
      nome: 'Logística',
      lancamentosCaixa: [],
      saldoAtual: 0
    },
    {
      conta: 'limpeza',
      nome: 'Limpeza',
      lancamentosCaixa: [],
      saldoAtual: 0
    }
  ];

  //lancamentosCaixa: any = null;
  lancamentoEdicao: any = null;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(
    private caixaService: CaixaService,
    private router: Router,
    public config: ConfigService,
    public globals: Globals,
    private errorHelper: ErrorHelper,
  ){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
  }

  novo(conta: string){
    this.limpaMensagens();
    this.lancamentoEdicao = { conta };
  }

  editar(lancamentoEdit: any){
    this.limpaMensagens();
    this.lancamentoEdicao = lancamentoEdit;
  }

  listar(){
    this.globals.isLoading = true;
    this.lancamentoEdicao = null;
    this.contas.forEach((conta) => {
      this.caixaService.listar(conta.conta)
      .subscribe((lctos: any) => { 
        conta.lancamentosCaixa = lctos; 
        this.globals.isLoading = false;
        conta.saldoAtual = this.calcularSaldo(lctos);
      }, error => this.errorHelper.handle(error));
    })
   
  }

  salvar(){
    this.limpaMensagens();
    if (this.lancamentoEdicao._id){
      this.alterar();
    }else{
      this.inserir();
    }
  }

  inserir(){
    this.globals.isLoading = true;
    this.caixaService.inserir(this.lancamentoEdicao).subscribe(
      data => this.mostraSucesso("Lançamento inserido com sucesso!"),
      err => this.mostraErro(err));
  }

  alterar(){
    this.globals.isLoading = true;
    this.caixaService.alterar(this.lancamentoEdicao).subscribe(
      data => { this.mostraSucesso("Lançamento alterado com sucesso!"); this.globals.isLoading = false; },
      err => this.mostraErro(err));
  }

  excluir(lancamentoExcluir: any){
    this.globals.isLoading = true;
    var confirmado = confirm("Deseja mesmo excluir esse Lançamento?");
    if (confirmado){
      this.limpaMensagens();
      this.caixaService.excluir(lancamentoExcluir).subscribe(
        data => { this.mostraSucesso("Lançamento excluído com sucesso!"); this.globals.isLoading = false; },
        err => this.mostraErro(err));
    }
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

    this.globals.isLoading = false;
  }

  mostraSucesso(mensagem: any){
    this.mensagem = mensagem;
    this.listar();
  }

  calcularSaldo(lancamentosCaixa: any[]): number {
    var saldo = 0;

    lancamentosCaixa.forEach(function (lancamento: any){
      saldo += lancamento.valor;
    });

    return saldo;
  }
}
