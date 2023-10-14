import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ContractorReportsComponent } from './contractor-reports.component';
import { ContractorReportsDetailComponent } from './contractor-reports-detail.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { ContractorReportsPendingDetailComponent } from './contractor-pending-child/contractor-pending-child.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule,NgbDateAdapter ,NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

export const Contractorresportroutes: Routes = [
	{
		path: "reports",
		component: ContractorReportsComponent
	},
	{ path: "", redirectTo: "reports", pathMatch: "full" }
];

@NgModule({
  declarations: [ ContractorReportsComponent, ContractorReportsDetailComponent ,ContractorReportsPendingDetailComponent],
  imports: [
    RouterModule.forChild(Contractorresportroutes),
    CommonModule,
    GridModule,
    ExcelModule,
    TabStripModule,
    PanelBarModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    FormsModule, ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [ContractorReportsComponent]
})
export class ContractorReportsModule { }
