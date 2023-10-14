import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';
import { IconPickerModule } from 'ngx-icon-picker';

import { ViewContractorCategoryComponent } from './contractor-category.component';
import { ContractorCategoryServices } from './contractor-category.service';
import { SharedModule } from 'src/app/shared.module';

const ContractorCategoryRouts: Routes = [
  { path: "viewcontractorcategory", component: ViewContractorCategoryComponent },
  // { 
  //   path: 'addmaincategory/:id', 
  //   loadChildren: ()=> import('../add-main-category/add-main-category.module').then(m => m.AddMainCategoryModule)
  // },
  { path: '', redirectTo: 'viewcontractorcategory', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewContractorCategoryComponent],
  imports: [
    RouterModule.forChild(ContractorCategoryRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule,
    IconPickerModule
  ],
  providers: [ContractorCategoryServices],
  bootstrap: [ViewContractorCategoryComponent]
})

export class ContractorCategoryModule { }
