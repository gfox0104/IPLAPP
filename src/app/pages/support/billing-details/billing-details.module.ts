import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {BillingComponent } from './billing-details.component';
// import {CommonDirectiveModule} from '../../../AppDirectives/DirectiveModule';

export const BillingRouts: Routes = [
  { 
    path: "billing", 
    component: BillingComponent 
  },
  { path: '', redirectTo: 'billing', pathMatch: 'full'}
];

@NgModule({
  declarations: [BillingComponent],
  imports: [
    RouterModule.forChild(BillingRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [BillingComponent]
})

export class BillingModule {}
