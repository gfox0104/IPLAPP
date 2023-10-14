import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule,ExcelModule } from '@progress/kendo-angular-grid';
import {AllowablesCategoryComponent} from './allowables-category.component'
 
import { SharedModule } from 'src/app/shared.module';

const ViewalloRouts: Routes = [
  { path: "category", component: AllowablesCategoryComponent },
  { 
    path: "addcategory", 
    loadChildren: () => import('../view-allowables-details/view-allowables-details.module').then(m => m.ViewAllowableDetailsModule)
  },
  { path: '', redirectTo: 'category', pathMatch: 'full'}
];

@NgModule({
  declarations: [AllowablesCategoryComponent],
  imports: [
    RouterModule.forChild(ViewalloRouts),
    HttpClientModule,
    GridModule,ExcelModule,
    NgbModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AllowablesCategoryComponent]
})

export class ViewAllowableModule {}
