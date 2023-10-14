import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { UploadModule } from '@progress/kendo-angular-upload';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditorModule } from '@progress/kendo-angular-editor';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { ClientResultComponent } from "./client-result.component";
import { CommonDirectiveModule } from "../../../directives/common-directive.module";
import { ClientResultServices } from "./client-result.service";
import { ClientResultFieldComponent } from "../client-result-field/client-result-field.component";

//common pcr
import { ClientResultPCRComponent } from '../client-result-pcr/client-result-pcr.component';
import { ClientResultPCRServices } from '../client-result-pcr/client-result-pcr.service';
import { ClientResultPcrJsonComponent } from '../client-result-pcrjson/client-result-pcrjson.component';

// common module
import { CommonClientResultModule } from "../common-client-result/common-client-result.module";
import { CommonClientHeaderModule } from '../common-client-header/common-client-header.module';
import { CommonPhotosMetaModule } from '../common-photos-meta/common-photos-meta.module';

// client photos
import { ClientResultPhotoComponent } from "../client-result-photo/client-result-photo.component";
import { ClientResultPhotoServices } from "../client-result-photo/client-result-photo.service";
import { ClientResultOldPhotoServices } from '../client-result-photo/client-result-photo-old.service';


// instuction
import { ClientResultInstructionComponent } from "../client-result-instruction/client-result-instruction.component";
import { ClientResultInstructionServices } from "../client-result-instruction/client-result-instruction.service";
import { CommonClientResultComponent } from "../common-client-result/common-client-result.component"

// invoice
import { ClientResultsInvoiceComponent } from '../client-results-invoice/client-results-invoice.component';
import { BidInvoiceItemViewTaskServices } from "../../admin/bid-invoice-task/bid-invoice-task.service";

// message
import { MessageDetailsComponent } from '../message-details/message-details.component'
import { MessagingDetailsService } from '../message-details/message-details.service';

import { ClientPhotoAnalysisComponent } from '../client-result-photo-analysis/client-photo-analysis.component';

//new
import { environment } from '../../../../environments/environment';
import { AsyncPipe } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { InvoicePrintComponent } from '../components/invoice-print/invoice-print.component';
import { InvoiceTableComponent } from '../components/invoice-table/invoice-table.component';
import { PhotoGalleryWithEditor } from '../components/photo-gallery/photo-gallery.component';
import { InvoiceRecordComponent } from '../components/invoice-record/invoice-record.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ClientResultSyncComponent } from "../client-result-client-sync/client-result-client-sync.component";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageWoComponent } from "../message-wo/message-wo.component";
import { MessageWoModule } from "../message-wo/message-wo.module";
import { ClientResultPropertyInfoComponent } from "../client-result-property-info/client-result-property-info.component";
import { ClientResultPhotoHistoryComponent } from "../client-result-photo-history/client-result-photo-history.component";
import { PcrFormModule } from "../../admin/pcr-form/pcr-form.module";
import { ServiceLinkModule } from "../../admin/Service-Links-Form/service-link-form.module";
import { ClientResultNewPropertyInfoComponent } from "../client-result-new-property-info/client-result-new-property-info.component";
import { ClientResultPropertyInfoTestComponent } from "../client-result-property-info-test/client-result-property-info-test.component";


const ClientResultRouts: Routes = [
  { path: "clientresult/:workorder", component: ClientResultComponent },
  { path: "clientresultfield/:workorder", component: ClientResultFieldComponent },
  { path: "clientresultphoto/:workorder", component: ClientResultPhotoComponent },
  { path: "clientresultinstruction/:workorder", component: ClientResultInstructionComponent, pathMatch: 'full' },
  { path: "clientresultinvoice/:workorder", component: ClientResultsInvoiceComponent },
  { path: "clientresultpcr/:workorder", component: ClientResultPCRComponent },
  { path: "clientresultpcrjson/:workorder", component: ClientResultPcrJsonComponent },
  { path: "messages/:workorder", component: MessageWoComponent },
  { path: "clientphotoanalysis/:workorder", component: ClientPhotoAnalysisComponent },
  { path: "clientsync/:workorder", component: ClientResultSyncComponent },
  { path: "clientresultpropertyInfo/:workorder", component: ClientResultPropertyInfoComponent },
  { path: "clientresultphotoHistory/:workorder", component: ClientResultPhotoHistoryComponent },
  {path:"clientresultnewpropertyInfo/:workorder",component:ClientResultNewPropertyInfoComponent},
  { path: "", redirectTo: 'clientresultinstruction/:workorder', pathMatch: 'full' },
  {path:"clientresultpropertyinfotest/:workorder",component:ClientResultPropertyInfoTestComponent}
];

@NgModule({
  declarations: [
    ClientResultComponent,
    ClientResultFieldComponent,
    ClientResultPhotoComponent,
    ClientResultInstructionComponent,
    ClientResultsInvoiceComponent,
    ClientResultPCRComponent,
    ClientResultPcrJsonComponent,
    ClientPhotoAnalysisComponent,
    MessageDetailsComponent,
    InvoicePrintComponent,
    InvoiceTableComponent,
    PhotoGalleryWithEditor,
    InvoiceRecordComponent,
    ClientResultSyncComponent,
    ClientResultPropertyInfoComponent,
    ClientResultPhotoHistoryComponent,
    ClientResultNewPropertyInfoComponent,
    ClientResultPropertyInfoTestComponent
  ],
  imports: [
    RouterModule.forChild(ClientResultRouts),
    CommonModule,
    NgbModule,
    FormsModule,
    CommonDirectiveModule,
    CommonClientResultModule,
    HttpClientModule,
    UploadModule,
    CommonClientHeaderModule,
    CommonPhotosMetaModule,
    // MessageDetailsModule,
    EditorModule,
    PanelBarModule,
    GridModule,
    ExcelModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    RouterModule,
    // BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    DropDownsModule,
    PDFExportModule,
    InfiniteScrollModule,
    MessageWoModule,
    PcrFormModule,
    ServiceLinkModule
  ],

  providers: [
    ClientResultServices,
    ClientResultOldPhotoServices,
    ClientResultInstructionServices,
    BidInvoiceItemViewTaskServices,
    ClientResultPCRServices,
    MessagingDetailsService,
    AsyncPipe,
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientResultPhotoServices,
      multi: true
    },
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    }
  ],
})
export class ClientResultModule {
  constructor() {
  }
}
