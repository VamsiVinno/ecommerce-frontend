import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { StepperComponent } from './stepper/stepper.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CDBFreeModule } from 'ng-cdbangular';
import { DeliverydateComponent } from './deliverydate/deliverydate.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
@NgModule({
  declarations: [
    StepperComponent,
    AddressComponent,
    CartComponent,
    PaymentComponent,
    DeliverydateComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    CDBFreeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class StepperStepsModule { }
