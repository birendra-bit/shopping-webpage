import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Injectable, Query } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private db: AngularFireDatabase) { }
  getCategories(): AngularFireList<any> {
    return this.db.list('categories')
  }
}
