import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './shared/services/auth/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { ProductComponent } from './shopping/components/product/product.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ShoppingModule,
    AdminModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseCongif),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      {
        path:'',
        component: ProductComponent
      },
      {
        path:'home',
        component: ProductComponent
      },  
      {
        path:'login',
        component:LoginComponent
      },     
      {
        path:'**', 
        component:ProductComponent
      }
    ]),
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
