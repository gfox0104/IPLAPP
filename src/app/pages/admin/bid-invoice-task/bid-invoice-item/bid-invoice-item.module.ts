import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BidInvoiceItemComponent } from './bid-invoice-item.component';
import { CommonDirectiveModule } from '../../../../directives/common-directive.module';
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { SharedModule } from 'src/app/shared.module';

const BidInvoiceItemRouts = [
  { path: "", component: BidInvoiceItemComponent }
];

@NgModule({
  declarations: [BidInvoiceItemComponent],
  imports: [
    RouterModule.forChild(BidInvoiceItemRouts),
    NgbModule,
    CommonDirectiveModule,
    SharedModule
  ],
  providers: [WorkOrderDrodownServices],
  bootstrap: [BidInvoiceItemComponent]
})

export class BidInvoiceItemModule { }
