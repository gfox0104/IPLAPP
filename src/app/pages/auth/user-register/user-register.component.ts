import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';
import { LoginModel } from 'src/app/models/login-model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WorkOrderDrodownServices } from 'src/app/services/util/dropdown.service';
import { ContractorMapState } from '../../user/add-user/add-user-model';
import { AddUserServices } from '../../user/add-user/add-user.service';
import { IplRegisterModel, RegisterState } from './user-register.model';
import { IplRegisterService } from './user-register.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userLoginModel: LoginModel = new LoginModel();
  IplRegisterModelObj:IplRegisterModel = new IplRegisterModel();
  ContractorMapStateObj: ContractorMapState = new ContractorMapState();
  RegisterStateObj:RegisterState = new RegisterState();
  formUsrCommonGroup: UntypedFormGroup;
  public defaultStateItem: { IPL_StateName: string, IPL_StateID: number } = { IPL_StateName: 'Select', IPL_StateID: 0 };
  public defaultCountyItem: { COUNTY: string, ID: number } = { COUNTY: 'Select', ID: 0 };
  public drpCountyList: Array<string>;
  CountyList: any;
  StateList:any;
  StateListdata:any;
  StateValFlag = false;
  submitted = false; // submitted;
  dropCkck = false; // common
  isLoading = false; // buttom loading..
  button = "Register here"; // buttom loading..
  MessageFlag: string;
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
  constructor(  private formBuilder: UntypedFormBuilder,    
    private xmodalService: NgbModal,
    private xAddUserServices: AddUserServices,
    private xIplRegisterService:IplRegisterService,
    private authService: AuthService,) { 
      this.GetDropDowndata()
    }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      FirstName: ["", Validators.required],
      LastName: ["", Validators.required],
      EmailVal: ["", [Validators.required, Validators.email]],
      LoginNameVal: ["", Validators.required],
      PasswordVal: ["", [Validators.required, Validators.pattern(this.pattern), Validators.minLength(6),]],
      desaddress: ["", Validators.required],
      descity: ["", Validators.required],
      desstate: ["", Validators.required],
      descounty: ["", Validators.nullValidator],
      deszip: ["", Validators.required],
      companyval: ["", Validators.nullValidator],
      confirmpass: ["", Validators.required],
      IPLCompany: ["", Validators.required],
      IPLMobile: ["", Validators.nullValidator],
      IPLPhone: ["", Validators.nullValidator],
      IPLaddress: ["", Validators.required],
      IPLcity: ["", Validators.required],
      IPLstate: ["", Validators.required],
      IPLcount: ["", Validators.nullValidator],
      IPLPin: ["", Validators.required],
      IPLEmail: ["", Validators.nullValidator],
      IPLCompanyLink: ["", Validators.nullValidator],
      PhoneVal: ["", Validators.nullValidator],
    },
    {
      validator: this.MustMatch("PasswordVal", "confirmpass")
  });
  }

  get fx() {
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
  FormButton(){
    //debugger
    this.submitted = true;
    this.dropCkck = false;
    this.StateValFlag = false;
    if( this.IplRegisterModelObj.IPL_Company_State == "")
    {
      this.StateValFlag = true;
      this.dropCkck = true;
    }else{
     
    }
    if (this.dropCkck) {
      return;
    }
    if (this.formUsrCommonGroup.invalid) {
      this.isLoading=false
      return;
    }
    this.isLoading = true;
    this.button = "Processing";
    //this.testToken();
this.xIplRegisterService.UserRegisterPost(this.IplRegisterModelObj).subscribe(res =>{
  //console.log(res)
  if (res.length != 0) {
    this.isLoading = false;
    this.button = "Register here";
    this.MessageFlag = 'User Register Successfully..'
    this.commonMessage()
    this.clearForm();
  }

})
  }
  copyAddress(arg){
    //debugger
    if (arg) {
      this.IplRegisterModelObj.IPL_Company_Name =  this.IplRegisterModelObj.User_CompanyName;
      this.IplRegisterModelObj.IPL_Company_Address =this.IplRegisterModelObj.User_Address;
      this.IplRegisterModelObj.IPL_Company_City = this.IplRegisterModelObj.User_City;
      this.IplRegisterModelObj.IPL_Company_State = this.IplRegisterModelObj.User_State;
      this.IplRegisterModelObj.IPL_Company_County = this.IplRegisterModelObj.IPL_County;
      this.IplRegisterModelObj.IPL_Company_PinCode = this.IplRegisterModelObj.User_Zip;
    }
    else{
      this.IplRegisterModelObj.IPL_Company_Name =  '';
      this.IplRegisterModelObj.IPL_Company_Address ='';
      this.IplRegisterModelObj.IPL_Company_City = '';
      this.IplRegisterModelObj.IPL_Company_State ='';
      this.IplRegisterModelObj.IPL_Company_County = '';
      this.IplRegisterModelObj.IPL_Company_PinCode = '';
    }

  }
  GetDropDowndata() {
    //debugger
    this.xIplRegisterService
      .DropdownGet()
      .subscribe(response => {
        //debugger
        this.StateList = response[0];
        this.StateListdata = response[0];
        //console.log(this.StateList)
      })
    }

    statehandleFilter(value) {
      if (value!='') {
        var filtereddata = this.StateListdata.filter(function (el) {
          return el.IPL_StateName != null;
        });
        this.StateList = filtereddata.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
     else{
      this.StateList = this.StateListdata.slice();
     }
    }

    selectChangeHandler(event){
      //debugger
      if (event > 0) {
      this.RegisterStateObj.IPL_StateID = event;
      this.xIplRegisterService.UserregisterCountyDetails(this.RegisterStateObj).subscribe(response => {
        //console.log('bg',response);
         this.CountyList = response[0];
         this.drpCountyList = response[0];
      }); 
      }
 
     
    }
    CountyFilter(value) {
      //dfebugger;
      //console.log(value)
      if (value!='') {
        this.drpCountyList = this.CountyList.filter((s) => s.COUNTY.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
     else{
      this.drpCountyList = this.CountyList.slice();
     }
    }
    State_Method() {
      this.StateValFlag = false;
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
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => { });
    }
   clearForm(){
      this.formUsrCommonGroup.reset();
  }
  
}
