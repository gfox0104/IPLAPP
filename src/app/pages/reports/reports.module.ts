import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { AccessGuardService as AccessGuard} from '../../services/access/access-guard.service';
const routes: Routes =  [
  {
    path: 'reportslink',
    loadChildren: () => import('../reports/report-links/report-details.module').then(m => m.ReportlinkModule),
  },
  {
    path: 'accountpayable',
    loadChildren: () => import('./report-details/report-details.module').then(m => m.ReportsDetailModule),
    canActivate: [AccessGuard],
    data: { role: { number: 4, page_name: 'Accounts Payable Repo' } }
  },
  {
    path: 'contractorreports',
    loadChildren: () => import('./contractor-reports/contractor-reports.module').then(m => m.ContractorReportsModule),
    canActivate: [AccessGuard],
    data: { role: { number: 4, page_name: 'Contractor Report' } }
  },
  {
    path: 'advancereport',
    loadChildren: () => import('../reports/advance-report/advance-report.module').then(m => m.AdvanceReportModule),
    canActivate: [AccessGuard],
    data: { role: { number: 4, page_name: 'Advanced Reports' } }
  },
  {
    path: '', redirectTo: 'reportslink', pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LayoutModule,
    GridModule,
    ExcelModule
  ],
  declarations: []
})

export class ReportsModule {};