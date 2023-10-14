import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddPhotoHeaderTemplatesComponent } from './photo-header-template.component';
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
import { SharedModule } from 'src/app/shared.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
const AddPhotoHeaderTemplatesComponentRouts = [
  { path: "addphotoheader", component: AddPhotoHeaderTemplatesComponent }
];

@NgModule({
  declarations: [AddPhotoHeaderTemplatesComponent],
  imports: [
    RouterModule.forChild(AddPhotoHeaderTemplatesComponentRouts),
    SharedModule,
    NgbModule,
    HttpClientModule,
    DropDownsModule
  ],
  providers: [WorkOrderDrodownServices],
  bootstrap: [AddPhotoHeaderTemplatesComponent]
})

export class AddPhotoHeaderTemplatesModule { }
