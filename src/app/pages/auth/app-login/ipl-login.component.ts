import { Component, OnInit } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EncrDecrService } from '../../../services/util/encr-decr.service';
import { IplLoginModel } from "./ipl-login-model";
import { IplLoginService } from "./ipl-login.service";


@Component({
  templateUrl: "./ipl-login.component.html"
})
export class IplLoginComponent implements OnInit {
  IplLoginModelObj: IplLoginModel = new IplLoginModel();
  clientName:any;
  button = "Log In";
  submitted = false;
  isLoading = false;
  messageFlag: string;
  public form: UntypedFormGroup;
  public email: AbstractControl;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xIplLoginService: IplLoginService

  ) { 

  }

  ngOnInit() {
    location.reload()
    this.form = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required,])],
    });
    this.email = this.form.controls['email'];

  }

  get fx() {
    return this.form.controls;
  }
  geturlid(){
    //debugger
    const id1 = this.xRoute.snapshot.params['new'];
    this.clientName = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
     
  }
  onLogin(content,value) {

    this.geturlid();
    //debugger
    if ( this.clientName == 'Jamie') {
      this.submitted = true;
      this.isLoading = true;
      this.button = "Processing";
      this.IplLoginModelObj.LoginName = value.email;
      this.IplLoginModelObj.ClientName =  this.clientName; 
  
      if (this.form.invalid) {
        return;
      }
      this.testToken();
    
      this.IplLoginModelObj.Type = 2;
  
      window.localStorage.setItem("UserName", this.IplLoginModelObj.LoginName.replace('.', ''));
  
      this.xIplLoginService.LoginuserPost(this.IplLoginModelObj).subscribe(response => {
        //debugger
  
        if (response[0].length != 0) {
          if (response[0][0].User_IsPasswordChange) {
            ////dfebugger
            var userval = response[0];
  
            userval[0].User_Password = "xxxxxxxxxx";
            //console.log('userval', userval);
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', JSON.stringify(userval));
            window.localStorage.setItem("usertemp_", JSON.stringify(encrypted));
  
            var trackfoldername = this.EncrDecr.set('123456$#@$^@1ERF', response[0][0].User_FirstName.replace(" ", "") + "_" + response[0][0].User_LastName.replace(" ", ""));
            var userTracking = this.EncrDecr.set('123456$#@$^@1ERF', response[0][0].User_Tracking);
            var userTrackingTime = this.EncrDecr.set('123456$#@$^@1ERF', response[0][0].User_Tracking_Time);
            window.localStorage.setItem("trackfoldername", trackfoldername);
            window.localStorage.setItem("UserTracking", userTracking);
            window.localStorage.setItem("UserTrackingTime", userTrackingTime);
            this.isLoading = false;
              this.button = "Log In";
            this.router.navigate(["/dashboard"]);
          
          } else {
            this.messageFlag = " Please enter valid Username";
          this.commonMessage(content);
          localStorage.clear();
          this.isLoading = false;
          this.button = "Try Again";
          }
        } else {
          this.router.navigate(["/admin/login"]);
        }
      });
    }else{
      this.router.navigate(["/admin/login"]);
    }
  
  }
  commonMessage(content) {
    this.xmodalService
      .open(content, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {}, reason => {});
  }
  testToken() {
    //debugger
    this.xIplLoginService.LoginuserGetToken(this.IplLoginModelObj).subscribe(res => {
      //debugger
      window.localStorage.setItem("TOKEN", JSON.stringify(res.access_token));
    })
  }



}
