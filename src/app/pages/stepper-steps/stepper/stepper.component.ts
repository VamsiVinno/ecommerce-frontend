import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { PagesService } from '../../pages.service';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  isLinear = false;
  isEditable:any=false;
  cartFormGroup!:FormGroup
@ViewChild("stepper") stepper!:MatStepper
  constructor(private _formBuilder: FormBuilder,private pageService:PagesService) {
  }
test(stepper:MatStepper){
  console.log(stepper._stepHeader);

  stepper.next()
  this.stepper.selected!.completed = true;
  this.stepper.selected!.editable = true;

}

selectedIndex: number = 0;
setIndex(event:any) {
  this.selectedIndex = event.selectedIndex;
}
onEdit(stepper:MatStepper ,event:any){
  // this.cartFormGroup=event;
 console.log(event);
 

}



  ngOnInit() {
    
    
  }

}
