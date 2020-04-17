import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$: any[];
  product;
  productId;

  constructor( private categoryService:CategoryService, 
    private productService:ProductService,
    private router: Router,
    private route:ActivatedRoute ) {
    this.product = initialState;
    let obj = [];
    this.categoryService.getCategories().
      snapshotChanges()
        .subscribe(actions=>{
          actions.forEach(action=> obj.push({key:action.key,...action.payload.val()}))
          obj.sort();
          this.categories$ = [...obj]
        })
      
      this.route.paramMap.subscribe(params=>{
        this.productId = params.get('id');
        if(this.productId){ 
          this.productService.getProductById(this.productId)
          .snapshotChanges().subscribe(pro=>{
            this.product = {key:pro.key,...pro.payload.val()}
          })
        }
      });
   }
   save(product){
     if( this.productId) this.productService.updateProduct( this.productId,product);
      else
      this.productService.createProduct(product);
      this.router.navigate(['/admin/products']);
   }
   delete(){
     if(!confirm('Are you sure you want to delete the product')) return;
     this.productService.deleteProduct(this.productId);
     this.router.navigate(['/admin/products']);
   }
  ngOnInit(): void {
  }
  ngOnDestroy(){
  }
}
const initialState={
    key:'', 
    category:'',
    imageUrl:'',
    price: 0,
    title: ''
  }