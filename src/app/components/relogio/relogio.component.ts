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
  nivelAtual: number;

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
          //console.log('relogio', relogio);
          this.relogioAtual = relogio; 

          this.minutos = (Math.floor(relogio.secs / 60));
          this.segundos = (relogio.secs % 60);
          this.nivelAtual = relogio.nivel.nivel;
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
    this.globals.isLoading = true;
    this.reiniciarRelogioSubscription = this.relogioService.reiniciar().subscribe(() => {
      this.globals.isLoading = false;
    });
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

}
