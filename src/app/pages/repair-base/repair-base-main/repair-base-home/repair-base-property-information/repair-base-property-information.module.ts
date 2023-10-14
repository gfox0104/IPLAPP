import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { RepairBasePropertyInformationComponent } from './repair-base-property-information.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RepairBasePropertyInformationComponent
  }
]

@NgModule({
  declarations: [RepairBasePropertyInformationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RepairBasePropertyInformationModule { }
