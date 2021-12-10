import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrderlistComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
NgxStarRatingModule, FormsModule,
ReactiveFormsModule,NgxPaginationModule
  ]
})
export class OrdersModule { }
