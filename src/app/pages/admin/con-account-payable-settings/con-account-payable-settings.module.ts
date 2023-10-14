import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from '../../../shared.module';
import{ContractorAccountSettingComponent} from './con-account-payable-settings.component'
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { CommonDirectiveModule } from '../../../directives/common-directive.module';
import {ContractorAccountServices} from './con-account-payable-settings.service'
const ContractorAccountRouts = [
  { 
    path:'', component: ContractorAccountSettingComponent,
    canActivate: [AccessGuard],
    data: {role: {number: 1, page_name: 'Contractor payment sett'}}
  }
]

@NgModule({
  declarations: [ContractorAccountSettingComponent],
  imports: [
    RouterModule.forChild(ContractorAccountRouts),
    HttpClientModule,
    NgbModule,
    SharedModule,
    CommonDirectiveModule
  ],
  providers: [ContractorAccountServices,
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    }],
  bootstrap: [ContractorAccountSettingComponent]
})

export class  ContractorAccountSettingModule { }
