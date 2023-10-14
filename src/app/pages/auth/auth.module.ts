import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { routes } from './auth.routing';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from '../../services/auth/auth.service';
import { UserActivityTrackingService } from 'src/app/services/usertracking/user-activity-tracking.service';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { ChangePassLinkComponent } from './change-pass-link/change-pass-link.component';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LoginComponent,UserChangePasswordComponent, ChangePassLinkComponent],
  providers: [AuthService, UserActivityTrackingService],
})

export class AuthModule { }
