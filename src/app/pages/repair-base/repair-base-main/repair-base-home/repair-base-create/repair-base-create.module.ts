import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
// import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { RepairBaseCreateComponent } from './repair-base-create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RepairBaseCreateComponent
  }
]

@NgModule({
  declarations: [RepairBaseCreateComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // IndicatorsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RepairBaseCreateModule { }
