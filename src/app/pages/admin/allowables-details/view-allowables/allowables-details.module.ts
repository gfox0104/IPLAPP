import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';
import {AllowablesDetailsComponent} from './allowables-details.component'
import { SharedModule } from 'src/app/shared.module';


const ViewalloRouts: Routes = [
  { path: "details", component: AllowablesDetailsComponent },
  { 
    path: "addallowales/:id", 
    loadChildren: () => import('../add-allowables/allowables.module').then(m => m.AddAllowableDetailsModule)
  },
];

@NgModule({
  declarations: [AllowablesDetailsComponent],
  imports: [
    RouterModule.forChild(ViewalloRouts),
    HttpClientModule,
    GridModule,ExcelModule,
    NgbModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AllowablesDetailsComponent]
})

export class ViewAllowableDetailsModule {}
