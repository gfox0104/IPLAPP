import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImportClientPaymentComponent } from "./import-client-payment.component";
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule } from '@progress/kendo-angular-upload';

export const importClientPayment: Routes = [
	{
		path: "clientpayment",
		component: ImportClientPaymentComponent
	},
	{ path: "", redirectTo: "clientpayment", pathMatch: "full" }
];

@NgModule({
  declarations: [ImportClientPaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(importClientPayment),
    FormsModule,
    ReactiveFormsModule,
    IntlModule,
    DateInputsModule,
    InputsModule,
    DropDownsModule,
    UploadModule
  ],
  bootstrap: [ImportClientPaymentComponent]
})
export class ImportClientPaymentModule { }
