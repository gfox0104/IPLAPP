import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuModule } from '@progress/kendo-angular-menu';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';


const routes: Routes =  [
  {
    path: 'repairLogin',
    loadChildren: () => import('./repair-base-login/repair-base-login.module').then(m => m.RepairBaseLoginModule),
  },
  {
    path: 'repairSignup',
    loadChildren: () => import('./repair-base-signup/repair-base-signup.module').then(m => m.RepairBaseSignupModule),
  },
  {
    path: 'repairMain',
    loadChildren: () => import('./repair-base-main/repair-base-main.module').then(m => m.RepairBaseMainModule),

  },
  {
    path: '', redirectTo: 'repairLogin', pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MenuModule,
    GridModule,
    ExcelModule
  ],
  declarations: []
})

export class RepairBaseModule {};