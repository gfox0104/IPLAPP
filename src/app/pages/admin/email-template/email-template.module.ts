import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailTemplateComponent } from './email-template.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailTemplateService } from './email-template.service';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


const OrderDataRouts = [
  {
    path:'', component: EmailTemplateComponent
  }
]

@NgModule({
  declarations: [EmailTemplateComponent],
  imports: [
    RouterModule.forChild(OrderDataRouts),

    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    EditorModule

  ],
  providers: [EmailTemplateService, { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
  bootstrap: [EmailTemplateComponent]
})
export class EmailTemplateModule { }
