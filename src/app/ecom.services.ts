import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EcomServices {
  showUserInfo=new Subject<boolean>()
  category = new BehaviorSubject<any>('');
  clickedProduct?: number;
  mainCategory: any = localStorage.getItem('Category');
  cate:any=JSON.parse(this.mainCategory)
  allProducts() {
    return this.httpclient.get('http://192.168.0.12:3005/api/allProducts');
  }

  categoryProducts(category: string) {
    return this.httpclient.get(`http://192.168.0.12:3005/api/${category}`);
  }

  menCategory(menWear: string) {
    return this.httpclient.get(`http://192.168.0.12:3005/api/men-${menWear}`);
  }
  womenCategory(womenWear: string) {
    return this.httpclient.get(
      `http://192.168.0.12:3005/api/women-${womenWear}`
    );
  }
  KidsCategory(KidsWear: string) {
    return this.httpclient.get(`http://192.168.0.12:3005/api/kids/${KidsWear}`);
  }

  cart() {
    return this.httpclient.get('http://192.168.0.12:3005/api/cart');
  }
  emptyCart() {
    return this.httpclient.delete('http://192.168.0.12:3005/api/emptyCart', {
      responseType: 'text',
    });
  }
  allOrders() {
    return this.httpclient.get('http://192.168.0.12:3005/api/allOrders');
  }
  placeOrder(productId: number, address: string, phone: number) {
    return this.httpclient.post(
      'http://192.168.0.12:3005/api/placeOrder',
      {
        productId: productId,
        orderStatus: 'ordered',
        orderDate: new Date(),
        address: address,
        phone: phone,
      },
      { responseType: 'text' }
    );
  }
  priceRange(prange: string) {
    return this.httpclient.get(
      `http://192.168.0.12:3005/api/product/${prange}`
    );
  }
  fashionCategory(mainCategory: string, subCategory: string) {
    return this.httpclient.get(
      `http://192.168.0.12:3005/api/${mainCategory}-${subCategory}`
    );
  }
  brandCategory(mainCategory: string, subCategory: string, brand: string) {
    return this.httpclient.get(
      `http://192.168.0.12:3005/api/${mainCategory}-${subCategory}/${brand}`
    );
  }
  deleteCartItem(productId: number) {
    return this.httpclient.delete(
      `http://192.168.0.12:3005/api/dropFromCart/${productId}`,
      { responseType: 'text' }
    );
  }
  local(cat:string){
     
    localStorage.setItem(
      'Category',
      JSON.stringify(
       cat
      )
    );
  }
  cartArray: Map<any, number> = new Map<any, number>();
  constructor(private httpclient: HttpClient) {
  }
}
