
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { GridModule } from '@progress/kendo-angular-grid';

import { IntlModule } from '@progress/kendo-angular-intl';
import { LedgerComponent } from './ledger.component';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';
import {accountSidebarModule} from '../account-sidebar/account-sidebar-module';
import { AgmCoreModule } from '@agm/core';
export const mapRouts: Routes = [
    { path: "ledger", component: LedgerComponent ,
    // canActivate: [AccessGuard],
    // data: {role: {number: 3, page_name: 'Ledger'}} 
  },
    { path: '', redirectTo: 'ledger', pathMatch: 'full'}
  ];
@NgModule({
  declarations: [
    LedgerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    IntlModule,
    accountSidebarModule,
    RouterModule.forChild(mapRouts),
   // BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA",
      libraries: ['places']
    })
  ],
  // providers: [LiveMapServices],
  bootstrap: []
})
export class LedgerModule { }