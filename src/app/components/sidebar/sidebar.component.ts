import { Component, Input, OnInit } from '@angular/core';
import { EcomServices } from 'src/app/ecom.services';
import { ComponentService } from '../components.service';
import { BoysWear } from './boys.constant';
import { MENS_WEAR } from './men.constant';
import { MENS_BRANDS } from './menbrands.constant';
import { Price } from './price.constant';
import { WOMENS_WEAR } from './sidebar.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  SubCategory: any = [];
  price = Price;
  kidsWear: any = BoysWear;
  boysWear: any = this.kidsWear.slice(0, 2);
  girlsWear = this.kidsWear.slice(2);
  mensWear = MENS_WEAR;
  womensWears = WOMENS_WEAR;
  menBrands = MENS_BRANDS;
  showBrands: boolean = false;
  brandsCategory: any = [];
  category?: string;
  priceRange: any = [];
  checked?:boolean;
  
  selectedCategory: any

  onCheck(event: Event, i: number) {
    
    if ((event.target as HTMLInputElement).checked == true) {
      this.brandsCategory = [];
      this.SubCategory.push((event.target as HTMLInputElement).value);
      if (this.selectedCategory== 'men') {
        this.mensWear[i].enableCheckBox = true;
      } else if (this.category == 'women') {
        this.womensWears[i].enableCheckBox= true;
      } else if (this.category == 'kids') {
        this.kidsWear[i].enableChildren = true;
      }
      this.compService.fashionCategory.next(this.SubCategory);
    } else if ((event.target as HTMLInputElement).checked == false) {
      let popedIndex = this.SubCategory.indexOf(
        (event.target as HTMLInputElement).value
      );
      this.SubCategory.splice(popedIndex, 1);
      this.compService.fashionCategory.next(this.SubCategory);
      this.brandsCategory = [];
    }
  }
  onBrand(event: Event,i:number) {
    if ((event.target as HTMLInputElement).checked == true) {
      this.menBrands[i].enableCheckBox=true
      this.brandsCategory.push((event.target as HTMLInputElement).value);
      this.compService.brandsCategory.next(this.brandsCategory);
    } else if ((event.target as HTMLInputElement).checked == false) {
      let popedIndex = this.brandsCategory.indexOf(
        (event.target as HTMLInputElement).value
      );
      this.brandsCategory.splice(popedIndex, 1);
      this.compService.brandsCategory.next(this.brandsCategory);
    }
  }
  onPrice(event: Event) {
    if ((event.target as HTMLInputElement).checked == true) {
      this.priceRange.push((event.target as HTMLInputElement).value);
      this.compService.priceRange.next(this.priceRange);
    } else if ((event.target as HTMLInputElement).checked == false) {
      let popedIndex = this.priceRange.indexOf(
        (event.target as HTMLInputElement).value
      );
      this.priceRange.splice(popedIndex, 1);
      this.compService.priceRange.next(this.priceRange);
    }
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  filterUnCheck(catWear:any,res:any){
    catWear.forEach((wear:any)=>{
      if(res.includes(wear?.type))
{
  
  wear.enableCheckBox=true
}   
else{
  wear.enableCheckBox=false
}
});

  }
  constructor(private compService: ComponentService,private ecom:EcomServices) {

  }
  ngOnInit(): void {
   
    this.ecom.category.subscribe((catres:any) => {
      if(catres){
      this.selectedCategory = catres;
      }
      else{
        this.selectedCategory=this.ecom.cate
      }
      if (this.selectedCategory== 'men' || 'women' || 'kids') {
        this.SubCategory = [];
      }
      this.compService.fashionCategory.subscribe((res:any) => {
     if(this.selectedCategory=='men'){
      this.filterUnCheck(this.mensWear,res)
    }  else if(catres=='women'){
  
         this.filterUnCheck(this.womensWears,res)
       }
     else{
      this.filterUnCheck(this.kidsWear,res)
      }
      });
     this.compService.brandsCategory.subscribe(res=>{
     this.filterUnCheck(this.menBrands,res)      
    })
})
    
  }
}
