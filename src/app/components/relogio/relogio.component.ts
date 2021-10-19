import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Globals } from '../../app.globals';
import { RelogioService } from '../../services/relogio.service';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.css'],
  providers: [RelogioService, ConfigService],
})
export class RelogioComponent implements OnInit {

  estruturaRelogio: any = null;
  relogioAtual: any = null;
  segundos: number;
  minutos: number;
  nivelAtual: number;

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

  listarEstrutura(){
    this.globals.isLoading = true;
    this.relogioService.listarEstrutura()
        .subscribe(estrutura => { 
          this.estruturaRelogio = estrutura; 
          this.globals.isLoading = false;
        });
  }

  consultarRelogio(){
    this.relogioService.consultar()
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
    this.relogioService.iniciar().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  parar(){
    this.globals.isLoading = true;
    this.relogioService.parar().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  reiniciar(){
    this.globals.isLoading = true;
    this.relogioService.reiniciar().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  voltarBlind(){
    this.globals.isLoading = true;
    this.relogioService.voltarBlind().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  avancarBlind(){
    this.globals.isLoading = true;
    this.relogioService.avancarBlind().subscribe(() => {
      this.globals.isLoading = false;
    });
  }

}
