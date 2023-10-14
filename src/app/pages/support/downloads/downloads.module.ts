import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {DownloadsComponent } from './downloads.component';
// import {CommonDirectiveModule} from '../../../AppDirectives/DirectiveModule';

export const DownloadsRouts: Routes = [
  { 
    path: "downloaddata", 
    component: DownloadsComponent 
  },
  { path: '', redirectTo: 'downloaddata', pathMatch: 'full'}
];

@NgModule({
  declarations: [DownloadsComponent],
  imports: [
    RouterModule.forChild(DownloadsRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [DownloadsComponent]
})

export class DownloadsModule {}
