import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { OrderService } from 'app/shared/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit, OnDestroy {
  userId : string;
  orders:{};
  userOrder:any[]=[];
  subscription:Subscription
  constructor(private orderService:OrderService, private authService:AuthService) {
  }

  async ngOnInit() {
    await this.authService.user$.subscribe(u=>{
      this.userId = u.uid;
    });
    this.subscription = ( await this.orderService.getOrder()).valueChanges().subscribe(order=>{
      this.orders = order.map(ele=>ele);
      console.log(this.orders)
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
