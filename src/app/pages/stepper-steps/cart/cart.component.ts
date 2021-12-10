import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { EcomServices } from 'src/app/ecom.services';
import { ProductModel } from 'src/app/shared/product.model';
import { SharedService } from 'src/app/shared/shared.services';
import Swal from 'sweetalert2';
import { PagesService } from '../../pages.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit{
  cartItems: ProductModel[] = [];
  totalPrice!: number;
  count: Array<number> = [];
  allProductsArray: any;
  cartArray: any;
  totalCount?: number;
  totalDiscount?:number;
  totalAmount?:number;
  frmStepOne!:any
  cartFormGroup!: FormGroup
  @Output() firstStep=new EventEmitter()
  @Output() isEdit=new EventEmitter<any>()
  constructor(
    private ecomService: EcomServices,
    private http: HttpClient,
    private route: Router,
    private shared: SharedService,
    private pageService: PagesService,
    private _formBuilder: FormBuilder
  ) {}
  showCart: boolean = true;
  address?: any;
  phone?: any;
  onFocusAddress(event: Event) {
    this.address = (event.target as HTMLInputElement).value;
  }
  onFocusPhone(event: Event) {
    this.phone = (event.target as HTMLInputElement).value;
  }
 
  onDelete(i: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to delete it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ecomService
          .deleteCartItem(this.cartItems[i].product_id!)
          .subscribe((res) => {
            this.cartItems = [];
            this.count = [];
            this.ecomService.cart().subscribe((res: any) => {
              if (res.length == 0) {
          this.shared.setCartLength(0);

              }
              this.ecomService.allProducts().subscribe((product: any) => {
                this.reusableCart(res, product);
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              });
            });
          });
      }
    });
  }
  increaseCount(i: number) {
    return this.http
      .put(
        'http://192.168.0.12:3005/api/productCountUp',
        {
          productId: this.cartItems[i].product_id,
        },
        { responseType: 'text' }
      )
      .subscribe((res) => {
        this.ecomService.cart().subscribe((res: any) => {
          this.count[i] = res[i].product_count;
          this.totalCount = this.count.reduce((acc: number, ele: number) => {
            return acc + ele;
          }, 0);
          this.shared.setCartLength(this.totalCount)
          this.totalPrice = this.cartItems.reduce(
            (acc: any, a: any, i: number) => {
              return acc + a.price * res[i].product_count;
            },
            0
          );
    this.totalAmount=this.totalPrice-this.totalDiscount!

        });
      });
  }
  decreaseCount(i: number) {
    return this.http
      .put(
        'http://192.168.0.12:3005/api/productCountDown',
        {
          productId: this.cartItems[i].product_id,
        },
        { responseType: 'text' }
      )
      .subscribe((res) => {
        this.ecomService.cart().subscribe((res: any) => {
          this.count[i] = res[i].product_count;
          this.totalCount = this.count.reduce((acc: number, ele: number) => {
            return acc + ele;
          }, 0);
          this.shared.setCartLength(this.totalCount);
          if (res[i].product_count == 0) {
            res[i].product_count=0;
            this.onDelete(i);
          }
          this.totalPrice = this.cartItems.reduce(
            (acc: any, a: any, i: number) => {
              return acc + a.price * res[i].product_count;
            },
            0
          );
    this.totalAmount=this.totalPrice-this.totalDiscount!

        });
      });
  }
  onClear() {
    this.ecomService.emptyCart().subscribe((res: any) => {});
    this.shared.setCartLength(0)
this.cartItems=[]
    this.ecomService.cart().subscribe((res: any) => {
      this.cartItems = res;
      this.showCart = false;
    });
  }
  reusableCart(cartRes: any, prodRes: any) {
    cartRes.forEach((element: any) => {
      prodRes.forEach((prod: any) => {
        if (prod.product_id === element.product_id) {
          this.cartItems?.push(prod);
          this.count.push(element.product_count);
          this.totalCount = this.count.reduce((acc: number, ele: number) => {
            return acc + ele;
          }, 0);
          this.shared.setCartLength(this.totalCount)
        }
      });
      this.totalPrice = this.cartItems.reduce((acc: any, a: any, i: number) => {
        return acc + a.price * this.cartArray[i].product_count;
      }, 0);
    });

    this.totalAmount=this.totalPrice-this.totalDiscount!
  }
  onCartItem(i: any) {
    localStorage.setItem('clickedProduct', JSON.stringify(this.cartItems[i]));
    this.route.navigate(['/product']);
  }
  onCash() {
this.pageService.cartArray.next(this.cartItems)
this.pageService.totalPrice.next(this.totalPrice)
this.pageService.totalDiscount.next(this.totalDiscount!)
this.pageService.totalAmount.next(this.totalAmount!)
this.isEdit.emit(true)
this.firstStep.emit()
this.frmStepOne=true
    
  }
  ngOnInit(): void {
    this.cartFormGroup = this._formBuilder.group({
      cartClicked: ['', Validators.required]
    });
    this.ecomService.cart().subscribe((res: any) => {
      this.cartArray = res;
      this.ecomService.allProducts().subscribe((product: any) => {
        this.allProductsArray = res;
        this.reusableCart(res, product);
      });
    });
    this.totalDiscount=500;
    
    
  }
}
