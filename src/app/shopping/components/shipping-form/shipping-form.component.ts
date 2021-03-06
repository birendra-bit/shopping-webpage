import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-carts';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Shipping } from '../../../shared/models/shipping';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  userId:string;

  constructor( private router:Router,
    private orderService: OrderService,
    private authService:AuthService ) {}

  ngOnInit(){
    this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  async placeOrder(shipping:Shipping){
    let order = new Order(this.userId, shipping, this.cart );
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }
}
