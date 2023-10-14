import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginModel } from '../../../models/login-model';
import { AuthService } from '../../../services/auth/auth.service';
import { EncrDecrService } from '../../../services/util/encr-decr.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-change-password',
  templateUrl: "./user-change-password.component.html",
  styleUrls: ['./user-change-password.component.scss']
})

export class UserChangePasswordComponent implements OnInit {
  
  formUsrLoginGroup: UntypedFormGroup;
  formUsrLoginGroupforget: UntypedFormGroup;
  formUsrLoginGroupChnage: UntypedFormGroup;
  userLoginModel: LoginModel = new LoginModel();
  submitted = false;
  submittedForgot = false;
  submittedchange = false;
  button = "Log In";
  buttonforgot = "Sent Password";
  buttonChange = "Change Password";
  isLoading = false;
  isLoadingforgot = false;
  isLoadingChange = false;
  tokendata: any;
  key: any;
  messageFlag: string;
  realpassword: string ="";
  uVerificationId:string;
  usersource:string;
  uVerificationCode:string;

  passRequirement = {
    passwordMinLowerCase: 1,
    passwordMinNumber: 1,
    passwordMinSymbol: 1,
    passwordMinCharacters: 6
  };
  pattern = [
    `(?=([^a-z]*[a-z])\{${this.passRequirement.passwordMinLowerCase},\})`,
    `(?=([^0-9]*[0-9])\{${this.passRequirement.passwordMinNumber},\})`,
    `(?=(\.\*[\$\@\$\!\%\*\?\&])\{${this.passRequirement.passwordMinSymbol},\})`,
    `[A-Za-z\\d\$\@\$\!\%\*\?\&\.]{${
      this.passRequirement.passwordMinCharacters
    },}`
  ]
    .map(item => item.toString())
    .join("");
    

  constructor(
    private router: Router,private _activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private encrDecr: EncrDecrService
  ) {
    this.key = "QWERTYUIOP";
  }
  
  ngOnInit() {
    this.formUsrLoginGroup = this.formBuilder.group({
      Eamilname: ["", Validators.required],
      passwordname: ["", Validators.required],
    });

    this.formUsrLoginGroupforget = this.formBuilder.group({
      Eamilnameforget: ["", Validators.required]

    });

    this.formUsrLoginGroupChnage = this.formBuilder.group(
      {
        user_LoginName: ["", Validators.required],
        PasswordNew: ["", [Validators.required,Validators.pattern(this.pattern), Validators.minLength(6),]],
        PasswordConfirm:["", Validators.required],
      },
      {
          validator: this.MustMatch("PasswordNew", "PasswordConfirm")
      }
    );
//dfebugger
   this.uVerificationId = this._activatedRoute.snapshot.queryParams['ipluid'];
   this.uVerificationCode = this._activatedRoute.snapshot.queryParams['iplcode'];
   this.usersource = this._activatedRoute.snapshot.queryParams['scid'];
   console.log('this.usersource', this.usersource)
   this.GetUserVerificationDetails();
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
  

  onLogin(content, changepopup) {
    //debugger
    this.submitted = true;
    if (this.formUsrLoginGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";
    this.testToken();
    this.userLoginModel.tokendetails = this.tokendata;
    this.userLoginModel.type = 2;
    localStorage.setItem("tempadmin", this.key);
    localStorage.setItem("UserName",this.userLoginModel.user_LoginName.replace('.', ''));

    this.authService.LoginuserPost(this.userLoginModel).subscribe(response => {
   //debugger
    
        if (response[0].length != 0) {
          if(response[0][0].User_IsPasswordChange) {
          ////dfebugger
            var userval = response[0];
            this.messageFlag = " Welcome back " + response[0][0].User_FirstName;
            this.button = "authenticating....";
            this.commonMessage(content);
            userval[0].User_Password = "xxxxxxxxxx";
            //console.log('userval',userval);
            var encrypted = this.encrDecr.set('123456$#@$^@1ERF',JSON.stringify(userval) );
            localStorage.setItem("usertemp_",JSON.stringify(encrypted) );
            localStorage.setItem("tempadmin", this.key);
            var trackfoldername = this.encrDecr.set('123456$#@$^@1ERF',response[0][0].User_FirstName.replace(" ", "") + "_" + response[0][0].User_LastName.replace(" ", ""));
            var userTracking = this.encrDecr.set('123456$#@$^@1ERF',response[0][0].User_Tracking);
            var userTrackingTime = this.encrDecr.set('123456$#@$^@1ERF',response[0][0].User_Tracking_Time);
            localStorage.setItem("trackfoldername", trackfoldername);
            localStorage.setItem("UserTracking", userTracking);
            localStorage.setItem("UserTrackingTime", userTrackingTime);
            this.testToken();
            this.router.navigate(["/dashboard"]);
          } else {
              this.isLoading = false;
              this.button = "Log In";
              this.realpassword = response[0][0].User_Password;
              this.userLoginModel.user_pkeyID = response[0][0].User_pkeyID;
              this.commonMessageChange(changepopup);
          }
        } else {
          this.messageFlag = " Please enter valid Username and Password";
          this.commonMessage(content);
          localStorage.clear();
          this.isLoading = false;
          this.button = "Try Again";
        }
      });
  }

  // common message modal popup
  commonMessage(content) {
    this.modalService
      .open(content, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {}, reason => {});
  }

  commonMessageChange(changepopup) {
    this.modalService
      .open(changepopup, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {}, reason => {});
  }

  testToken() {
  ////dfebugger
    this.userLoginModel.type = 1;
    this.authService.LoginuserGetToken(this.userLoginModel)
    .subscribe(response => {
      //console.log('token called', response);
      localStorage.setItem("TOKEN", JSON.stringify(response.access_token));
    });
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
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {}, reason => {});
  }

  formButtonPassword(content) {
    this.submittedForgot = true;

    if (this.formUsrLoginGroupforget.invalid) {
      return;
    }

    this.isLoadingforgot = true;
    this.buttonforgot = "Processing";

    this.modalService.hasOpenModals();

    this.authService
      .ForgotpasswordPost(this.userLoginModel)
      .subscribe(response => {
        //console.log("resp data", response);
        if (true) {
          this.isLoadingforgot = false;
          this.buttonforgot = "Sent Password Again";
          this.messageFlag = "Password Sent your Register Email Id";
          this.commonMessage(content);
        }
      });
  }
  fieldTextType:any;
  fieldTextCon:any;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextCon(){
    this.fieldTextCon = !this.fieldTextCon;
  }
  // change password
  formButtonChange() {
  //debugger;
   
    this.submittedchange = true;
    
    if (this.formUsrLoginGroupChnage.invalid) {
      return;
    }
    
    

    this.isLoadingChange = true;
    this.userLoginModel.User_Token_val =  this.uVerificationId;
    this.authService.ChangepasswordPost(this.userLoginModel)
      .subscribe(response => {
      ////dfebugger;
        this.buttonChange = "Redirecting Index page.....";
        this.isLoadingChange = true;
        this.userLoginModel.user_LoginName = this.userLoginModel.user_LoginName;
        this.userLoginModel.user_Password =  this.userLoginModel.user_PasswordNew;
        this.userLoginModel.User_Token_val =  this.uVerificationId;
        this.userLoginModel.tokendetails =  this.uVerificationId;

      ////dfebugger;
        if(response[0].length >0)
        {
          this.testToken();
         //this.userLoginModel.User_Token_val=this.uVerificationId;
        this.authService.LoginuserPost(this.userLoginModel)
          .subscribe(response => {
         //debugger
            if (response[0].length != 0) {
            ////dfebugger
              //console.log('mohit',response)
              var userval = response[0];
              this.modalService.dismissAll();
              var encrypted = this.encrDecr.set('123456$#@$^@1ERF',JSON.stringify(userval) );
              localStorage.setItem("usertemp_",JSON.stringify(encrypted) );
              localStorage.setItem("tempadmin", this.key);
              
              var trackfoldername = this.encrDecr.set('123456$#@$^@1ERF',response[0][0].User_FirstName.replace(" ", "") + "_" + response[0][0].User_LastName.replace(" ", ""));
              var userTracking = this.encrDecr.set('123456$#@$^@1ERF',response[0][0].User_Tracking);
              var userTrackingTime = this.encrDecr.set('123456$#@$^@1ERF',response[0][0].User_Tracking_Time);
              localStorage.setItem("trackfoldername", trackfoldername);
              localStorage.setItem("UserTracking", userTracking);
              localStorage.setItem("UserTrackingTime", userTrackingTime);
              //debugger
              var encrypted = this.encrDecr.set('123456$#@$^@1ERF', this.usersource);
              this.router.navigate(["admin/forgot", btoa(encrypted)]);
            
            }
          });

        }
      });
  }

  //Get UserVerificatoinDetails

  GetUserVerificationDetails() {
  ////dfebugger;
    var model:any={};
    model.UserVerificationID=this.uVerificationId;
    model.VerificationCode=this.uVerificationCode;
    model.User_LoginName=this.formUsrLoginGroupChnage.controls['user_LoginName'].value;
    model.Type=1;
    
    this.authService.Get_userverificatonDetails(model)
      .subscribe(response => {
      ////dfebugger;
        if(response.length >0)
        {
          
          this.userLoginModel.user_LoginName=response[0]

          if(this.userLoginModel.user_LoginName==null)
          {
            this.messageFlag = "Link has expired";
            alert('Link has expired');
          }

        }
        
      });
  }


  
}
