import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../../shared.module';
import { WorkOrderComponent } from './new-work-order.component';
import { WorkOrderDrodownServices } from '../../../services/util/dropdown.service';
import { CommonDirectiveModule } from '../../../directives/common-directive.module';
import { MultiViewCalendarModule } from '@progress/kendo-angular-dateinputs';

const routes: Routes = [
  {
    path: '', 
    component: WorkOrderComponent
  }
];

@NgModule({
  declarations: [WorkOrderComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
    HttpClientModule,
    CommonDirectiveModule,
    MultiViewCalendarModule
  ],
  exports: [RouterModule],

  providers: [WorkOrderDrodownServices, {
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [WorkOrderComponent]
})

export class WorkOrderModule {
  constructor() {
    
  }
}
