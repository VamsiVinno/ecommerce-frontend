import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { EcomServices } from '../ecom.services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showOptions: any;
  onShowOptions(event: Event) {
    this.showOptions = event;
  }
 onClick(){
   this.ecomService.showUserInfo.next(false)
 }
  constructor(private ecomService: EcomServices) {}
  ngOnInit(): void {}
}
