import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from 'app/shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'app/shared/components/product-quantity/product-quantity.component';
import { AdminAuthGuardService } from 'app/shared/services/auth/admin-auth-guard.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { CategoryService } from 'app/shared/services/category.service';
import { OrderService } from 'app/shared/services/order.service';
import { ProductService } from 'app/shared/services/product.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { UserService } from 'app/shared/services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers:[
    AuthService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
