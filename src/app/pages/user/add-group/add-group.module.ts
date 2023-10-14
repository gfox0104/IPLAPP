import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AddGroupsComponent } from './add-group.component';
import { AddGroupsServices } from './add-group.service';
import { SharedModule } from '../../../shared.module';


export const AddGroupsRouts: Routes = [
  { path: "", component: AddGroupsComponent }
];

@NgModule({
  declarations: [AddGroupsComponent],
  imports: [
    RouterModule.forChild(AddGroupsRouts),
    HttpClientModule,
    NgbModule,
    SharedModule
  ],
  providers: [AddGroupsServices],
  bootstrap: [AddGroupsComponent]
})

export class AddGroupsModule { }
