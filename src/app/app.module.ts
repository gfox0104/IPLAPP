import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AccessGuardService } from './services/access/access-guard.service';
import { EventEmitterService } from './services/access/event-emitter.service';
import { UserProfileModule } from '../app/pages/auth/user-profile/user-profile.module'
import { ChangePasswordModule } from '../app/pages/auth/change-password/change-password.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from '@progress/kendo-angular-menu';
import { environment } from 'src/environments/environment';
import { AppFooterComponent } from './components/app-footer/app-footer.component';

import { PushMessageService } from './services/util/push-messaging-service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AsyncPipe } from '@angular/common';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent, AppFooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    UserProfileModule,
    ChangePasswordModule,
    MenuModule,
    AngularFireMessagingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [AuthGuardService, AccessGuardService, EventEmitterService,PushMessageService,AsyncPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
