import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PanelBarModule } from '@progress/kendo-angular-layout';

import { SharedModule } from '../../../shared.module';
import { HomepageServices } from '../../home/home.service';
import { DocumentAndFormComponent } from './document-form.component';
import { IplAppDocumentForm } from './components/iplapp-document-form/iplapp-document-form.component';
import { IplAppFileForm } from './components/iplapp-file-form/iplapp-file-form.component';

export const DocsRouts = [
  { path: "", component: DocumentAndFormComponent }
];

@NgModule({
  declarations: [
    DocumentAndFormComponent,
    IplAppDocumentForm,
    IplAppFileForm
  ],
  imports: [
    RouterModule.forChild(DocsRouts),
    NgMultiSelectDropDownModule,
    NgbModule,
    PanelBarModule,
    SharedModule 
  ],
  providers: [HomepageServices],
  bootstrap: [DocumentAndFormComponent],
})
export class DocumentAndFormModule { }
