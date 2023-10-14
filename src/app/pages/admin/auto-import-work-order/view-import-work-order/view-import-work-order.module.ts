import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from 'src/app/shared.module';
import { ViewAutoImportWoComponent } from './view-import-work-order.component';

const ViewAutoimportRouts: Routes = [
  { path: "viewautoimport", component: ViewAutoImportWoComponent },
  { 
    path: 'autoimportwo/:new', 
    loadChildren: () => import('../auto-import-work-order/auto-import-work-order.module').then(m => m.AutoImportWorkOrderModule)
  },
  { path: '', redirectTo: 'viewautoimport', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewAutoImportWoComponent],
  imports: [
    RouterModule.forChild(ViewAutoimportRouts),
    GridModule,
    NgbModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ViewAutoImportWoComponent]
})

export class ViewAutoImportWoModule { }
