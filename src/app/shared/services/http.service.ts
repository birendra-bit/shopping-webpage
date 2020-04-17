import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url:string='https://shopping-c13eb.firebaseio.com/items.json';
  itemDoc: AngularFirestoreDocument<any>;
  items: Observable<any>
  constructor( private db: AngularFireDatabase, private afs: AngularFirestore ) {}
  getUsers(){
    return this.db.object('items')
    // this.itemDoc = this.afs.doc('items/1')
    // this.items = this.itemDoc.snapshotChanges()
    // console.log(this.items)
    // return this.items;
  }
}
