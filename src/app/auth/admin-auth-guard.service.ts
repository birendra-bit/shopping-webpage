import { Router, CanActivate } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private auth: AuthService, private userService : UserService, private router: Router) { }
  // canActivate(): Observable<boolean>{
    // return this.auth.user$.pipe(
    //   map(user=>{
    //         // if(this.userService.get(user.uid).valueChanges().subscribe(x=>x.isAdmin)) return true;
    //       let flag = false;
    //       return this.userService.get(user.uid).valueChanges()
    //   })
    // ).subscribe(u=>{})
  //}
}
