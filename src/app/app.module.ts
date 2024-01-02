import { BrowserModule } from '@angular/platform-browser';
import { PontuacaoService } from './services/pontuacao.service';
import { JogadorService } from './services/jogador.service';
import { AuthService } from './services/auth.service';
import { JogoService } from './services/jogo.service';
import { CaixaService } from './services/caixa.service';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Pontuacao } from './models/pontuacao';
import { AppComponent } from './components/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { PreJogoComponent } from './components/pre-jogo/pre-jogo.component';
import { Globals } from './app.globals';
import { ControleDealerComponent } from './components/controle-dealer/controle-dealer.component';
import { NgChartsModule } from 'ng2-charts';
import { GraficosComponent } from './components/graficos/graficos.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { ErrorHelper } from './helpers/error.helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RelogioComponent } from './components/relogio/relogio.component';
import { RelogioService } from './services/relogio.service';
import { AgendaComponent } from './components/agenda/agenda.component';
import { LocalComponent } from './components/local/local.component';
import { RegulamentoComponent } from './components/regulamento/regulamento.component';
import { AgendamentoService } from './services/agendamento.service';
import { LocalService } from './services/local.service';
import { HttpClientService } from './services/httpClientService.service';

registerLocaleData(localePt);

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
    PremiacaoComponent,
    PreJogoComponent,
    ControleDealerComponent,
    GraficosComponent,
    FotosComponent,
    RelogioComponent,
    AgendaComponent,
    LocalComponent,
    RegulamentoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    //AlertModule.forRoot(),
    Routing,
    BrowserAnimationsModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }, 
    PontuacaoService, 
    JogadorService, 
    AuthService, 
    AuthGuard, 
    JogoService, 
    CaixaService, 
    Globals, 
    ErrorHelper, 
    RelogioService,
    AgendamentoService,
    LocalService,
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
