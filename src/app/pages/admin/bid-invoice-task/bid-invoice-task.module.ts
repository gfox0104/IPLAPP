import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from '../../../shared.module';
import { BidInvoiceItemViewTaskComponent } from './bid-invoice-task.component';
import { BidInvoiceItemViewTaskServices } from './bid-invoice-task.service';
import { BidInvoiceItemServices } from './bid-invoice-item/bid-invoice-item.service';

//import {DropDownListFilterComponent} from './BidInvoiceItemViewTaskdropdownlistfilter';

const BidInvoiceItemViewTaskRouts: Routes = [
  { path: "bidinvoiceitemviewtask", component: BidInvoiceItemViewTaskComponent },
  {
    path: 'bidinvoiceitem/:id',
    loadChildren: () => import('./bid-invoice-item/bid-invoice-item.module').then(m => m.BidInvoiceItemModule) 
  },
  {
    path: 'addinvoiceitems/:id',
    loadChildren: () => import('./add-invoice-item/add-invoice-item.module').then(m => m.AddInvoiceItemsModule)
  },
  { path: '', redirectTo: 'bidinvoiceitemviewtask', pathMatch: 'full'}
];

@NgModule({
  declarations: [BidInvoiceItemViewTaskComponent],
  imports: [
    RouterModule.forChild(BidInvoiceItemViewTaskRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule,
    DropDownListModule
  ],
  providers: [BidInvoiceItemViewTaskServices, BidInvoiceItemServices],
  bootstrap: [BidInvoiceItemViewTaskComponent]
})

export class BidInvoiceItemViewTaskModule { }
