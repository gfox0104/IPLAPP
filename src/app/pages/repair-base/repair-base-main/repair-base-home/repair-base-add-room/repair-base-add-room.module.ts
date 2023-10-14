import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { IntlModule } from '@progress/kendo-angular-intl';
import { NgxSpinnerModule } from "ngx-spinner";
import { RepairBaseAddRoomComponent } from './repair-base-add-room.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RepairBaseAddRoomComponent
  }
]

@NgModule({
  declarations: [RepairBaseAddRoomComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    GridModule,
    ExcelModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownsModule,
    PDFExportModule,
    IntlModule,
    NgxSpinnerModule
  ]
})
export class RepairBaseAddRoomModule { }
