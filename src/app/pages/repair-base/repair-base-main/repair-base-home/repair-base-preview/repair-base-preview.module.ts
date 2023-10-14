import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { NgxSpinnerModule } from "ngx-spinner";
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { RepairBasePreviewComponent } from './repair-base-preview.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RepairBasePreviewComponent
  }
]

@NgModule({
  declarations: [RepairBasePreviewComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    GridModule,
    ExcelModule,
    PDFExportModule,
    NgxSpinnerModule
  ],
  providers: [DatePipe]
})
export class RepairBasePreviewModule { }
