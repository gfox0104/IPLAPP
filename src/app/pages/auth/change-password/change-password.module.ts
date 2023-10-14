import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordServices } from './change-password.service';
import { SharedModule } from 'src/app/shared.module';

// const ChangePasswordRouts = [
//   { path: "change", component: ChangePasswordComponent }
// ];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    // RouterModule.forChild(ChangePasswordRouts),
    SharedModule,
    NgbModule, 
    HttpClientModule

  ],
  exports: [
    ChangePasswordComponent
  ],
  providers: [ChangePasswordServices],
  bootstrap: [ChangePasswordComponent]
})

export class ChangePasswordModule { }
