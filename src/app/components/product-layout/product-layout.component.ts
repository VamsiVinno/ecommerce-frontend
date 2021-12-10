import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcomServices } from 'src/app/ecom.services';
import { SharedService } from 'src/app/shared/shared.services';
import { ComponentService } from '../components.service';

@Component({
  selector: 'app-product-layout',
  templateUrl: './product-layout.component.html',
  styleUrls: ['./product-layout.component.css'],
})
export class ProductLayoutComponent implements OnInit, OnChanges {
  productsArray: any;
  initialProducts: any;
  searchProduct: any;
  productCategory: any;
  brandCategory:any
  subCategory:any
  p: number = 1;
  @Input() kidsCategory: any;
  emptyArray: boolean = false;
  displayedProductsArray: any;
  onProduct(i: number) {
    this.shared.clickedProduct = i;
    localStorage.setItem(
      'clickedProduct',
      JSON.stringify(this.productsArray[i])
    );
this.route.navigate(['/product',`${this.productsArray[i].product_id}`])
  }
  constructor(
    private ecomService: EcomServices,
    private compService: ComponentService,
    private shared: SharedService,
    private route:Router
  ) {

    
  }
  onFashionDelete(i:number){
    console.log(this.subCategory);
this.subCategory.splice(i,1);
this.compService.fashionCategory.next(this.subCategory)
  }
  onBrandDelete(i:number){
this.brandCategory.splice(i,1);
this.compService.brandsCategory.next(this.brandCategory)
  }
  ngOnChanges(): void {
    if (this.productsArray == '') {
      this.emptyArray = true;
    } else {
      this.emptyArray = false;
    }
  }
  searchFilter(searchValue: any) {
    
    let filterData = this.productsArray.filter((data: any) => {
      return data.brand.toLowerCase().includes(searchValue);
    });
    this.productsArray = filterData;
  }
  onSort(order: number) {
    let sorted;
    if (order == 1) {
      sorted = this.productsArray.sort((a: any, b: any) => {
        return a.price - b.price;
      });
    } else if (order == 0) {
      sorted = this.productsArray.sort((a: any, b: any) => {
        return b.price - a.price;
      });
    }
    this.productsArray = sorted;
  }

  ngOnInit(): void {
    this.productCategory=this.ecomService.cate;
  
    this.compService.fashionCategory.subscribe((cat: any) => {
        this.subCategory=cat
    })
    this.compService.brandsCategory.subscribe((cat: any) => {
      this.brandCategory=cat
          })
    this.ecomService.category.subscribe((res) => {
      this.p=1
if(res){
      this.productCategory = res;
}
      let subCategory: any;
      if (this.productCategory) {
        this.ecomService.categoryProducts(this.productCategory).subscribe({
          next: (res) => {
         this.p=1
console.log(res);

            this.productsArray = res;
            this.searchProduct=res
            this.displayedProductsArray = this.productsArray;
          },
        });
      }
     
      this.compService.fashionCategory.subscribe((cat: any) => {
        this.fashionFilterChange(this.productCategory, cat);
        subCategory = cat;
        if (cat.length < 1 ) {
          this.ecomService
            .categoryProducts(this.productCategory)
            .subscribe((res) => {
         this.p=1

              this.productsArray = res;
            });
        }
        this.compService.brandsCategory.subscribe((brandcat: any) => {
          this.brandChange(this.productCategory, cat, brandcat);
          if (brandcat.length < 1) {
            this.ecomService
            .categoryProducts(this.productCategory)
            .subscribe((res) => {
         this.p=1
              this.productsArray = res;
            });
            this.emptyArray = false;
          }
        });
      });
      this.compService.fashionCategory.subscribe((cat: any) => {
      this.compService.priceRange.subscribe((res: any) => {
        this.priceRange(res);
       if(res.length<1 && this.subCategory.length>0){
this.fashionFilterChange(this.productCategory,cat)
        } 
        else  if (res.length < 1 && this.productCategory) {
          this.ecomService
          .categoryProducts(this.productCategory)
          .subscribe((res) => {
            this.p=1
            this.productsArray = res;
          });
        }
      });
    });
  })
  this.compService.searchValue.subscribe((res) => {
    this.searchFilter(res);
  });
  }
  priceRange(range: string) {
    let pricRangeArray: any = [];

    for (let i = 0; i < range.length; i++) {
      switch (range[i]) {
        case '0-500':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price <= 500) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '500-1000':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price > 500 && products.price <= 1000) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '1000-2000':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price > 1000 && products.price <= 2000) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '2000-5000':
          {
            this.displayedProductsArray.map((products: any) => {
              if (products.price > 2000 && products.price <= 5000) {
                pricRangeArray.push(products);
              }
            });
          }
          break;
        case '5000+': {
          this.displayedProductsArray.map((products: any) => {
            if (products.price > 5000) {
              pricRangeArray.push(products);
            }
          });
        }
      }
      this.productsArray = pricRangeArray;
    }
  }
  brandChange(mainCategory: string, fashionCategory: any, brand: string) {
    let brands: any = [];
    this.productsArray = [];
    for (let i = 0; i < fashionCategory.length; i++) {
      brands = [];
      for (let j = 0; j < brand.length; j++) {
        this.ecomService
          .brandCategory(mainCategory, fashionCategory[i], brand[j])
          .subscribe((res: any) => {
         this.p=1
            brands.push(...res);
            this.productsArray = brands;
            if (this.productsArray == '') {
              this.emptyArray = true;
            } else {
              this.emptyArray = false;
            }
          });
      }
    }
  }
  fashionFilterChange(mainCategory: string, subCategory: string) {
    let fashionFilter: any = [];
    for (let i = 0; i < subCategory.length; i++) {
      this.ecomService
        .fashionCategory(mainCategory, subCategory[i])
        .subscribe((res: any) => {
         this.p=1
          fashionFilter.push(...res);
        });
    }
    this.productsArray = fashionFilter;
  }
}
