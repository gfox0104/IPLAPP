import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';

import { SharedModule } from '../../../../shared.module';
import { ViewClientCompaniesComponent } from './view-client-companies.component';
import { ViewClientCompaniesServices } from './view-client-companies.service';
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';

const ViewClientCompaniesRouts: Routes = [
  { path: "viewclientcompanies", component: ViewClientCompaniesComponent },
  { path: "addclientcompanies/:new",
    loadChildren: () => import('../add-client-companies/add-client-companies.module').then(m => m.AddClientCompaniesModule)
  },
  { path: '', redirectTo: 'viewclientcompanies', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewClientCompaniesComponent],
  imports: [
    RouterModule.forChild(ViewClientCompaniesRouts),
    HttpClientModule,
    GridModule, ExcelModule,
    SharedModule
  ],
  providers: [ViewClientCompaniesServices, WorkOrderDrodownServices],
  bootstrap: [ViewClientCompaniesComponent]
})

export class ViewClientCompaniesModule { }
