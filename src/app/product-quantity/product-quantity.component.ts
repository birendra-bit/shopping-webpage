import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {

  }

  addToCart() {
    // console.log(this.product);
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity() {

    if (!this.shoppingCart) return 0;
    let itemKey = this.product.key;
    let item = this.shoppingCart.items[itemKey];

    return item ? item.quantity : 0;

  }
  ngOnInit(): void {
  }

}
