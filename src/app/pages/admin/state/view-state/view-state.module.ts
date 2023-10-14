import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from '../../../../shared.module';
import { ViewStateComponent } from './view-state.component';

const ViewStateRouts: Routes = [
  { path: "viewstate", component: ViewStateComponent },
  
  { path: '', redirectTo: 'viewstate', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewStateComponent],
  imports: [
    RouterModule.forChild(ViewStateRouts),
    NgbModule,
    GridModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ViewStateComponent]
})

export class ViewStateModule { }
