import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgendamentoService, ConfigService, LocalService } from '../../services';
import { Globals } from '../../app.globals';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  providers: [AgendamentoService, LocalService],
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit, OnDestroy {
  agendamentos: any = null;
  locais: any = null;
  agendamentoEdicao: any = null;
  dataEdicao: string | null = null;
  horaEdicao: string | null = null;
  localSelected: any | null = null;
  mensagem: string | null = null;
  erro: string | null = null;

  inserirSubscription: Subscription | null = null;
  alterarSubscription: Subscription | null = null;
  listarSubscription: Subscription | null = null;
  excluirSubscription: Subscription | null = null;

  constructor(
    private agendamentoService: AgendamentoService
    ,private localService: LocalService
    ,public config: ConfigService
    ,public globals: Globals
  ){ }

  ngOnInit() {
    this.limpaMensagens();
    this.listar();
    this.listarLocais();
  }

  ngOnDestroy(): void {
    if (this.inserirSubscription) {
      this.inserirSubscription.unsubscribe();
    }
  }

  novo(){
    this.limpaMensagens();
    this.agendamentoEdicao = { };
  }

  addHours(date: Date, amount: number) {
    date.setTime(date.getTime() + (amount*60*60*1000));
  }

  editar(agendamentoEdit: any){
    this.limpaMensagens();
    this.agendamentoEdicao = agendamentoEdit;
    this.localSelected = agendamentoEdit.local;

    const dataWithoutTimezone = new Date(agendamentoEdit.data);
    this.addHours(dataWithoutTimezone, -3);

    const sptData = dataWithoutTimezone.toISOString().split('T');

    if (sptData && sptData.length > 0)
      this.dataEdicao = sptData[0];

    if (sptData && sptData.length > 1)
      this.horaEdicao = sptData[1].replace('Z', '')
  }

  listar(){
    this.globals.isLoading = true;
    this.agendamentoEdicao = null;
    this.dataEdicao = null;
    this.horaEdicao = null;
    this.localSelected = null;
    this.agendamentoService.listar()
      .subscribe((agend: any) => {
        let index = 1; 
        agend.forEach((a: any) => {
          a.passado = this.passado(a);
          if (a.status === 'ativo'){
            a.numero = index++;
          }
        });
        this.agendamentos = agend; 
        this.globals.isLoading = false;
      });
  }

  listarLocais(){
    this.localService.listar()
      .subscribe((loc: any) => {
        this.locais = loc; 
      });
  }

  salvar(){
    this.limpaMensagens();
    this.globals.isLoading = true;
    this.agendamentoEdicao.data = `${this.dataEdicao}T${this.horaEdicao}`;
    this.agendamentoEdicao.local = this.localSelected;
    if (this.agendamentoEdicao._id){
      this.alterar();
    }else{
      this.inserir();
    }
  }

  inserir(){
    console.log('inserir');
    this.inserirSubscription = this.agendamentoService.inserir(this.agendamentoEdicao)
      .subscribe(
        data => { 
          this.mostraSucesso("Agendamento inserido com sucesso!"); 
          this.listar();
        },
        err => this.mostraErro(err)
      );
  }

  alterar(){
    this.agendamentoService.alterar(this.agendamentoEdicao).subscribe(
      data => { 
        this.mostraSucesso("Agendamento alterado com sucesso!");
        this.listar();
      },
      err => this.mostraErro(err));
  }

  excluir(agendamentoExcluir: any){
    var confirmado = confirm("Deseja mesmo excluir esse Agendamento?");
    if (confirmado){
      this.globals.isLoading = true;
      this.limpaMensagens();
      this.agendamentoService.excluir(agendamentoExcluir).subscribe(
        data => { 
          this.mostraSucesso("Agendamento excluído com sucesso!"); 
          this.listar();
        },
        err => this.mostraErro(err));
    }
  }

  limpaMensagens(){
    this.mensagem = null;
    this.erro = null;
  }

  mostraErro(err: any) {
    if (err.error.message) {
      this.erro = `Erro: ${err.error.message}`;
    } else if (err.error.errmsg) {
      this.erro = `Erro: ${err.error.errmsg}`;
    }
    this.globals.isLoading = false;
    setTimeout(() => {
      this.erro = '';
    }, 5000);
  }

  mostraSucesso(mensagem: any) {
    this.mensagem = mensagem;
    this.globals.isLoading = false;
    setTimeout(() => {
      this.mensagem = '';
    }, 5000);
  }

  public onLocalChange(newLocal: any) {
    this.localSelected = this.locais.find((local: any)=> local._id === newLocal.value);
  }

  public getDiaSemana(date?: string | Date){
    if (!date) {
      return '';
    }

    switch(new Date(date).getDay()) {
      case 0: 
        return 'Domingo';
      case 1:
        return 'Segunda-Feira';
      case 2: 
        return 'Terça-Feira';
      case 3:
        return 'Quarta-Feira';
      case 4:
        return 'Quinta-Feira';
      case 5:
        return 'Sexta-Feira';
      case 6:
        return 'Sábado';
      default:
        return ''
    }
  }

  public passado(agendamento: any){
    if (new Date(agendamento.data) < new Date()){
      return true;
    }

    return false;
  }

  public status(status: 'ativo' | 'inativo' | 'cancelado' | 'terminado'){
    this.agendamentoEdicao.status = status;
  }

  public local(newLocal: any) {
    
  }
}
