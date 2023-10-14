import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CommonClientResultComponent } from "./common-client-result.component";
import { CommonDirectiveModule } from '../../../directives/common-directive.module';
import { BidInvoiceItemViewTaskServices } from "../../admin/bid-invoice-task/bid-invoice-task.service";
import { ClientResultServices } from "../client-result/client-result.service";
import { ClientResultOldPhotoServices } from "../client-result-photo/client-result-photo-old.service";
import { UploadModule } from '@progress/kendo-angular-upload';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TaskItem } from '../components/task-item/task-item.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [CommonClientResultComponent, TaskItem],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonDirectiveModule,
    HttpClientModule,
    LayoutModule,
    InputsModule,
    DateInputsModule,
    UploadModule,
    DropDownsModule,
    NgxSpinnerModule
  ],
  exports: [
    CommonClientResultComponent
  ],
  providers: [BidInvoiceItemViewTaskServices, ClientResultServices, ClientResultOldPhotoServices],
  bootstrap: [CommonClientResultComponent]
})

export class CommonClientResultModule { }
