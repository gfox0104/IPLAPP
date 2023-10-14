import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';

import { ViewCompanyInfoComponent } from './view-company-info.component';
import { ViewCompanyInfoServices } from "./view-company-info.service";
import { SharedModule } from 'src/app/shared.module';

const ViewCompanyRouts: Routes = [
  { path: "viewcompany", component: ViewCompanyInfoComponent },
  { 
    path: "companyinfo/:id", 
    loadChildren: () => import('../add-company-info/add-company-info.module').then(m => m.CompanyInfoModule)
  },
  { path: '', redirectTo: 'viewcompany', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewCompanyInfoComponent],
  imports: [
    RouterModule.forChild(ViewCompanyRouts),
    HttpClientModule,
    GridModule,ExcelModule,
    NgbModule,
    SharedModule
  ],
  providers: [ViewCompanyInfoServices],
  bootstrap: [ViewCompanyInfoComponent]
})

export class ViewCompanyInfoModule {}
