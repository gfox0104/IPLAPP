import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import{IplLoginComponent} from './ipl-login.component';
import { CommonModule } from "@angular/common";

const IplLoginInfoRouts = [
  { path: "", component: IplLoginComponent },
];

@NgModule({
  declarations: [IplLoginComponent],
  imports: [
    RouterModule.forChild(IplLoginInfoRouts),
    HttpClientModule,FormsModule,ReactiveFormsModule,CommonModule
    
  ],
  providers: [],
  bootstrap: [IplLoginComponent]
})

export class IplLoginModule { }
