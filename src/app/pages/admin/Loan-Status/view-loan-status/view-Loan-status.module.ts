import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared.module';
import { ViewLoanStatusComponent } from './view-loan-status.component';
import { LoanStatusFormCardComponent } from '../loan-status-form-card/loan-status-form-card.component';



const ViewLoanStatusRouts: Routes = [
    
    {path:'Loan' , component:ViewLoanStatusComponent},
    { path: '', redirectTo: 'Loan', pathMatch: 'full'}
  ];

@NgModule({
    declarations: [ViewLoanStatusComponent,LoanStatusFormCardComponent],
    imports: [
      RouterModule.forChild(ViewLoanStatusRouts),
      NgbModule,
      GridModule,
      SharedModule
      
     
      
      
    ],
    providers: [],
    bootstrap: [ViewLoanStatusComponent]
  })
  
  export class ViewLoanStatusModule { }