import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ContactUsComponent } from './contact-us.component';
// import {CommonDirectiveModule} from '../../../AppDirectives/DirectiveModule';
import { AgmCoreModule } from '@agm/core';

export const ContactsRouts: Routes = [
  { 
    path: "contactus", 
    component: ContactUsComponent 
  },
  { path: '', redirectTo: 'contactus', pathMatch: 'full'}
];

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    RouterModule.forChild(ContactsRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [ContactUsComponent]
})

export class ContactUsModule {}
