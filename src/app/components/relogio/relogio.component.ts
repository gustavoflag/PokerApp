import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Globals } from '../../app.globals';
import { RelogioService } from '../../services/relogio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.css'],
  providers: [RelogioService, ConfigService],
})
export class RelogioComponent implements OnInit, OnDestroy {

  estruturaRelogio: any = null;
  relogioAtual: any = null;
  segundos: number;
  minutos: number;
  nivelAtual: any = null;
  status: string;

  listarEstruturaSubscription: Subscription;
  consultarRelogioSubscription: Subscription;
  iniciarRelogioSubscription: Subscription;
  pararRelogioSubscription: Subscription;
  reiniciarRelogioSubscription: Subscription;
  voltarBlindSubscription: Subscription;
  avancarBlindSubscription: Subscription;

  constructor(
     private relogioService: RelogioService
    ,private router: Router
    ,public config: ConfigService
    ,public globals: Globals
  ) { 

  }

  ngOnInit(): void {
    this.listarEstrutura();

    setInterval(() => {
      this.consultarRelogio();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.listarEstruturaSubscription)
      this.listarEstruturaSubscription.unsubscribe();

    if (this.consultarRelogioSubscription)
      this.consultarRelogioSubscription.unsubscribe();

    if (this.iniciarRelogioSubscription)
      this.iniciarRelogioSubscription.unsubscribe();
    
    if (this.pararRelogioSubscription)
      this.pararRelogioSubscription.unsubscribe();

    if (this.reiniciarRelogioSubscription)
      this.reiniciarRelogioSubscription.unsubscribe();
    
    if (this.voltarBlindSubscription)
      this.voltarBlindSubscription.unsubscribe();

    if (this.avancarBlindSubscription)
      this.avancarBlindSubscription.unsubscribe();
  }

  listarEstrutura(){
    this.globals.isLoading = true;
    this.listarEstruturaSubscription = this.relogioService.listarEstrutura()
        .subscribe(estrutura => { 
          this.estruturaRelogio = estrutura; 
          this.globals.isLoading = false;
        });
  }

  consultarRelogio(){
    this.consultarRelogioSubscription = this.relogioService.consultar()
        .subscribe(relogio => { 
          
          this.nivelAtual = this.getNivel(relogio.segundos);

          var elapsed_secs = (relogio.segundos - this.nivelAtual.segsInicio);

          var curr_secs = this.nivelAtual.segs - elapsed_secs;

          this.minutos = (Math.floor(curr_secs / 60));
          this.segundos = (curr_secs % 60);
          this.status = relogio.status;
        });
  }

  iniciar(){
    this.globals.isLoading = true;
    this.iniciarRelogioSubscription = this.relogioService.iniciar().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  parar(){
    this.globals.isLoading = true;
    this.pararRelogioSubscription = this.relogioService.parar().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  reiniciar(){
    if (confirm('Deseja reiniciar o relógio?')){
      this.globals.isLoading = true;
      this.reiniciarRelogioSubscription = this.relogioService.reiniciar().subscribe(() => {
        this.globals.isLoading = false;
      });
    }
  }

  voltarBlind(){
    this.globals.isLoading = true;
    this.voltarBlindSubscription = this.relogioService.voltarBlind().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  avancarBlind(){
    this.globals.isLoading = true;
    this.avancarBlindSubscription = this.relogioService.avancarBlind().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  getNivel(segs){
    let nivelAtual;

    if (this.estruturaRelogio.estrutura){
        this.estruturaRelogio.estrutura.every(nivel => {
            if (nivel.segsFim < segs){
                return true;
            } else {
                nivelAtual = nivel;
                return false
            }
        });
    }

    return nivelAtual;
}

}
