import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { RepairBaseSearchComponent } from './repair-base-search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RepairBaseSearchComponent
  }
]

@NgModule({
  declarations: [RepairBaseSearchComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IntlModule,
    DateInputsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RepairBaseSearchModule { }
