import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './services/auth/auth-guard.service';
import { AccessGuardService as AccessGuard } from './services/access/access-guard.service';
import { UserChangePasswordComponent } from './pages/auth/user-change-password/user-change-password.component';
import { ChangePassLinkComponent } from './pages/auth/change-pass-link/change-pass-link.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'workorder',
    loadChildren: () => import('./pages/work-order/work-order-view/work-order-view.module').then(m => m.WorkOrderViewModule),
    data: { role: 'work-order', level: 0 },
    canActivate: [AuthGuard],
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then(m => m.MessageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contractors',
    loadChildren: () => import('./pages/contractor/contractor.module').then(m => m.ContractorModule),
    data: {role: {number: 1, page_name: 'Contractor'}},
    canActivate: [AuthGuard],
  },
  

  {
    path: 'contractors',
    loadChildren: () => import('../app/pages/contractor/live-map/live-map-module').then(m => m.LiveMapModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'accounting',
    loadChildren: () => import('./pages/admin/accounting-details/accounting-details.module').then(m => m.AccountingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client-result/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access-denied/access-denied.module').then(m => m.AccessDeniedModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'repairBase',
    loadChildren: () => import('./pages/repair-base/repair-base.module').then(m => m.RepairBaseModule),
    canActivate: [AuthGuard],
  
  },
  { 
   
    path: "admin/change-password/:ipluid/:iplcode",  component:UserChangePasswordComponent },
  {
    path: 'applogin/:new',
    loadChildren: () => import('./pages/auth/app-login/ipl-login.module').then(m => m.IplLoginModule),
   
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/user-register/user-register.module').then(m => m.UserRegisterModule),
  },

  { 
   
    path: "admin/forgot/:id",  component:ChangePassLinkComponent },

  { path: "", redirectTo: "/admin/login", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }