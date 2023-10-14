import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';

import { SharedModule } from '../../../../shared.module';
import { ViewCustomerComponent } from './view-customer.component';
import { ViewCustomerServices } from './view-customer.service';

const ViewCustomerRouts: Routes = [
  { path: "viewcustomer", component: ViewCustomerComponent },
 
  { path: '', redirectTo: 'viewcustomer', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewCustomerComponent],
  imports: [
    RouterModule.forChild(ViewCustomerRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewCustomerServices],
  bootstrap: [ViewCustomerComponent]
})

export class ViewCustomerModule { }
