import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductLayoutComponent } from "./components/product-layout/product-layout.component";
import { LayoutComponent } from "./layout/layout.component";
import { AddressComponent } from "./pages/stepper-steps/address/address.component";
import { BuyNowComponent } from "./pages/buynow/buynow.component";
import { CartComponent } from "./pages/stepper-steps/cart/cart.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { OrderDetailsComponent } from "./pages/orders/order-details/order-details.component";
import { OrderlistComponent } from "./pages/orders/orderlist/orderlist.component";
import { PlaceOrderComponent } from "./pages/place-order/place-order.component";
import { ProductsComponent } from "./pages/products/products.component";
import { StepperComponent } from "./pages/stepper-steps/stepper/stepper.component";
import { DeliverydateComponent } from "./pages/stepper-steps/deliverydate/deliverydate.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomepageComponent,
      },
      { path: "products/:category", component: ProductLayoutComponent },
      { path: "cart", component: CartComponent },
      { path: "product/:productId", component: ProductsComponent },
      { path: "buynow", component: BuyNowComponent },
      { path: "orderplaced", component: PlaceOrderComponent },
      { path: "allorders", component: OrderlistComponent },
      { path: "orderdetails", component: OrderDetailsComponent },
      { path: "address", component: AddressComponent },
      { path: "checkout", component: StepperComponent },
      { path: "delivery", component:DeliverydateComponent},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
