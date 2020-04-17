import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$: any[];
  @Input('category') category;
  constructor(private categoryService: CategoryService) {
    let categoryArr = [];
    this.categoryService.getCategories().snapshotChanges()
      .subscribe(cat => {
        cat.forEach(c => categoryArr.push({ key: c.key, ...c.payload.val() }))
        this.categories$ = [...categoryArr];
      })
  }

  ngOnInit(): void {
  }

}
