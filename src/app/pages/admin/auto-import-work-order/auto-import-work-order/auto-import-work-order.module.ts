import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AutoImportWorkOrderComponent } from "./auto-import-work-order.component"
import { AutoImportWorkOrderService } from "./auto-import-work-order.service"
import { SharedModule } from 'src/app/shared.module';
import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';

const CompanyInfoRouts: Routes = [
  { path: "", component: AutoImportWorkOrderComponent },
];

@NgModule({
  declarations: [AutoImportWorkOrderComponent],
  imports: [
    RouterModule.forChild(CompanyInfoRouts),
    HttpClientModule, NgbModule,
    SharedModule,
    DropDownListModule,
    DropDownsModule,
  ],
  providers: [AutoImportWorkOrderService],
  bootstrap: [AutoImportWorkOrderComponent]
})

export class AutoImportWorkOrderModule { }
