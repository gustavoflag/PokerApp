import { Component, OnInit } from '@angular/core';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  constructor(
      public globals: Globals,
  ) { }

  ngOnInit() {
    this.globals.isLoading = false; 
  }

}
