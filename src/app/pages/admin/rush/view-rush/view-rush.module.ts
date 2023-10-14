import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';

import { SharedModule } from '../../../../shared.module';
import { ViewRushComponent } from './view-rush.component';
import { ViewRushServices } from "./view-rush.service";

const ViewRushRouts: Routes = [
  { path: "viewrush", component: ViewRushComponent },
  
  { path: '', redirectTo: 'viewrush', pathMatch: 'full' }
];

@NgModule({
  declarations: [ViewRushComponent],
  imports: [
    RouterModule.forChild(ViewRushRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewRushServices],
  bootstrap: [ViewRushComponent]
})  

export class ViewRushModule { }
