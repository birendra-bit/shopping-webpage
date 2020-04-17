import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminAuthGuardService } from 'app/shared/services/auth/admin-auth-guard.service';
import { AuthGuardService } from 'app/shared/services/auth/auth-guard.service';
import { AuthService } from 'app/shared/services/auth/auth.service';

import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path:'admin/orders',
        component:AdminOrdersComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService] 
      },
      {
        path:'admin/products/new',
        component:ProductFormComponent, 
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      {
        path:'admin/products/:id',
        component:ProductFormComponent, 
        canActivate:[AuthGuardService,AdminAuthGuardService]
      },
      {
        path:'admin/products',
        component:AdminProductsComponent,
        canActivate:[AuthGuardService,AdminAuthGuardService] 
      }
    ]),
  ],
  providers:[
    AuthService,
    AuthGuardService
  ]
})
export class AdminModule { }
