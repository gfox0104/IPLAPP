import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import {DocumentationComponent } from './documentation.component';
// import {CommonDirectiveModule} from '../../../AppDirectives/DirectiveModule';

export const DocumentationRouts: Routes = [
  { 
    path: "documentation", 
    component: DocumentationComponent 
  },
  { path: '', redirectTo: 'documentation', pathMatch: 'full'}
];

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    RouterModule.forChild(DocumentationRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [DocumentationComponent]
})

export class DocumentationModule {}
