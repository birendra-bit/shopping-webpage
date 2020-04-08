import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
    let array = [];
    this.productService.getAllProduct()
      .snapshotChanges().subscribe(pro=>{
        pro.forEach(val=>{
          array.push({key:val.key,...val.payload.val()});
        })
        this.products=[...array];
        // console.log(this.products)
      })
   }

  ngOnInit(): void {
  }

}
