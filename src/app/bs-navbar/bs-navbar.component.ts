import { map } from 'rxjs/operators';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-carts';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: any;
  shoppingCartItemCount: number;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) { }
  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(u => {
      u ? u.valueChanges().subscribe(user => {
        this.appUser = user ? user : null;
      }) : this.appUser = null
    })

    let cart$ = await this.shoppingCartService.getCart();

    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let key in cart.items) {
        this.shoppingCartItemCount += cart.items[key].quantity;
      }
    })
  }
}
