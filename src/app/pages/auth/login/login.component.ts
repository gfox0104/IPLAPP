import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModel } from '../../../models/login-model';
import { AuthService } from '../../../services/auth/auth.service';
import { EncrDecrService } from '../../../services/util/encr-decr.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formUsrLoginGroup: UntypedFormGroup;
  formUsrLoginGroupforget: UntypedFormGroup;
  formUsrLoginGroupChnage: UntypedFormGroup;
  userLoginModel: LoginModel = new LoginModel();
  submitted = false;
  submittedForgot = false;
  submittedchange = false;
  button = 'Log In';
  buttonforgot = 'Sent Password';
  buttonChange = 'Change Password';
  isLoading = false;
  isLoadingforgot = false;
  isLoadingChange = false;
  tokendata: any;
  key: any;
  messageFlag: string;
  realpassword: string = '';

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private encrDecr: EncrDecrService,
    private http: HttpClient
  ) {
    this.key = 'QWERTYUIOP';
    this.getIpAddress();
  }

  ngOnInit() {
    this.formUsrLoginGroup = this.formBuilder.group({
      Eamilname: ['', Validators.required],
      passwordname: ['', Validators.required],
    });

    this.formUsrLoginGroupforget = this.formBuilder.group({
      Eamilnameforget: ['', Validators.required],
    });

    this.formUsrLoginGroupChnage = this.formBuilder.group(
      {
        PasswordOld: ['', Validators.required],
        PasswordNew: ['', [Validators.required, Validators.minLength(8)]],
        PasswordConfirm: ['', Validators.required],
      },
      {
        validator: this.MustMatch('PasswordNew', 'PasswordConfirm'),
      }
    );
  }

  get fx() {
    return this.formUsrLoginGroup.controls;
  }

  get fxforget() {
    return this.formUsrLoginGroupforget.controls;
  }

  get fxChange() {
    return this.formUsrLoginGroupChnage.controls;
  }

  ipAddressId: any;
  getIpAddress() {
    //debugger
    return (
      this.http
        .get('https://jsonip.com')
        // .map((res:Response) => res.json())
        .subscribe((data) => {
          this.ipAddressId = data['ip'];
          this.userLoginModel.IP = this.ipAddressId;
        })
    );
  }

  onLogin(content, changepopup) {
    //debugger
    this.submitted = true;
    if (this.formUsrLoginGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = 'Processing';

    // this.userLoginModel.tokendetails = this.tokendata;
    this.userLoginModel.type = 2;
    localStorage.setItem('tempadmin', this.key);
    localStorage.setItem(
      'UserName',
      this.userLoginModel.user_LoginName.replace('.', '')
    );
    this.testToken();
    this.authService
      .LoginuserPost(this.userLoginModel)
      .subscribe((response) => {
        // debugger

        if (response[0].length != 0) {
          if (response[0][0].User_IsPasswordChange) {
            // debugger;
            var userval = response[0];

            console.log('userval', userval);
            this.messageFlag = ' Welcome back ' + response[0][0].User_FirstName;
            this.button = 'authenticating....';
            this.commonMessage(content);
            // [a-zA-Z0-9_.-]
            userval[0].User_LoginName=userval[0].User_LoginName.replace(/[^a-zA-Z0-9 ]/g, "");
            userval[0].User_Password = 'xxxxxxxxxx';
            //console.log('userval',userval);
            var encrypted = this.encrDecr.set(
              '123456$#@$^@1ERF',
              JSON.stringify(userval)
            );


            localStorage.setItem('usertemp_', JSON.stringify(encrypted));
            localStorage.setItem('tempadmin', this.key);
            var trackfoldername = this.encrDecr.set(
              '123456$#@$^@1ERF',
              response[0][0].User_FirstName.replace(' ', '') +
                '_' +
                response[0][0].User_LastName.replace(' ', '')
            );
            var userTracking = this.encrDecr.set(
              '123456$#@$^@1ERF',
              response[0][0].User_Tracking
            );
            var userTrackingTime = this.encrDecr.set(
              '123456$#@$^@1ERF',
              response[0][0].User_Tracking_Time
            );
            localStorage.setItem('trackfoldername', trackfoldername);
            localStorage.setItem('UserTracking', userTracking);
            localStorage.setItem('UserTrackingTime', userTrackingTime);
            //this.testToken();
            this.router.navigate(['/dashboard']);
          } else {
            this.isLoading = false;
            this.button = 'Log In';
            this.realpassword = response[0][0].User_Password;
            this.userLoginModel.user_pkeyID = response[0][0].User_pkeyID;
            this.commonMessageChange(changepopup);
          }
        } else {
          this.messageFlag = ' Please enter valid Username and Password';
          this.commonMessage(content);
          localStorage.clear();
          this.isLoading = false;
          this.button = 'Try Again';
        }
      });
  }

  // common message modal popup
  commonMessage(content) {
    this.modalService
      .open(content, { size: 'sm', ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  commonMessageChange(changepopup) {
    this.modalService
      .open(changepopup, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  testToken() {
    //debugger
    let browserdata = this.getBrowserName();
    this.userLoginModel.User_Acc_Log_Device_Name =
      'Laptop/Desktop' + ' ' + browserdata;
    this.userLoginModel.type = 1;
    this.authService
      .LoginuserGetToken(this.userLoginModel)
      .subscribe((response) => {
        //debugger
        //console.log('token called', response);
        localStorage.setItem('TOKEN', JSON.stringify(response.access_token));
      });
  }

  getBrowserName() {
    //debugger
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  // password match function
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  forgetPassword(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  fieldTextType: any;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  formButtonPassword(content) {
    //debugger
    this.submittedForgot = true;

    if (this.formUsrLoginGroupforget.invalid) {
      return;
    }

    this.isLoadingforgot = true;
    this.buttonforgot = 'Processing';

    this.modalService.hasOpenModals();
    this.userLoginModel.User_Source = 1;
    this.authService
      .ForgotpasswordPost(this.userLoginModel)
      .subscribe((response) => {
        //console.log("resp data", response);
        if (true) {
          this.isLoadingforgot = false;
          this.buttonforgot = 'Sent Password Again';
          this.messageFlag = 'Password Sent your Register Email Id';
          this.commonMessage(content);
        }
      });
  }

  // change password
  formButtonChange() {
    this.submittedchange = true;

    if (this.formUsrLoginGroupChnage.invalid) {
      return;
    }

    if (this.realpassword != this.userLoginModel.user_PasswordOld) {
      alert('Old Password Wrong..!');
      return;
    }

    this.isLoadingChange = true;
    this.authService
      .ChangepasswordPost(this.userLoginModel)
      .subscribe((response) => {
        this.buttonChange = 'Redirecting Index page.....';
        this.isLoadingChange = true;
        this.userLoginModel.user_LoginName = this.userLoginModel.user_LoginName;
        this.userLoginModel.user_Password =
          this.userLoginModel.user_PasswordNew;

        this.authService
          .LoginuserPost(this.userLoginModel)
          .subscribe((response) => {
            if (response[0].length != 0) {
              //console.log('mohit',response)
              var userval = response[0];
              this.modalService.dismissAll();
              var encrypted = this.encrDecr.set(
                '123456$#@$^@1ERF',
                JSON.stringify(userval)
              );
              localStorage.setItem('usertemp_', JSON.stringify(encrypted));
              localStorage.setItem('tempadmin', this.key);

              var trackfoldername = this.encrDecr.set(
                '123456$#@$^@1ERF',
                response[0][0].User_FirstName.replace(' ', '') +
                  '_' +
                  response[0][0].User_LastName.replace(' ', '')
              );
              var userTracking = this.encrDecr.set(
                '123456$#@$^@1ERF',
                response[0][0].User_Tracking
              );
              var userTrackingTime = this.encrDecr.set(
                '123456$#@$^@1ERF',
                response[0][0].User_Tracking_Time
              );
              localStorage.setItem('trackfoldername', trackfoldername);
              localStorage.setItem('UserTracking', userTracking);
              localStorage.setItem('UserTrackingTime', userTrackingTime);

              this.router.navigate(['/dashboard']);
            }
          });
      });
  }
  fieldPassword_Old: any;
  fieldPassword_New: any;
  fieldPassword_Confirm: any;
  viewPassword(type) {
    if(type=="OLD")
    {
      this.fieldPassword_Old = !this.fieldPassword_Old;
    }
    else if(type=="NEW")
    {
      this.fieldPassword_New = !this.fieldPassword_New;
    }
    else if(type=="CONFIRM")
    {
      this.fieldPassword_Confirm = !this.fieldPassword_Confirm;
    }

  }
}
