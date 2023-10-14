import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTrackingComponent } from './user-tracking.component';
import { RouterModule } from '@angular/router';
import { NgbModule,NgbDateAdapter ,NgbDateNativeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LightboxModule } from 'ngx-lightbox';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

const TrackDataRouts = [
  { 
    path:'', component: UserTrackingComponent,
    canActivate: [AccessGuard],
    data: {role: {number: 1, page_name: 'Tracking Details'}}
  }
]

@NgModule({
  declarations: [UserTrackingComponent],
  imports: [
    RouterModule.forChild(TrackDataRouts),
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    GridModule,
    NgxPaginationModule,
    LightboxModule,
    DropDownsModule
  ],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [UserTrackingComponent]
})
export class UserTrackingModule { }
