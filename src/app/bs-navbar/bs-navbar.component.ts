import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser:any;

  constructor( public auth: AuthService) {
    this.auth.appUser$.subscribe(u=>{
      u.valueChanges().subscribe(user=>this.appUser=user)
    })
  }
  logout(){
    this.auth.logout();
  }
}
