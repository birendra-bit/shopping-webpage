import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';

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
    // console.log(this.products)
  }
  
  private applyFilter(){
    this.filteredProduct = (this.category) ? 
    this.products.filter(p => p.category === this.category) : this.products;
  }
}
