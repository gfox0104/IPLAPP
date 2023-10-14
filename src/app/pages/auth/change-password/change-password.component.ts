import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChangePasswordModel } from './change-password-model';
import { ChangePasswordServices } from './change-password.service';
import { IplAppModalContent } from 'src/app/components';

@Component({
  selector: 'app-change-password',
  templateUrl: "./change-password.component.html"
})

export class ChangePasswordComponent implements OnInit {
  ChangePasswordModelObj: ChangePasswordModel = new ChangePasswordModel();
  GetLocal: any;
  buttonChange = "Change Password";
  isLoadingChange = false;
  submittedchange = false; // submitted;
  formUsrLoginGroupChnage: UntypedFormGroup; // create obj
  Realpassword: string = "";
  MessageFlag: string;

  constructor(
    private xChangePasswordServices: ChangePasswordServices,
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
  ) {
    this.GetLocal = JSON.parse(localStorage.getItem("usertemp_"));
    this.GetPassWord();
  }

  ngOnInit() {
    this.formUsrLoginGroupChnage = this.formBuilder.group({
      PasswordOld: ["", Validators.required],
      PasswordNew: ["", [Validators.required, Validators.minLength(8)]],
      PasswordConfirm: ["", Validators.required],
    },
      {
        validator: this.MustMatch("PasswordNew", "PasswordConfirm")
      }
    );
  }

  get fxChange() {
    return this.formUsrLoginGroupChnage.controls;
  }

  GetPassWord() {
    if (this.GetLocal) {
      this.ChangePasswordModelObj.User_pkeyID = this.GetLocal[0].User_pkeyID;
      this.xChangePasswordServices.GetPasswordData(this.ChangePasswordModelObj)
        .subscribe(response => {
          //console.log('pass',response)
          this.Realpassword = response[0][0].User_Password;
        });
    }
  }
  // change password
  FormButtonChange() {
    //debugger
    this.submittedchange = true;
    if (this.formUsrLoginGroupChnage.invalid) {
      return;
    }

    if (this.Realpassword != this.ChangePasswordModelObj.User_PasswordOld) {
      alert('Old Password Wrong..!');
      return;
    }

    this.isLoadingChange = true;

    this.xChangePasswordServices.ChangePasswordData(this.ChangePasswordModelObj)
      .subscribe(reponse => {
        this.buttonChange = "Change Password";
        this.isLoadingChange = false;
        this.MessageFlag = "Password Change Successfully...!";
        this.commonMessage();
      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  // password match function
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {

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
