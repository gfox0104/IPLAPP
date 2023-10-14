import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { AccessGuardService as AccessGuard } from '../../../services/access/access-guard.service';
const routes: Routes = [
  {
    path: 'repairHome',
    loadChildren: () => import('./repair-base-home/repair-base-home.module').then(m => m.RepairBaseHomeModule),
    canActivate: [AccessGuard],
    data: { role: { number: 9, page_name: 'Home' } },
  },
  {
    path: 'repairUser',
    loadChildren: () => import('./repair-base-user/repair-base-user.module').then(m => m.RepairBaseUserModule),
    canActivate: [AccessGuard],
    data: { role: { number: 9, page_name: 'User Information' } },

  },
  {
    path: 'repairChangepassword',
    loadChildren: () => import('./repair-base-change-password/repair-base-change-password.module').then(m => m.RepairBaseChangePasswordModule),
    canActivate: [AccessGuard],
    data: { role: { number: 9, page_name: 'Home' } },
  },
  {
    path: 'repairBaseProxyserver',
    loadChildren: () => import('./repair-base-proxyserver/repair-base-proxyserver.module').then(m => m.RepairBaseProxyserverModule),
    canActivate: [AccessGuard],
    data: { role: { number: 9, page_name: 'Proxy Server' } },
  },
  {
    path: '', redirectTo: 'repairHome', pathMatch: 'full'
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class RepairBaseMainModule { }
