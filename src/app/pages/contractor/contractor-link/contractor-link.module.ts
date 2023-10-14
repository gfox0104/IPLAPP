import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../shared.module';
import { ContractorLinkPageComponent } from './contractor-link.component';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { IplAppDashboardIcon } from './iplapp-dashboard-icon.component';

export const ContractorLinkPageRouts = [
  { path: "", component: ContractorLinkPageComponent }
];

@NgModule({
  declarations: [ContractorLinkPageComponent, IplAppDashboardIcon],
  imports: [
    RouterModule.forChild(ContractorLinkPageRouts),
    SharedModule

  ],
  providers: [],
  bootstrap: [ContractorLinkPageComponent]
})

export class ContractorLinkPageModule {}
