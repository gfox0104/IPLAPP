import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from 'ngx-pagination';
import {SuggestionComponent } from './suggestion-box.component';
// import {CommonDirectiveModule} from '../../../AppDirectives/DirectiveModule';

export const DownloadsRouts: Routes = [
  { 
    path: "suggestion", 
    component: SuggestionComponent 
  },
  { path: '', redirectTo: 'suggestion', pathMatch: 'full'}
];

@NgModule({
  declarations: [SuggestionComponent],
  imports: [
    RouterModule.forChild(DownloadsRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [SuggestionComponent]
})

export class SuggestionModule {}
