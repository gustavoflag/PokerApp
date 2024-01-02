import { Component, OnInit } from '@angular/core';
import { JogadorService, ConfigService } from '../../services';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  providers: [JogadorService],
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {
  jogadores: any = null;
  jogadorEdicao: any = null;
  tituloEdicao: any = null;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(private jogadorService: JogadorService
             ,public config: ConfigService
             ,public globals: Globals){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
  }

  novo(){
    this.limpaMensagens();
    this.jogadorEdicao = { };
  }

  editar(jogadorEdit: any){
    this.limpaMensagens();
    this.jogadorEdicao = jogadorEdit;
  }

  listar(){
    this.jogadorEdicao = null;
    this.globals.isLoading = true;
    this.jogadorService.lista().subscribe(jogs => { this.jogadores = jogs; this.globals.isLoading = false; } );
  }

  rookie(){
    this.jogadorEdicao.rookie = !this.jogadorEdicao.rookie;
  }

  socio(){
    this.jogadorEdicao.socio = !this.jogadorEdicao.socio;
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
    this.globals.isLoading = true;
    this.jogadorService.inserir(this.jogadorEdicao).subscribe(
      data => { this.mostraSucesso("Jogador inserido com sucesso!"); this.globals.isLoading = false; } ,
      err => this.mostraErro(err));
  }

  alterar(){
    this.globals.isLoading = true;
    this.jogadorService.alterar(this.jogadorEdicao).subscribe(
      data => { this.mostraSucesso("Jogador alterado com sucesso!"); this.globals.isLoading = false; },
      err => this.mostraErro(err));
  }

  excluir(jogadorExcluir: any){
    var confirmado = confirm("Deseja mesmo excluir esse Jogador?");
    if (confirmado){
      this.globals.isLoading = true;
      this.limpaMensagens();
      this.jogadorService.excluir(jogadorExcluir).subscribe(
        data => { this.mostraSucesso("Jogador excluído com sucesso!"); this.globals.isLoading = false; },
        err => this.mostraErro(err));
    }
  }

  novoTitulo(){
    this.tituloEdicao = { ano: 2018 }
  }

  desceAno(){
    this.tituloEdicao.ano--;
  }

  sobeAno(){
    this.tituloEdicao.ano++;
  }

  salvaTitulo(){
    this.jogadorEdicao.titulos.push(this.tituloEdicao);
    this.tituloEdicao = null;
  }

  cancelaTitulo(){
    this.tituloEdicao = null;
  }

  excluirTitulo(index: any){
    this.jogadorEdicao.titulos.splice(index, 1);
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
