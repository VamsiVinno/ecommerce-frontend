import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  
  clickedProduct!: number
  // clickedProduct = new Subject<number>();

  cartLength=new BehaviorSubject<number>(0)
  local(cartLength:number){
 localStorage.setItem('cartLength',JSON.stringify(cartLength))

  }
  constructor() {}
  setCartLength(x:number){
  this.cartLength.next(x);
  }
  getCartLength(){
  return this.cartLength 
  }
 
  
  
}
