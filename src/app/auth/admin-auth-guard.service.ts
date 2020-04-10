import { Router, CanActivate } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService, 
    private userService : UserService, 
    private router: Router) { }
  canActivate(): Observable<boolean>{
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid).valueChanges()),
      (map(appUser=> appUser.isAdmin)))
  }
}
