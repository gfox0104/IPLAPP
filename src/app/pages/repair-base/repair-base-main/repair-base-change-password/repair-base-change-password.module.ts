import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RepairBaseChangePasswordComponent } from './repair-base-change-password.component';
import { SharedModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes= [
  {
    path: 'changepass',
    component: RepairBaseChangePasswordComponent
  },
  {
    path: '', redirectTo: 'changepass', pathMatch: 'full'
  }
]

@NgModule({
  declarations: [RepairBaseChangePasswordComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
   
  ]
})
export class RepairBaseChangePasswordModule { }
