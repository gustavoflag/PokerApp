import { Component, OnInit } from '@angular/core';
import { PontuacaoService } from '../../services/pontuacao.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  providers: [PontuacaoService, ConfigService],
  styleUrls: ['./pontuacao.component.css']
})
export class PontuacaoComponent implements OnInit {
  pontuacoes: any = null;
  pontuacaoEdicao: any = null;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(private pontuacaoService: PontuacaoService
             ,private router: Router
             ,public config: ConfigService
             ,public globals: Globals){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
  }

  novo(){
    this.limpaMensagens();
    this.pontuacaoEdicao = { };
  }

  editar(pontuacaoEdit: any){
    this.limpaMensagens();
    this.pontuacaoEdicao = pontuacaoEdit;
  }

  listar(){
    this.globals.isLoading = true;
    this.pontuacaoEdicao = null;
    this.pontuacaoService.listar()
        .subscribe(pont => { this.pontuacoes = pont; this.globals.isLoading = false; });
  }

  salvar(){
    this.limpaMensagens();
    if (this.pontuacaoEdicao._id){
      this.alterar();
    }else{
      this.inserir();
    }
  }

  inserir(){
    this.globals.isLoading = true;
    this.pontuacaoService.inserir(this.pontuacaoEdicao).subscribe(
      data => { this.mostraSucesso("Pontuação inserida com sucesso!"); this.globals.isLoading = false; },
      err => this.mostraErro(err));
  }

  alterar(){
    this.globals.isLoading = true;
    this.pontuacaoService.alterar(this.pontuacaoEdicao).subscribe(
      data => { this.mostraSucesso("Pontuação alterada com sucesso!"); this.globals.isLoading = false; },
      err => this.mostraErro(err));
  }

  excluir(pontuacaoExcluir: any){
    var confirmado = confirm("Deseja mesmo excluir essa Pontuação?");
    if (confirmado){
      this.globals.isLoading = true;
      this.limpaMensagens();
      this.pontuacaoService.excluir(pontuacaoExcluir).subscribe(
        data => { this.mostraSucesso("Pontuação excluída com sucesso!"); this.globals.isLoading = false; },
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
}
