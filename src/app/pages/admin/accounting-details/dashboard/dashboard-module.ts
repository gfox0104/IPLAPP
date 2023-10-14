import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule} from '@progress/kendo-angular-charts';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DashboardComponent } from './dashboard.component';


import {accountSidebarModule} from '../account-sidebar/account-sidebar-module';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';



import { AgmCoreModule } from '@agm/core';
export const mapRouts: Routes = [
    { path: "dashboard", component: DashboardComponent ,
    
  },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ];
@NgModule({
  declarations: [
    DashboardComponent
   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    IntlModule,
    ChartsModule,
    accountSidebarModule,
    
    RouterModule.forChild(mapRouts),
   // BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  
  bootstrap: []
})
export class DashboardModule { }