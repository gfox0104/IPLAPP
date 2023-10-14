import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PropertyLockReasonComponent } from './property-lock-reason.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridModule } from '@progress/kendo-angular-grid';
import { SharedModule } from 'src/app/shared.module';

const ViewLockReason: Routes = [

  {path:'Propertys' , component:PropertyLockReasonComponent},
  { path: '', redirectTo: 'Propertys', pathMatch: 'full'}
];


@NgModule({
  declarations: [PropertyLockReasonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ViewLockReason),
    NgbModule,
    GridModule,
    SharedModule
  ],
  bootstrap: [PropertyLockReasonComponent]
})
export class PropertyLockReasonModule { }
