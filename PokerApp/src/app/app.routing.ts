import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { JogadorComponent } from './components/jogador/jogador.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { PontuacaoComponent } from './components/pontuacao/pontuacao.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'jogador', component: JogadorComponent },
    { path: 'jogo', component: JogoComponent },
    { path: 'pontuacao', component: PontuacaoComponent },

    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
