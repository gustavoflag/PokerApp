import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../services';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  providers: [ParametroService],
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {
  parametro: any = null;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(private parametroService: ParametroService
             ,public globals: Globals) { }

  ngOnInit() {
    this.consultar();
  }

  consultar(){
    this.globals.isLoading = true;
    this.parametroService.consultar()
        .subscribe(par => {
            this.parametro = par;
            if (this.parametro === null){
              this.parametro = { };
            }
            this.globals.isLoading = false;
        });
  }

  salvar(){
    this.globals.isLoading = true;
    this.limpaMensagens();
    this.parametroService.alterar(this.parametro).subscribe(
      data => { this.mostraSucesso("Parametros alterados com sucesso!"); this.globals.isLoading = false; },
      err => this.mostraErro(err));
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
    this.consultar();
  }
}
