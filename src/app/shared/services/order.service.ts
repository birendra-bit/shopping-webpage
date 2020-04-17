import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable, Query } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }
  
  getOrder(){
    return this.db.list('orders');
  }
  async placeOrder(order){
    let result = await this.db.list('orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  getOrdersByUser(userId:string){
    return this.db.list('orders').snapshotChanges();
  }
}
