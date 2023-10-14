import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from 'src/app/shared.module';
import { CustomPhotoLableComponent } from "./custom-photo-label.component";
import { AddCustomPhotoServices } from './custom-photo-label.service';
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

const AddCustomPhotoLablleRouts = [
  { path: "", component: CustomPhotoLableComponent }
];

@NgModule({
  declarations: [CustomPhotoLableComponent],
  imports: [
    RouterModule.forChild(AddCustomPhotoLablleRouts),
    NgbModule,
    HttpClientModule,
    SharedModule,    
    NgMultiSelectDropDownModule,
    FormsModule
  ],
  providers: [AddCustomPhotoServices, WorkOrderDrodownServices],
  bootstrap: [CustomPhotoLableComponent]
})

export class CustomPhotoLableModule { }
