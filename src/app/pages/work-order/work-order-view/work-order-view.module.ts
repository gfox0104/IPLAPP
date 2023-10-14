import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { UploadModule } from '@progress/kendo-angular-upload';
import { EditorModule } from '@progress/kendo-angular-editor';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { ListBoxAllModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from "agm-overlays";

import { WorkOrderViewComponent } from "./work-order-view.component";
import { SaveWorkOrderViewServices } from "./work-order-view-service";
import { ClientResultOldPhotoServices } from "../../client-result/client-result-photo/client-result-photo-old.service";
import { ClientResultServices } from "../../client-result/client-result/client-result.service";
import { DropDownComponent } from './components/drop-down.component';
import { SharedModule } from '../../../shared.module';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { CommonClientResultModule } from "../../client-result/common-client-result/common-client-result.module"
import { ActionListComponent } from './components/action-list/action-list.component';
import { InvoicePrintComponent } from './components/invoice-print/invoice-print.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ClientResultPhotoServices } from "../../client-result/client-result-photo/client-result-photo.service";
import { MessageContent } from "../../message/message-content/message-content.component";
import { MessageModule } from "../../message/message.module";
import { WorkOrderCompletionTrackerComponent } from "../work-order-completion-tracker/work-order-completion-tracker.component";
import { WorkOrderNewContractorTrackerComponent } from "../work-order-new-contractor-tracker/work-order-new-contractor-tracker.component";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";

const WorkOrderviewRouts = [
  {
    path: '',
    component: WorkOrderViewComponent,
    canActivate: [AccessGuard],
    data: { role: { number: 0, page_name: 'View Work Order' } }
  },
  {
    path: 'createworkorder/:id',
    loadChildren: () => import('../new-work-order/new-work-order.module').then(m => m.WorkOrderModule),
    canActivate: [AccessGuard],
    data: { role: { number: 0, page_name: 'Create Work Order' } }
  },
  {
    path: 'import',
    loadChildren: () => import('../import-order/import-work-order.module').then(m => m.ImportWorkOrderModule),
    canActivate: [AccessGuard],
    data: { role: { number: 0, page_name: 'Import Work Order' } }
  },
  {
    path: 'importqueue',
    loadChildren: () => import('../import-queue-order/import-queue-order.module').then(m => m.ImportQueueModule),
    canActivate: [AccessGuard],
    data: { role: { number: 0, page_name: 'Import Work Order' } }
  },
  {
    path: 'queueworkorder',
    loadChildren: () => import('../work-order-queue/work-order-queue.module').then(m => m.WorkOrderQueueModule),
    canActivate: [AccessGuard],
    data: { role: { number: 0, page_name: 'Auto Import Orders' } }
  },
  {
    path: 'formdoc',
    loadChildren: () => import('../document-form/document-form.module').then(m => m.DocumentAndFormModule),
    canActivate: [AccessGuard],
    data: { role: { number: 0, page_name: '' } }
  },
  {
    path: 'map',
    loadChildren: () => import('../work-order-address-map/work-order-address-map.module').then(m => m.WorkOrderAddressMapModule),
    canActivate: [AccessGuard],
    data: { role: { number: 0, page_name: '' } }

  }
]

@NgModule({
    declarations: [WorkOrderViewComponent, DropDownComponent, ActionListComponent, InvoicePrintComponent,WorkOrderCompletionTrackerComponent,WorkOrderNewContractorTrackerComponent],
    imports: [
        RouterModule.forChild(WorkOrderviewRouts),
        GridModule,
        ExcelModule,
        UploadModule,
        EditorModule,
        HttpClientModule,
        NgbModule,
        AgmOverlays,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
            libraries: ['places']
        }),
        SharedModule,
        ListBoxAllModule, DropDownListModule, CommonClientResultModule, DropDownsModule, TooltipModule,
        NgxSpinnerModule,
        MessageModule,
        DateInputsModule
    ],
    providers: [SaveWorkOrderViewServices, ClientResultOldPhotoServices, ClientResultServices,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ClientResultPhotoServices,
            multi: true
        },],
    bootstrap: [WorkOrderViewComponent]
})

export class WorkOrderViewModule { }
