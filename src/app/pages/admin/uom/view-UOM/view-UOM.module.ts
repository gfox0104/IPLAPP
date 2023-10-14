import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ViewUOMComponent } from './view-UOM.component';
import { SharedModule } from 'src/app/shared.module';

const ViewUOMComponentRouts: Routes = [
  { path: "viewuom", component: ViewUOMComponent },
  // {
  //   path: 'adduom/:id',
  //   loadChildren: () => import('../add-UOM/add-UOM.module').then(m => m.AddUOMModule)
  // },
  { path: '', redirectTo: 'viewuom', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewUOMComponent],
  imports: [
    RouterModule.forChild(ViewUOMComponentRouts),
    NgbModule,
    GridModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ViewUOMComponent]
})

export class ViewUOMModule {}
