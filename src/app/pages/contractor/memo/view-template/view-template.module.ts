import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { ViewTemplateComponent } from './view-template.component';
import { ViewTemplateService } from './view-template.service';

export const AddGroupsRouts: Routes = [
  { path: "", component: ViewTemplateComponent }
];

@NgModule({
  declarations: [ViewTemplateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AddGroupsRouts),
    HttpClientModule,
    NgbModule,
  ],
  providers: [ViewTemplateService],
  bootstrap: [ViewTemplateComponent]
})
export class ViewTemplateModule { }
