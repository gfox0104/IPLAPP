import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from '@progress/kendo-angular-grid';

import { ViewMainCategoryComponent } from './view-main-category.component';
import { ViewMainCategoryServices } from './view-main-category.service';
import { SharedModule } from 'src/app/shared.module';

const ViewMainCategoryRouts: Routes = [
  { path: "viewmaincategory", component: ViewMainCategoryComponent },
  
  { path: '', redirectTo: 'viewmaincategory', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewMainCategoryComponent],
  imports: [
    RouterModule.forChild(ViewMainCategoryRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewMainCategoryServices],
  bootstrap: [ViewMainCategoryComponent]
})

export class ViewMainCategoryModule { }
