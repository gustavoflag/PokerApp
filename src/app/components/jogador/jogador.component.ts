import { Component, OnInit } from '@angular/core';
import { JogadorService, ConfigService } from '../../services';
import { Globals } from '../../app.globals';
import { Jogador } from '../../models/jogador';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  providers: [JogadorService],
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {
  jogadores: Jogador[] = [];
  jogadorEdicao?: Jogador = undefined;
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
    this.jogadorEdicao = undefined;
  }

  editar(jogadorEdit: any){
    this.limpaMensagens();
    this.jogadorEdicao = jogadorEdit;
  }

  listar(){
    this.jogadorEdicao = undefined;
    this.globals.isLoading = true;
    this.jogadorService.lista().subscribe(jogs => { this.jogadores = jogs; this.globals.isLoading = false; } );
  }

  rookie(){
    if (this.jogadorEdicao){
      this.jogadorEdicao.rookie = !this.jogadorEdicao.rookie;
    }
  }

  socio(){
    if (this.jogadorEdicao){
      this.jogadorEdicao.socio = !this.jogadorEdicao.socio;
    }
  }

  salvar(){
    this.limpaMensagens();
    if (this.jogadorEdicao?._id){
      this.alterar();
    }else{
      this.inserir();
    }
  }

  inserir(){
    if (this.jogadorEdicao){
      this.globals.isLoading = true;
      this.jogadorService.inserir(this.jogadorEdicao).subscribe(
        data => { this.mostraSucesso("Jogador inserido com sucesso!"); this.globals.isLoading = false; } ,
        err => this.mostraErro(err));
    }
  }

  alterar(){
    if (this.jogadorEdicao){
      this.globals.isLoading = true;
      this.jogadorService.alterar(this.jogadorEdicao).subscribe(
        data => { this.mostraSucesso("Jogador alterado com sucesso!"); this.globals.isLoading = false; },
        err => this.mostraErro(err));
    }
  }

  excluir(jogadorExcluir: Jogador){
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
    if (this.jogadorEdicao){
      if (!this.jogadorEdicao.titulos){
        this.jogadorEdicao.titulos = [{ ano: this.tituloEdicao }];
      } else {
        this.jogadorEdicao.titulos.push(this.tituloEdicao);
      }
      this.tituloEdicao = null;
    }
  }

  cancelaTitulo(){
    this.tituloEdicao = null;
  }

  excluirTitulo(index: any){
    if (this.jogadorEdicao){
      if (this.jogadorEdicao.titulos?.length === 1){
        this.jogadorEdicao.titulos = undefined;
      } else {
        if (this.jogadorEdicao.titulos){
          this.jogadorEdicao.titulos.splice(index, 1);
        }
      }
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
