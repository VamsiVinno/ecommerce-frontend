import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';

import { NgxImageZoomModule } from "ngx-image-zoom";
import { ImgMagnifier } from 'ng-img-magnifier';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    NgxImageZoomModule,
    ImgMagnifier
  ]
})
export class ProductsModule { }
