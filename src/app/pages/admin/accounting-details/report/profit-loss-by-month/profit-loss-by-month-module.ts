import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfitLossByMonthComponent } from './profit-loss-by-month.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClientModule } from '@angular/common/http';
import { IntlModule } from '@progress/kendo-angular-intl';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { accountSidebarModule } from '../../account-sidebar/account-sidebar-module';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [ProfitLossByMonthComponent],
  // providers: [LiveMapServices],
  imports: [
    CommonModule,
    HttpClientModule,
    GridModule,
    IntlModule,
    NgbModule,
    accountSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJDORIshFYTnm0p5geFHPcJy7YBlQTuKA',
      libraries: ['places'],
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [ProfitLossByMonthComponent],
  bootstrap: [],
})
export class ProfitLossByMonthModule {}
