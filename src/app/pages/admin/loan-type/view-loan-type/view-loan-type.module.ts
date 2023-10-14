import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';

import { SharedModule } from 'src/app/shared.module';
import { ViewLoanTypeComponent } from './view-loan-type.component';
import { ViewLoanTypeServices } from "./view-loan-type.service";
import { AddLoanTypeServices } from '../add-loan-type/add-loan-type.service';

const ViewLoanTypeComponentRouts: Routes = [
  { path: "viewloantype", component: ViewLoanTypeComponent },
  
  { path: '', redirectTo: 'viewloantype', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewLoanTypeComponent],
  imports: [
    RouterModule.forChild(ViewLoanTypeComponentRouts),
    NgbModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewLoanTypeServices, AddLoanTypeServices],
  bootstrap: [ViewLoanTypeComponent]
})

export class ViewLoanTypeModule { }
