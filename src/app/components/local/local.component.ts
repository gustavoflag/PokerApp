import { Component } from '@angular/core';
import { LocalService, ConfigService } from '../../services';
import { Globals } from '../../app.globals';
import { Local } from '../../models/local';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  providers: [LocalService],
  styleUrl: './local.component.css'
})
export class LocalComponent {
  locais: Local[] = [];
  localEdicao?: Local = undefined;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(private localService: LocalService
             ,public config: ConfigService
             ,public globals: Globals
  ){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
  }

  novo(){
    this.limpaMensagens();
    this.localEdicao = undefined;
  }

  editar(localEdit: Local){
    this.limpaMensagens();
    this.localEdicao = localEdit;
  }

  listar(){
    this.globals.isLoading = true;
    this.localEdicao = undefined;
    this.localService.listar()
        .subscribe(pont => { this.locais = pont; this.globals.isLoading = false; });
  }

  salvar(){
    this.limpaMensagens();
    if (this.localEdicao?._id){
      this.alterar();
    }else{
      this.inserir();
    }
  }

  inserir(){
    if (this.localEdicao) {
      this.globals.isLoading = true;
      this.localService.inserir(this.localEdicao).subscribe(
        data => { this.mostraSucesso("Local inserido com sucesso!"); this.globals.isLoading = false; },
        err => this.mostraErro(err));
    }
  }

  alterar(){
    if (this.localEdicao) {
      this.globals.isLoading = true;
      this.localService.alterar(this.localEdicao).subscribe(
        data => { this.mostraSucesso("Local alterado com sucesso!"); this.globals.isLoading = false; },
        err => this.mostraErro(err));
    }
  }

  excluir(localExcluir: Local){
    var confirmado = confirm("Deseja mesmo excluir esse Local?");
    if (confirmado){
      this.globals.isLoading = true;
      this.limpaMensagens();
      this.localService.excluir(localExcluir).subscribe(
        data => { this.mostraSucesso("Local excluído com sucesso!"); this.globals.isLoading = false; },
        err => this.mostraErro(err));
    }
  }

  padrao(){
    if (this.localEdicao){
      this.localEdicao.padrao = !this.localEdicao.padrao;
    }
  }

  online(){
    if (this.localEdicao){
      this.localEdicao.online = !this.localEdicao.online;
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
