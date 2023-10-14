import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './work-order-queue.routing';
import { WorkOrderQueueService } from './work-order-queue.service';

@NgModule({
  imports: [RouterModule.forChild(routes), ],
  providers: [WorkOrderQueueService]
})

export class WorkOrderQueueModule {}
