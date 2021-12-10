import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentService } from 'src/app/components/components.service';
import { EcomServices } from 'src/app/ecom.services';
import { BestDeals } from './bestDeals.constant';
import { DealsOfTheDay } from './dealoftheday.constant';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  DealsOfTheDay: any = DealsOfTheDay;
  BestDeals: any = BestDeals.slice(0, 5);
  BestDeals2: any = BestDeals.slice(5);
  onImgClick(category:string){
    this.ecom.category.next(category)
this.router.navigate(['/products',`${category}`])
  }
  // fashionCategory: any;

  // onFashionCategory(event: Event) {
  //   this.fashionCategory = event;
  // }

  constructor(private ecom: EcomServices,private router:Router) {}

  ngOnInit(): void {}
}
