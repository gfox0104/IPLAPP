import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelBarModule, TabStripModule } from '@progress/kendo-angular-layout';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { EditorModule } from '@progress/kendo-angular-editor';
import { UploadModule } from '@progress/kendo-angular-upload';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { NgxSpinnerModule } from 'ngx-spinner';

import { environment } from 'src/environments/environment';

import {
    AppBreadCrumbComponent,
    IplAppContentHeader,
    IplAppIconButton,
    IplAppFilterForm,
    IplAppModalContent,
    IplAppDocumentUpload,
    IplAppFormCard,
    IplAppLoadingButton,
    IplAppKendoAction,
    IplAppPhotoGallery,
    IplPhotoViewComponent,
    IplAppTaskTable,
    IplAppInstructionTable,
    IplAppPhotoHistoryGallery,
    IplAppMessageBoxComponent,
    IplAppAddCustomPhotoLabelComponent,
    PcrGrassFormComponent,
    PcrPreservationFormComponent,
    IplAppEcdNotesBoxComponent,
    IplAppInvoiceTableComponent,
    IplAppClientContractorInvoiceComponent,
    IplAppWorkOrderDetailsTabsComponent,
    IplAppTaskGroupManageComponent,
    IplAppContactTypeManageComponent,
    IplFormHistoryHoverComponent,
    IplFormHistoryLabelHoverComponent,
    IplAppBulkCheckbox,
    IplAppWorkBulkCheckbox
    
} from '../app/components';

import { PropertyHistoryComponent } from '../app/pages/client-result/components/property-history/property-history.component';
import { CommonDirectiveModule } from 'src/app/directives/common-directive.module';
import { IplAppChatBox } from 'src/app/components/iplapp-chat-box/iplapp-chat-box.comonent';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MessageModule } from './pages/message/message.module';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddInstructionComponent } from './pages/admin/instruction-work-order/add-instruction/add-instruction-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonDirectiveModule,
    GridModule,
    ExcelModule,
    EditorModule,
    UploadModule,
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    DropDownsModule,
    TabStripModule,
    MessageModule,
    RouterModule,
    NgMultiSelectDropDownModule,
    NgbModule
];

const components = [
    AppBreadCrumbComponent,
    IplAppContentHeader,
    IplAppIconButton,
    IplAppFilterForm,
    IplAppModalContent,
    IplAppDocumentUpload,
    IplAppFormCard,
    PropertyHistoryComponent,
    IplAppChatBox,
    IplAppLoadingButton,
    IplAppKendoAction,
    IplAppPhotoGallery,
    IplAppTaskTable,
    IplAppInstructionTable,
    IplPhotoViewComponent,
    IplAppPhotoHistoryGallery,
    IplAppMessageBoxComponent,
    IplAppAddCustomPhotoLabelComponent,
    AddInstructionComponent,
    PcrGrassFormComponent,
    PcrPreservationFormComponent,
    IplAppEcdNotesBoxComponent,
    IplAppInvoiceTableComponent,
    IplAppClientContractorInvoiceComponent,
    IplAppWorkOrderDetailsTabsComponent,
    IplAppTaskGroupManageComponent,
    IplAppContactTypeManageComponent,
    IplFormHistoryHoverComponent,
    IplFormHistoryLabelHoverComponent,
    IplAppBulkCheckbox,
    IplAppWorkBulkCheckbox
]

@NgModule({
    declarations: components,
    imports: modules,
    exports: [modules, components,]
})

export class SharedModule { }
