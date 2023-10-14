import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { IntlModule } from '@progress/kendo-angular-intl';
import { AccountComponent } from './account.component';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';
import { accountSidebarModule } from '../account-sidebar/account-sidebar-module';
import { AgmCoreModule } from '@agm/core';
import { WorkOrderDrodownServices } from '../../../../services/util/dropdown.service';
import {
  NgbModule,
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
export const mapRouts: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    
  },
  { path: '', redirectTo: 'account', pathMatch: 'full' },
];
@NgModule({
  declarations: [AccountComponent],
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
    // BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA',
      libraries: ['places'],
    }),
  ],

  providers: [
    WorkOrderDrodownServices,
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter,
    },
  ],
  // providers: [LiveMapServices],
  bootstrap: [],
})
export class AccountModule {}
