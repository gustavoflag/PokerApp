import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { JogadorComponent } from './components/jogador/jogador.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { PontuacaoComponent } from './components/pontuacao/pontuacao.component';
import { ClassificacaoComponent } from './components/classificacao/classificacao.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'jogador', component: JogadorComponent, canActivate: [AuthGuard] },
    { path: 'jogo', component: JogoComponent, canActivate: [AuthGuard] },
    { path: 'pontuacao', component: PontuacaoComponent, canActivate: [AuthGuard] },
    { path: '', component: ClassificacaoComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
