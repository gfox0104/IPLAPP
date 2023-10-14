import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';
import {ViewAllowablesDetailsComponent} from './view-allowables-details.component'
import { SharedModule } from 'src/app/shared.module';
import { ViewAllowablesServices } from './view-allowables-details.service';

const ViewalloRouts: Routes = [
  { path: "", component: ViewAllowablesDetailsComponent },

];

@NgModule({
  declarations: [ViewAllowablesDetailsComponent],
  imports: [
    RouterModule.forChild(ViewalloRouts),
    HttpClientModule,
    GridModule,ExcelModule,
    NgbModule,
    SharedModule
  ],
  providers: [ViewAllowablesServices],
  bootstrap: [ViewAllowablesDetailsComponent]
})

export class ViewAllowableDetailsModule {}
