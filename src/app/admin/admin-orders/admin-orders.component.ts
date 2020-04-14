import { Subscription } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy{
  orders:any={}
  subscription:Subscription
  constructor(private orderService: OrderService) { }

  async ngOnInit(){
    this.subscription = (await this.orderService.getOrder()).valueChanges().subscribe(order=>{
      this.orders = order.map(ele=>ele);
    })
  }
ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
