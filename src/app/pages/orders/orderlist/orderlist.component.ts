import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcomServices } from 'src/app/ecom.services';
import { ProductModel } from 'src/app/shared/product.model';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit {
  
  allOrdersArray: ProductModel[] = [];
  orders: any;
  confirmedOrders:ProductModel[]=[];
  canceledOrders:ProductModel[]=[];
  p: number = 1;

  public form!: FormGroup;
  constructor(
    private ecom: EcomServices,
    private pagesService: PagesService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
  
  }
  onOrderClick(i: number) {
    this.pagesService.clickedOrder(this.allOrdersArray[i]);
    this.pagesService.orders.next(this.orders[i]);
    this.route.navigate(['orderdetails']);
  }
  ordersSort(sortBy:string){
if(sortBy=='confirmed'){
this.ecom.allOrders().subscribe((res: any) => {
  res.forEach((element: any) => {
    if(element.order_status=='ordered'){
      this.confirmedOrders.push(element);
      this.allOrdersArray=this.confirmedOrders
    }
  })
})
}
else if(sortBy=='canceled'){
  console.log('canceled')
  this.ecom.allOrders().subscribe((res: any) => {
    res.forEach((element: any) => {
      if(element.order_status=='canceled'){
        this.canceledOrders.push(element);
        console.log(this.canceledOrders);
        
      }
    })
  })
}
  }

  ngOnInit(): void {
    this.ecom.allOrders().subscribe((res: any) => {
      this.orders = res;
      this.ecom.allProducts().subscribe((prodres: any) => {
        res.forEach((element: any) => {
          prodres.forEach((prod: any) => {
            if (prod.product_id === element.product_id) {
              this.allOrdersArray?.push(prod);
            }
          });
        
        });
      });
    });
  }
}
