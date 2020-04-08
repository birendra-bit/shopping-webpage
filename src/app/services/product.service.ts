import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db: AngularFireDatabase) { }
  createProduct(product){
    return this.db.list('products').push(product);
  }
  getAllProduct():AngularFireList<any>{
    return this.db.list('products');
  }
  getProductById(productId): AngularFireObject<any>{
    return this.db.object('products/'+productId);
  }
  updateProduct(id,product){
   this.db.object('products/'+id).update(product);
  }
  deleteProduct(id){
    this.db.object('products/'+id).remove();
  }
}
