import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';

import { IntlModule } from '@progress/kendo-angular-intl';
import { BillComponent } from './bill.component';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';

import { accountSidebarModule } from '../account-sidebar/account-sidebar-module';
import { AgmCoreModule } from '@agm/core';
import { WorkOrderDrodownServices } from '../../../../services/util/dropdown.service';
import {
  NgbModule,
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

export const mapRouts: Routes = [
  {
    path: 'bill',
    component: BillComponent,
    
  },
  { path: '', redirectTo: 'bill', pathMatch: 'full' },
];
@NgModule({
  declarations: [BillComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    IntlModule,
    NgbModule,
    accountSidebarModule,
    RouterModule.forChild(mapRouts),
   
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
  ],
  bootstrap: [],
})
export class BillModule {}
