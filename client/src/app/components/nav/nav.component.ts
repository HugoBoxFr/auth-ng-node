import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private appService: AppService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logOut(){
    this.appService.connectedUser = undefined;
    this.authService.logout();
  }

}
