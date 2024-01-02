import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TokenHelper } from './helpers/token.helper';
import { AuthGuard } from './guards/auth.guard';
import { Globals } from './app.globals';
import { ErrorHelper } from './helpers/error.helper';
import { Routing } from './app.routing';
import { 
  AgendaComponent, 
  AppComponent, 
  AuthComponent, 
  CaixaComponent, 
  ClassificacaoComponent, 
  ClassificacaoMesComponent, 
  ControleDealerComponent, 
  DetalheJogadorComponent, 
  FotosComponent, 
  GraficosComponent, 
  JogadorComponent, 
  JogoComponent, 
  LocalComponent, 
  ParametroComponent, 
  PontuacaoComponent, 
  PreJogoComponent, 
  PremiacaoComponent, 
  RegulamentoComponent, 
  RelogioComponent 
} from './components';
import { 
  ConfigService, 
  HttpClientService 
} from './services';

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
    Routing,
    BrowserAnimationsModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }, 
    AuthGuard,
    ErrorHelper, 
    Globals, 
    ConfigService, 
    TokenHelper,
    HttpClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
