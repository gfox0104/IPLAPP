import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import { SharedModule } from '../../../shared.module';

import { WorkColumnsTestComponent } from './work-columns-test.component';
import { WorkColumnsTestServices } from './work-columns-test.service';

export const WorkColumnsTestRouts: Routes = [
  { path: "WorkColumnsTests", component:WorkColumnsTestComponent  }
];

@NgModule({
  declarations: [WorkColumnsTestComponent],
  imports: [
    RouterModule.forChild(WorkColumnsTestRouts),
    HttpClientModule,
    NgbModule,
    SharedModule
  ],
  providers: [WorkColumnsTestServices],
  bootstrap: [WorkColumnsTestComponent]
})

export class WorkColumnsTestModule { }
