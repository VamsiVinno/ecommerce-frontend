import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/shared/product.model';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  constructor(private pageService:PagesService,private router:Router) { }
  editAddress:boolean=false
  addressForm!: FormGroup;
  addressArray:any=[]
  otherAddress:any;
  @Output() isEdit=new EventEmitter<boolean>()
  frmStepTwo:any
  address:any;
  addressStore:any
  cartArray!:ProductModel[];
  totalPrice!:number
  totalAmount!:number
  totalDiscount!:number;
  selectedAddressIndex:number=0
  index!:number
  @Output() secondStep=new EventEmitter()
  ngOnInit(): void {
    this.addressForm= new FormGroup({
      'userdata':new FormGroup({
      'username': new FormControl(null,[Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.email]),
      'address':new FormControl(null,[Validators.required]),
      'landmark':new FormControl(null,[Validators.required]),
      'pincode':new FormControl(null,[Validators.required])
      }),
      
    });
  //   this.signUpForm.valueChanges.subscribe(x => {
  //     console.log('form value changed')
  //     console.log(x)
  // });
  // this.signUpForm.statusChanges.subscribe(x => {
  //   console.log('status changed')
  //   console.log(x)
  this.address=localStorage.getItem('address');
  this.addressStore=JSON.parse(this.address)
  this.addressArray=this.addressStore
  this.otherAddress=this.addressArray.slice(1)
console.log(this.otherAddress);

this.pageService.cartArray.subscribe(res=>{
  // console.log(res);
  
this.cartArray=res
})
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
onAddAddress(){
  this.addressForm?.setValue({
    userdata:{
      username:'',
phone:'',
address:'',
landmark:'',
pincode:''
    }
  })
}
onSelect(i:number){
  this.selectedAddressIndex=i
console.log(i);
console.log(this.addressStore[i]);
}
onRemove(i:number){
this.addressStore.splice(i,1)
this.addressArray=this.addressStore
localStorage.setItem('address',JSON.stringify(this.addressArray))
}
onEdit(i:number){
  this.index=i
  console.log(this.addressStore[i].username);
  
  this.addressForm?.setValue({
    userdata:{
      username:this.addressStore[i].username,
phone:this.addressStore[i].phone,
address:this.addressStore[i].address,
landmark:this.addressStore[i].landmark,
pincode:this.addressStore[i].pincode
    }
  })
  this.editAddress=true
}

onPlaceOrder(){
// this.router.navigate(['/orderplaced'])
// console.log(this.addressArray[this.selectedAddressIndex]);
this.pageService.shippingAddress.next(this.addressArray[this.selectedAddressIndex])
this.secondStep.emit()
this.isEdit.emit(true)
this.frmStepTwo=true
}
  onSubmit() {
    console.log(this.addressForm?.value.userdata)
    console.log(this.addressArray);
    
    if(this.editAddress==false){
this.addressArray.push(this.addressForm.value.userdata)
localStorage.setItem('address',JSON.stringify(this.addressArray))
    }
    else{
      console.log(this.addressStore[this.index]);
      
this.addressStore[this.index].username=this.addressForm?.value.userdata.username
this.addressStore[this.index].phone=this.addressForm?.value.userdata.phone
this.addressStore[this.index].address=this.addressForm?.value.userdata.address
this.addressStore[this.index].landmark=this.addressForm?.value.userdata.landmark
this.addressStore[this.index].pincode=this.addressForm?.value.userdata.pincode

    }
console.log(this.addressArray);
this.closebutton.nativeElement.click();
  }


}
