import { Component, OnInit } from '@angular/core';
import { JogadorService } from '../../services';
import { Globals } from '../../app.globals';
import { ErrorHelper } from '../../helpers/error.helper';

@Component({
  selector: 'app-classificacao-mes',
  templateUrl: './classificacao-mes.component.html',
  providers: [JogadorService],
  styleUrls: ['./classificacao-mes.component.css']
})
export class ClassificacaoMesComponent implements OnInit {
  meses: any = [];
  constructor(
    private jogadorService: JogadorService,
    public globals: Globals,
    private errorHelper: ErrorHelper,
  ) { }

  ngOnInit() {
    this.listarMeses();
  }

  listarMeses() {
    this.globals.isLoading = true;
    this.jogadorService.classificacaoTodosMeses().subscribe((meses) => {
      this.meses = meses;
      this.globals.isLoading = false;
    }, error => this.errorHelper.handle(error));
  }
}
