import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from '../../../shared.module';
import { BulkUploadComponent } from './bulk-upload.component';

import { CommonDirectiveModule } from '../../../directives/common-directive.module';
import { BulkUploadServices } from './bulk-upload.service';

const Routs = [
  { path: '', component: BulkUploadComponent }
]

@NgModule({
  declarations: [BulkUploadComponent],
  imports: [
    RouterModule.forChild(Routs),
    HttpClientModule,
    NgbModule,
    SharedModule,
    CommonDirectiveModule
  ],
  providers: [BulkUploadServices],
  bootstrap: [BulkUploadComponent]
})

export class BulkUploadModule { }
