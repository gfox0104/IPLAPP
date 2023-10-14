import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';

import { IntlModule } from '@progress/kendo-angular-intl';
import { InvoiceComponent } from './invoice.component';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';
// import { AccountSidebarComponent } from '../account-sidebar/account-sidebar.component';
import { accountSidebarModule } from '../account-sidebar/account-sidebar-module';
import { AgmCoreModule } from '@agm/core';
import { WorkOrderDrodownServices } from '../../../../services/util/dropdown.service';
import {
  NgbModule,
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InvoceService } from './invoce-service';
export const mapRouts: Routes = [
  {
    path: 'invoice',
    component: InvoiceComponent,
    // canActivate: [AccessGuard],
  },
  { path: '', redirectTo: 'invoice', pathMatch: 'full' },
];
@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    IntlModule,
    NgbModule,
    accountSidebarModule,
    RouterModule.forChild(mapRouts),
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA',
      libraries: ['places'],
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    WorkOrderDrodownServices,
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter,
    },
    InvoceService,
  ],
  bootstrap: [],
})
export class InvoiceModule {}
