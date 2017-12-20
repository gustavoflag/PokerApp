import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  providers: [AuthService, ConfigService],
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  token: string;

  constructor(private authService: AuthService) { }

  ngOnInit(){
  }

  login(){
    this.authService.login().subscribe(tok => this.token = tok.token);
  }
}
