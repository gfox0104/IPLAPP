import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportTicketDetailComponent } from './support-ticket-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const AdduserRouts: Routes = [
  { path: 'detail/:new', component: SupportTicketDetailComponent },
  // { path: '', redirectTo: 'detail', pathMatch: 'full' }
];

@NgModule({
  declarations: [SupportTicketDetailComponent],
  imports: [
    RouterModule.forChild(AdduserRouts),
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  bootstrap: [SupportTicketDetailComponent]
})
export class SupportTicketDetailModule { }
