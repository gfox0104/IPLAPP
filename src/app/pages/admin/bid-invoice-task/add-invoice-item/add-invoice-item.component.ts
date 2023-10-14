import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddInvoiceItemsModel, StateDetail, TaskDocDetail, TaskPhotoSettingsVm } from "./add-invoice-item-model";
import { WorkOrderDrodownServices } from "../../../services/common-drop-down/drop-down.service";
// import { MasterlayoutComponent } from "../../../Home/MasterComponent";
import { BidInvoiceItemServices } from "../bid-invoice-item/bid-invoice-item.service";
import { BidInvoiceItemModel, Task_GroupPopupModel } from "../bid-invoice-item/bid-invoice-item-model";
import { AddInvoiceItemsServices } from "./add-invoice-item.service";
import { BidInvoiceItemViewTaskServices } from '../bid-invoice-task.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { ClientResultOldPhotoServices } from '../../../client-result/client-result-photo/client-result-photo-old.service';
import { ClientResultPhotoModel } from '../../../client-result/client-result-photo/client-result-photo-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { BindDataModel } from '../../../client-result/client-result/client-result-model';
import { SigleEditBoxModel, ClientResultInstructionModel } from '../../../client-result/client-result-instruction/client-result-instruction-model';
import { ClientResultInstructionServices } from '../../../client-result/client-result-instruction/client-result-instruction.service';
import * as $ from "jquery";
import  _ from 'underscore';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";

@Component({
  templateUrl: "./add-invoice-item.component.html",
  styleUrls: ['./add-invoice-item.component.scss']
})

export class AddInvoiceItemsComponent implements OnInit {
  FormArrayVal = [];
  FormArrayValDocument = [];
  StateArray: any;
  FormArrayPresetVal: any;
  ShowonBidArray: any;
  ISActiveArray: any;
  StateList: any;
  CustomerNumberList: any;
  TaskTypeList: any;
  submitted = false; // submitted;
  formUsrCommonGroup: UntypedFormGroup;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  isdisable = false;
  public contentx;
  MessageFlag: string;
  myarrray: any;
  dropCkck = false; // common dropdown
  Item_BidValFlag = false;
  Active_ValFlag = false;
  isDrpSelected = false;
  hidedaa: boolean = true;
  AddInvoiceItemsModelObj: AddInvoiceItemsModel = new AddInvoiceItemsModel();
  // this form update task settings
  BidInvoiceItemModelObj: BidInvoiceItemModel = new BidInvoiceItemModel();
  ClientResultPhotoModelObj: ClientResultPhotoModel = new ClientResultPhotoModel();
  TaskDocDetailObj:TaskDocDetail = new TaskDocDetail();
  BindDataModelObj: BindDataModel = new BindDataModel();
  SigleEditBoxModelObj: SigleEditBoxModel = new SigleEditBoxModel();
  StateDetailObj:StateDetail = new StateDetail();
  ClientResultInstructionModelObj: ClientResultInstructionModel = new ClientResultInstructionModel();

  TaskPhotoSettingsModel: TaskPhotoSettingsVm=new TaskPhotoSettingsVm();

  myFiles: string[] = [];

  private apiUrlGet = BaseUrl + "api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground"; ///api/MultiPhoto/Save
  uploadSaveUrl = ""; // should represent an actual API endpoint
  uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint
  public datacustomer: Array<string>;
  public defaultCustomer: { Cust_Num_Number: string, Cust_Num_pkeyId: number } = { Cust_Num_Number: 'Select', Cust_Num_pkeyId: 0 };
  public datacompany: Array<string>;
  public defaultCompany: { Client_Company_Name: string, Client_pkeyID: number } = { Client_Company_Name: 'Select', Client_pkeyID: 0 };
  public dataWT: Array<string>;
  public defaultWorkType: { WT_WorkType: string, WT_pkeyID: number } = { WT_WorkType: 'Select', WT_pkeyID: 0 };
  public dataWTG: Array<string>;
  public defaultWorkTypeGroup: { Work_Type_Name: string, Work_Type_Cat_pkeyID: number } = { Work_Type_Name: 'Select', Work_Type_Cat_pkeyID: 0 };
  public dataLT: Array<string>;
  public defaultLoanType: { Loan_Type: string, Loan_pkeyId: number } = { Loan_Type: 'Select', Loan_pkeyId: 0 };
  public dataS: Array<string>;
  public defaultState: { IPL_StateName: string, IPL_StateID: number } = { IPL_StateName: 'Select', IPL_StateID: 0 };
  public dataCoun: Array<string>;
  public defaultCountry: { COUNTY: string, ID: number } = { COUNTY: 'Select', ID: 0 };
  public dataCon: Array<string>;
  public defaultContractor: { User_FirstName: string, User_pkeyID: number } = { User_FirstName: 'Select', User_pkeyID: 0 };
  CustomeArrayVal = [];
  statearr= [];
  popformArray:any;
  isHelpActive = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private modalService: NgbModal,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    // private xMasterlayoutComponent: MasterlayoutComponent,
    private xBidInvoiceItemServices: BidInvoiceItemServices,
    private xRouter: Router,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xAddInvoiceItemsServices: AddInvoiceItemsServices,
    private xBidInvoiceItemViewTaskServices: BidInvoiceItemViewTaskServices,
    private xClientResultOldPhotoServices: ClientResultOldPhotoServices,
    private xClientResultInstructionServices: ClientResultInstructionServices
  ) {
    this.uploadSaveUrl = this.apiUrlGet;
    this.FormArrayVal = [
      {
        Task_sett_State: [],
        Task_sett_Country: [],
        Task_sett_Zip: null,
        Task_sett_Customer: [],
        Task_sett_Contractor: [],
        Task_sett_Company: [],
        Task_sett_Lone: [],
        Task_sett_Con_Unit_Price: 0,
        Task_sett_CLI_Unit_Price: 0,
        Task_sett_Flat_Free: false,
        Task_sett_Price_Edit: false,
        Task_Work_TypeGroup: [],
        Task_sett_IsActive: true,
        Task_sett_IsDelete: false,
        Task_sett_Disable_Default:false,
        Task_sett_WorkType: [],
        Task_sett_LOT_Min: null,
        Task_sett_LOT_Max: null,
      }
    ];
    this.CustomeArrayVal = [
      {
        Task_sett_price_State: 0,
        Task_sett_price_Country: 0,
        Task_sett_price_Zip: null,
        Task_sett_price_Customer: 0,
        Task_sett_price_Contractor: 0,
        Task_sett_price_Company: 0,
        Task_sett_price_Lone: 0,
        Task_sett_price_Con_Unit_Price: 0,
        Task_sett_price_CLI_Unit_Price: 0,
        Task_sett_price_Flat_Free: false,
        Task_sett_price_Price_Edit: false,
        Task_Work_price_TypeGroup: 0,
        Task_sett_price_IsActive: true,
        Task_sett_price_IsDelete: false,
        Task_sett_price_Disable_Default:false,
        Task_sett_price_WorkType: 0,
        Task_sett_price_LOT_Min: null,
        Task_sett_price_LOT_Max: null,
        TaskPresetDTO:null,
        Task_sett_ID:0,
        Task_sett_pkeyID:0,
        dataCoun: this.CountryList,
      }
    ];

    this.FormArrayValDocument = [
      {
        WT_Task_Company: [],
        WT_Task_State: [],
        WT_Task_Customer: [],
        WT_Task_LoneType: [],
        WT_Task_WorkType: [],
        WT_Task_WorkType_Group: [],
        WT_Task_IsActive: true,
        WT_Task_IsDelete: false
      }
    ];

    this.FormArrayPresetVal = [
      {
        Task_Preset_pkeyId: 0,
        Task_Preset_Text: "",
        Task_Preset_IsActive: true,
        Task_Preset_IsDelete: false,
        Task_Preset_IsDefault:false,
      }
    ];

    this.StateArray = [
      { Id: 1, Name: "LA" },
      { Id: 2, Name: "MO" }
    ];
    this.ShowonBidArray = [
      { Id: 1, Name: "YES" },
      { Id: 2, Name: "NO" }
    ];
    this.ISActiveArray = [
      { Id: 1, Name: "YES" },
      { Id: 2, Name: "NO" }
    ];
    this.TaskTypeList = [
      { Id: 1, Name: "Work" },
      { Id: 2, Name: "Inspection" }
    ];
  }
  dropdownList = [];

  selectedItems = [];
  dropdownSettings = {};
  dropdownSettingsState = {};
  dropdownSettingsContractor = {};
  dropdownSettingsCustomer = {};
  dropdownSettingsLoanType = {};
  dropdownSettingsCountry = {};
  dropdownSettingsWorkTypeList = {};
  dropdownSettingsWorkTypeCategory = {};

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      TaskName: ["", Validators.required],
      ContractorUnitVal: ["", Validators.required],
      ClientUnitVal: ["", Validators.required],
      TaskTypeVal: ["", Validators.nullValidator],
      TaskGroupVal: ["", Validators.nullValidator],
      TaskMeasureVal: ["", Validators.nullValidator],
      TaskLabelVal: ["", Validators.nullValidator],
      TaskCompleteVal: ["", Validators.nullValidator],
      TaskActiveVal: ["", Validators.nullValidator],
      TaskFlatFree: ["", Validators.nullValidator],
      TaskPriceEdit : ["", Validators.nullValidator],
      TaskDisableDefault: ["", Validators.nullValidator],
      TaskIsAutoAssign: ["", Validators.nullValidator],


    });
    this.GetDropDowndata();



    // this setting for multiple drop down select values
    this.dropdownSettings = {
      singleSelection: false,
      idField: "Client_pkeyID",
      textField: "Client_Company_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this setting for multiple drop down select values state
    this.dropdownSettingsState = {
      singleSelection: false,
      idField: "IPL_StateID",
      textField: "IPL_StateName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    // this setting for multiple drop down select values Contractor
    this.dropdownSettingsContractor = {
      singleSelection: false,
      idField: "User_pkeyID",
      textField: "User_FirstName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    // this setting for multiple drop down select values Customer
    this.dropdownSettingsCustomer = {
      singleSelection: false,
      idField: "Cust_Num_pkeyId",
      textField: "Cust_Num_Number",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    // this setting for multiple drop down select values Loan Type
    this.dropdownSettingsLoanType = {
      singleSelection: false,
      idField: "Loan_pkeyId",
      textField: "Loan_Type",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    // this setting for multiple drop down select values Loan Type
    this.dropdownSettingsCountry = {
      singleSelection: false,
      idField: "ID",
      textField: "COUNTY",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this setting for multiple drop down select values Loan Type
    this.dropdownSettingsWorkTypeList = {
      singleSelection: false,
      idField: "WT_pkeyID",
      textField: "WT_WorkType",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this setting for multiple drop down select values Loan Type
    this.dropdownSettingsWorkTypeCategory = {
      singleSelection: false,
      idField: "Work_Type_Cat_pkeyID",
      textField: "Work_Type_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    // //console.log(item);
  }
  onSelectAll(items: any) {
    // //console.log(items);
  }

  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  // submit form
  FormButton(content) {
    //  debugger
    this.submitted = true;

    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isdisable = false;
    this.isLoading = true;
    this.button = "Processing";

    this.contentx = content;
    this.BidInvoiceItemModelObj;
    if (this.CustomeArrayVal.length > 0) {
      for (let i = 0; this.CustomeArrayVal.length > i; i++) {
        this.FormArrayVal[i].Task_sett_Con_Unit_Price = this.CustomeArrayVal[i].Task_sett_price_Con_Unit_Price;
        this.FormArrayVal[i].Task_sett_CLI_Unit_Price = this.CustomeArrayVal[i].Task_sett_price_CLI_Unit_Price;
        this.FormArrayVal[i].Task_sett_Flat_Free = this.CustomeArrayVal[i].Task_sett_price_Flat_Free;
        this.FormArrayVal[i].Task_sett_Price_Edit = this.CustomeArrayVal[i].Task_sett_price_Price_Edit;
        this.FormArrayVal[i].Task_sett_IsActive = this.CustomeArrayVal[i].Task_sett_price_IsActive;
        this.FormArrayVal[i].Task_sett_IsDelete = this.CustomeArrayVal[i].Task_sett_price_IsDelete;
        this.FormArrayVal[i].Task_sett_Disable_Default = this.CustomeArrayVal[i].Task_sett_price_Disable_Default;
        this.FormArrayVal[i].Task_sett_LOT_Min = this.CustomeArrayVal[i].Task_sett_price_LOT_Min;
        this.FormArrayVal[i].Task_sett_LOT_Max = this.CustomeArrayVal[i].Task_sett_price_LOT_Max;
        this.FormArrayVal[i].TaskPresetDTO = this.CustomeArrayVal[i].TaskPresetDTO;
        this.FormArrayVal[i].Task_sett_ID = this.CustomeArrayVal[i].Task_sett_ID;
        this.FormArrayVal[i].Task_sett_pkeyID = this.CustomeArrayVal[i].Task_sett_pkeyID;
      }
    }
    this.AddInvoiceItemsModelObj.Task_pkeyID = this.BidInvoiceItemModelObj.Task_pkeyID;
    this.AddInvoiceItemsModelObj.ArrayCustomPriceFilter = this.FormArrayVal;
    this.AddInvoiceItemsModelObj.ArrayDocument = this.FormArrayValDocument;
    this.AddInvoiceItemsModelObj.TaskPhotoSetting = this.TaskPhotoSettingsModel;
    this.AddInvoiceItemsModelObj.ArrayPreset = this.FormArrayPresetVal;



    // only drop down
    this.dropCkck = false;

    if (this.AddInvoiceItemsModelObj.Item_Active == 0) {
      this.Active_ValFlag = true;
      this.dropCkck = true;
    }




    // care fulllllllllllllllllllllllllllllllllllllllllllllllly
    this.TaskSettingUpdateCall();

    //this. AllFilterSave();
  }
  // btn code end

  TaskSettingUpdateCall() {
    // debugger
    if (this.WorkOrderObj !== undefined) {

      this.BidInvoiceItemModelObj.Task_pkeyID = this.WorkOrderObj;

    } else {

      this.BidInvoiceItemModelObj.Task_pkeyID = 0;
    }

    this.xBidInvoiceItemServices
      .TaskMasterPost(this.BidInvoiceItemModelObj)
      .subscribe(response => {
        if (response[0].Status != "-99") {
          this.isLoading = false;
          this.isdisable = true;
          this.formUsrCommonGroup.disable();
          this.IsEditDisable = true;
          this.button = "Update";
          if (this.WorkOrderObj) {
            this.BidInvoiceItemModelObj.Task_pkeyID = parseInt(response[0].Task_pkeyID);
            this.MessageFlag = "Task Data upated...!";
            this.commonMessage(this.contentx);
            this.AllFilterSave();
          } else {
            this.MessageFlag = "Task Data saved...!";
            this.commonMessage(this.contentx);
            this.WorkOrderObj = parseInt(response[0].Task_pkeyID);
            this.GetTaskData();
            this.GetTaskGroup();
          }
        }else  {
          this.isLoading = false;
          this.button = "Save";
          this.MessageFlag = "This Record Allready Exist";
          this.commonMessage(this.contentx);
        }
      });
  }

  AllFilterSave() {
    this.AddInvoiceItemsModelObj.Task_File_Array = this.TaskDocument;
    this.xAddInvoiceItemsServices
      .FilterDataPost(this.AddInvoiceItemsModelObj)
      .subscribe(response => {
        this.GetTaskData();
        this.GetTaskGroup();
      });
  }

  // common message modal popup
  commonMessage(tent) {
    this.xmodalService
      .open(tent, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => { },
        reason => { }
      );
  }
  /// end common model

  Item_Bid_Method() {
    this.Item_BidValFlag = false;
  }
  Active_Method() {
    this.Active_ValFlag = false;
  }

  // Insert New Row
  AddMoreRow() {
    var data = {
      Task_sett_State: [],
      Task_sett_Country: [],
      Task_sett_Zip: null,
      Task_sett_Customer: [],
      Task_sett_Contractor: [],
      Task_sett_Company: [],
      Task_sett_Lone: [],
      Task_sett_Con_Unit_Price: 0,
      Task_sett_CLI_Unit_Price: 0,
      Task_sett_Flat_Free: false,
      Task_sett_Price_Edit: false,
      Task_Work_TypeGroup: [],
      Task_sett_IsActive: true,
      Task_sett_IsDelete: false,
      Task_sett_Disable_Default:false,
      Task_sett_WorkType: [],
      Task_sett_LOT_Min: 0,
      Task_sett_LOT_Max: 0,
    };
    this.FormArrayVal.push(data);
    this.AddCustomePriceRow();
  }
  AddCustomePriceRow()
  {
    var pricedata = {
      Task_sett_price_State: 0,
      Task_sett_price_Country: 0,
      Task_sett_price_Zip: null,
      Task_sett_price_Customer: 0,
      Task_sett_price_Contractor: 0,
      Task_sett_price_Company: 0,
      Task_sett_price_Lone: 0,
      Task_sett_price_Con_Unit_Price: 0,
      Task_sett_price_CLI_Unit_Price: 0,
      Task_sett_price_Flat_Free: false,
      Task_sett_price_Price_Edit: false,
      Task_Work_price_TypeGroup: 0,
      Task_sett_price_IsActive: true,
      Task_sett_price_IsDelete: false,
      Task_sett_price_Disable_Default:false,
      Task_sett_price_WorkType: 0,
      Task_sett_price_LOT_Min: 0,
      Task_sett_price_LOT_Max: 0,
      TaskPresetDTO:null,
      Task_sett_ID:0,
      Task_sett_pkeyID:0,
      dataCoun: this.CountryList,
    };
    this.CustomeArrayVal.push(pricedata);
  }


  AddMoreRowDocument() {
    var data = {
      WT_Task_Company: [],
      WT_Task_State: [],
      WT_Task_Customer: [],
      WT_Task_LoneType: [],
      WT_Task_WorkType: [],
      WT_Task_WorkType_Group: [],

      WT_Task_IsActive: true,
      WT_Task_IsDelete: false
    };
    this.FormArrayValDocument.push(data);
  }

  // remove row
  RemoveRow(itemdata, index) {
    //dfebugger;
    let promp = confirm("Are you Sure you want to  Delete this Record..?");
    if (promp) {
      if (itemdata.Task_sett_pkeyID != 0) {
        this.AddInvoiceItemsModelObj.Task_sett_pkeyID = itemdata.Task_sett_pkeyID;
        this.xAddInvoiceItemsServices
          .Deletetaskchild(this.AddInvoiceItemsModelObj)
          .subscribe(response => {
            this.getModelData();
          })
      }
      else {
        this.FormArrayVal.splice(index, 1);
        this.CustomeArrayVal.splice(index, 1);
      }
    }
  }
  RemoveRowDocument(val, index) {
    let del = confirm("Are you Sure you want to  Delete this Record..?");
    if (del) {
      if (val.WT_Task_pkeyID != 0) {
        this.AddInvoiceItemsModelObj.WT_Task_pkeyID = val.WT_Task_pkeyID;
        this.xAddInvoiceItemsServices
          .Deletetaskchilddetail(this.AddInvoiceItemsModelObj)
          .subscribe(response => {
            this.getModelData();
          })

      }
      else {
        this.FormArrayValDocument.splice(index, 1);
      }
    }
  }

  ///
  // pretext delete code
  PreTextDeleteArry = [];
  RemoveRowPreset(index, item) {
    let conf = confirm("Are you Sure you want to  Delete this Record..?");
    if (conf) {
      this.PreTextDeleteArry.push(item);
      this.FormArrayPresetVal.splice(index, 1);
      this.AddInvoiceItemsModelObj.Task_Preset_pkeyId = item.Task_Preset_pkeyId;
      this.xAddInvoiceItemsServices
        .PreTextDeleteDataPost(this.AddInvoiceItemsModelObj)
        .subscribe(response => {

        });
    }
  }
  // Insert New Row
  AddMoreRowPreset() {
    var data = {
      Task_Preset_pkeyId: 0,
      Task_Preset_Text: "",
      Task_Preset_IsActive: true,
      Task_Preset_IsDelete: false,
      Task_Preset_IsDefault:false,
    };
    this.FormArrayPresetVal.push(data);
  }

  WorkOrderObj: any;
  getModelData() {
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.BidInvoiceItemModelObj = new BidInvoiceItemModel();
      this.isdisable = true;
      this.GetTaskGroup();
    } else {
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      this.WorkOrderObj = parseInt(id);
      this.GetTaskData();
      this.GetTaskGroup();

    }
  }

  doclst: any;
  GetTaskData() {
    this.BidInvoiceItemModelObj.Task_pkeyID = this.WorkOrderObj;
    this.BidInvoiceItemModelObj.Type = 2;
    this.xBidInvoiceItemViewTaskServices
      .ViewTaskMasterData(this.BidInvoiceItemModelObj)
      .subscribe(response => {
        this.doclst = response[1];


        this.BidInvoiceItemModelObj.Task_pkeyID = response[0][0].Task_pkeyID;
        this.BidInvoiceItemModelObj.Task_Name = response[0][0].Task_Name;
        this.BidInvoiceItemModelObj.Task_Type = response[0][0].Task_Type;
        this.BidInvoiceItemModelObj.Task_Group = response[0][0].Task_Group;
        this.BidInvoiceItemModelObj.Task_Contractor_UnitPrice = response[0][0].Task_Contractor_UnitPrice.toFixed(2);
        this.BidInvoiceItemModelObj.Task_Client_UnitPrice = response[0][0].Task_Client_UnitPrice.toFixed(2);
        this.BidInvoiceItemModelObj.Task_Photo_Label_Name = response[0][0].Task_Photo_Label_Name;
        this.BidInvoiceItemModelObj.Task_UOM = response[0][0].Task_UOM;
        this.BidInvoiceItemModelObj.Task_AutoInvoiceComplete = response[0][0].Task_AutoInvoiceComplete;
        this.BidInvoiceItemModelObj.Task_IsActive = response[0][0].Task_IsActive;
        this.BidInvoiceItemModelObj.Task_Flat_Free = response[0][0].Task_Flat_Free;
        this.BidInvoiceItemModelObj.Task_Price_Edit = response[0][0].Task_Price_Edit;
        this.BidInvoiceItemModelObj.Task_Disable_Default = response[0][0].Task_Disable_Default;
        this.BidInvoiceItemModelObj.Task_Auto_Assign = response[0][0].Task_Auto_Assign;
        this.isdisable = true;
        this.formUsrCommonGroup.disable();
        this.IsEditDisable = true;
        this.button = "Update";
      });
  }

  // get work type group
  TaskGroupList: any;
  GetTaskGroup() {
    this.xBidInvoiceItemServices
      .GetTaskGroupDetailsDropdownGet()
      .subscribe(response => {
        this.TaskGroupList = response[0];
        this.popformArray = response[0];
        this.getOUMDropdown();
      });
    this.GetFilterData();
  }

  // GetUOM
  TaskUOMList: any;
  getOUMDropdown() {
    this.xWorkOrderDrodownServices.DropdownGetUOM().subscribe(response => {
      this.TaskUOMList = response[0];
    });
  }

  CleanArray = [];
  GetFilterData() {
    this.AddInvoiceItemsModelObj.Task_pkeyID = this.WorkOrderObj;
    this.xAddInvoiceItemsServices
      .FilterDataGet(this.AddInvoiceItemsModelObj)
      .subscribe(response => {
        // console.log('value',response)
        this.FormArrayVal = response[0];
        this.FormArrayValDocument = response[1];
        this.FormArrayPresetVal = response[2];
        // console.log('FormArrayPresetVal',this.FormArrayPresetVal)
        if(response[3]!=null)
        {
          this.TaskPhotoSettingsModel=response[3];
        }

        if (this.FormArrayPresetVal.length == 0) {
          this.FormArrayPresetVal = [
            {
              Task_Preset_pkeyId: 0,
              Task_Preset_Text: "",
              Task_Preset_IsActive: true,
              Task_Preset_IsDelete: false,
              Task_Preset_IsDefault:false,
            }
          ];
        }
        if (this.FormArrayVal.length > 0) {
          //dfebugger;
          this.CustomeArrayVal = [];
          for (let i = 0; this.FormArrayVal.length > i; i++) {
            this.AddCustomePriceRow();
            if (this.FormArrayVal[i].Task_sett_Company) {
              this.FormArrayVal[i].Task_sett_Company = JSON.parse(this.FormArrayVal[i].Task_sett_Company);
              this.CustomeArrayVal[i].Task_sett_price_Company = this.FormArrayVal[i].Task_sett_Company.length > 0 ? this.FormArrayVal[i].Task_sett_Company[0].Client_pkeyID : this.CustomeArrayVal[i].Task_sett_price_Company;
            }
            if (this.FormArrayVal[i].Task_sett_Contractor) {
              this.FormArrayVal[i].Task_sett_Contractor = JSON.parse(this.FormArrayVal[i].Task_sett_Contractor);
              this.CustomeArrayVal[i].Task_sett_price_Contractor = this.FormArrayVal[i].Task_sett_Contractor.length > 0 ? this.FormArrayVal[i].Task_sett_Contractor[0].User_pkeyID : this.CustomeArrayVal[i].Task_sett_price_Contractor;
            }
            if (this.FormArrayVal[i].Task_sett_Country) {
              this.FormArrayVal[i].Task_sett_Country = JSON.parse(this.FormArrayVal[i].Task_sett_Country);
              this.CustomeArrayVal[i].Task_sett_price_Country = this.FormArrayVal[i].Task_sett_Country.length > 0 ? this.FormArrayVal[i].Task_sett_Country[0].ID : this.CustomeArrayVal[i].Task_sett_price_Country;
            }

            if (this.FormArrayVal[i].Task_sett_Customer) {
              this.FormArrayVal[i].Task_sett_Customer = JSON.parse(this.FormArrayVal[i].Task_sett_Customer);
              this.CustomeArrayVal[i].Task_sett_price_Customer = this.FormArrayVal[i].Task_sett_Customer.length > 0 ? this.FormArrayVal[i].Task_sett_Customer[0].Cust_Num_pkeyId : this.CustomeArrayVal[i].Task_sett_price_Customer;
            }

            if (this.FormArrayVal[i].Task_sett_Lone) {
              this.FormArrayVal[i].Task_sett_Lone = JSON.parse(this.FormArrayVal[i].Task_sett_Lone);
              this.CustomeArrayVal[i].Task_sett_price_Lone = this.FormArrayVal[i].Task_sett_Lone.length > 0 ? this.FormArrayVal[i].Task_sett_Lone[0].Loan_pkeyId : this.CustomeArrayVal[i].Task_sett_price_Lone;
            }
            if (this.FormArrayVal[i].Task_sett_State) {
              this.FormArrayVal[i].Task_sett_State = JSON.parse(this.FormArrayVal[i].Task_sett_State);
              this.CustomeArrayVal[i].Task_sett_price_State = this.FormArrayVal[i].Task_sett_State.length > 0 ? this.FormArrayVal[i].Task_sett_State[0].IPL_StateID : this.CustomeArrayVal[i].Task_sett_price_State;
            }
            if (this.FormArrayVal[i].Task_Work_TypeGroup) {
              this.FormArrayVal[i].Task_Work_TypeGroup = JSON.parse(this.FormArrayVal[i].Task_Work_TypeGroup);
              this.CustomeArrayVal[i].Task_Work_price_TypeGroup = this.FormArrayVal[i].Task_Work_TypeGroup.length > 0 ? this.FormArrayVal[i].Task_Work_TypeGroup[0].Work_Type_Cat_pkeyID : this.CustomeArrayVal[i].Task_Work_price_TypeGroup;
            }
            if (this.FormArrayVal[i].Task_sett_WorkType) {
              this.FormArrayVal[i].Task_sett_WorkType = JSON.parse(this.FormArrayVal[i].Task_sett_WorkType);
              this.CustomeArrayVal[i].Task_sett_price_WorkType = this.FormArrayVal[i].Task_sett_WorkType.length ? this.FormArrayVal[i].Task_sett_WorkType[0].WT_pkeyID : this.CustomeArrayVal[i].Task_sett_price_WorkType;
            }
            this.CustomeArrayVal[i].Task_sett_price_Con_Unit_Price =this.FormArrayVal[i].Task_sett_Con_Unit_Price;
            this.CustomeArrayVal[i].Task_sett_price_CLI_Unit_Price = this.FormArrayVal[i].Task_sett_CLI_Unit_Price;
            this.CustomeArrayVal[i].Task_sett_price_Flat_Free=this.FormArrayVal[i].Task_sett_Flat_Free;
            this.CustomeArrayVal[i].Task_sett_price_Price_Edit=this.FormArrayVal[i].Task_sett_Price_Edit;
            this.CustomeArrayVal[i].Task_sett_price_IsActive=this.FormArrayVal[i].Task_sett_IsActive;
            this.CustomeArrayVal[i].Task_sett_price_IsDelete=this.FormArrayVal[i].Task_sett_IsDelete;
            this.CustomeArrayVal[i].Task_sett_price_Disable_Default=this.FormArrayVal[i].Task_sett_Disable_Default;
            this.CustomeArrayVal[i].Task_sett_price_LOT_Min=this.FormArrayVal[i].Task_sett_LOT_Min;
            this.CustomeArrayVal[i].Task_sett_price_LOT_Max=this.FormArrayVal[i].Task_sett_LOT_Max;
            this.CustomeArrayVal[i].TaskPresetDTO = this.FormArrayVal[i].TaskPresetDTO;
            this.CustomeArrayVal[i].Task_sett_ID = this.FormArrayVal[i].Task_sett_ID;
            this.CustomeArrayVal[i].Task_sett_pkeyID = this.FormArrayVal[i].Task_sett_pkeyID;
          }
        } else {
          this.FormArrayVal = [
            {
              Task_sett_State: [],
              Task_sett_Country: [],
              Task_sett_Zip: null,
              Task_sett_Customer: [],
              Task_sett_Contractor: [],
              Task_sett_Company: [],
              Task_sett_Lone: [],
              Task_sett_Con_Unit_Price: 0,
              Task_sett_CLI_Unit_Price: 0,
              Task_sett_Flat_Free: false,
              Task_sett_Price_Edit: false,
              Task_Work_TypeGroup: [],
              Task_sett_IsActive: true,
              Task_sett_IsDelete: false,
              Task_sett_Disable_Default:false,
              Task_sett_WorkType: [],
              Task_sett_LOT_Min: null,
              Task_sett_LOT_Max: null,
            }
          ];
          this.CustomeArrayVal = [
            {
              Task_sett_price_State: 0,
              Task_sett_price_Country: 0,
              Task_sett_price_Zip: null,
              Task_sett_price_Customer: 0,
              Task_sett_price_Contractor: 0,
              Task_sett_price_Company: 0,
              Task_sett_price_Lone: 0,
              Task_sett_price_Con_Unit_Price: 0,
              Task_sett_price_CLI_Unit_Price: 0,
              Task_sett_price_Flat_Free: false,
              Task_sett_price_Price_Edit: false,
              Task_Work_price_TypeGroup: 0,
              Task_sett_price_IsActive: true,
              Task_sett_price_IsDelete: false,
              Task_sett_price_Disable_Default:false,
              Task_sett_price_WorkType: 0,
              Task_sett_price_LOT_Min: null,
              Task_sett_price_LOT_Max: null,
              TaskPresetDTO:null,
              Task_sett_ID:0,
              Task_sett_pkeyID:0,
              dataCoun: this.CountryList,
            }
          ];
        }

        if (this.FormArrayValDocument.length > 0) {
          for (let i = 0; this.FormArrayValDocument.length > i; i++) {
            if (this.FormArrayValDocument[i].WT_Task_Company) {
              this.FormArrayValDocument[i].WT_Task_Company = JSON.parse(
                this.FormArrayValDocument[i].WT_Task_Company
              );
            }
            if (this.FormArrayValDocument[i].WT_Task_Customer) {
              this.FormArrayValDocument[i].WT_Task_Customer = JSON.parse(
                this.FormArrayValDocument[i].WT_Task_Customer
              );
            }
            if (this.FormArrayValDocument[i].WT_Task_LoneType) {
              this.FormArrayValDocument[i].WT_Task_LoneType = JSON.parse(
                this.FormArrayValDocument[i].WT_Task_LoneType
              );
            }
            if (this.FormArrayValDocument[i].WT_Task_State) {
              this.FormArrayValDocument[i].WT_Task_State = JSON.parse(
                this.FormArrayValDocument[i].WT_Task_State
              );
            }
            if (this.FormArrayValDocument[i].WT_Task_WorkType) {
              this.FormArrayValDocument[i].WT_Task_WorkType = JSON.parse(
                this.FormArrayValDocument[i].WT_Task_WorkType
              );
            }
            if (this.FormArrayValDocument[i].WT_Task_WorkType_Group) {
              this.FormArrayValDocument[i].WT_Task_WorkType_Group = JSON.parse(
                this.FormArrayValDocument[i].WT_Task_WorkType_Group
              );
            }
          }
        } else {
          this.FormArrayValDocument = [
            {
              WT_Task_Company: [],
              WT_Task_State: [],
              WT_Task_Customer: [],
              WT_Task_LoneType: [],
              WT_Task_WorkType: [],
              WT_Task_WorkType_Group: [],
              WT_Task_ClientDueDateTo: null,
              WT_Task_ClientDueDateFrom: null,
              WT_Task_IsActive: true,
              WT_Task_IsDelete: false
            }
          ];
        }
      });
  }

  ///get drop
  CompanyList: any; // temp array
  CustomerList: any; // temp array
  WorkTypeList: any; // temp array
  CategoryList: any; // temp array
  ContractorList: any; // temp array
  CordinatorList: any;
  LoanTypeList: any;
  CountryList: any;
  WorkTypeCategory: any; //group
  WorkTypelist:any;
  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetWorkOrder()
      .subscribe(response => {
        if (response.length != 0) {
          //dfebugger;
          this.StateList = response[6];
          this.dataS = this.StateList;
          this.CustomerNumberList = response[9];
          this.datacustomer = this.CustomerNumberList;
          //this.CompanyList = response[0];
          this.WorkTypeList = response[1];
          this.dataWT = this.WorkTypeList;
          this.CategoryList = response[2];
          this.ContractorList = response[3];
          this.dataCon = this.ContractorList;
          this.CordinatorList = response[4];
          this.LoanTypeList = response[10];
          this.dataLT = this.LoanTypeList;
          this.dropdownList = response[0];
          this.datacompany = this.dropdownList;
          this.CountryList = response[17];
          this.dataCoun = this.CountryList;
          this.WorkTypeCategory = response[11];
          this.dataWTG = this.WorkTypeCategory;
          this.getModelData();
        }
      });
  }

  GetcountyDetails(inx){
    //dfebugger
    this.StateDetailObj.StateMaster = JSON.stringify(this.statearr);
    this.xAddInvoiceItemsServices.getCountydetails(this.StateDetailObj).subscribe(res=>{
      this.CustomeArrayVal[inx].dataCoun = res[0];

    })

  }

  IsEditDisable = false;
  EditForms() {
    this.IsEditDisable = false;
    this.isdisable = false;
    this.formUsrCommonGroup.enable();
  }

  InstructionDataArray = [];
  DetailsDataArray = [];
  InstDataArray = [];

  // upload photos popup
  docsupload(DocmentUpload) {
    this.POPUPPhoto(DocmentUpload);
  }

  POPUPPhoto(DocmentUpload) {
    this.modalService
      .open(DocmentUpload, { windowClass: "xlModal" })
      .result.then(
        result => {
        },
        reason => {
          // then call get

        }
      );
  }

  public displayError(e: ErrorEvent) {
  }

  public displaySuccess(e) {
    if (e.operation == "upload") {
      this.processDocument(e.files[0].rawFile);
    } else {
      alert("remove img called");
    }
  }

  task_id: any;
  processDocument(documentInput) {
  var docx = documentInput.name;
    var extsn = docx.split(".").pop();
    if (extsn == "pdf" || extsn == "docx" || extsn == "doc") {
    const id1 = this.xRoute.snapshot.params['id'];
    let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
    this.task_id = parseInt(id);
    if (true) {
      this.BindDataModelObj.Common_pkeyID = 0;
      this.BindDataModelObj.Client_Result_Photo_Ch_ID = this.task_id;
      this.BindDataModelObj.Client_Result_Photo_ID = 0;
       //this.BindDataModelObj.Client_PageCalled = 1;
      this.BindDataModelObj.documentx = documentInput;
      this.BindDataModelObj.Client_Result_Photo_FileName = documentInput.name;
      this.BindDataModelObj.Type = 1;
      this.BindDataModelObj.workOrderNumber = '0';
      this.BindDataModelObj.IPLNO = 'Task_Master_Document';
      this.xClientResultOldPhotoServices
        .CommonDocumentsUpdate(this.BindDataModelObj)
        .then((res) => {
          res.subscribe(() => {
            this.BidInvoiceItemModelObj.Task_pkeyID = this.WorkOrderObj;
            this.BidInvoiceItemModelObj.Type = 2;
            this.xBidInvoiceItemViewTaskServices
              .ViewTaskMasterData(this.BidInvoiceItemModelObj)
              .subscribe(response => {
                this.doclst = response[1];

              });
           });
          //this.getModelData();
        });
    }
  }else{
    this.MessageFlag = "Please Select Doc/Pdf file...!";
    this.commonMessageInfo()
  }
  }

  RemoveAutoAssigntask(item){
    //console.log('remove',item);
  }

  Removedoc(val) {
    let conf = confirm("Are you Sure you want to  Delete this Record..?");
    if (conf) {
    this.TaskDocDetailObj.TMF_Task_Pkey = val.TMF_Task_Pkey;
    this.TaskDocDetailObj.TMF_Task_IsDelete = true;
    this.xAddInvoiceItemsServices.assinedocinstPost(this.TaskDocDetailObj)
    .subscribe(res =>{
      this.GetTaskData();
    })
  }
  }
 TaskDocument : any;

instrassin(val){
//console.log(val);

var Listval = this.doclst;
for (let i = 0; i < Listval.length; i++)
{
if(Listval[i].TMF_Task_Pkey == val.TMF_Task_Pkey)
{
  Listval[i].chkflag = true;
}
else
{
  Listval[i].chkflag = false;
}

}
this.TaskDocument = JSON.stringify(Listval);
//console.log('arr',Listval);

$(document).ready(function(){
    $('.check_class').click(function() {
        $('.check_class').not(this).prop('checked', false);
    });
  });


  }

  ChangePhotoLabel()
  {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var taskname =  this.BidInvoiceItemModelObj.Task_Name
    var Finaltaskname ;
    if(format.test(taskname)){
      Finaltaskname = taskname.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,'')
    }
    else{
      Finaltaskname = taskname;
    }
    //this.BidInvoiceItemModelObj.Task_Photo_Label_Name = this.BidInvoiceItemModelObj.Task_Name;
   let fnlTaskName= Finaltaskname.replace(/[^a-zA-Z ]/g, "")
    this.BidInvoiceItemModelObj.Task_Photo_Label_Name = fnlTaskName;//Finaltaskname;
  }
  customerhandleFilter(value) {
    if (value!='') {
      var filteredcustomer = this.CustomerNumberList.filter(function (el) {
        return el.Cust_Num_Number != null;
      });
      this.datacustomer = filteredcustomer.filter((s) => s.Cust_Num_Number.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.datacustomer = this.CustomerNumberList.slice();
   }
  }
  companyhandleFilter(value) {
    if (value!='') {
      var filteredcustomer = this.dropdownList.filter(function (el) {
        return el.Client_Company_Name != null;
      });
      this.datacompany = filteredcustomer.filter((s) => s.Client_Company_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.datacompany = this.dropdownList.slice();
   }
  }
  worktypehandleFilter(value) {
    if (value!='') {
      var filteredcustomer = this.WorkTypeList.filter(function (el) {
        return el.WT_WorkType != null;
      });
      this.dataWT = filteredcustomer.filter((s) => s.WT_WorkType.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.dataWT = this.WorkTypeList.slice();
   }
  }
  worktypegrouphandleFilter(value) {
    if (value!='') {
      var filteredcustomer = this.WorkTypeCategory.filter(function (el) {
        return el.Work_Type_Name != null;
      });
      this.dataWTG = filteredcustomer.filter((s) => s.Work_Type_Name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.dataWTG = this.WorkTypeCategory.slice();
   }
  }
  loantypehandleFilter(value) {
    if (value!='') {
      var filteredcustomer = this.LoanTypeList.filter(function (el) {
        return el.Loan_Type != null;
      });
      this.dataLT = filteredcustomer.filter((s) => s.Loan_Type.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.dataLT = this.LoanTypeList.slice();
   }
  }
  statehandleFilter(value) {
    if (value!='') {
      var filteredcustomer = this.StateList.filter(function (el) {
        return el.IPL_StateName != null;
      });
      this.dataS = filteredcustomer.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.dataS = this.StateList.slice();
   }
  }
  countyhandleFilter(value,inx) {
    if (value!='') {
      var filteredcustomer = this.CountryList.filter(function (el) {
        return el.COUNTY != null;
      });
      this.CustomeArrayVal[inx].dataCoun = filteredcustomer.filter((s) => s.COUNTY.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.CustomeArrayVal[inx].dataCoun = this.CountryList.slice();
   }
  }
  contractorhandleFilter(value) {
    if (value!='') {
      var filteredcustomer = this.ContractorList.filter(function (el) {
        return el.User_FirstName != null;
      });
      this.dataCon = filteredcustomer.filter((s) => s.User_FirstName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }
   else{
    this.dataCon = this.ContractorList.slice();
   }
  }
  CustomerSelect(event, inx){
    //dfebugger
    if (event !='') {
      var selectedElement = _.where(this.datacustomer, {Cust_Num_pkeyId: event})
      this.FormArrayVal[inx].Task_sett_Customer = [];
      var arraydata ={Cust_Num_pkeyId : selectedElement[0].Cust_Num_pkeyId , Cust_Num_Number:selectedElement[0].Cust_Num_Number};
      this.FormArrayVal[inx].Task_sett_Customer.push(arraydata);
    }
  }
  CompanySelect(event, inx){
    //dfebugger
    if (event !='') {
      var selectedElement = _.where(this.datacompany, {Client_pkeyID: event})
      this.FormArrayVal[inx].Task_sett_Company = [];
      var arraydata ={Client_pkeyID : selectedElement[0].Client_pkeyID , Client_Company_Name:selectedElement[0].Client_Company_Name};
      this.FormArrayVal[inx].Task_sett_Company.push(arraydata);
    }
  }
  WTSelect(event, inx){
    //dfebugger
    if (event !='') {
      var selectedElement = _.where(this.dataWT, {WT_pkeyID: event})
      this.FormArrayVal[inx].Task_sett_WorkType = [];
      var arraydata ={WT_pkeyID : selectedElement[0].WT_pkeyID , WT_WorkType:selectedElement[0].WT_WorkType};
      this.FormArrayVal[inx].Task_sett_WorkType.push(arraydata);
    }
  }
  WTGSelect(event, inx){
    //dfebugger
    if (event !='') {
      var selectedElement = _.where(this.dataWTG, {Work_Type_Cat_pkeyID: event})
      this.FormArrayVal[inx].Task_Work_TypeGroup = [];
      var arraydata ={Work_Type_Cat_pkeyID : selectedElement[0].Work_Type_Cat_pkeyID , Work_Type_Name:selectedElement[0].Work_Type_Name};
      this.FormArrayVal[inx].Task_Work_TypeGroup.push(arraydata);
    }
  }
  LTSelect(event, inx){
    //dfebugger
    if (event !='') {
      var selectedElement = _.where(this.dataLT, {Loan_pkeyId: event})
      this.FormArrayVal[inx].Task_sett_Lone = [];
      var arraydata ={Loan_pkeyId : selectedElement[0].Loan_pkeyId , Loan_Type:selectedElement[0].Loan_Type};
      this.FormArrayVal[inx].Task_sett_Lone.push(arraydata);
    }
  }
  StateSelect(event, inx){
    //dfebugger
    if (event !='') {
      this.statearr = [];
      var selectedElement = _.where(this.dataS, {IPL_StateID: event})
      this.FormArrayVal[inx].Task_sett_State = [];
      var arraydata ={IPL_StateID : selectedElement[0].IPL_StateID , IPL_StateName:selectedElement[0].IPL_StateName};
      this.statearr.push(arraydata);
      this.FormArrayVal[inx].Task_sett_State.push(arraydata);
      this.GetcountyDetails(inx);
    }
    else{
      this.statearr.splice(inx, 1);

    }
  }
  CountySelect(event, inx){
    //dfebugger
    if (event !='') {
      var selectedElement = _.where(this.CustomeArrayVal[inx].dataCoun, {ID: event})
      this.FormArrayVal[inx].Task_sett_Country = [];
      var arraydata ={ID : selectedElement[0].ID , COUNTY:selectedElement[0].COUNTY};
      this.FormArrayVal[inx].Task_sett_Country.push(arraydata);
    }
  }
  ContractorSelect(event, inx){
    //dfebugger
    if (event !='') {
      var selectedElement = _.where(this.dataCon, {User_pkeyID: event})
      this.FormArrayVal[inx].Task_sett_Contractor = [];
      var arraydata ={User_pkeyID : selectedElement[0].User_pkeyID , User_FirstName:selectedElement[0].User_FirstName};
      this.FormArrayVal[inx].Task_sett_Contractor.push(arraydata);
    }
  }
  // task group method
  open(content) {
    this.xmodalService.open(content, { windowClass: "lgModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  SetHelpFlag()
  {
    this.isHelpActive = !this.isHelpActive
    if (this.isHelpActive) {
      this.MessageFlag = "Item Help mode is on...!";
      this.commonMessageInfo();
    }
    else
    {
      this.MessageFlag = "Item Help mode is off...!";
      this.commonMessageInfo();
    }
  }

  DispalyInfo(event: Event, lblName)
  {
    if (this.isHelpActive) {
      event.preventDefault();
      this.MessageFlag = "Add Information for " + lblName;
      this.commonMessageInfo();
    }
  }

  commonMessageInfo() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = "Ok";
    modalRef.result.then(result => { }, reason => { });
  }
  RefreshTaskGroup(data){
    this.TaskGroupList = data;
    this.popformArray = data;
  }

  hideshowDetails(arg) {
    if (arg) {
      this.hidedaa = false;
    } else {
      this.hidedaa = true;
    }
  }
}


