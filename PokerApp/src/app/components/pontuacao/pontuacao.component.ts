import { Component, OnInit } from '@angular/core';
import { PontuacaoService } from '../../services/pontuacao.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  providers: [PontuacaoService, ConfigService],
  styleUrls: ['./pontuacao.component.css']
})
export class PontuacaoComponent implements OnInit {
  pontuacoes: any = null;
  pontuacaoEdicao: any = null;
  mensagem: string = null;
  erro: string = null;

  constructor(private pontuacaoService: PontuacaoService
             ,private router: Router){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
  }

  novo(){
    this.limpaMensagens();
    this.pontuacaoEdicao = { };
  }

  editar(pontuacaoEdit){
    this.limpaMensagens();
    this.pontuacaoEdicao = pontuacaoEdit;
  }

  listar(){
    this.pontuacaoEdicao = null;
    this.pontuacaoService.listar()
        .subscribe(pont => this.pontuacoes = pont);
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
    this.pontuacaoService.inserir(this.pontuacaoEdicao).subscribe(
      data => this.mostraSucesso("Pontuação inserida com sucesso!"),
      err => this.mostraErro(err));
  }

  alterar(){
    this.pontuacaoService.alterar(this.pontuacaoEdicao).subscribe(
      data => this.mostraSucesso("Pontuação alterada com sucesso!"),
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
