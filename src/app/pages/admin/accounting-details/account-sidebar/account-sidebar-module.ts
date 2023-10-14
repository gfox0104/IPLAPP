import { NgModule } from '@angular/core';
import { AccountSidebarComponent } from '../account-sidebar/account-sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';
import { AccountingComponent } from '../accounting-details.component';
import { CommonModule } from '@angular/common';

export const ReportsRouts: Routes = [
  {
    path: 'accountingdetails',
    component: AccountingComponent,
    canActivate: [AccessGuard],
    data: { role: { number: 5, page_name: 'Accountings' } },
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('../dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () => import('../coa/coa-module').then((m) => m.CoaModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('../ledger/ledger-module').then((m) => m.LedgerModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('../report/report-module').then((m) => m.ReportModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('../company/company-module').then((m) => m.CompanyModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('../account/account-module').then((m) => m.AccountModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () =>
      import('../invoice/invoice-module').then((m) => m.InvoiceModule),
  },
  {
    path: 'accountingdetails',
    loadChildren: () => import('../task/task-module').then((m) => m.TaskModule),
  },

  { path: '', redirectTo: 'accountingdetails', pathMatch: 'full' },
];
@NgModule({
  declarations: [AccountSidebarComponent],
  imports: [RouterModule.forChild(ReportsRouts), CommonModule],
  // providers: [LiveMapServices],
  exports: [AccountSidebarComponent],
  bootstrap: [],
})
export class accountSidebarModule {}
