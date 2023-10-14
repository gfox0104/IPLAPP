import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AccessDeniedComponent } from './access-denied.component';

export const ReportsRouts: Routes = [
  { path: "accessdenied", component: AccessDeniedComponent },
  { path: '', redirectTo: 'accessdenied', pathMatch: 'full'}
];

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    RouterModule.forChild(ReportsRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AccessDeniedComponent]
})

export class AccessDeniedModule { }
