import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { RepairBaseUserComponent } from './repair-base-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const RepairBaseUserRoute: Routes = [
  {
    path: 'user',
    component: RepairBaseUserComponent
  },
  {
    path: '', redirectTo: 'user', pathMatch: 'full'
  }
]

@NgModule({
  declarations:[RepairBaseUserComponent],
  imports: [
    RouterModule.forChild(RepairBaseUserRoute),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RepairBaseUserModule { }
