import { Routes, RouterModule } from '@angular/router';
import { 
    AgendaComponent, 
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
    RelogioComponent 
} from './components';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'jogador', component: JogadorComponent, canActivate: [AuthGuard] },
    { path: 'jogador/:id', component: DetalheJogadorComponent },
    { path: 'jogo', component: JogoComponent },
    { path: 'jogo/:id', component: JogoComponent },
    { path: 'caixa', component: CaixaComponent },
    { path: 'pontuacao', component: PontuacaoComponent },
    { path: 'premiacao', component: PremiacaoComponent },
    { path: 'prejogo', component: PreJogoComponent },
    { path: 'parametro', component: ParametroComponent, canActivate: [AuthGuard] },
    { path: 'classificacao', component: ClassificacaoComponent },
    { path: '', component: ClassificacaoComponent },
    { path: 'classificacaoMes', component: ClassificacaoMesComponent },
    { path: 'controleDealer', component: ControleDealerComponent },
    { path: 'graficos', component: GraficosComponent },
    { path: 'fotos', component: FotosComponent },
    { path: 'relogio', component: RelogioComponent },
    { path: 'local', component: LocalComponent },
    { path: 'agenda', component: AgendaComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
