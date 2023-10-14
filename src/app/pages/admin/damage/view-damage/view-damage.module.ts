import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ViewDamageComponent } from './view-damage.component';
import { ViewDamageServices } from './view-damage.service';
import { AddDamageServices } from '../add-damage/add-damage.service';
import { SharedModule } from 'src/app/shared.module';

const ViewDamageComponentRouts: Routes = [
  { path: "viewdamage", component: ViewDamageComponent },
  {
    path: 'adddamage/:id',
    loadChildren: () => import('../add-damage/add-damage.module').then(m => m.AddDamageModule)
  },
  { path: '', redirectTo: 'viewdamage', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewDamageComponent],
  imports: [
    RouterModule.forChild(ViewDamageComponentRouts),
    NgbModule,
    HttpClientModule,
    GridModule,
    SharedModule
  ],
  providers: [ViewDamageServices, AddDamageServices],
  bootstrap: [ViewDamageComponent]
})

export class ViewDamageModule { }
