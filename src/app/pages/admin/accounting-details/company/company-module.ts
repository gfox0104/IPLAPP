import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UploadModule } from '@progress/kendo-angular-upload';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { CompanyComponent } from './company.component';
import { CommonDirectiveModule } from '../../../../directives/common-directive.module';
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';
import {accountSidebarModule} from '../account-sidebar/account-sidebar-module';

import { AgmCoreModule } from '@agm/core';
export const mapRouts: Routes = [
    { path: "company", component: CompanyComponent ,
    
  },
    { path: '', redirectTo: 'company', pathMatch: 'full'}
  ];
@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    accountSidebarModule,
    RouterModule.forChild(mapRouts),
    FormsModule, ReactiveFormsModule,
    NgbModule,
    CommonDirectiveModule,
    HttpClientModule,
   
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  
  bootstrap: []
})
export class CompanyModule { }