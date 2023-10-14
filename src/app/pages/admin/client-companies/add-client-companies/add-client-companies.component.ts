import { Component, Injectable, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';

import { AddClientCompaniesModel } from "./add-client-companies-model";
import { AddClientCompaniesServices } from "./add-client-companies.service";
import { AddClientCompaniesStateMultipleModel } from "./add-client-companies-model";
import { ClientContactList } from "./add-client-companies-model";
import { WorkOrderDrodownServices } from "../../../services/common-drop-down/drop-down.service";
import { ViewClientCompaniesServices } from "../view-client-companies/view-client-companies.service";
import { filterMasterModel } from "../view-client-companies/view-client-companies-model";
import { EncrDecrService } from "../../../../services/util/encr-decr.service";
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';

@Component({
  templateUrl: "./add-client-companies.component.html"
})

export class AddClientCompaniesComponent implements OnInit {
  public defaultStateItem: { IPL_StateName: string, IPL_StateID: number } = { IPL_StateName: 'Select', IPL_StateID: 0 };
  submitted = false; // submitted;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  ContactBtn = "Save Contact";
  MessageFlag: string; // custom msg sathi
  // only drop down
  dropCkck = false; // common
  ActiveValFlag = false;
  FormArrayVal = [];
  MultipleContact = [];
  StateValFlag = false;
  Contactlist: any;
  AddClientCompaniesModelObj: AddClientCompaniesModel = new AddClientCompaniesModel();
  AddClientCompaniesStateMultipleModelobj: AddClientCompaniesStateMultipleModel = new AddClientCompaniesStateMultipleModel();
  ClientContactListObj: ClientContactList = new ClientContactList();
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  formUsrCommonGroup: UntypedFormGroup; // create obj
  YESNOList: any;
  DateTimeList: any;
  CheckInProvider: any;
  StateArray: any;
  BackgroundArry: any;
  drpStateList: any;
  ListClientContact: [ClientContactList];
  newForm:Boolean
  isHelpActive = false;
  ImageSizeArray: any;
  constructor(
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xRoute: ActivatedRoute,
    private xAddClientCompaniesServices: AddClientCompaniesServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private EncrDecr: EncrDecrService,
    private xViewClientCompaniesServices: ViewClientCompaniesServices
  ) {
    this.YESNOList = [{ Id: 1, Name: "YES" }, { Id: 2, Name: "NO" }];
    (this.DateTimeList = [
      { Id: 1, Name: "Do Not Print" },
      { Id: 2, Name: "Date/Time Ex. 1/23/2015 1:01 pm" },
      { Id: 3, Name: "Date Ex. 1/23/2015 1:01 pm" }
    ]),
      { Id: 4, Name: "Time Ex. 1:01 pm" };
    this.CheckInProvider = [
      { Id: 1, Name: "Aspen Grove Solutions" },
      { Id: 2, Name: "ServiceLink" }
    ];
    this.BackgroundArry = [
      { Id: "1", Name: "ONE" },
      { Id: "2", Name: "TWO" },
      { Id: "3", Name: "THREE" }
    ];
    this.ImageSizeArray = [
      { Id: "640x480", Name: "640x480" },
      { Id: "320x240", Name: "320x240" },
      { Id: "1024x768", Name: "1024x768" }
    ];

    this.FormArrayVal = [{ Address: "", City: "", State: "0", Zip: null }];

    this.Contactlist = [
      { heading: "Billing Dept" },
      { heading: "Tech Support" },
      { heading: "Region Coordinator" },
      { heading: "Supervisor" },
      { heading: "Manager" }
    ];

    this.GetStateDropDown();
  }

  ngOnInit() {
     var params = this.xRoute.snapshot.paramMap
     if(params)
    this.formUsrCommonGroup = this.formBuilder.group({
      CompanyNameVal: ["", Validators.required],
      disbledFaltu23: ["",[Validators.required, Validators.email]],
      ActiveVal: ["", Validators.nullValidator],
      disbledFaltu: ["", Validators.required],
      disbledFaltu1: ["", Validators.required],
      disbledFaltu2: ["", Validators.nullValidator],
      disbledFaltu3: ["", Validators.required],
      disbledFaltu4: ["", Validators.nullValidator],
      disbledFaltu5: ["", Validators.nullValidator],
      disbledFaltu6: ["", Validators.nullValidator],
      disbledFaltu7: ["", Validators.nullValidator],
      disbledFaltu8: ["", Validators.nullValidator],
      disbledFaltu9: ["", Validators.nullValidator],
      disbledFaltu10: ["", Validators.nullValidator],
      disbledFaltu11: ["", Validators.nullValidator],
      disbledFaltu12: ["", Validators.nullValidator],
      disbledFaltu13: ["", Validators.nullValidator],
      disbledFaltu14: ["", Validators.nullValidator],
      disbledFaltu15: ["", Validators.nullValidator],
      disbledFaltu16: ["", Validators.nullValidator],
      disbledFaltu17: ["", Validators.nullValidator],
      disbledFaltu21: ["", Validators.nullValidator],
      disbledFaltu22: ["", Validators.nullValidator],
      disbledFaltu24: ["", Validators.nullValidator],
      disbledFaltu25: ["", Validators.nullValidator],
    });

    // becoz instance create nahi hot
    this.getModelData();
  }
  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  // submit form
  FormButton() {
     debugger
    this.submitted = true;
    // only drop down
    this.dropCkck = false;
    this.StateValFlag = false;
    if (this.AddClientCompaniesModelObj.Client_Active == false) {
      this.ActiveValFlag = true;
      this.dropCkck = true;
    }
    if(this.AddClientCompaniesModelObj.Client_StateId==0)
    {
        this.StateValFlag = true;
        this.dropCkck = true;
    }
    else{

    }

    if (this.dropCkck) {
      return;
    }
    // stop here if form is invalid
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.AddMoreRowContact(); // for form when list edit or some value rahlili
    this.isLoading = true;
    this.button = "Processing";
    this.AddClientCompaniesModelObj.ClientContactList = this.MultipleContact;
    if(this.AddClientCompaniesModelObj.Client_Photo_Resize_HeightWidth!=null ||this.AddClientCompaniesModelObj.Client_Photo_Resize_HeightWidth!="")
    {
      var imagePixelSplit=this.AddClientCompaniesModelObj.Client_Photo_Resize_HeightWidth.split('x');
      this.AddClientCompaniesModelObj.Client_Photo_Resize_width=parseInt(imagePixelSplit[0])
      this.AddClientCompaniesModelObj.Client_Photo_Resize_height=parseInt(imagePixelSplit[1])
    }

    if(!this.AddClientCompaniesModelObj.Client_Lock_Order)
    {
      this.AddClientCompaniesModelObj.Client_Lock_Order_Reason="";
    }

    this.xAddClientCompaniesServices
      .AddClientCompaniesPost(this.AddClientCompaniesModelObj)
      .subscribe(response => {
        //debugger
        //console.log('client record',response)
        if (response[0].length != 0) {
          if (response[0].Status != "0") {
            this.AddClientCompaniesModelObj.Client_pkeyID = parseInt(
              response[0].Client_pkeyID
            );

            this.MessageFlag = "Client Data Saved...!";
            this.isLoading = false;
            this.button = "update";
            this.filterMasterModelObj.Client_pkeyID = this.AddClientCompaniesModelObj.Client_pkeyID;

            this.commonMessage();
            this.GetSingleData(); // verify plz
          }
          else{
            this.MessageFlag = "Client Record Allready Exist";
            this.commonMessage();
            this.isLoading = false;
            this.button = "Save";
          }

        }
      });
  }

  // drop down valid or not
  Active_Method() {
    this.ActiveValFlag = false;
  }

  // Insert New Row
  AddMoreRow() {
    var data = { State: "0", City: "" };
    this.FormArrayVal.push(data);
  }

  // remove row
  RemoveRow(index) {
    if (index != 0) {
      this.FormArrayVal.splice(index, 1);
    }
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  //delete this
  ADDAddClientCompaniesMutipleState() {
    this.AddClientCompaniesStateMultipleModelobj.Client_pkeyID;
    this.AddClientCompaniesStateMultipleModelobj.StrFormArrayVal = this.FormArrayVal;
    this.xAddClientCompaniesServices
      .AddClientCompaniesMutipleStatePost(
        this.AddClientCompaniesStateMultipleModelobj
      )
      .subscribe(response => {
        //console.log(response);
      });
  }

  AddMoreRowContact() {
    var data = {
      Clnt_Con_List_TypeName: this.AddClientCompaniesModelObj.Client_ContactTypex,
      Clnt_Con_List_Name: this.AddClientCompaniesModelObj.Client_ContactNamex,
      Clnt_Con_List_Email: this.AddClientCompaniesModelObj.Client_ContactEmailx,
      Clnt_Con_List_Phone: this.AddClientCompaniesModelObj.Client_ContactPhonex,
      Clnt_Con_List_IsActive: this.AddClientCompaniesModelObj.MainClnt_Con_List_Active,
      Clnt_Con_List_IsDelete: this.AddClientCompaniesModelObj.MainClnt_Con_List_IsDelete
    };

    if (this.AddClientCompaniesModelObj.Client_ContactTypex != "") {
      this.MultipleContact.push(data);
      this.ContactBtn = "Add More Contact";
    }

    this.AddClientCompaniesModelObj.Client_ContactTypex = "";
    this.AddClientCompaniesModelObj.Client_ContactNamex = "";
    this.AddClientCompaniesModelObj.Client_ContactEmailx = "";
    this.AddClientCompaniesModelObj.Client_ContactPhonex = "";
    this.AddClientCompaniesModelObj.MainClnt_Con_List_IsDelete = false;
    this.AddClientCompaniesModelObj.MainClnt_Con_List_Active = true;
  }

  EditRow(index) {
    this.AddClientCompaniesModelObj.Client_ContactTypex = this.MultipleContact[index].Clnt_Con_List_TypeName;
    this.AddClientCompaniesModelObj.Client_ContactNamex = this.MultipleContact[index].Clnt_Con_List_Name;
    this.AddClientCompaniesModelObj.Client_ContactEmailx = this.MultipleContact[index].Clnt_Con_List_Email;
    this.AddClientCompaniesModelObj.Client_ContactPhonex = this.MultipleContact[index].Clnt_Con_List_Phone;
    this.AddClientCompaniesModelObj.MainClnt_Con_List_IsDelete = this.MultipleContact[index].Clnt_Con_List_IsDelete;
    this.AddClientCompaniesModelObj.MainClnt_Con_List_Active = this.MultipleContact[index].Clnt_Con_List_IsActive;
    this.MultipleContact.splice(index, 1);
    this.ContactBtn = "Save Contact";
  }

  WorkOrderObj: any;
  IsEditDisable = false;

  getModelData() {
    const id1 = this.xRoute.snapshot.params['new'];
    if (id1 == 'new') {
      this.AddClientCompaniesModelObj = new AddClientCompaniesModel();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.WorkOrderObj = parseInt(id);
      this.AddClientCompaniesModelObj.Client_pkeyID = this.WorkOrderObj;
      this.filterMasterModelObj.Client_pkeyID = this.WorkOrderObj;

      this.GetSingleData();

      this.formUsrCommonGroup.disable();
      this.IsEditDisable = true;
      this.button = "Update";
      this.AddClientCompaniesModelObj.Type = 2;
    }
  }


  EditForms() {
    this.IsEditDisable = false;
    this.formUsrCommonGroup.enable();
  }

  GetStateDropDown() {
    this.xWorkOrderDrodownServices.StateDropDownData().subscribe(response => {
      this.StateArray = response[0];
      this.drpStateList = this.StateArray;
    });
  }

  //get single data
  GetSingleData() {
    // debugger
    this.filterMasterModelObj.Type = 2;
    this.filterMasterModelObj.Single = true;
    this.filterMasterModelObj.Client_pkeyID = this.WorkOrderObj;
    this.xViewClientCompaniesServices
      .ClientComapnyViewData(this.filterMasterModelObj)
      .subscribe(response => {
        // debugger
        this.AddClientCompaniesModelObj.Client_pkeyID = response[0][0].Client_pkeyID;
        this.AddClientCompaniesModelObj.Client_Company_Name = response[0][0].Client_Company_Name;
        this.AddClientCompaniesModelObj.Client_Billing_Address = response[0][0].Client_Billing_Address;
        this.AddClientCompaniesModelObj.Client_StateId = response[0][0].Client_StateId;
        this.AddClientCompaniesModelObj.Client_City = response[0][0].Client_City;
        this.AddClientCompaniesModelObj.Client_ZipCode = response[0][0].Client_ZipCode;
        this.AddClientCompaniesModelObj.Client_Website_Link = response[0][0].Client_Website_Link;
        if(response[0][0].Client_IsActive!=null)
        {
          this.AddClientCompaniesModelObj.Client_Active = response[0][0].Client_IsActive;
        }
        else{
          this.AddClientCompaniesModelObj.Client_Active = false;
        }
        this.AddClientCompaniesModelObj.Client_Discount = response[0][0].Client_Discount.toFixed(2);
        this.AddClientCompaniesModelObj.Client_Contractor_Discount = response[0][0].Client_Contractor_Discount.toFixed(2);
        this.AddClientCompaniesModelObj.Client_Photo_Resize_height = response[0][0].Client_Photo_Resize_height;
        this.AddClientCompaniesModelObj.Client_Photo_Resize_width = response[0][0].Client_Photo_Resize_width;
        this.AddClientCompaniesModelObj.Client_IPL_Mobile = response[0][0].Client_IPL_Mobile;
        this.AddClientCompaniesModelObj.Client_BackgroundProvider = response[0][0].Client_BackgroundProvider;
        this.AddClientCompaniesModelObj.Client_Lock_Order = response[0][0].Client_Lock_Order;
        this.AddClientCompaniesModelObj.Client_Lock_Order_Reason = response[0][0].Client_Lock_Order_Reason;
        this.AddClientCompaniesModelObj.Client_Comments = response[0][0].Client_Comments;
        this.AddClientCompaniesModelObj.Client_IsDelete = response[0][0].Client_IsDelete;
        //this.AddClientCompaniesModelObj.Client_Active = response[0][0].Client_IsActive;

        this.AddClientCompaniesModelObj.Client_ContactEmail = response[0][0].Client_ContactEmail;
        this.AddClientCompaniesModelObj.Client_ContactName = response[0][0].Client_ContactName;
        this.AddClientCompaniesModelObj.Client_ContactPhone = response[0][0].Client_ContactPhone;
        this.AddClientCompaniesModelObj.Client_IsDeleteAllow = response[0][0].Client_IsDeleteAllow;
        this.MultipleContact = response[1];
        this.AddClientCompaniesModelObj.Client_DateTimeOverlay = response[0][0].Client_DateTimeOverlay;
        this.AddClientCompaniesModelObj.Client_Photo_Resize_HeightWidth = response[0][0].Client_Photo_Resize_width +"x"+response[0][0].Client_Photo_Resize_height;

      });
  }
  statehandleFilter(value) {

    if (value!='') {
      var filtereddata = this.StateArray.filter(function (el) {
        return el.IPL_StateName != null;
      });
      this.drpStateList = filtereddata.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpStateList = this.StateArray.slice();
   }
  }

  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^\d*\.?\d*$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessage();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessage();
    }
  }

  DispalyInfo(event: Event, lblName)
  {
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessage();
    }
  }

  State_Method() {
    this.StateValFlag = false;
  }

  selectChangeHandler(event){
    // debugger
    if (event > 0) {
      this.StateValFlag = false
      //console.log('county',event);
    // this.ContractorMapStateObj.IPL_StateID = event;
    // this.xAddUserServices.UserCountyDetails(this.ContractorMapStateObj).subscribe(response => {
    //   //console.log('bg',response);
    //    this.CountyList = response[0];
    //    this.drpCountyList = response[0];
    //});
    }
    else{
      this.StateValFlag = true;
    }

  }
}
