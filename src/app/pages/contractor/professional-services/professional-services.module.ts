import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionalServicesComponent } from './professional-services.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';

const professional_services: Routes =
[
  { path: "", component: ProfessionalServicesComponent,},
];

@NgModule({
  declarations: [ProfessionalServicesComponent],
  imports: [
    RouterModule.forChild(professional_services),
    CommonModule,
    NgbModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfessionalServicesModule { }
