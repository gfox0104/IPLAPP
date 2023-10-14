import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { FormsandDocsComponent } from './FormsandDocsComponent';
import { UploadModule } from '@progress/kendo-angular-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsandDocsService } from './FormsandDocsService';
import { PanelBarModule } from '@progress/kendo-angular-layout';

const FormsandDocsRouts =[

  {path:'docsdetails',component:FormsandDocsComponent}

]


@NgModule({
  declarations: [FormsandDocsComponent],
  imports: [
    RouterModule.forChild(FormsandDocsRouts),
    CommonModule,
    UploadModule,
    NgbModule,
    HttpClientModule,
    PanelBarModule,
    FormsModule,
  ],
  providers: [
    FormsandDocsService
  ],
  bootstrap: [FormsandDocsComponent]
})

export class FormsandDocsModule {}
