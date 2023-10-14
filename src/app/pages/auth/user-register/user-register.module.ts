import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {UserRegisterComponent} from './user-register.component'
import { CommonModule } from "@angular/common";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
const IplResgRouts = [
  { path: "", component: UserRegisterComponent },
];

@NgModule({
  declarations: [UserRegisterComponent],
  imports: [
    RouterModule.forChild(IplResgRouts),
    HttpClientModule,FormsModule,ReactiveFormsModule,CommonModule,
    DropDownsModule
    
  ],
  providers: [],
  bootstrap: [UserRegisterComponent]
})

export class UserRegisterModule { }
