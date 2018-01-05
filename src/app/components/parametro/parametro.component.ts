import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../services/parametro.service';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  providers: [ParametroService],
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {
  parametro: any = null;
  mensagem: string = null;
  erro: string = null;

  constructor(private parametroService: ParametroService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar(){
    this.parametroService.consultar()
        .subscribe(par => {
            this.parametro = par;
            if (this.parametro === null){
              this.parametro = { };
            }
        });
  }

  salvar(){
    this.limpaMensagens();
    this.parametroService.alterar(this.parametro).subscribe(
      data => this.mostraSucesso("Parametros alterados com sucesso!"),
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
    this.consultar();
  }
}
