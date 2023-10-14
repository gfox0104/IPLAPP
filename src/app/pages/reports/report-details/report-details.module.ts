import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule,NgbDateAdapter ,NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { GridModule,ExcelModule, PDFModule  } from '@progress/kendo-angular-grid';
import { ReportsComponent } from './report-details.component';
// import {CommonDirectiveModule} from '../../../AppDirectives/DirectiveModule';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { NgxSpinnerModule } from 'ngx-spinner';
export const ReportsRouts = [
  { path: "reportsdetails", component: ReportsComponent,
  canActivate: [AccessGuard],
    data: {role: {number: 4, page_name: 'Accounts Payable Repo'}}  }
];

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    RouterModule.forChild(ReportsRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    GridModule,
    NgMultiSelectDropDownModule,
    ExcelExportModule ,
    ExcelModule,
    PDFModule  ,
    NgxSpinnerModule
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [ReportsComponent]
})

export class ReportsDetailModule {}
