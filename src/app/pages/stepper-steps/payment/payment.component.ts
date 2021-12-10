import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalPrice!:number
  totalAmount!:number
  totalDiscount!:number
  // @Output() isEdit=new EventEmitter<boolean>()

  onPayment(){
this.router.navigate(['/orderplaced'])
  }
  constructor(private router:Router,private pageService:PagesService) { }

  ngOnInit(): void {
    this.pageService.totalPrice.subscribe(res=>{
      this.totalPrice=res
    })
    this.pageService.totalAmount.subscribe(res=>{
    this.totalAmount=res
    })
    this.pageService.totalDiscount.subscribe(res=>{
      this.totalDiscount=res
      })
  }

}
