import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared.module';
import { SupportComponent } from './support-details.component';
import { IplAppSupportIcon } from './iplapp-support-icon.component';
import { SupportTicketDetailComponent } from './support-ticket-detail/support-ticket-detail.component';

export const SupportLinkPageRouts = [
  { path: "", component: SupportComponent }
];


@NgModule({
  declarations: [SupportComponent, IplAppSupportIcon, SupportTicketDetailComponent],
  imports: [
    RouterModule.forChild(SupportLinkPageRouts),
    SharedModule

  ],
  providers: [],
  bootstrap: [SupportComponent]
})

export class SupportlinkModule {}
