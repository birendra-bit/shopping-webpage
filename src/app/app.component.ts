import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Observable } from 'rxjs'
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping';
  items:Observable<any[]>;

  constructor( private userServie: UserService, private auth: AuthService, private router: Router){
    auth.user$.subscribe(user=>{
      if( user ){
        userServie.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        
        if(returnUrl)
          router.navigateByUrl(localStorage.getItem('returnUrl'));
        else
          this.router.navigate(['/']);
      }
    })
    }
}
