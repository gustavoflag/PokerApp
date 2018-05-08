import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services/jogador.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-classificacao-mes',
  templateUrl: './classificacao-mes.component.html',
  providers: [JogadorService, ConfigService],
  styleUrls: ['./classificacao-mes.component.css']
})
export class ClassificacaoMesComponent implements OnInit {
  meses: any = [];
  constructor(private jogadorService: JogadorService) { }

  ngOnInit() {
    this.listarMeses();
  }

  listarMeses() {
    this.jogadorService.classificacaoTodosMeses().subscribe((meses) => {
      this.meses = meses;
    });
  }
}
