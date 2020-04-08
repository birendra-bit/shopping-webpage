import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  productList: Product[];
  filteredProduct: any[];
  subscription: Subscription;

  constructor(private productdService: ProductService) {
    let product =[]
    this.subscription = this.productdService.getAllProduct().snapshotChanges()
      .subscribe(obj=>{
        return obj.forEach(pro =>{
          product.push({key:pro.key,...pro.payload.val()})
          product.sort();
          this.productList=[...product]
          this.filteredProduct = [...product]
        })
      })
   }
  filter(query:string){
    this.filteredProduct = (query)?
      this.productList.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())): this.productList;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {}
}
