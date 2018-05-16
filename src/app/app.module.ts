import { BrowserModule } from '@angular/platform-browser';
import { PontuacaoService } from './services/pontuacao.service';
import { JogadorService } from './services/jogador.service';
import { AuthService } from './services/auth.service';
import { JogoService } from './services/jogo.service';
import { CaixaService } from './services/caixa.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Pontuacao } from './models/pontuacao';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { PontuacaoComponent } from './components/pontuacao/pontuacao.component';
import { PremiacaoComponent } from './components/premiacao/premiacao.component';
import { AuthComponent } from './components/auth/auth.component';
import { JogadorComponent } from './components/jogador/jogador.component';
import { JogoComponent } from './components/jogo/jogo.component';
//import { AlertModule } from 'ngx-bootstrap';
import { Routing } from './app.routing';
import { ClassificacaoComponent } from './components/classificacao/classificacao.component';
import { AuthGuard } from './guards/auth.guard';
import { ParametroComponent } from './components/parametro/parametro.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { ClassificacaoMesComponent } from './components/classificacao-mes/classificacao-mes.component';
import { DetalheJogadorComponent } from './components/detalhe-jogador/detalhe-jogador.component';

@NgModule({
  declarations: [
    AppComponent,
    PontuacaoComponent,
    AuthComponent,
    JogadorComponent,
    JogoComponent,
    ClassificacaoComponent,
    ParametroComponent,
    CaixaComponent,
    ClassificacaoMesComponent,
    DetalheJogadorComponent,
    PremiacaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //AlertModule.forRoot(),
    Routing
  ],
  providers: [PontuacaoService, JogadorService, AuthService, AuthGuard, JogoService, CaixaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
