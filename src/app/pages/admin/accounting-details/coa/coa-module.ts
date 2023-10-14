import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntlModule } from '@progress/kendo-angular-intl';
import { CoaComponent } from './coa.component';
import { AccessGuardService as AccessGuard } from '../../../../services/access/access-guard.service';

import { accountSidebarModule } from '../account-sidebar/account-sidebar-module';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
export const mapRouts: Routes = [
  {
    path: 'coa',
    component: CoaComponent,

  },
  { path: '', redirectTo: 'coa', pathMatch: 'full' },
];
@NgModule({
  declarations: [CoaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    IntlModule,
    accountSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(mapRouts),
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA',
      libraries: ['places'],
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [{
    provide: NgbDateAdapter,
    useClass: NgbDateNativeAdapter
  }],
  bootstrap: [],
})
export class CoaModule {}
