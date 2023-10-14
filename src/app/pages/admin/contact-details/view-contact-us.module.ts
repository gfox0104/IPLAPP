import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';
import { ViewContactUsComponent } from './view-contact-us.component'
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
export const ViewContactsRouts: Routes = [
  { 
    path:'', component: ViewContactUsComponent,
    
  }
];

@NgModule({
  declarations: [ViewContactUsComponent],
  imports: [
    RouterModule.forChild(ViewContactsRouts),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    GridModule
    
  ],
  providers: [],
  bootstrap: [ViewContactUsComponent]
})

export class ViewContactUsModule {}
