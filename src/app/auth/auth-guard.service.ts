import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot} from '@angular/router';
import {  Router } from '@angular/router'
import { map, catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private auth: AuthService, private router: Router ) { }
 canActivate(route, state: RouterStateSnapshot) : Observable<any> {
  //  this.auth.user$.subscribe(e=>{
  //     if( this.auth.user$) return true;
  //     this.router.navigate(['/login']);
  //     return false
  //  })
  //  this.router.navigate(['/login'],{queryParams:{ returnUrl:state.url }});
  //  return true
return this.auth.user$.pipe(
  map(user=>{
    if( user) return true;
    this.router.navigate(['/login']);
    return false;
  })
  // catchError((error: Response )=>{
  )

  // return this.auth.user$.map(user=>{
  // console.log(user)
  //   if( user) return true;
  //   this.router.navigate(['/login']);
  //   return false;
  // })
  }
}
