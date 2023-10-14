import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReportComponent } from './report.component';
import { AccountSidebarComponent } from '../account-sidebar/account-sidebar.component';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';
import { AgmCoreModule } from '@agm/core';
import { accountSidebarModule } from '../account-sidebar/account-sidebar-module';
import { BalanceSheetModule } from './balance-sheet/balance-sheet-module';
import { ProfitLossModule } from './profit-loss/profit-loss-module';
import { TrailBalanceModule } from './trial-balance/trial-balance-module';
import { IncomeStatementModule } from './income-statement/income-statement-module';
import { AccountPayableAgingSummaryModule } from './account-payable-aging-summary/account-payable-aging-summary-module';
import { AccountReceivableAgingSummaryModule } from './account-receivable-aging-summary/account-receivable-aging-summary-module';
import { ProfitLossDetailsModule } from './profit-loss-details/profit-loss-details-module';
import { ProfitLossComparisonModule } from './profit-loss-comparison/profit-loss-comparison-module';
import { JournalModule } from './journal/journal-module';
import { ProfitLossByMonthModule } from './profit-loss-by-month/profit-loss-by-month-module';
import { ProfitLossByCustomerModule } from './profit-loss-by-customer/profit-loss-by-customer-module';
import { ProfitLossByVendorModule } from './profit-loss-by-vendor/profit-loss-by-vendor-module';
export const mapRouts: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    // canActivate: [AccessGuard],
    // data: {role: {number: 3, page_name: 'Ledger'}}
  },
  { path: '', redirectTo: 'report', pathMatch: 'full' },
];
@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BalanceSheetModule,
    ProfitLossModule,
    TrailBalanceModule,
    IncomeStatementModule,
    GridModule,
    accountSidebarModule,
    AccountPayableAgingSummaryModule,
    AccountReceivableAgingSummaryModule,
    ProfitLossDetailsModule,
    ProfitLossComparisonModule,
    JournalModule,
    ProfitLossByMonthModule,
    ProfitLossByCustomerModule,
    ProfitLossByVendorModule,
    RouterModule.forChild(mapRouts),
    // BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA',
      libraries: ['places'],
    }),
  ],
  // providers: [LiveMapServices],
  bootstrap: [],
})
export class ReportModule {}
