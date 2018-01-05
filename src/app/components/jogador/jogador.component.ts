import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  providers: [JogadorService, ConfigService],
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {
  jogadores: any = null;
  jogadorEdicao: any = null;
  mensagem: string = null;
  erro: string = null;

  constructor(private jogadorService: JogadorService){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
  }

  novo(){
    this.limpaMensagens();
    this.jogadorEdicao = { };
  }

  editar(jogadorEdit){
    this.limpaMensagens();
    this.jogadorEdicao = jogadorEdit;
  }

  listar(){
    this.jogadorEdicao = null;
    this.jogadorService.lista().subscribe(jogs => this.jogadores = jogs);
  }

  rookie(){
    this.jogadorEdicao.rookie = !this.jogadorEdicao.rookie;
  }

  salvar(){
    this.limpaMensagens();
    if (this.jogadorEdicao._id){
      this.alterar();
    }else{
      this.inserir();
    }
  }

  inserir(){
    this.jogadorService.inserir(this.jogadorEdicao).subscribe(
      data => this.mostraSucesso("Jogador inserido com sucesso!"),
      err => this.mostraErro(err));
  }

  alterar(){
    this.jogadorService.alterar(this.jogadorEdicao).subscribe(
      data => this.mostraSucesso("Jogador alterado com sucesso!"),
      err => this.mostraErro(err));
  }

  excluir(jogadorExcluir){
    var confirmado = confirm("Deseja mesmo excluir esse Jogador?");
    if (confirmado){
      this.limpaMensagens();
      this.jogadorService.excluir(jogadorExcluir).subscribe(
        data => this.mostraSucesso("Jogador excluído com sucesso!"),
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
}
