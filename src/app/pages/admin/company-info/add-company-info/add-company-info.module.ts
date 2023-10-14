import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from '../../../../shared.module';
import { CompanyInfoComponent } from './add-company-info.component';
import { CompanyInfoServices } from './add-company-info.service';
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { CommonDirectiveModule } from '../../../../directives/common-directive.module';

const CompanyInfoRouts = [
  { path: "", component: CompanyInfoComponent },
];

@NgModule({
  declarations: [CompanyInfoComponent],
  imports: [
    RouterModule.forChild(CompanyInfoRouts),
    HttpClientModule, NgbModule,
    CommonDirectiveModule,
    SharedModule
  ],
  providers: [CompanyInfoServices, WorkOrderDrodownServices],
  bootstrap: [CompanyInfoComponent]
})

export class CompanyInfoModule { }
