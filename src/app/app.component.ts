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

  constructor( private userServie: UserService, private auth: AuthService, router: Router){
    auth.user$.subscribe(user=>{
      if( user ){
        userServie.save(user);
        router.navigateByUrl(localStorage.getItem('returnUrl'));
      }
    })
    // httpservice.getUsers().subscribe(data=>{
    //   console.log(data.val());
    // })
    // this.object = httpservice.object('items');
    // let obj = []
    // this.items = this.object.valueChanges();
    
    // this.object.snapshotChanges().subscribe(e=>{
    //   e.payload.val().map(data=>{
    //     // obj.push(data);
    //     console.log(data)
    //   });
    //   console.log(e.payload.key)
      // this.values = [...obj]
      // console.log('final : ', this.values);
    // })
    // this.object.set()
    // this.values = [...obj]
    
      // this.object = httpservice.getUsers().valueChanges();
  }
}
