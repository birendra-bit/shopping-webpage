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
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProduct: Product[] = [];
  cart:any;
  val: Observable<any>;
  category; 
  subscription :Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
    let array = [];
    // this.val = productService.getAllProduct().snapshotChanges()
    this.productService.getAllProduct().snapshotChanges().subscribe(pro => {
      pro.forEach(val => {
        array.push({ key: val.key, ...val.payload.val() });
      })
      this.products = [...array];
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProduct = (this.category) ? 
          this.products.filter(p => p.category === this.category) : this.products;
      })
    })
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .snapshotChanges().subscribe(cart=>{
      this.cart = cart.payload.val();
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
