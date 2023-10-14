import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';

import { ImportQueueComponent } from './import-queue-order.component';
import { HomepageServices } from '../../home/home.service';
import { ImportExcelDataComponent } from './import-excel-data/import-excel-data.component';
import { ImportQueueServices } from './import-queue-order.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ImportQueueRouts = [
  { 
    path:'',
    component: ImportQueueComponent
  },
  { 
    path:'exceldata',
    component: ImportExcelDataComponent
  }
]

@NgModule({
  declarations: [ImportQueueComponent, ImportExcelDataComponent],
  imports: [
    // CommonModule,
    // RouterModule.forChild(Reportroutes),
    // FormsModule, ReactiveFormsModule,
    // NgbModule,
    // GridModule,
    // NgMultiSelectDropDownModule,
    // DropDownsModule

    RouterModule.forChild(ImportQueueRouts),
    CommonModule,
    GridModule,ExcelModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    DropDownsModule,
    NgbModule
  ],
  providers: [HomepageServices, ImportQueueServices],
  bootstrap: [ImportQueueComponent]
})

export class ImportQueueModule {}
