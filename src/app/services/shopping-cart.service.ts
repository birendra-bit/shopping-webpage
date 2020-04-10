import { Product } from 'src/app/models/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators'
import { ShoppingCart } from '../models/shopping-carts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart():Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('shopping-carts/${cartId}');
  }

  //get cart id
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);

    return result.key;
  }

  //get items
  private getItem(cartId: string, productId: string) {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  //add or update cart itema
  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }
  
  private async updateItemQuantity(product: Product, change: number) {

    let cartId = await this.getOrCreateCartId();

    let items = this.getItem(cartId, product.key);
    items.valueChanges().pipe(
      take(1)
    ).subscribe(item => {
      item ? items.update({ quantity: Object.values(item)[1] + change }) :
        items.set({ product: product, quantity: change });
    })
  }
}
