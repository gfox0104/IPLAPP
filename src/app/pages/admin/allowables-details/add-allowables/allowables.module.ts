import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';
import {AddAllowablesDetailsComponent} from './allowables.component'
import { SharedModule } from 'src/app/shared.module';


const alloRouts: Routes = [
  { path: "", component: AddAllowablesDetailsComponent },

];

@NgModule({
  declarations: [AddAllowablesDetailsComponent],
  imports: [
    RouterModule.forChild(alloRouts),
    HttpClientModule,
    GridModule,ExcelModule,
    NgbModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AddAllowablesDetailsComponent]
})

export class AddAllowableDetailsModule {}
