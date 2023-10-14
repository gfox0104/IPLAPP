import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveWorkOrderViewServices } from '../../work-order/work-order-view/work-order-view-service';

@Component({
  templateUrl: './work-order-address-map.component.html'
})
export class AddressMapComponent implements OnInit {
  constructor(
    private router: Router,
    private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
  ) { }

  workOrder;
  ngOnInit() {
    this.workOrder = this.xSaveWorkOrderViewServices.getWorkOrder();
    if (!this.workOrder) {
      this.router.navigate(['/workorder']);
    }
  }
}



