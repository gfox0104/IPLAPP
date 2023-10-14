import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared.module';
import { AdminLinkPageComponent } from './admin-link.component';
import { IplAppDashboardIcon } from './iplapp-dashboard-icon.component';

export const AdminLinkPageRouts = [
  { path: "", component: AdminLinkPageComponent }
];


@NgModule({
  declarations: [AdminLinkPageComponent, IplAppDashboardIcon],
  imports: [
    RouterModule.forChild(AdminLinkPageRouts),
    SharedModule

  ],
  providers: [],
  bootstrap: [AdminLinkPageComponent]
})

export class AdminLinkPageModule {}
