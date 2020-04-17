import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-carts';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart:ShoppingCart;
  subscription:Subscription;
  shippingSubscription: Subscription;

  constructor( private shoppingCartService: ShoppingCartService ) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.valueChanges().subscribe(cart=>{
      this.cart = cart;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
