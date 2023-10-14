import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UploadModule } from '@progress/kendo-angular-upload';
import { PanelBarModule } from '@progress/kendo-angular-layout';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonDirectiveModule } from '../../../../directives/common-directive.module';
import { AddInvoiceItemsComponent } from './add-invoice-item.component';
import { BidInvoiceItemServices } from "../bid-invoice-item/bid-invoice-item.service";
import { AddInvoiceItemsServices } from './add-invoice-item.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ClientResultPhotoServices } from 'src/app/pages/client-result/client-result-photo/client-result-photo.service';
import { SharedModule } from 'src/app/shared.module';


const AddInvoiceItemsRouts = [
  { path: "", component: AddInvoiceItemsComponent }
]

@NgModule({
  declarations: [AddInvoiceItemsComponent],
  imports: [
    RouterModule.forChild(AddInvoiceItemsRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonDirectiveModule,
    UploadModule,
    PanelBarModule,
    DropDownsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [BidInvoiceItemServices, AddInvoiceItemsServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientResultPhotoServices,
      multi: true
    }],
  bootstrap: [AddInvoiceItemsComponent]
})

export class AddInvoiceItemsModule { }
