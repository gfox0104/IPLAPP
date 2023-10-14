import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';

import { SharedModule } from '../../../../shared.module';
import { ViewWorkTypeCategoryComponent } from './work-type-category.component';
import { ViewWorkTypeCategoryServices } from './work-type-category.service';

const ViewWorkTypeCategoryRouts: Routes = [
  { path: "viewworktypecate", component: ViewWorkTypeCategoryComponent },
  { path: '', redirectTo: 'viewworktypecate', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewWorkTypeCategoryComponent],
  imports: [
    RouterModule.forChild(ViewWorkTypeCategoryRouts),
    HttpClientModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewWorkTypeCategoryServices],
  bootstrap: [ViewWorkTypeCategoryComponent]
})

export class ViewWorkTypeCategoryModule { }
