import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductModel } from '../shared/product.model';
@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor() {}
  placeOrder = new Subject<any>();
  orderClick = new BehaviorSubject<object>({});
  orders = new BehaviorSubject<object>({});
  address!: string;
  phone!: number;
  productId!: number;
  clickedOrder(orderDetails: any) {
    this.orderClick.next(orderDetails);
  }
cartArray=new BehaviorSubject<ProductModel[]>([])
totalPrice=new BehaviorSubject<number>(0)
totalDiscount=new BehaviorSubject<number>(0)
totalAmount=new BehaviorSubject<number>(0)
shippingAddress=new BehaviorSubject<object>({})
}
