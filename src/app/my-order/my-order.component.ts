import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  userId : string;
  orders:Observable<any>;
  constructor(private orderService:OrderService, private authService:AuthService) {
  }

  async ngOnInit() {
    await this.authService.user$.subscribe(u=>{
       this.orderService.getOrdersByUser(u.uid).valueChanges().subscribe(x=>console.log(x))     
    }); 
  }
}
