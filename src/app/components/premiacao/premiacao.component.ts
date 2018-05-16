import { Component, OnInit } from '@angular/core';
import { PremiacaoService } from '../../services/premiacao.service';
import { CaixaService } from '../../services/caixa.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-premiacao',
  templateUrl: './premiacao.component.html',
  providers: [CaixaService, PremiacaoService, ConfigService],
  styleUrls: ['./premiacao.component.css']
})
export class PremiacaoComponent implements OnInit {
  premiacoes: any = null;
  premiacaoEdicao: any = null;
  mensagem: string = null;
  erro: string = null;
  saldoCaixa: number = 0;

  constructor(private premiacaoService: PremiacaoService
             ,private caixaService: CaixaService
             ,private router: Router
             ,public config: ConfigService) { }

  ngOnInit() {
   this.limpaMensagens();
   this.listar();
   this.getSaldoCaixa();
  }

  novo(){
   this.limpaMensagens();
   this.premiacaoEdicao = { };
  }

  editar(premiacaoEdit){
   this.limpaMensagens();
   this.premiacaoEdicao = premiacaoEdit;
  }

  listar(){
   this.premiacaoEdicao = null;
   this.premiacaoService.listar()
       .subscribe(pont => this.premiacoes = pont);
  }

  salvar(){
   this.limpaMensagens();
   if (this.premiacaoEdicao._id){
     this.alterar();
   }else{
     this.inserir();
   }
  }

  inserir(){
   this.premiacaoService.inserir(this.premiacaoEdicao).subscribe(
     data => this.mostraSucesso("Premiação inserida com sucesso!"),
     err => this.mostraErro(err));
  }

  alterar(){
   this.premiacaoService.alterar(this.premiacaoEdicao).subscribe(
     data => this.mostraSucesso("Premiação alterada com sucesso!"),
     err => this.mostraErro(err));
  }

  excluir(premiacaoExcluir){
   var confirmado = confirm("Deseja mesmo excluir essa Premiação?");
   if (confirmado){
     this.limpaMensagens();
     this.premiacaoService.excluir(premiacaoExcluir).subscribe(
       data => this.mostraSucesso("Premiação excluída com sucesso!"),
       err => this.mostraErro(err));
   }
  }

  getSaldoCaixa(){
    this.caixaService.saldoCaixa().subscribe(
      saldo => this.saldoCaixa = saldo,
      err => this.mostraErro(err));
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
}
