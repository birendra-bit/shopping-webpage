import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-carts';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$:Observable<ShoppingCart>;
  productId : any[]=[];
  shoppingItemCount:number;
  totalItems:number;
  totalPrice:number;
  shoppingCart : ShoppingCart;
  constructor( private shoppingCartService : ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await (await this.shoppingCartService.getCart()).valueChanges()
      this.cart$.subscribe(cart=>{

        this.shoppingCart = cart;
        this.shoppingItemCount = 0;
        this.totalItems = 0;
        this.totalPrice = 0;

        if(!this.shoppingCart)
        return;
        this.productId.splice(0,this.productId.length);

        for(let key in this.shoppingCart.items){
          if(this.shoppingCart.items[key].quantity > 0) {
            this.productId.push(key);
            this.shoppingItemCount += this.shoppingCart.items[key].quantity;
            this.totalItems += this.shoppingCart.items[key].quantity;
            this.totalPrice += this.shoppingCart.items[key].product.price;
          }
        }
    })
  }
  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
