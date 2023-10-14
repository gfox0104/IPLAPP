import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';

import { ViewGroupsComponent } from './view-groups.component';
import { ViewGroupsServices } from './view-groups.service';
import { AddGroupsServices } from '../add-group/add-group.service';
import { SharedModule } from '../../../shared.module';

const ViewGroupsRouts: Routes = [
  { path: 'viewgroups', component: ViewGroupsComponent },
  // { 
  //   path: 'addgroups',
  //   loadChildren: () => import('../add-group/add-group.module').then(m => m.AddGroupsModule)
  // },
  { 
    path: 'addgroups/:id',
    loadChildren: () => import('../add-group/add-group.module').then(m => m.AddGroupsModule)
  },
  { path: '', redirectTo: 'viewgroups', pathMatch: 'full'}
];

@NgModule({
  declarations: [ViewGroupsComponent],
  imports: [
    RouterModule.forChild(ViewGroupsRouts),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    GridModule, ExcelModule,
    SharedModule,
  ],
  providers: [ViewGroupsServices, AddGroupsServices],
  bootstrap: [ViewGroupsComponent]
})

export class ViewGroupsModule { }
