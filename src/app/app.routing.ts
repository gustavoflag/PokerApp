import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { JogadorComponent } from './components/jogador/jogador.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { PontuacaoComponent } from './components/pontuacao/pontuacao.component';
import { ClassificacaoComponent } from './components/classificacao/classificacao.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { ParametroComponent } from './components/parametro/parametro.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'jogador', component: JogadorComponent, canActivate: [AuthGuard] },
    { path: 'jogo', component: JogoComponent },
    { path: 'caixa', component: CaixaComponent },
    { path: 'pontuacao', component: PontuacaoComponent },
    { path: 'parametro', component: ParametroComponent, canActivate: [AuthGuard] },
    { path: '', component: ClassificacaoComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
