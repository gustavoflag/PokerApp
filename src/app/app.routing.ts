import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { JogadorComponent } from './components/jogador/jogador.component';
import { DetalheJogadorComponent } from './components/detalhe-jogador/detalhe-jogador.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { PontuacaoComponent } from './components/pontuacao/pontuacao.component';
import { PremiacaoComponent } from './components/premiacao/premiacao.component';
import { ClassificacaoComponent } from './components/classificacao/classificacao.component';
import { ClassificacaoMesComponent } from './components/classificacao-mes/classificacao-mes.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { ParametroComponent } from './components/parametro/parametro.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'jogador', component: JogadorComponent, canActivate: [AuthGuard] },
    { path: 'jogador/:id', component: DetalheJogadorComponent },
    { path: 'jogo', component: JogoComponent },
    { path: 'jogo/:id', component: JogoComponent },
    { path: 'caixa', component: CaixaComponent },
    { path: 'pontuacao', component: PontuacaoComponent },
    { path: 'premiacao', component: PremiacaoComponent },
    { path: 'parametro', component: ParametroComponent, canActivate: [AuthGuard] },
    { path: '', component: ClassificacaoComponent },
    { path: 'classificacaoMes', component: ClassificacaoMesComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
