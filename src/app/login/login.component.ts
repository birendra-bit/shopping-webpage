import { AuthService } from './../auth/auth.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private auth: AuthService ) { 
    // afAuth.authState.subscribe(x=>console.log(x))
  }
  login(){
    this.auth.login();
    // this.afAuth.signInWithEmailAndPassword(new firebase.auth.GoogleAuthProvider())
    // this.afAuth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
  }
}
