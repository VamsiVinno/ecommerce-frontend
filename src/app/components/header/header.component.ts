import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EcomServices } from 'src/app/ecom.services';
import { SharedService } from 'src/app/shared/shared.services';
import { ComponentService } from '../components.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  selectedCategory?: any;
  showuser:boolean=false
  kidsCategory = false;
  searchValue?: string = '';
  cartLength:any
  address:any=localStorage.getItem('address');
  addressStore:any=JSON.parse(this.address)

  showuserInfo(){
    this.showuser=!this.showuser
  }
  onCategory(event: Event) {
    this.showuser=false
    this.ecomService.category.next(
      (event.target as HTMLInputElement).textContent?.toLowerCase()
    );
    this.componentService.fashionCategory.next(
      []
    );
    this.componentService.fashionCategory.next([])
   this.ecomService.local( (event.target as HTMLInputElement).textContent?.toLowerCase()!)
    this.route.navigate(['/products',`${(event.target as HTMLInputElement).textContent?.toLowerCase()}`])
  }
  onSearch(event: Event) {
    this.componentService.searchValue.next(
      (event.target as HTMLInputElement).value
    );
  }
  public selectLanguage(event: any) {
    console.log(event.target.value);
    
    this.translateService.use(event.target.value);
  }
  onBag(){
    this.route.navigate(['/checkout'])
    this.showuser=false
  }
  onSearchValue() {
    let search = (document.getElementById('search') as HTMLInputElement).value;
    this.componentService.searchValue.next(search);
    this.showuser=false;
  }
  constructor(
    private ecomService: EcomServices,
    private componentService: ComponentService,
    private shared: SharedService,
    private route: Router,private translateService: TranslateService
  ) {
  }
  
  ngOnChanges(): void {

    
  }
  ngOnInit(): void {
    this.ecomService.showUserInfo.subscribe(res=>{
      this.showuser=res
    })
   
    let cart:any=localStorage.getItem('cartLength');
    let length:any=JSON.parse(cart)
    this.cartLength=length;
    this.shared.getCartLength().subscribe(data=>{
      if(data){
      this.cartLength = data
      this.shared.local(this.cartLength)
    }
    })
    
  }

}
