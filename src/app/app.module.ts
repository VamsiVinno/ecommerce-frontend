import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductLayoutComponent } from './components/product-layout/product-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './approuting.module';
import { BuyNowComponent } from './pages/buynow/buynow.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { ImgMagnifier } from "ng-img-magnifier";
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersModule } from './pages/orders/orders.module';
import { StepperStepsModule } from './pages/stepper-steps/stepper-steps.module';
import { ProductsModule } from './pages/products/products.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'src/assets/i18n/','.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    ProductLayoutComponent,
    HomepageComponent,
    BuyNowComponent,
    PlaceOrderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    BrowserAnimationsModule,
    
    MatTabsModule,
    MatRadioModule,
    ProductsModule,
    ImgMagnifier,NgxPaginationModule,
    OrdersModule,
    StepperStepsModule,
    TranslateModule.forRoot({
      defaultLanguage:'en-US',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    // MatChip
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
