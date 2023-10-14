import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileModel } from './user-profile-model';
import { UserProfileService } from './user-profile.service';
import { IplAppModalContent } from 'src/app/components';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: "./user-profile.component.html",
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  public defaultStateItem: { IPL_StateName: string, IPL_StateID: number } = { IPL_StateName: 'Select', IPL_StateID: 0 };
  button = "Save";
  isLoading = false;
  MessageFlag: string;
  FormDisabledCustom = false;
  IsEditDisable: boolean = false;
  formUsrCommonGroup: UntypedFormGroup; // create obj
  submitted = false; // submitted;
  submittedchange = false;
  public drpStateList: Array<string>;
  StateList:any;
  StateValFlag = false;
  UserProfileModelObj: UserProfileModel = new UserProfileModel();
  IsStaticImage=false;
  StaticImageURL:any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private xRouter: Router,
    private xRoute: ActivatedRoute,
    private xUserProfileService: UserProfileService,
    private encrDecr: EncrDecrService,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
  ) {
    this.GetStateDropDown();
   }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      userfirst: ["", Validators.required],
      userlast: ["", Validators.nullValidator],
      useremail: ["", Validators.email],
      useradd: ["", Validators.nullValidator],
      usercity: ["", Validators.nullValidator],
      userstate: ["", Validators.nullValidator],
      userpin: ["", [Validators.nullValidator]],
      usercompany: ["", Validators.nullValidator],
      usermob: ["", Validators.nullValidator],
      userlogin: ["", Validators.nullValidator],
      userpassword: ["", [Validators.required, Validators.minLength(8)]],
      userconpassword: ["", Validators.required],
      selectimg: ["", Validators.nullValidator],
    },
      {
        validator: this.MustMatch("userpassword", "userconpassword")
      }
    );
    this.GetProfileDetails();
  }

  get fxChange() {
    return this.formUsrCommonGroup.controls;
  }
  fieldTextType:any;
  fieldTextCon:any;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextCon(){
    this.fieldTextCon = !this.fieldTextCon;
  }
  GetStateDropDown() {
    this.xWorkOrderDrodownServices.UserStateDropDownData().subscribe(response => {
      this.StateList = response[0];
      this.drpStateList = response[0];
      //console.log('state', this.StateList);

    });
  }
  statehandleFilter(value) {
    if (value!='') {
      var filtereddata = this.StateList.filter(function (el) {
        return el.IPL_StateName != null;
      });
      this.drpStateList = filtereddata.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpStateList = this.StateList.slice();
   }
  }
  FullName: String;
  GetProfileDetails() {
    this.xUserProfileService
      .GetUserProfileData(this.UserProfileModelObj)
      .subscribe(response => {
        //console.log('userdetails',response);
        var encrypted = this.encrDecr.set('123456$#@$^@1ERF',JSON.stringify(response[0]) );
        localStorage.setItem("usertemp_",JSON.stringify(encrypted) );
        this.UserProfileModelObj.User_pkeyID = response[0][0].User_pkeyID;
        this.UserProfileModelObj.User_FirstName = response[0][0].User_FirstName;
        this.UserProfileModelObj.User_LastName = response[0][0].User_LastName;
        this.UserProfileModelObj.User_LoginName = response[0][0].User_LoginName;
        this.UserProfileModelObj.User_Password = response[0][0].User_Password;
        this.UserProfileModelObj.User_PasswordConfirm = response[0][0].User_Password;
        this.UserProfileModelObj.User_CellNumber = response[0][0].User_CellNumber;
        this.UserProfileModelObj.User_CompanyName = response[0][0].User_CompanyName;
        this.UserProfileModelObj.User_ImagePath = response[0][0].User_ImagePath;
        this.UserProfileModelObj.User_Address = response[0][0].User_Address;
        this.UserProfileModelObj.User_City = response[0][0].User_City;
        this.UserProfileModelObj.User_Zip = response[0][0].User_Zip;
        this.UserProfileModelObj.User_State_strval = response[0][0].User_State_strval;
        this.UserProfileModelObj.User_Email = response[0][0].User_Email;

        this.FullName = response[0][0].User_FirstName + '_' + response[0][0].User_LastName;

        this.formUsrCommonGroup.disable();
        this.IsEditDisable = true;
        this.FormDisabledCustom = true;
        this.button = "Update";
      })

  }

  inputelement: any;
  uploadprofileimage(documentInput: any) {
    // var cfrm = confirm("Are you want to update this record then click on update button");
    // if (cfrm == true) {
      this.inputelement = documentInput.target.files[0];
      //show image

      var reader = new FileReader();
      reader.readAsDataURL(this.inputelement);
      reader.onload = (_event) => {
        this.IsStaticImage=true
        this.UserProfileModelObj.User_ImagePath = reader.result.toString();
      }
    // }
  }

  FormButton() {
    this.submitted = true;
    this.StateValFlag = false;
    this.submittedchange = true;
    if (this.UserProfileModelObj.User_Password == '') {
      alert("Please enter Password");
    }

    else if (this.UserProfileModelObj.User_PasswordConfirm == '') {
      alert("Please enter confirm password");
    }

    // If Not same return False.
    else if (this.UserProfileModelObj.User_Password != this.UserProfileModelObj.User_PasswordConfirm) {
      alert("\nPassword did not match: Please try again...")
      return false;
    }

    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";
    if (this.inputelement == '' || this.inputelement == undefined) {
      this.xUserProfileService
        .UpdateUserProfileData(this.UserProfileModelObj)
        .subscribe(response => {
          this.MessageFlag = "Profile Updated...!";
          this.isLoading = false;

          this.commonMessage();
          this.IsEditDisable = true;
          this.GetProfileDetails();
        });
    } else {

      var cfrm = confirm("Are you want to update this record then click on update button");
      if (cfrm == true) {

        this.UserProfileModelObj.Filedata = this.inputelement;
        this.xUserProfileService
          .ImageUpdate(this.UserProfileModelObj)
          .then((res) => {
            res.subscribe(response => {
              //debugger;
              this.MessageFlag = "Profile Updated...!";
              this.isLoading = false;
              this.commonMessage();
              this.IsEditDisable = true;
              this.GetProfileDetails();
            });
          });
      }
      else
      {
        this.isLoading = false;
        this.submitted = false;
      }
    }
  }

  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Continue';
    modalRef.result.then(result => { }, reason => { });
  }

  EditForms() {
    this.IsEditDisable = false;
    this.formUsrCommonGroup.enable();
    this.FormDisabledCustom = false;
  }

  // password match
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
}
