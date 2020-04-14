import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-carts';
import { element } from 'protractor';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
@Input('cart') cart: ShoppingCart;
  items:ShoppingCartItem[]=[];
  totalItems:number;
  totalPrice:number;
  constructor() {}

  ngOnInit() {
    this.totalItems=0;
    this.totalPrice = 0;
    for(let key in this.cart.items){
      this.items.push(this.cart.items[key]);
      this.totalItems += this.cart.items[key].quantity; 
      this.totalPrice+= this.cart.items[key].quantity* this.cart.items[key].product.price;
    }
  }

}
