import { BrowserModule } from '@angular/platform-browser';
import { PontuacaoService } from './services/pontuacao.service';
import { JogadorService } from './services/jogador.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Pontuacao } from './models/pontuacao';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { PontuacaoComponent } from './components/pontuacao/pontuacao.component';
import { AuthComponent } from './components/auth/auth.component';
import { JogadorComponent } from './components/jogador/jogador.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PontuacaoComponent,
    AuthComponent,
    JogadorComponent,
    JogoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [PontuacaoService, JogadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
