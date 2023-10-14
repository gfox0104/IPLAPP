import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';

import { RestoreWorkOrderComponent } from './restore-workorders.component';
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
import { SharedModule } from '../../../shared.module';
import { AccessGuardService as AccessGuard} from '../../../services/access/access-guard.service';

export const ViewUserRouts: Routes = [
  { 
    path: 'viewrestoreorder', component: RestoreWorkOrderComponent },
  // { 
  //   path: 'adduser/:id',
  //   loadChildren: () => import('../add-user/add-user.module').then(m => m.AddUserModule)
  // },

  // {
  //   path: 'group',
  //   loadChildren: () => import('../view-groups/view-groups.module').then(m => m.ViewGroupsModule),
  //   canActivate: [AccessGuard],
  //   data: {role: {number: 1, page_name: 'View Groups'}}
  // },
  { path: '', redirectTo: 'viewrestoreorder', pathMatch: 'full'}
]

@NgModule({
  declarations: [RestoreWorkOrderComponent],
  imports: [
    RouterModule.forChild(ViewUserRouts),
    SharedModule,
    GridModule, ExcelModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [WorkOrderDrodownServices],
  bootstrap: [RestoreWorkOrderComponent]
})

export class RestoreWorkOrderModule { }
