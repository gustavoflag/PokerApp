import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../../app.globals';
import { RelogioService, ConfigService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.css'],
  providers: [RelogioService],
})
export class RelogioComponent implements OnInit, OnDestroy {

  estruturaRelogio: any = null;
  niveisBlindFilter: any = null;
  relogioAtual: any = null;
  segundos: number | null = null;
  minutos: number | null = null;
  nivelAtual: any = null;
  status: string = '';
  consultaRelogioInterval: any = null;

  tocandoAudio: boolean = false;

  listarEstruturaSubscription: Subscription | null = null;
  consultarRelogioSubscription: Subscription | null = null;
  iniciarRelogioSubscription: Subscription | null = null;
  pararRelogioSubscription: Subscription | null = null;
  reiniciarRelogioSubscription: Subscription | null = null;
  voltarBlindSubscription: Subscription | null = null;
  reiniciarBlindSubscription: Subscription | null = null;
  avancarBlindSubscription: Subscription | null = null;

  constructor(
     private relogioService: RelogioService
    ,private router: Router
    ,public config: ConfigService
    ,public globals: Globals
  ) { 

  }

  ngOnInit(): void {
    this.listarEstrutura();

    var indiceRelogio = 1;

    this.consultaRelogioInterval = setInterval(() => {
       this.consultarRelogio(indiceRelogio);
       indiceRelogio++;
       if (indiceRelogio === 10){
        indiceRelogio = 0;
      }
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.consultaRelogioInterval)
      clearInterval(this.consultaRelogioInterval);

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

    if (this.reiniciarBlindSubscription)
      this.reiniciarBlindSubscription.unsubscribe();

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

  consultarRelogio(indice: number){
    this.consultarRelogioSubscription = this.relogioService.consultar(indice)
        .subscribe(relogio => { 
          var secsAtual;

          if (relogio.inicioRelogio){
              var agora = Math.floor(Date.now() / 1000);
              var span_secs = (agora - relogio.inicioRelogio);

              secsAtual = span_secs + relogio.segundos;
          } else {
              secsAtual = relogio.segundos;
          } 

          this.nivelAtual = this.getNivel(secsAtual);
          this.status = relogio.status;

          if (this.nivelAtual){
            var elapsed_secs = (secsAtual - this.nivelAtual.segsInicio);

            var curr_secs = this.nivelAtual.segs - elapsed_secs;
  
            this.minutos = (Math.floor(curr_secs / 60));
            this.segundos = (curr_secs % 60);
            //this.status = relogio.status;
  
            if (this.minutos == 0 && this.segundos == 1){
              this.playAudio();
            }
          }
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
    this.voltarBlindSubscription = this.relogioService.voltarBlind(this.nivelAtual).subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  reiniciarBlind(){
    this.globals.isLoading = true;
    this.reiniciarBlindSubscription = this.relogioService.reiniciarBlind(this.nivelAtual).subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  avancarBlind(){
    this.globals.isLoading = true;
    this.avancarBlindSubscription = this.relogioService.avancarBlind(this.nivelAtual).subscribe(() => {
      this.globals.isLoading = false;
    });
  }

  getNivel(segs: any){
    let nivelAtual;
    let indexAtual = 0;

    if (this.estruturaRelogio){
        this.estruturaRelogio.every((nivel: any) => {
          indexAtual++;
            if (nivel.segsFim < segs){
                return true;
            } else {
                nivelAtual = nivel;
                return false
            }
        });

        this.niveisBlindFilter = this.estruturaRelogio.slice(indexAtual, indexAtual + 5);
    }

    return nivelAtual;
  }

  playAudio(){
    if (!this.tocandoAudio){
      this.tocandoAudio = true;
      setTimeout(() => {
        let audio: HTMLAudioElement = new Audio('assets/sounds/Gongo.wav');
        audio.play();
        setTimeout(() => {
          this.tocandoAudio = false;
        }, 2000);
      }, 1000);
    }
  }

}
