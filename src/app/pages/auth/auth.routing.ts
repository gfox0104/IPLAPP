import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'password',
  //   loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
  // },
  // {
  //   path: 'userdata',
  //   loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
  // }
  //pradeep
  {
    path: 'change-password',
    component: UserChangePasswordComponent
  },
]
