import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from '../../../../shared.module';
import { AddClientCompaniesComponent } from './add-client-companies.component';
import { AddClientCompaniesServices } from './add-client-companies.service';
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { CommonDirectiveModule } from '../../../../directives/common-directive.module';

const AddClientCompaniesRouts = [
  { path: '', component: AddClientCompaniesComponent }
]

@NgModule({
  declarations: [AddClientCompaniesComponent],
  imports: [
    RouterModule.forChild(AddClientCompaniesRouts),
    HttpClientModule,
    NgbModule,
    SharedModule,
    CommonDirectiveModule
  ],
  providers: [AddClientCompaniesServices, WorkOrderDrodownServices],
  bootstrap: [AddClientCompaniesComponent]
})

export class AddClientCompaniesModule { }
