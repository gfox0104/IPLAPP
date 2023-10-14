import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from '../../../shared.module';
import { WorkSettingComponent } from './work-setting/work-setting.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const WorkOrderSettingsPageComponentRouts = [
  { path: 'worksettings', component: WorkSettingComponent }
]

@NgModule({
  declarations: [WorkSettingComponent],
  imports: [
    RouterModule.forChild(WorkOrderSettingsPageComponentRouts),
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [WorkSettingComponent]
})

export class WorksettingModule { }