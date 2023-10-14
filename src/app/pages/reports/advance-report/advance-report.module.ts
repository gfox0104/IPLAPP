import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceReportComponent } from './advance-report.component';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule,ExcelModule, PDFModule  } from '@progress/kendo-angular-grid';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NgxSpinnerModule } from 'ngx-spinner';


export const Reportroutes: Routes = [
	{
		path: "Advreports",
		component: AdvanceReportComponent
	},
	{ path: "", redirectTo: "Advreports", pathMatch: "full" }
];

@NgModule({
  declarations: [AdvanceReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(Reportroutes),
    FormsModule, ReactiveFormsModule,
    NgbModule,
    GridModule,
    NgMultiSelectDropDownModule,
    DropDownsModule,
    ExcelModule,
    PDFModule ,
    NgxSpinnerModule
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [AdvanceReportComponent]
})
export class AdvanceReportModule { }
