import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared.module';
import { ReportsComponent } from './report-details.component';
import { IplAppReportsIcon } from './iplapp-report-icon.component';

export const ReportLinkPageRouts = [
  { path: "", component: ReportsComponent }
];


@NgModule({
  declarations: [ReportsComponent, IplAppReportsIcon],
  imports: [
    RouterModule.forChild(ReportLinkPageRouts),
    SharedModule

  ],
  providers: [],
  bootstrap: [ReportsComponent]
})

export class ReportlinkModule {}
