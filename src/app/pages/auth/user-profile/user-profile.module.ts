import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import { SharedModule } from 'src/app/shared.module';
import { UserProfileComponent } from './user-profile.component';

// export const ReportsRouts = [
//   { path: "profile", component: UserProfileComponent }
// ];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    // RouterModule.forChild(ReportsRouts),
    NgbModule,
    SharedModule
  ],
  exports: [
    UserProfileComponent
  ],
  providers: [],
  bootstrap: [UserProfileComponent]
})

export class UserProfileModule {}
