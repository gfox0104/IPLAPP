import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../app/services/auth/auth.service';
import { ClientResultServices } from './pages/client-result/client-result/client-result.service';
import { UserActivityTrackingService } from './services/usertracking/user-activity-tracking.service';
import { EncrDecrService } from './services/util/encr-decr.service';
import { PushMessageService } from './services/util/push-messaging-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'iplapp';
  isLoggedIn$: Observable<boolean>;
  activePage: any;
  keypressedCount = 0;
  interval: any;
  intervalTime: any;
  showDownloadBar: boolean = false;
  decuser: any;

  message;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  isUserLogin=false;
  @ViewChild('idleUserBox', { static: false }) idleUserModal: ElementRef;
  constructor(
    private authService: AuthService,
    private TrackActivity: UserActivityTrackingService,
    private encrDecr: EncrDecrService,
    private xClientResultServices: ClientResultServices,
    private xRoute: Router,

    private messagingService: PushMessageService,
    private idle: Idle, private keepalive: Keepalive,
    private modalService: NgbModal,

  ) {
    if(localStorage.getItem('usertemp_') != null)
    {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval  = this.encrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser  =JSON.parse(decval) ;
      this.IdleUserManagement()
    }


  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.loggedIn;
     this.messagingService.requestPermission();
     this.messagingService.receiveMessage();
     this.message = this.messagingService.currentMessage;

    // if(localStorage.getItem('UserTrackingTime') == null){
    //  // var Defulttime = this.encrDecr.set('123456$#@$^@1ERF',5)
    //   localStorage.setItem('UserTrackingTime',this.encrDecr.set('123456$#@$^@1ERF',0))
    //   this.intervalTime = this.encrDecr.get('123456$#@$^@1ERF', localStorage.getItem('UserTrackingTime'));
    // }else{
    // this.intervalTime = this.encrDecr.get('123456$#@$^@1ERF', localStorage.getItem('UserTrackingTime'));
    // this.intervalTime = parseInt(this.intervalTime);
    // }
    var countDownDate;
    if (
      localStorage.getItem('time') == null ||
      localStorage.getItem('time') == 'null' ||
      localStorage.getItem('time') == 'Invalid date'
    ) {
      countDownDate = moment().add(this.intervalTime, 'minutes');
    } else {
      countDownDate = moment(localStorage.getItem('countDownDate'));
    }

    this.interval = setInterval(() => {
      if (localStorage.getItem('UserTrackingTime') != null) {
        this.intervalTime = this.encrDecr.get(
          '123456$#@$^@1ERF',
          localStorage.getItem('UserTrackingTime')
        );
        this.intervalTime = parseInt(this.intervalTime);

        if (
          localStorage.getItem('time') == null ||
          localStorage.getItem('time') == 'null' ||
          localStorage.getItem('time') == 'Invalid date'
        ) {
          localStorage.setItem('countDownDate', countDownDate);
          var diff = countDownDate.diff(moment());
          if (diff <= 0) {
            localStorage.setItem('time', null);
            const userTracking = this.encrDecr.get(
              '123456$#@$^@1ERF',
              localStorage.getItem('UserTracking')
            );

            if (userTracking == 'true') {
              this.TrackActivity.CaptureTrackImage();
            }

            countDownDate = moment().add(this.intervalTime, 'minutes');
          } else {
            localStorage.setItem('time', moment.utc(diff).format('mm:ss'));
          }
        } else {
          var diff = countDownDate.diff(moment());
          if (diff <= 0) {
            localStorage.setItem('time', null);
            const userTracking = this.encrDecr.get(
              '123456$#@$^@1ERF',
              localStorage.getItem('UserTracking')
            );

            if (userTracking == 'true') {
              this.TrackActivity.CaptureTrackImage();
            }

            countDownDate = moment().add(this.intervalTime, 'minutes');
          } else {
            localStorage.setItem('time', moment.utc(diff).format('mm:ss'));
          }
        }
      }
    }, 1000);
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (localStorage.getItem('keypressedcount') == null) {
      localStorage.setItem(
        'keypressedcount',
        this.encrDecr.set('123456$#@$^@1ERF', 0)
      );
    }
    this.keypressedCount =
      parseInt(
        this.encrDecr.set(
          '123456$#@$^@1ERF',
          localStorage.getItem('keypressedcount')
        )
      ) + 1;
    if (
      localStorage.getItem('keypressedcount') == null ||
      localStorage.getItem('keypressedcount') ==
        this.encrDecr.set('123456$#@$^@1ERF', 0)
    ) {
      localStorage.setItem(
        'keypressedcount',
        this.encrDecr.set('123456$#@$^@1ERF', 0)
      );
    } else {
      //this.keypressedCount = this.encrDecr.set('123456$#@$^@1ERF',this.keypressedCount );
      localStorage.setItem(
        'keypressedcount',
        this.encrDecr.set('123456$#@$^@1ERF', this.keypressedCount)
      );
    }
  }

  // TcM@2020
  @HostListener('window:focus', ['$event'])
  onFocus(): void {
    this.activePage = 1;
    this.activePage = this.encrDecr.set('123456$#@$^@1ERF', this.activePage);
    sessionStorage.setItem('Tab', this.activePage);
    localStorage.setItem('Tab', this.activePage);
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: FocusEvent): void {
    this.activePage = 0;
    this.activePage = this.encrDecr.set('123456$#@$^@1ERF', this.activePage);
    sessionStorage.setItem('Tab', this.activePage);
    localStorage.setItem('Tab', this.activePage);
  }
  IdleUserManagement(){
    // Convert Minute to Second
    var IdleTimerInSecond=parseInt((parseFloat(environment.userIdleManage.IdleTimer)*60).toString());
    var countDownTimeInSecond=parseInt((parseFloat(environment.userIdleManage.countDownTime)*60).toString());

   // sets an idle timeout of 5 seconds, for testing purposes.
   this.idle.setIdle(IdleTimerInSecond);
   // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
   this.idle.setTimeout(countDownTimeInSecond);
   // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
   this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

   this.idle.onIdleEnd.subscribe(() => {
     this.idleState = 'No longer idle.'
    //  console.log(this.idleState);
     this.reset();
   });

   this.idle.onTimeout.subscribe(() => {
     this.idleState = 'Timed out!';
     this.timedOut = true;
    //  console.log(this.idleState);
     this.logout();
   });

   this.idle.onIdleStart.subscribe(() => {
       this.idleState = 'You\'ve gone idle!'
      //  console.log(this.idleState);
      this.modalService.open(this.idleUserModal, { size: "sm", ariaLabelledBy: "modal-basic-title" }).result.then(result => { }, reason => { });
   });

   this.idle.onTimeoutWarning.subscribe((countdown) => {
     this.idleState = 'You will time out in ' + countdown + ' seconds!'
    //  console.log(this.idleState);
   });

   // sets the ping interval to 15 seconds
   this.keepalive.interval(15);

   this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

   this.reset();
}
reset() {
  this.idle.watch();
  this.idleState = 'Started.';
  this.timedOut = false;
}
stay() {
  this.modalService.dismissAll();
  this.reset();
}
closeModal() {
  this.modalService.dismissAll();
}
logout() {
  this.authService
      .AddUserAccessLogLogoutPost()
      .subscribe(response => {
        this.authService.logout();
        localStorage.removeItem('usertemp_');
        localStorage.removeItem('tempadmin');
        localStorage.removeItem('trackfoldername');
        localStorage.removeItem('UserTracking');
        localStorage.removeItem('UserTrackingTime');
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('TOKEN');
        localStorage.clear();
        this.xRoute.navigate(['/']);
        this.modalService.dismissAll();
      });
}

}
