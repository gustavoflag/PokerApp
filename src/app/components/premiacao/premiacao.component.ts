import { Component, OnInit } from '@angular/core';
import { PremiacaoService } from '../../services/premiacao.service';
import { CaixaService } from '../../services/caixa.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { Globals } from '../../app.globals';
import { HttpClientService } from '../../services/httpClientService.service';


@Component({
  selector: 'app-premiacao',
  templateUrl: './premiacao.component.html',
  providers: [CaixaService, PremiacaoService, ConfigService, HttpClientService],
  styleUrls: ['./premiacao.component.css']
})
export class PremiacaoComponent implements OnInit {
  premiacoes: any = null;
  premiacaoEdicao: any = null;
  mensagem: string | null = null;
  erro: string | null = null;
  saldoCaixa: number = 0;

  constructor(private premiacaoService: PremiacaoService
             ,private caixaService: CaixaService
             ,private router: Router
             ,public config: ConfigService
             ,public globals: Globals) { }

  ngOnInit() {
   this.limpaMensagens();
   this.listar();
   this.getSaldoCaixa();
  }

  novo(){
   this.limpaMensagens();
   this.premiacaoEdicao = { };
  }

  lancarPremios(){
    if (confirm('Tem certeza que deseja lançar os prêmios finais no caixa?')){
      this.globals.isLoading = true;
      this.premiacoes.forEach((premiacao: any) => {
        const valorPremio = ((this.saldoCaixa * premiacao.porcentual) / 100);

        this.caixaService.inserir({
          data: new Date(),
          valor: (valorPremio * -1),
          descricao: `Pagamento premiação ${premiacao.lugar} lugar -> ${valorPremio}`
        }).subscribe(
          data => {},
          err => this.mostraErro(err));
      });
      this.mostraSucesso("Lançamentos inseridos com sucesso!");
    }
  }

  editar(premiacaoEdit: any){
   this.limpaMensagens();
   this.premiacaoEdicao = premiacaoEdit;
  }

  listar(){
   this.premiacaoEdicao = null;
   this.globals.isLoading = true;
   this.premiacaoService.listar()
       .subscribe(pont => { this.premiacoes = pont; this.globals.isLoading = false; });
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
   this.globals.isLoading = true;
   this.premiacaoService.inserir(this.premiacaoEdicao).subscribe(
     data => { this.mostraSucesso("Premiação inserida com sucesso!"); this.globals.isLoading = false; },
     err => this.mostraErro(err));
  }

  alterar(){
   this.globals.isLoading = true;
   this.premiacaoService.alterar(this.premiacaoEdicao).subscribe(
     data => { this.mostraSucesso("Premiação alterada com sucesso!"); this.globals.isLoading = false; },
     err => this.mostraErro(err));
  }

  excluir(premiacaoExcluir: any){
   var confirmado = confirm("Deseja mesmo excluir essa Premiação?");
   if (confirmado){
    this.globals.isLoading = true;
     this.limpaMensagens();
     this.premiacaoService.excluir(premiacaoExcluir).subscribe(
       data => { this.mostraSucesso("Premiação excluída com sucesso!"); this.globals.isLoading = false; },
       err => this.mostraErro(err));
   }
  }

  getSaldoCaixa(){
    this.globals.isLoading = true;
    this.caixaService.saldoCaixa().subscribe(
      saldo => { this.saldoCaixa = (saldo || 0); this.globals.isLoading = false; },
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
   this.listar();
  }
}
