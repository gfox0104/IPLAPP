import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from '../../../shared.module';
import { WorkOrderSettingsPageComponent } from './work-order-settings.component';
import { WorkOrderSettingsPageServices } from './work-order-settings.service';
import { IplAppSimpleCard } from '../../../components/iplapp-simple-card/iplapp-simple-card.component';

const WorkOrderSettingsPageComponentRouts = [
  { path: '', component: WorkOrderSettingsPageComponent }
]

@NgModule({
  declarations: [WorkOrderSettingsPageComponent, IplAppSimpleCard],
  imports: [
    RouterModule.forChild(WorkOrderSettingsPageComponentRouts),
    SharedModule,
    NgbModule,
    HttpClientModule,

  ],
  providers: [WorkOrderSettingsPageServices],
  bootstrap: [WorkOrderSettingsPageComponent]
})

export class WorkOrderSettingsPageModule { }
