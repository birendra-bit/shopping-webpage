import { ShoppingCart } from './../models/shopping-carts';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../models/shopping-cart-item';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$:Observable<ShoppingCart>;
  productId : any[];
  shoppingItemCount:number;
  items : ShoppingCartItem[];
  
  constructor( private shoppingCartService : ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await (await this.shoppingCartService.getCart()).valueChanges()
      this.cart$.subscribe(cart=>{

        this.items = cart.items;
        this.shoppingItemCount = 0;
        for(let key in cart.items){
          this.shoppingItemCount += cart.items[key].quantity;
        }
        this.productId = Object.keys(cart.items)
    })
  }

}
