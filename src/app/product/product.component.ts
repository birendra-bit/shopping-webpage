import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProduct: Product[] = [];
  cart:any;
  val: Observable<any>;
  category; 
  subscription :Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
     (await this.shoppingCartService.getCart()).snapshotChanges().
      subscribe(cart=>{
      this.cart = cart.payload.val();
    })
    this.populatePorduct();
  }

  private populatePorduct() {
    this.productService.getAllProduct().snapshotChanges().subscribe(pro => {
      pro.forEach(val => {
        this.products.push({ key: val.key, ...val.payload.val() });
      })
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      })
    })
  }
  
  private applyFilter(){
    this.filteredProduct = (this.category) ? 
    this.products.filter(p => p.category === this.category) : this.products;
  }
}
