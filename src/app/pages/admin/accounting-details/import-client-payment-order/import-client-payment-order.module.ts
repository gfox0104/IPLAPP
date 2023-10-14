import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImportClientExcelDataComponent } from './import-client-excel-data/import-client-excel-data.component';
import { HomepageServices } from 'src/app/pages/home/home.service';
import { ImportClientPaymentOrderComponent } from './import-client-payment-order.component';
import { ImportClientPaymentService } from './import-client-payment.service';
import { NgxSpinnerModule } from 'ngx-spinner';




const ImportClientPaymentRouts = [
          { 
            path:'ImportClientPaymentOrder',
            component: ImportClientPaymentOrderComponent
          },
          { 
            path:'exceldata',
            component: ImportClientExcelDataComponent
          }
        ]


        @NgModule({
          declarations: [ImportClientPaymentOrderComponent,ImportClientExcelDataComponent],
          imports: [
            // CommonModule,
            // RouterModule.forChild(Reportroutes),
            // FormsModule, ReactiveFormsModule,
            // NgbModule,
            // GridModule,
            // NgMultiSelectDropDownModule,
            // DropDownsModule
        
            RouterModule.forChild(ImportClientPaymentRouts),
            CommonModule,
            GridModule,ExcelModule,
            FormsModule, ReactiveFormsModule,
            HttpClientModule,
            DropDownsModule,
            NgbModule,
            NgxSpinnerModule,
          ],
          providers: [HomepageServices,ImportClientPaymentService],
          bootstrap: [ImportClientPaymentOrderComponent]
        })
        
        export class ImportClientPaymentOrderModule {}