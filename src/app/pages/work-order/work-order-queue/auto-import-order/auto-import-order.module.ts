import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ImportWorkOrderQueueDetailsComponent } from './auto-import-order.component';
import { HomepageServices } from '../../../home/home.service';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

const ImportWorkOrderQueueRouts = [
  {
    path: '',
    component: ImportWorkOrderQueueDetailsComponent
  }
]

@NgModule({
  declarations: [ImportWorkOrderQueueDetailsComponent],
  imports: [
    RouterModule.forChild(ImportWorkOrderQueueRouts),
    NgbModule,
    GridModule,
    SharedModule,
    NgxPaginationModule,
  ],
  providers: [HomepageServices],
  bootstrap: [ImportWorkOrderQueueDetailsComponent]
})

export class ImportWorkOrderImportQueueDetailsModule { }
