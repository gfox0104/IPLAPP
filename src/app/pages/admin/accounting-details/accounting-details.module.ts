import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { AccountingComponent } from './accounting-details.component';
import { AccountingServices } from './accounting-details.service';
import { IplAppDashboardIcon } from './iplapp-dashboard-icon.component';


export const ReportsRouts: Routes = [
  {
    path: 'accountingdetails',
    component: AccountingComponent,
   
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./dashboard/dashboard-module').then((m) => m.DashboardModule),
      canActivate: [AccessGuard],
      data: { role: { number: 5, page_name: 'Import Client payment' } },
  },
  {
    path: 'accountingdetails',
    loadChildren: () => 
    import('./coa/coa-module').then((m) => m.CoaModule),
    
    canActivate: [AccessGuard],
    data: { role: { number: 5, page_name: 'IPL Accounting Portal' } },
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./journal/journal-module').then((m) => m.JournalModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./ledger/ledger-module').then((m) => m.LedgerModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./report/report-module').then((m) => m.ReportModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./company/company-module').then((m) => m.CompanyModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./contractors/contractors-module').then(
        (m) => m.ContractorsModule
      ),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./client/client-module').then((m) => m.ClientModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./account/account-module').then((m) => m.AccountModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('./invoice/invoice-module').then((m) => m.InvoiceModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () => import('./task/task-module').then((m) => m.TaskModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () => import('./bill/bill-module').then((m) => m.BillModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () => import('./import-client-payment-order/import-client-payment-order.module').then((m) => m.ImportClientPaymentOrderModule),
  },

  { path: '', redirectTo: 'accountingdetails', pathMatch: 'full' },
];

@NgModule({
  declarations: [AccountingComponent, IplAppDashboardIcon],
  imports: [
    RouterModule.forChild(ReportsRouts),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [AccountingServices],
  bootstrap: [AccountingComponent],
})
export class AccountingModule {}
