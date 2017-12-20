import { Component, OnInit } from '@angular/core';
import { PontuacaoService } from '../../services/pontuacao.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  providers: [PontuacaoService, ConfigService],
  styleUrls: ['./pontuacao.component.css']
})
export class PontuacaoComponent implements OnInit {
  pontuacoes: any = null;

  constructor(private pontuacaoService: PontuacaoService){ }

  ngOnInit() {
    this.pontuacaoService.lista().subscribe(pont => this.pontuacoes = pont);
  }
}
