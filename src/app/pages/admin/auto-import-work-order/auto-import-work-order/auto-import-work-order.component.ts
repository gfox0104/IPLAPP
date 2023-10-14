import { Component, OnInit, SimpleChanges } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AutoImportWorkorderModel } from './auto-import-work-order-model';
import { AutoImportWorkOrderService } from './auto-import-work-order.service';
import { ViewAutoImportWoService } from '../view-import-work-order/view-import-work-order.service';
import { WorkOrderDrodownServices } from "src/app/services/util/dropdown.service";
import { IplAppModalContent } from '../../../../components';
import { FormFields } from '../constants';
import { ImportWorkOrderQueueDetailServices } from "src/app/pages/work-order/work-order-queue/auto-import-order/auto-import-order.service";
import { FormFieldsone } from "../constants/form-fields";
import  _ from 'underscore';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { viewAutoImportWorkorderModel } from "../view-import-work-order/view-import-work-order-model";
// import { DropdownModel } from 'src/app/pages/models/dropdown-model'
import { DropdownModel } from '../../../models/dropdown-model';







@Component({
  templateUrl: "./auto-import-work-order.component.html"
})
export class AutoImportWorkOrderComponent implements OnInit {

  AutoImportWorkorderModelObj: AutoImportWorkorderModel = new AutoImportWorkorderModel();
  viewAutoImportWorkorderModelObj:viewAutoImportWorkorderModel = new viewAutoImportWorkorderModel();
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  importvalFlag = false;
  submitted = false;
  formUsrCommonGroup: UntypedFormGroup;
  formFields = FormFields;
  formFieldsone = FormFieldsone
  ModelObj: any;
  IsEditDisable = false;
  tabhide:true;
  dropCkck: boolean = true;
  button: string;
  isLoading: boolean = false;
  IsComDisable = false;
  MessageFlag: string;
  isHelpActive = false;
  NewOrderAlertList: any;
  dropdownNewOrderAlert = {};
  ChangedOrderAlert : any;
  dropdownChangedOrderAlert = {};
  CancelledOrderAlert : any;
  dropdownCancelledOrderAlert = {};
  formArrayVal = [];
  public drpCoordinatorList: Array<string>;
  public drpProcessorList: Array<string>;
  public drpComList: Array<string>;
  public drpCatList: Array<string>;
  public drpStateList: Array<string>;
  public defaultComItem: { Client_Company_Name: string, Client_pkeyID: number} = { Client_Company_Name: 'Select', Client_pkeyID: 0};
  public defaultCatItem: { Cat_Name: string, Cat_ID: number} = { Cat_Name: 'Select', Cat_ID: 0};
  public defaultConItem: { User_FirstName: string, User_pkeyID: number} = { User_FirstName: 'Select', User_pkeyID: 0};
  public defaultStateItem: { IPL_StateName: string, IPL_StateID: number} = { IPL_StateName: 'Select', IPL_StateID: 0};
  constructor(
    private router: Router,
    private xRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private xAutoImportWorkOrderService: AutoImportWorkOrderService,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xViewAutoImportWoService: ViewAutoImportWoService,
    private xImportWorkOrderQueueDetailServices: ImportWorkOrderQueueDetailServices

  ) {
    this.formArrayVal = [
      {
        WI_AlertEmail: [],
        WI_Changed_Order_Alert: [],
        WI_Cancelled_Order_Alert: [],
      }

    ];
    // console.log('formArrayVal',this.formArrayVal)

    this.GetCompanyDropDown();
  }

  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      Importval: ["", Validators.required],
      clientcompanyval: ["", Validators.required],
      LoginName: ["", Validators.required],
      Password: ["", Validators.required],
      activeatou: ["", Validators.required],
      alertemail: ["", Validators.nullValidator],
      friendlyname: ["", Validators.required],
      skipcomments: ["", Validators.nullValidator],
      skipline: ["", Validators.nullValidator],
      setcategory: ["", Validators.required],
      statefilter: ["", Validators.nullValidator],
      thisimport: ["", Validators.nullValidator],
      clientcoordival: ["", Validators.required],
      clientprocval: ["", Validators.required],
      accessusername: ["", Validators.nullValidator],
      AccessPassword: ["", Validators.nullValidator],
      ResCode: ["", Validators.nullValidator],
      CancelledOrderAlert:["",Validators.nullValidator],
      ChangedOrderAlert:["",Validators.nullValidator]
    });

    this.getModelData();

  //    // this setting for multiple drop down select values New Order Alert 
   this.dropdownNewOrderAlert = {
    singleSelection: false,
    idField: "User_pkeyID",
    textField: "User_FirstName",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  // this setting for multiple drop down select values Changed Order Alert 
  this.dropdownChangedOrderAlert = {
    singleSelection: false,
    idField: "User_pkeyID",
    textField: "User_FirstName",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  
  // // this setting for multiple drop down select values Changed Order Alert
  this.dropdownCancelledOrderAlert = {
    singleSelection: false,
    idField: "User_pkeyID",
    textField: "User_FirstName",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  }

  AddMoreRowDocument() {
    var data = {
      WI_AlertEmail: [],
      WI_Changed_Order_Alert: [],
      WI_Cancelled_Order_Alert: [],
    };
    this.formArrayVal.push(data);
    // console.log('formArrayVal',this.formArrayVal)
    
  }
  onItemSelect(item: any) {
    // //console.log(item);
  }
  onSelectAll(items: any) {
    // //console.log(items);
  }

  formButton() {
    // debugger;
    this.submitted = true;
    this.formFields.forEach(field => {
      if (field.type === 'select' && this.AutoImportWorkorderModelObj[field.model] === 0 && field.required) {
        field.flag = true;
      }
      if (field.type === 'kendo select' && this.AutoImportWorkorderModelObj[field.model] === 0 && field.required) {
        field.flag = true;
      }
    });

    if (this.formUsrCommonGroup.invalid || this.dropCkck) {
      return;
    }

    

    this.isLoading = true;
    this.button = "Processing";
    this.AutoImportWorkorderModelObj.EmailAutoAssign = this.formArrayVal;
    this.AutoImportWorkorderModelObj.WI_AlertEmail = JSON.stringify(this.AutoImportWorkorderModelObj.WI_AlertEmail);
    this.AutoImportWorkorderModelObj.WI_Changed_Order_Alert = JSON.stringify(this.AutoImportWorkorderModelObj.WI_Changed_Order_Alert);
    this.AutoImportWorkorderModelObj.WI_Cancelled_Order_Alert = JSON.stringify(this.AutoImportWorkorderModelObj.WI_Cancelled_Order_Alert);
    // console.log('hi',this.AutoImportWorkorderModelObj)
    
    this.GetModel = this.xImportWorkOrderQueueDetailServices.getDataItem();
    this.submitted = false;
    
    this.xAutoImportWorkOrderService
      .AutoImportWorkOrderPost(this.AutoImportWorkorderModelObj)
      
      .subscribe(response => {
        // console.log('hi',response)
        ////debugger;
        this.isLoading = false;
        this.button = " Save";
        if (response[0].Status != "0") {
          this.AutoImportWorkorderModelObj.WI_Pkey_ID = parseInt(response[0].WI_Pkey_ID);
          this.submitted = true;
          this.MessageFlag = "Auto ImportWorkOrder Data Saved...!";
          this.commonMessage();
          this.clickBack();
        }
        else {
          this.MessageFlag = "This Record Already Exist...!";
          this.commonMessage();
          this.clickBack();
        }

        // this.formArrayVal = [
        //   {
        //     WI_AlertEmail: [],
        //     WI_Changed_Order_Alert: [],
        //     WI_Cancelled_Order_Alert: [],
        //   }
        // ];
      });
  }
  DrdChange(item){
    //dfebugger
    if (this.AutoImportWorkorderModelObj[item.model] === '0' && item.required) {
      item.flag = true;
    } else {
      item.flag = false;
    }

    let temp = 0;
    this.formFields.forEach(field => {
      if (field.type === 'select' && field.required && (this.AutoImportWorkorderModelObj[field.model] === 0 || this.AutoImportWorkorderModelObj[field.model] === '0')) {
        temp++;
      }
    });

    this.dropCkck = temp > 0 ? true : false;

    if (this.AutoImportWorkorderModelObj.WI_ImportFrom == 4 ) {
      this.formFields = this.formFieldsone;

      var selectedCom = _.where(this.formFields[1].data, {Client_Company_Name: 'Five Brothers'});
          if (selectedCom.length > 0) {
            this.AutoImportWorkorderModelObj.WI_SetClientCompany = selectedCom[0].Client_pkeyID;
            this.IsComDisable = true;
          }
    }
    else if (this.AutoImportWorkorderModelObj.WI_ImportFrom == 3 ) {
      this.formFields = FormFields;
      var selectedCom = _.where(this.formFields[1].data, {Client_Company_Name: 'MSI'});
          if (selectedCom.length > 0) {
            this.AutoImportWorkorderModelObj.WI_SetClientCompany = selectedCom[0].Client_pkeyID;
            this.IsComDisable = true;
          }
    }
    else{
      this.formFields = FormFields;
     // this.AutoImportWorkorderModelObj.WI_SetClientCompany = 0;
      this.IsComDisable = false;
    }
  }
  editForms() {
    this.formUsrCommonGroup.enable();
    this.IsEditDisable = false;
  }

  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  GetCompanyDropDown() {

    this._drpdownmodelObj.Type=3;  //change sandip
    this._drpdownmodelObj.PageID=5; //change by sandip

    this.xWorkOrderDrodownServices
    .DropdownGetWorkOrder(this._drpdownmodelObj)
    
    .subscribe(response => {
      // console.log('drdlst sandip',response)
      this.formFields[0].data = response[0];//response[12];
      this.formFields[1].data = response[1];//response[0];
      this.formFields[10].data = response[2]//response[2];
      this.formFields[7].data = response[3]//response[15];
      this.formFields[8].data = response[4];//response[16];
      this.formFields[11].data = response[5]//response[6];
      //
      this.formFieldsone[0].data = response[0];//response[12];
      this.formFieldsone[1].data = response[1];//response[0];
      this.formFieldsone[12].data = response[2]//response[2];
      this.formFieldsone[9].data = response[3]//response[15];
      this.formFieldsone[10].data =response[4];//response[16];
      this.formFieldsone[13].data =response[5]//response[6];

      this.drpComList = response[1];//response[0];
      this.drpCatList = response[2]//response[2];
      this.drpCoordinatorList = response[3]//response[15];
      this.drpProcessorList = response[4];//response[16];
      this.drpStateList = response[5]//response[6];
      this.CancelledOrderAlert = response[6];

    });
  }
  WorkOrderObj: any;

  getModelData() {
    ////debugger;
        this.formFields.forEach(field => {
      field.flag = false;
    });
    const id1 = this.xRoute.snapshot.params['new'];
    if (id1 == 'new') {
      this.button = " Save";
      this.AutoImportWorkorderModelObj = new AutoImportWorkorderModel();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.WorkOrderObj = parseInt(id);
      this.AutoImportWorkorderModelObj.WI_Pkey_ID = this.WorkOrderObj;

      this.GetSingleData();

      this.formUsrCommonGroup.disable();
      this.IsEditDisable = true;
      this.button = "Update";
      this.AutoImportWorkorderModelObj.Type = 2;
    }
  }
  GetSingleData() {
    
    this.viewAutoImportWorkorderModelObj.Type = 7;

    this.viewAutoImportWorkorderModelObj.WI_Pkey_ID = this.WorkOrderObj;
    this.xViewAutoImportWoService
      .ViewAutoImportData(this.viewAutoImportWorkorderModelObj)
      .subscribe(response => {
        // this.formArrayVal = response [0]
        // console.log('sandip',response)
             this.AutoImportWorkorderModelObj.WI_Pkey_ID = response[0][0].UserID;
      this.AutoImportWorkorderModelObj.WI_ImportFrom = response[0][0].WI_ImportFrom;
      this.AutoImportWorkorderModelObj.WI_SetClientCompany = response[0][0].WI_SetClientCompany;
      this.AutoImportWorkorderModelObj.WI_LoginName =  response[0][0].WI_LoginName;
      this.AutoImportWorkorderModelObj.WI_Password =  response[0][0].WI_Password;
     
      this.AutoImportWorkorderModelObj.WI_FriendlyName =  response[0][0].WI_FriendlyName;
      this.AutoImportWorkorderModelObj.WI_SkipComments =  response[0][0].WI_SkipComments;
      this.AutoImportWorkorderModelObj.WI_SkipLineItems =  response[0][0].WI_SkipLineItems;
      this.AutoImportWorkorderModelObj.WI_SetCategory =  response[0][0].WI_SetCategory;
      this.AutoImportWorkorderModelObj.WI_StateFilter =  response[0][0].WI_StateFilter;
      this.AutoImportWorkorderModelObj.WI_Discount_Import =  response[0][0].WI_Discount_Import.toFixed(2);
      this.AutoImportWorkorderModelObj.WI_IsActive = response[0][0].WI_IsActive;
      this.AutoImportWorkorderModelObj.WI_Pkey_ID =  response[0][0].WI_Pkey_ID;
      this.AutoImportWorkorderModelObj.WI_Processor =  response[0][0].WI_Processor;
      this.AutoImportWorkorderModelObj.WI_Coordinator =  response[0][0].WI_Coordinator;
      this.AutoImportWorkorderModelObj.WI_Access_UserName =  response[0][0].WI_FB_LoginName;
      this.AutoImportWorkorderModelObj.WI_Access_Password =  response[0][0].WI_FB_Password;
      this.AutoImportWorkorderModelObj.WI_Res_Code =  response[0][0].WI_Res_Code;
      if (response[0][0].WI_AlertEmail != null && response[0][0].WI_AlertEmail != '')
      {
        this.AutoImportWorkorderModelObj.WI_AlertEmail =  JSON.parse(response[0][0].WI_AlertEmail);
      }    
      if (response[0][0].WI_Changed_Order_Alert != null && response[0][0].WI_Changed_Order_Alert != '')
      {
        this.AutoImportWorkorderModelObj.WI_Changed_Order_Alert = JSON.parse(response[0][0].WI_Changed_Order_Alert);
      }  
      if (response[0][0].WI_Cancelled_Order_Alert != null && response[0][0].WI_Cancelled_Order_Alert != '')
      {
        this.AutoImportWorkorderModelObj.WI_Cancelled_Order_Alert = JSON.parse(response[0][0].WI_Cancelled_Order_Alert);
      }  
    
      this.formUsrCommonGroup.disable();
      this.IsEditDisable = true;
      this.AutoImportWorkorderModelObj.Type = 2;
      this.button = " Update";
      if (this.AutoImportWorkorderModelObj.WI_ImportFrom == 4 ) {
        this.formFields = this.formFieldsone;
      }
      else{
        this.formFields = FormFields;
      }
      let temp = 0;
      this.formFields.forEach(field => {
        if (field.type === 'select' && field.required) {
          temp++;
        }
    });


    this.dropCkck = (this.formFields.filter(item => item.type === 'select').length === 0 || temp === 0) || this.IsEditDisable ? false : true;
    this.xViewAutoImportWoService.setPathParam(undefined);


  

  })
}

  Import_form_Method() {
    this.importvalFlag = false;
  }
  clientcompany_Method() {
    this.importvalFlag = false;
  }
  clientcategory_Method() {
    this.importvalFlag = false;
  }
  GetModel: any;
  clickBack() {
    this.GetModel = this.xImportWorkOrderQueueDetailServices.getDataItem();
    if (this.GetModel == 'auto') {
      this.xImportWorkOrderQueueDetailServices.saveDataItem('null');
      this.router.navigate(['/workorder/queueworkorder/importqueuedata']);

    }
    else{
      this.router.navigate(['/home/autoimport/viewautoimport'])
    }

  }
  companyFilter(value) {
    var filteredcom = this.formFields[1].data.filter(function (el) {
      return el.Client_Company_Name != null;
    });
    if (value!='') {
      this.drpComList = filteredcom.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpComList = this.formFields[1].data.slice();
   }
  }
  coordinatorFilter(value) {
    if (value!='') {
      this.drpCoordinatorList = this.formFields[7].data.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpCoordinatorList = this.formFields[7].data.slice();
   }
  }
  processorFilter(value) {
    if (value!='') {
      this.drpProcessorList = this.formFields[8].data.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpProcessorList = this.formFields[8].data.slice();
   }
  }
  CatFilter(value) {
    //dfebugger;
    var filteredwt = this.formFields[10].data.filter(function (el) {
      return el.Cat_Name != null;
    });
    if (value!='') {
      this.drpCatList = filteredwt.filter((s) => s.Cat_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpCatList = this.formFields[10].data.slice();
   }
  }
  statehandleFilter(value) {
    if (value!='') {
      var filtereddata = this.formFields[11].data.filter(function (el) {
        return el.IPL_StateName != null;
      });
      this.drpStateList = filtereddata.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.drpStateList = this.formFields[11].data.slice();
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
  fieldTextType: any;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  

 
}
