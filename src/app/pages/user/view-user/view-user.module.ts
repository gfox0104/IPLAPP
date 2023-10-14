import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';

import { ViewUserComponent } from './view-user.component';
import { AddUserServices } from '../add-user/add-user.service';
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
import { SharedModule } from '../../../shared.module';
import { AccessGuardService as AccessGuard} from '../../../services/access/access-guard.service';

export const ViewUserRouts: Routes = [
  { 
    path: 'viewduser', component: ViewUserComponent },
  { 
    path: 'adduser/:id',
    loadChildren: () => import('../add-user/add-user.module').then(m => m.AddUserModule)
  },

  {
    path: 'group',
    loadChildren: () => import('../view-groups/view-groups.module').then(m => m.ViewGroupsModule),
    canActivate: [AccessGuard],
    data: {role: {number: 1, page_name: 'View Groups'}}
  },
  { path: '', redirectTo: 'viewduser', pathMatch: 'full'}
]

@NgModule({
  declarations: [ViewUserComponent],
  imports: [
    RouterModule.forChild(ViewUserRouts),
    SharedModule,
    GridModule, ExcelModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [AddUserServices, WorkOrderDrodownServices],
  bootstrap: [ViewUserComponent]
})

export class UserViewModule { }
