import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product
  @Input('show-action') showAction = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
  getQuantity() {

    if (!this.shoppingCart) return 0;
    let itemKey = this.product.key;
    // console.log('item ',itemKey,' ',this.shoppingCart)
    let item = this.shoppingCart.items[itemKey]
    return item ? item.quantity : 0;

  }
  ngOnInit(): void {
  }

}
