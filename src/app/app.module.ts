import { ShoppingCart } from './models/shopping-carts';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuardService } from './auth/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth'
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseCongif),
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {
        path:'', 
        component: ProductComponent
      },
      {
        path:'products',
        component: ProductComponent
      },
      {
        path:'shopping-cart', 
        component: ShoppingCartComponent, 
        canActivate:[AuthGuardService]
      },
      {
        path:'check-out',
        component:CheckOutComponent, 
        canActivate:[AuthGuardService]
      },
      {
        path:'order-success',
        component:OrderSuccessComponent,
        canActivate:[AuthGuardService]
      },  
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'my/orders',
        component:MyOrderComponent,
        canActivate:[AuthGuardService] 
      },
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
      },
      
      {
        path:'**', 
        component:ProductComponent
      }
    ]),
    FormsModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
