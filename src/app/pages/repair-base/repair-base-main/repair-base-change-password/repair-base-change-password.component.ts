import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-repair-base-change-password',
  templateUrl: './repair-base-change-password.component.html',
  styleUrls: ['./repair-base-change-password.component.scss']
})
export class RepairBaseChangePasswordComponent implements OnInit {
  formUsrCommonGroup: UntypedFormGroup;
  submitted=false;
  constructor( private formbuilder:UntypedFormBuilder) { }

  ngOnInit(): void {
    this.formUsrCommonGroup = this.formbuilder.group({
      CurrentPassword:["",Validators.required],
      NewPassword:["",Validators.required],
      ConfirmNewPassword:["",Validators.required]
    });
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  changepassword(){
this.submitted = true;
if(this.formUsrCommonGroup.invalid){
  return;
}
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
