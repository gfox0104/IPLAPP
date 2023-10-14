import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgxSpinnerModule } from "ngx-spinner";
import { RepairBaseHomeComponent } from './repair-base-home.component';

const RepairHomeRoute: Routes = [
  {
    path: 'home',
    component: RepairBaseHomeComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./repair-base-create/repair-base-create.module').then(m => m.RepairBaseCreateModule)
  },
  {
    path: 'property/:id',
    loadChildren: () => import('./repair-base-property-information/repair-base-property-information.module').then(m => m.RepairBasePropertyInformationModule)
  },
  {
    path: 'addRoom/:id',
    loadChildren: () => import('./repair-base-add-room/repair-base-add-room.module').then(m => m.RepairBaseAddRoomModule)
  },
  {
    path: 'preview/:id',
    loadChildren: () => import('./repair-base-preview/repair-base-preview.module').then(m => m.RepairBasePreviewModule)
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
]

@NgModule({
  declarations: [RepairBaseHomeComponent],
  imports: [
    RouterModule.forChild(RepairHomeRoute),
    CommonModule,
    GridModule,
    NgxSpinnerModule
  ]
})
export class RepairBaseHomeModule { }
