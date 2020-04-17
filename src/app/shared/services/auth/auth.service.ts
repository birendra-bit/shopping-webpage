import { AngularFireObject } from '@angular/fire/database/database';
import { UserService } from '../user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable <firebase.User>;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router:Router, private userService :UserService) {     
    this.user$ = afAuth.authState;
  }
  logout(){
    this.afAuth.signOut().then(res=>{
      this.router.navigate(['/']);
    })
    .catch(err=>{
      console.log('error ',err)
    })
  }
  async login(){
    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl',returnUrl);
    // this.afAuth.signInWithEmailAndPassword(new firebase.auth.GoogleAuthProvider())
    await this.afAuth.signInWithRedirect( new firebase.auth.GoogleAuthProvider())
  }
  get appUser$(){
    return this.user$.pipe(
      map(user=>{
        if( user) return this.userService.get(user.uid)
        return null
      })
    )
  }
}
