import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from '../../../../shared.module';
import { WorkOrderImportQueueComponent } from './order-import-queue.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
const ImportWorkOrderRouts = [
  { path: '', component: WorkOrderImportQueueComponent }
]

@NgModule({
  declarations: [WorkOrderImportQueueComponent],
  imports: [
    RouterModule.forChild(ImportWorkOrderRouts),
    NgbModule,
    GridModule,
    SharedModule,
    NgxPaginationModule,
    DropDownsModule
  ],
  providers: [],
  bootstrap: [WorkOrderImportQueueComponent]
})

export class WorkOrderImportQueueModule { }
