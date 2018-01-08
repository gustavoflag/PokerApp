import { Component, OnInit } from '@angular/core';
import { CaixaService } from '../../services/caixa.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  providers: [CaixaService, ConfigService],
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {
  lancamentosCaixa: any = null;
  lancamentoEdicao: any = null;
  mensagem: string = null;
  erro: string = null;

  constructor(private caixaService: CaixaService
             ,private router: Router
             ,private config: ConfigService){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
  }

  novo(){
    this.limpaMensagens();
    this.lancamentoEdicao = { };
  }

  editar(lancamentoEdit){
    this.limpaMensagens();
    this.lancamentoEdicao = lancamentoEdit;
  }

  listar(){
    this.lancamentoEdicao = null;
    this.caixaService.listar()
        .subscribe(lctos => this.lancamentosCaixa = lctos);
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
    this.caixaService.inserir(this.lancamentoEdicao).subscribe(
      data => this.mostraSucesso("Lançamento inserido com sucesso!"),
      err => this.mostraErro(err));
  }

  alterar(){
    this.caixaService.alterar(this.lancamentoEdicao).subscribe(
      data => this.mostraSucesso("Lançamento alterado com sucesso!"),
      err => this.mostraErro(err));
  }

  excluir(lancamentoExcluir){
    var confirmado = confirm("Deseja mesmo excluir esse Lançamento?");
    if (confirmado){
      this.limpaMensagens();
      this.caixaService.excluir(lancamentoExcluir).subscribe(
        data => this.mostraSucesso("Lançamento excluído com sucesso!"),
        err => this.mostraErro(err));
    }
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
  }

  mostraSucesso(mensagem){
    this.mensagem = mensagem;
    this.listar();
  }

  saldoAtual():Number{
    if (this.lancamentosCaixa){
      var saldo = 0;

      this.lancamentosCaixa.forEach(function (lancamento){
        saldo += lancamento.valor;
      });

      return saldo;
    }
  }
}
