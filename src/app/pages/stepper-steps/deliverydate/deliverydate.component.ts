import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Time } from './time.constant';

@Component({
  selector: 'app-deliverydate',
  templateUrl: './deliverydate.component.html',
  styleUrls: ['./deliverydate.component.css']
})
export class DeliverydateComponent implements OnInit {

  constructor(private router:Router) { }
  alldates:Date[]=[]
  dateValue!:Date
  date = new Date();
  minDate = new Date();
  selectedDate!:Date
  pickTime:any=Time
  disableDates:any=new Date(new Date().setDate(new Date().getDate()+4))
  @Output() ThirdStep=new EventEmitter()
  @Output() isEdit=new EventEmitter<boolean>()
  ngOnInit(): void {
   for(let i=0;i<7;i++){
      this.alldates.push(new Date(this.date.setDate(this.date.getDate() + 1)));
   }
  }
  checkButton(i:number){
if(i<3){
  return true
}
return false
  }
onProceed(){                                      
  this.ThirdStep.emit()
  this.isEdit.emit(true)
}
}
