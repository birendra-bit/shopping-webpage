import { Router } from '@angular/router';
import { Order } from './../models/order';
import { AuthService } from './../auth/auth.service';
import { OrderService } from './../services/order.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-carts';
import { Shipping } from '../models/shipping';

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
