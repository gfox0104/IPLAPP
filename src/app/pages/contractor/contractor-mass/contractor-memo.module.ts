import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';
import {ContractorMemoComponent} from './contractor-memo.component'
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { from } from 'rxjs';
export const ViewContractorMemoRouts: Routes = [
  { 
    path:'', component: ContractorMemoComponent,
    // canActivate: [AccessGuard],
    // data: {role: {number: 1, page_name: 'View Contactus'}}
  }
];

@NgModule({
  declarations: [ContractorMemoComponent],
  imports: [
    RouterModule.forChild(ViewContractorMemoRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    GridModule
    
  ],
  providers: [],
  bootstrap: [ContractorMemoComponent]
})

export class ContractorMemoModule {}
