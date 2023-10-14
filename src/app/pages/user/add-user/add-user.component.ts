import { Component, OnInit, } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { AddUserServices } from "./add-user.service";
import { AddUserModel, WorkOrderCustomize, ContractorMap, ContractorMapState, ContractorCoverageArea, CountyZipModel } from "./add-user-model";
import { WorkOrderDrodownServices } from "../../services/common-drop-down/drop-down.service";
// import { MasterlayoutComponent } from "../../../Home/MasterComponent";
import { ViewUserServices } from "../view-user/view-user.service";
import { ViewUserModel } from "../view-user/view-user-model";
import { CommonDocumentServices } from "../../services/document-upload/document-upload.service";
import { CommonDocumentUploadModel } from "../../services/document-upload/document-upload-model";
import { BaseUrl } from "../../../services/apis/rest-api";
import { EncrDecrService } from '../../../services/util/encr-decr.service';
import { IplAppModalContent } from '../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { from } from 'rxjs';
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginModel } from "src/app/models/login-model";
import  _ from 'underscore';
import { SaveWorkOrderServices } from "../../work-order/new-work-order/new-work-order.service";
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: "./add-user.component.html",
  styleUrls: ['./add-user.component.css'],
  providers: [DatePipe]
})

export class AddUserComponent implements OnInit {

  userLoginModel: LoginModel = new LoginModel();
  AddUserModelObj: AddUserModel = new AddUserModel();
  ContractorMapObj: ContractorMap = new ContractorMap();
  ContractorCoverageAreaObj:ContractorCoverageArea = new ContractorCoverageArea();
  ContractorMapStateObj: ContractorMapState = new ContractorMapState();
  WorkOrderCustomizeObj: WorkOrderCustomize = new WorkOrderCustomize();
  ViewUserModelObj: ViewUserModel = new ViewUserModel();
  CommonDocumentUploadModelObj: CommonDocumentUploadModel = new CommonDocumentUploadModel();
  CountyZipModelObj: CountyZipModel = new CountyZipModel();
  formUsrCommonGroup: UntypedFormGroup;
  submitted = false; // submitted;
  docdisable = true;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  UserNameReadOnly = false;
  MessageFlag: string; // custom msg sathi
  RecordValList: any;
  GroupList: any;
  griddata: any;
  YESNOList: any;
  CarrierList: any;
  StateList: any;
  TimeList: any;
  StartDateList: any;
  DocumentTypeList: any;
  OrderDisplayList: any;
  PastOrderDisplayList: any;
  BackgroundCheckProviderList: any;
  FormArrayVal = [];
  // only drop down
  dropCkck = false; // common
  RecordValFlag = false;
  GroupValFlag = false;
  DisplayWOValFlag = false;
  ActiveValFlag = false;
  HistoryValFlag = false;
  TimeValFlag = false;
  StateValFlag = false;
  IsPasswordDisable = false;
  imgpath: string; //img sath
  docPath: string; // document sathi
  BaseURLpath: string;
  AddressArray:any;
  ConstateList:any;
  County:any;
  AccessDevicelist:any;
  UserTimeList:any;
  checkAll: boolean = false;
  isStateInValid = false;
  isCountyInValid = false;
  isHelpActive = false;
  public defaultStateItem: { IPL_StateName: string, IPL_StateID: number } = { IPL_StateName: 'Select', IPL_StateID: 0 };
  public defaultCountyItem: { COUNTY: string, ID: number } = { COUNTY: 'Select', ID: 0 };
  public drpStateList: Array<string>;
  public drpCountyList: Array<string>;
  CountyZipAddModelObj: CountyZipModel = new CountyZipModel();

  CountyList: any;
  public state: State = {};
  FormArrayValtwo:any;
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

    myDate = new Date();
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xAddUserServices: AddUserServices,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    // private xMasterlayoutComponent: MasterlayoutComponent,
    private xViewUserServices: ViewUserServices,
    private xCommonDocumentServices: CommonDocumentServices,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private authService: AuthService,
    private xSaveWorkOrderServices: SaveWorkOrderServices,
    private datePipe: DatePipe
  ) {

    this.GetContactrorDropDown();
    this.GetDropDowndata();
    //this.ConstateList = this.source.slice();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      FirstName: ["", Validators.required],
      LastName: ["", Validators.required],
      EmailVal: ["", [Validators.required, Validators.email]],
      LoginNameVal: ["", Validators.required],
      PasswordVal: ["", [Validators.required, Validators.pattern(this.pattern), Validators.minLength(6),]],
      GroupVal: ["", Validators.required],
      desaddress: ["", Validators.required],
      descity: ["", Validators.required],
      desstate: ["", Validators.required],
      descounty: ["", Validators.nullValidator],
      deszip: ["", Validators.required],
      descomp: ["", Validators.nullValidator],
      vendo_id: ["", Validators.nullValidator],
      desphone: ["", Validators.nullValidator],
      disZone: ["", Validators.nullValidator],
      disdiscount: ["", Validators.nullValidator],
      disassign: ["", Validators.nullValidator],
      discordinator: ["", Validators.nullValidator],
      disprocessor: ["", Validators.nullValidator],
      discontractor: ["", Validators.nullValidator],
      disCriteria: ["", Validators.nullValidator],
      disorder: ["", Validators.nullValidator],
      dispast: ["", Validators.nullValidator],
      disuser: ["", Validators.nullValidator],
      disProvider: ["", Validators.nullValidator],
      disID: ["", Validators.nullValidator],
      disdocname: ["", Validators.nullValidator],
      disrecdate: ["", Validators.nullValidator],
      disexcdate: ["", Validators.nullValidator],
      disnotdate: ["", Validators.nullValidator],
      disalt: ["", Validators.nullValidator],
      disemail: ["", Validators.nullValidator],
      disCancelled: ["", Validators.nullValidator],
      dismas: ["", Validators.nullValidator],
      disfieldc: ["", Validators.nullValidator],
      disDigest: ["", Validators.nullValidator],
      disWo: ["", Validators.nullValidator],
      disWoc: ["", Validators.nullValidator],
      disWom: ["", Validators.nullValidator],
      disWof: ["", Validators.nullValidator],
      discom: ["", Validators.nullValidator],
      imageInput: ["", Validators.nullValidator],
      priview: ["", Validators.nullValidator],
      disactive:["", Validators.nullValidator],
      ConcatVal:["", Validators.nullValidator],
      Trackingval:["", Validators.nullValidator],
      distracking:["", Validators.nullValidator],
      useractive:["", Validators.nullValidator],
      usertrack:["", Validators.nullValidator],
      User_IspassSent:["", Validators.nullValidator],
    });

    // this.AddressArray = [
    //  { Cont_Coverage_Area_PkeyId:  0,
    //   Cont_Coverage_Area_UserID: 0,
    //   Cont_Coverage_Area_State_Id: 0,
    //   Cont_Coverage_Area_County_Id: 0,
    //   Cont_Coverage_Area_Zip_Code: 0,
    //   Cont_Coverage_Area_IsActive: true,
    //   Cont_Coverage_Area_IsDelete: false,
    // }
    // ]

    this.OrderDisplayList = [
      { Id: "1", Name: "Show all orders" },
      { Id: "2", Name: "Show only assigned orders" },
      { Id: "3", Name: "Show orders based on client" }
    ];
    this.PastOrderDisplayList = [
      { Id: "1", Name: "Show all past orders" },
      { Id: "2", Name: "Show past orders based on client" },
      { Id: "3", Name: "Show past order Previously assigned to user" }
    ];
    // this.BackgroundCheckProviderList = [
    //   { Id: "1", Name: "Option1" },
    //   { Id: "2", Name: "Option2" }
    // ];

    this.DocumentTypeList = [{ Id: 1, Name: "PDF" }, { Id: 2, Name: "DOCX" }];
    this.FormArrayVal = [
      {
        IPL_PkeyID: 0,
        IPL_Address: "",
        IPL_City: "",
        IPL_State: 0,
        IPL_County: 0,
        IPL_StateName: "",
        IPL_CountyName: "",
        IPL_Primary_Zip_Code: null
      }
    ];
    this.StartDateList = [
      { Id: 1, Name: "6 Hours" },
      { Id: 2, Name: "12 Hours" },
      { Id: 3, Name: "24 Hours" }
    ];
    this.TimeList = [{ Id: 1, Name: "Eastern" },
    { Id: 2, Name: "Mountain" },
    { Id: 3, Name: "Central" },
    { Id: 3, Name: "Pacific" },
    { Id: 4, Name: "Hawaii" },
    { Id: 5, Name: "Guam" },
  ];

  this.UserTimeList = [{ Id: 10, Name: "10" },
  { Id: 15, Name: "15" },
  { Id: 20, Name: "20" },
  { Id: 25, Name: "25" },
  { Id: 30, Name: "30" },
  { Id: 35, Name: "35" },
  { Id: 40, Name: "40" },
  { Id: 45, Name: "45" },

];

    this.CarrierList = [{ Id: 1, Name: "AT&T" }, { Id: 2, Name: "T-Mobile" }];
    this.YESNOList = [{ Id: 1, Name: "YES" }, { Id: 2, Name: "NO" }];

    this.dropdownSettings = {
      singleSelection: false,
      idField: "Client_pkeyID",
      textField: "Client_Company_Name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }
//document
adddocument(content) {
  ////dfebugger;
      this.xmodalService.open(content, { windowClass: "xlModal" });
  }
  AccessDeviceDetails(content) {
    // debugger;
        this.xmodalService.open(content, { windowClass: "xlModal" });
    }

  fieldTextType:any;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


handleFilter(value) {
  ////dfebugger;
  //console.log(value)
  if (value!='') {
    this.ConstateList = this.ConstateList.filter((s) => s.IPL_StateName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
 else{
  this.ConstateList = this.ConstateList.slice();
 }
}
stateval:Number;
valstatedata:String;
changestate(val){
  //dfebugger;
this.stateval = val.IPL_StateID;
this.valstatedata = val.IPL_StateName;
  this.ContractorMapStateObj.IPL_StateID = val.IPL_StateID;
  this.ContractorMapStateObj.IPL_StateName = val.IPL_StateName;
  this.xAddUserServices.ContractorCounty(this.ContractorMapStateObj).subscribe(response => {
    //console.log('bg',response);
     this.County = response[0];
     this.griddata = response[1];

  });
}
countyval:Number;
valCountydata:String;
changeCounty(val){
  ////dfebugger
  this.countyval = val.ID;
  this.valCountydata =  val.COUNTY
  this.ContractorMapStateObj.Zip_county_name = this.valCountydata;
  this.ContractorMapStateObj.UserID = this.AddUserModelObj.User_pkeyID;
  this.xAddUserServices.ContractorCounty(this.ContractorMapStateObj).subscribe(response => {
    this.griddata = response[1];
    //console.log('chack zip data',this.griddata)

  });
}
CountyhandleFilter(value) {
  ////dfebugger;
  //console.log(value)
  if (value!='') {
    this.County = this.County.filter((s) => s.ID.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
 else{
  this.County = this.County.slice();
 }
}


  DocumentUpload() {
    //console.log("button called");
    //debugger;
    if(this.documentdetails != '' ||this.documentdetails != null || this.documentdetails != undefined)
    {
      this.isLoading=true
      this.WorkOrderCustomizeObj.documentx = this.documentdetails;
    }
this.WorkOrderCustomizeObj.wo_Custo_UserId =  this.AddUserModelObj.User_pkeyID;
this.WorkOrderCustomizeObj.wo_Custo_DocType = this.WorkOrderCustomizeObj.wo_Custo_DocType
this.WorkOrderCustomizeObj.Client_PageCalled = 5;
     this.xAddUserServices.CommonDocumentsUpdate(this.WorkOrderCustomizeObj)
     .then((res) => {
      res.subscribe(response => {
        this.MessageFlag = "Document Updated...!";
        this.isLoading = false;
        this.commonMessage();
        this.GetuserDocument();
      })
    })
    .catch(()=>this.isLoading=false)

  }
  backgrounUpload(){
    //debugger
    this.isLoading=true
    this.AddUserModelObj.Client_PageCalled = 6;
    if (this.backdocdetails != undefined) {
      //debugger
      this.AddUserModelObj.documentx = this.backdocdetails;
      this.AddUserModelObj.date = this.datePipe.transform(this.myDate, 'yyyy:MM:dd HH:mm:ss');
    this.xAddUserServices.BackgroundDocumentsUpdate(this.AddUserModelObj)
    .then((res) => {
     res.subscribe(response => {
       this.MessageFlag = "Document Updated...!";
       this.isLoading = false;
       this.commonMessage();
       this.getModelData()
     });
   })
   .catch(()=>this.isLoading=false)
  }
  else if(this.backdocdetails == undefined){
    this.isLoading=true;
    this.AddUserModelObj.User_pkeyID =  this.AddUserModelObj.User_pkeyID;
    this.AddUserModelObj.User_BackgroundCheckProvider =  this.AddUserModelObj.User_BackgroundCheckProvider;
    this.AddUserModelObj.User_BackgroundDocPath =  this.AddUserModelObj.User_BackgroundDocPath;
    this.AddUserModelObj.User_BackgroundCheckId =  this.AddUserModelObj.User_BackgroundCheckId;
    this.AddUserModelObj.User_BackgroundDocName =  this.AddUserModelObj.User_BackgroundDocName;
    this.xAddUserServices.BackgroundUpdate(this.AddUserModelObj)
   .subscribe(response => {
       this.MessageFlag = "Document Updated...!";
       this.isLoading = false;
       this.commonMessage();
       this.getModelData()
     });
  }
  else{
    this.isLoading=false
  }
  }
  usertrack= true;
  usertrackingdata(val){
    ////dfebugger
    //console.log(val.target.checked)
if (val.target.checked === true) {
  this.usertrack = false;
}
else{
  this.usertrack = true;
}
  }

  // submit form
  FormButton() {
    //debugger;
    this.submitted = true;
    this.AddUserModelObj;

    // only drop down
    this.dropCkck = false;
  this.StateValFlag = false;

    if (this.AddUserModelObj.User_Group == 0) {
      this.GroupValFlag = true;
      this.dropCkck = true;
    }
//debugger;
    if(this.FormArrayVal.length > 0 && this.FormArrayVal[0].IPL_State == 0)
    {
        this.StateValFlag = true;
        this.dropCkck = true;
    }
    else{

    }


    if (this.dropCkck) {
      return;
    }
    //console.log(this.isLoading);
    //debugger
    // stop here if form is invalid
    if (this.formUsrCommonGroup.invalid) {
      this.isLoading=false
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    if (this.ModelObj) {
      this.AddUserModelObj.User_pkeyID = this.ModelObj;
    }

    this.AddUserModelObj.StrAddressArray = this.FormArrayVal;

    this.FormArrayVal.forEach(element => {
      var selectedState = _.where(this.drpStateList, {IPL_StateID: element.IPL_State});
      if (selectedState.length > 0) {
        element.IPL_StateName = selectedState[0].IPL_StateName;
      }
      var selectedCounty = _.where(this.drpCountyList, {ID: element.IPL_County});
      if (selectedCounty.length > 0) {
        element.IPL_CountyName = selectedCounty[0].COUNTY;
      }

    });



    this.AddUserModelObj.User_AssignClient = JSON.stringify(this.selectedItems);
    //this.AddUserModelObj.User_Tracking_Time =
    // all valid data to save
    this.xAddUserServices
      .UsertDataPost(this.AddUserModelObj)
      .subscribe(response => {
        //console.log("resp data", response);
        if (response[0].Status != "0") {
          this.AddUserModelObj.User_pkeyID = parseInt(response[0].User_pkeyID);
          this.CommonDocumentUploadModelObj.Common_pkeyID = this.AddUserModelObj.User_pkeyID;

          this.MessageFlag = "User Data Saved...!";

          this.isLoading = false;
          this.button = "Update";

          this.commonMessage();
          this.BackGroudIMGUpload();
        }
        else
        this.isLoading=false
      });
  }

  // drop down valid or not
  Record_Method() {
    this.RecordValFlag = false;
  }
  concateflg:Boolean = true;
  isGroupRoll:Boolean=false;
  Group_Method(val) {
    // debugger
    this.GroupValFlag = false;
    let grouprole = this.GroupList.find(item => item.Grp_pkeyID == val);
    if (grouprole.GroupRoleId === 2) {
      this.isGroupRoll=true;
      this.concateflg = false;
      this.AddUserModelObj.User_Contractor=true;
      this.AddUserModelObj.User_OpenOrderDisCriteria="2";

      if(this.AddUserModelObj.User_PastWorkOrder==true){
        this.PastOrderDisplayList = [
          //{ Id: "1", Name: "Show all past orders" },
          { Id: "2", Name: "Show past orders based on client" },
          { Id: "3", Name: "Show past order Previously assigned to user" }
        ];
        this.AddUserModelObj.User_PastOrderDisCriteria="3"
      }
      else{
        this.isGroupRoll=true;
        this.PastOrderDisplayList = [
          { Id: "1", Name: "Show all past orders" },
          { Id: "2", Name: "Show past orders based on client" },
          { Id: "3", Name: "Show past order Previously assigned to user" }
        ];
      }

    }
    else{
      this.concateflg = true;
      this.AddUserModelObj.User_Contractor=false;
      this.AddUserModelObj.User_OpenOrderDisCriteria="0";
      this.PastOrderDisplayList = [
        { Id: "1", Name: "Show all past orders" },
        { Id: "2", Name: "Show past orders based on client" },
        { Id: "3", Name: "Show past order Previously assigned to user" }
      ];
    }
  }
  onWorkOrderChanged(event){
// debugger
let val=this.AddUserModelObj.User_PastWorkOrder
if(val==true){
  if(this.isGroupRoll){
    this.PastOrderDisplayList = [
      //{ Id: "1", Name: "Show all past orders" },
      { Id: "2", Name: "Show past orders based on client" },
      { Id: "3", Name: "Show past order Previously assigned to user" }
    ];
    this.AddUserModelObj.User_PastOrderDisCriteria="3"
    this.formUsrCommonGroup.controls['dispast'].disable();
  }
  else{
    this.PastOrderDisplayList = [
      { Id: "1", Name: "Show all past orders" },
      { Id: "2", Name: "Show past orders based on client" },
      { Id: "3", Name: "Show past order Previously assigned to user" }
    ];
    this.AddUserModelObj.User_PastOrderDisCriteria="0"
    this.formUsrCommonGroup.controls['dispast'].disable();

  }
}
else{
  this.PastOrderDisplayList = [
    { Id: "1", Name: "Show all past orders" },
    { Id: "2", Name: "Show past orders based on client" },
    { Id: "3", Name: "Show past order Previously assigned to user" }
  ];
  this.AddUserModelObj.User_PastOrderDisCriteria="0"
  this.formUsrCommonGroup.controls['dispast'].enable();
}
  }
  DisplayWOVal_Method() {
    this.DisplayWOValFlag = false;
  }

  Active_Method() {
    this.ActiveValFlag = false;
  }

  History_Method() {
    this.HistoryValFlag = false;
  }

  TimeVal_Method() {
    this.TimeValFlag = false;
  }

  State_Method() {
    this.StateValFlag = false;
  }

  /// this code for purpose details mutiple drop
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  onItemSelect(item: any) {
    //console.log(item);
    //console.log(JSON.stringify(this.selectedItems));
  }
  onSelectAll(items: any) {
    //console.log(items);
    //console.log(JSON.stringify(this.selectedItems));
  }


  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  // clear form
  Clearx() {
    this.AddUserModelObj.User_FirstName = "";
    this.AddUserModelObj.User_LastName = "";
    this.AddUserModelObj.User_Leg_FirstName = "";
    this.AddUserModelObj.User_Leg_LastName = "";
  }

  // Insert New Row
  AddMoreRow() {
    var data = {
        IPL_PkeyID: 0,
        IPL_Address: "",
        IPL_City: "",
        IPL_State: 0,
        IPL_County: 0,
        IPL_StateName: "",
        IPL_CountyName: "",
        IPL_Primary_Zip_Code: null
    };
    this.FormArrayVal.push(data);
  }

  // remove row
  RemoveRow(index) {
    if (index != 0) {
      this.FormArrayVal.splice(index, 1);
    }
  }

  // zip code call
  onBlurZipCall() {
    //alert(this.AddUserModelObj.User_Zip);
  }

  clientList: any;
  ConCatList:any;
  GetDropDowndata() {
    this.xWorkOrderDrodownServices
      .DropdownGetGroupDetails()
      .subscribe(response => {
        //console.log('group',response)
        //debugger;

        this.GroupList = response[0];
        this.ConCatList = response[1];
        this.BackgroundCheckProviderList = response[3];
      });

    //assign client get data
    this.xWorkOrderDrodownServices
      .DropdownGetClientnamesData()
      .subscribe(response => {
        //console.log("client list", response);
        this.dropdownList = response[0];

        this.GetStateDropDown();
      });
  }


  ContactBtn = "Save Document";
  extensionval: any;
  finenameorginal: any;
  documentdetails:any;
  processImage(imageInput: any) {
    //debugger
    this.documentdetails = imageInput.target.files[0];
    // const getnamefile = imageInput.files[0].name;
    // this.finenameorginal = getnamefile;
    // const extsn = getnamefile.split(".").pop();

    // if (extsn != "xlsx") {
    //   this.WorkOrderCustomizeObj.documentx = imageInput.files;
    //   this.extensionval = extsn;

    //   this.CommonDocumentUploadModelObj.documentx = imageInput.files;
    // } else {
    //   this.MessageFlag = "Invalid File Format...!";
    //   this.commonMessage();
    // }
  }
  // end code
  AddMoreDocument() {
    if (this.WorkOrderCustomizeObj.wo_Custo_DocType != "") {
      this.PostUserDocumentMutiple();
    }
  }

  multipledoc = [];
  multipledocPost = [];
  PostUserDocumentMutiple() {
    this.xCommonDocumentServices
      .CommonDocumentUpdate(this.CommonDocumentUploadModelObj)
      .subscribe(response => {
        //console.log("response doc", response);
        var rspon = response.Message;
        var arr = [];
        arr = rspon.split("#");
        var msg = arr[0];
        if (arr[1]) {
          var data = {
            extensionval: this.extensionval,
            User_Doc_DocPath: BaseUrl + arr[1]
          };
          var datax = {
            extensionval: this.extensionval,
            User_Doc_DocPath: arr[1]
          };

          var documentarray = {
            User_Doc_pkeyID: 0,
            User_Doc_DocPath: arr[1],
            User_Doc_FileName: this.finenameorginal,
            User_Doc_ValType: this.WorkOrderCustomizeObj.wo_Custo_DocType,
            User_Doc_Exp_Date: this.WorkOrderCustomizeObj.wo_Custo_ExpDate,
            User_Doc_RecievedDate: this.WorkOrderCustomizeObj.wo_Custo_RecievedDate,
            User_Doc_NotificationDate: this.WorkOrderCustomizeObj.wo_Custo_NotificationDate,
            User_Doc_AlertUser: this.WorkOrderCustomizeObj.wo_Custo_AlertUser,
            User_Doc_UserID: 0,
            User_Doc_IsActive: true,
            User_Doc_IsDelete: false,
            UserID: 0,
            Type: 1
          };
          if (this.WorkOrderCustomizeObj.wo_Custo_DocType != "") {
            //only UI
            this.multipledoc.push(data);
            // post or
            this.multipledocPost.push(documentarray);
            this.ContactBtn = "Add More Document";
            this.AddUserModelObj.UserDocumentArray = this.multipledocPost;
          }

          this.finenameorginal = "";
          this.WorkOrderCustomizeObj.wo_Custo_DocType = "";
          this.WorkOrderCustomizeObj.wo_Custo_ExpDate = null;
          this.WorkOrderCustomizeObj.wo_Custo_RecievedDate = null;
          this.WorkOrderCustomizeObj.wo_Custo_NotificationDate = null;
          this.WorkOrderCustomizeObj.wo_Custo_AlertUser = false;
        }
        this.MessageFlag = msg;
        this.commonMessage();
      });
  }

  DeleteDocFile(indx, items) {
    var cfrm = confirm("Delete this Record...!");
    if (cfrm == true) {
      this.multipledoc.splice(indx, 1);
      this.multipledocPost.splice(indx, 1);

      this.CommonDocumentUploadModelObj.Common_pkeyID = items.User_Doc_pkeyID;
      //services call
      this.xCommonDocumentServices
        .DeleteUserDocumentMasterData(this.CommonDocumentUploadModelObj)
        .subscribe(response => {
          //console.log("delete document respon ", response);
        });
    }
  }
backdocdetails:any;
  processImageBackground(imageInput: any) {
    //debugger
    this.backdocdetails = imageInput.files[0];
    const getnamefile = imageInput.files[0].name;
    const extsn = getnamefile.split(".").pop();
    // here checking file extension
    if (extsn != "xlsx") {
      this.CommonDocumentUploadModelObj.documentx = imageInput.files;
    } else {
      this.MessageFlag = "Invalid File Format...!";
      this.commonMessage();
    }
  }

  BackGroudIMGUpload() {
    if (this.CommonDocumentUploadModelObj.documentx) {
      this.xCommonDocumentServices
        .ImageBackgroundUpdate(this.CommonDocumentUploadModelObj)
        .subscribe(response => {
          var rspon = response.Message;
          var arr = [];
          arr = rspon.split("#");
          var msg = arr[0];
          //console.log("document upload msg", msg);
          if (arr[1]) {
            this.imgpath = BaseUrl + arr[1];
          }
        });
    }
  }

  ModelObj: any;
  IsEditDisable = false;

  getModelData() {
    // this.ModelObj = this.xMasterlayoutComponent.masterFunctionGetdata();
    const id1 = this.xRoute.snapshot.params['id'];
    if (id1 == 'new') {
      this.docdisable = true;
      this.AddUserModelObj = new AddUserModel();
    } else {
      this.docdisable = false;
      let id = this.EncrDecr.get('123456$#@$^@1ERF', atob(id1));
      //console.log('User_pkeyID', id);
      this.ModelObj = parseInt(id);
    }

    if (this.ModelObj == undefined) {
      this.AddUserModelObj = new AddUserModel();

      this.submitted = false; // submitted;
      this.button = "Save"; // buttom loading..
      this.isLoading = false; // buttom loading.
    } else {
      //console.log("grid to f", this.ModelObj);
      this.AddUserModelObj.Type = this.ModelObj.Type;
      this.AddUserModelObj.UserID = this.ModelObj.UserID;
      this.AddUserModelObj.User_pkeyID = this.ModelObj;
      this.ViewUserModelObj.User_pkeyID = this.ModelObj;

      this.GetsingleData();

      //this.formUsrCommonGroup.disable();
      this.IsEditDisable = true;
      this.formUsrCommonGroup.disable();
      //Enable While get a user id
      this.formUsrCommonGroup.controls['disProvider'].enable();
      this.formUsrCommonGroup.controls['disID'].enable();
      this.formUsrCommonGroup.controls['imageInput'].enable();

      this.formUsrCommonGroup.controls['disdocname'].enable();
      this.formUsrCommonGroup.controls['disrecdate'].enable();
      this.formUsrCommonGroup.controls['disexcdate'].enable();
      this.formUsrCommonGroup.controls['disnotdate'].enable();
      this.formUsrCommonGroup.controls['disalt'].enable();

      this.IsPasswordDisable = true;
      this.button = "Update";
      this.AddUserModelObj.Type = 2;
    }
  }

  EditForms() {
    this.IsEditDisable = false;

    this.formUsrCommonGroup.enable();
  }

  GetStateDropDown() {
    this.xWorkOrderDrodownServices.UserStateDropDownData().subscribe(response => {
      this.StateList = response[0];
      this.drpStateList = response[0];
      //console.log('state', this.StateList);
      this.getModelData();
    });
  }

  GetContactrorDropDown() {
    this.xAddUserServices.ContractorState(this.ContractorMapStateObj).subscribe(response => {
      this.ConstateList = response[0];

    });
  }
  Changeusertracking(value){
//console.log(value);
  }
  // get single data
  GetsingleData() {
    // debugger
    this.ViewUserModelObj.Single = true;

    if (this.ViewUserModelObj.User_pkeyID != 0) {
      this.xViewUserServices
        .ViewUserData(this.ViewUserModelObj)
        .subscribe(response => {
          //  console.log('condata',response)
          this.UserNameReadOnly = true;

          if (response[0].length != 0) {

            this.AccessDevicelist = response[3]
            // console.log('sandip34',response)

            this.AddUserModelObj.User_pkeyID = response[0][0].User_pkeyID;
            this.AddUserModelObj.User_FirstName = response[0][0].User_FirstName;
            this.AddUserModelObj.User_CompanyName = response[0][0].User_CompanyName;
            this.AddUserModelObj.User_VendoID = response[0][0].User_VendoID;
            this.AddUserModelObj.User_Email = response[0][0].User_Email;
            this.AddUserModelObj.User_CellNumber = response[0][0].User_CellNumber;
            this.AddUserModelObj.User_LoginName = response[0][0].User_LoginName;
            this.AddUserModelObj.User_Password = response[0][0].User_Password;
            this.AddUserModelObj.User_Tme_Zone = response[0][0].User_Tme_Zone;
            this.AddUserModelObj.User_Disc_percentage = response[0][0].User_Disc_percentage.toFixed(2);
            this.AddUserModelObj.User_Auto_Assign = response[0][0].User_Auto_Assign;
            this.AddUserModelObj.User_Group = response[0][0].User_Group;
            this.AddUserModelObj.User_Cordinator = response[0][0].User_Cordinator;
            this.AddUserModelObj.User_Processor = response[0][0].User_Processor;
            this.AddUserModelObj.User_Contractor = response[0][0].User_Contractor;
            this.AddUserModelObj.User_OpenOrderDisCriteria = response[0][0].User_OpenOrderDisCriteria;
            this.AddUserModelObj.User_PastWorkOrder = response[0][0].User_PastWorkOrder;
            this.AddUserModelObj.User_PastOrderDisCriteria = response[0][0].User_PastOrderDisCriteria;
            this.AddUserModelObj.User_BackgroundCheckProvider = parseInt(response[0][0].User_BackgroundCheckProvider);
            this.AddUserModelObj.User_BackgroundCheckId = response[0][0].User_BackgroundCheckId;
            this.AddUserModelObj.User_BackgroundDocName = response[0][0].User_BackgroundDocName;
            this.AddUserModelObj.User_Email_New_Wo = response[0][0].User_Email_New_Wo;
            this.AddUserModelObj.User_Comments = response[0][0].User_Comments;
            this.AddUserModelObj.User_Alert_EmailReply = response[0][0].User_Alert_EmailReply;
            this.AddUserModelObj.User_Alert_EmailReply = response[0][0].User_Alert_EmailReply;
            this.AddUserModelObj.User_Alert_Ready_Office = response[0][0].User_Alert_Ready_Office;
            this.AddUserModelObj.User_Assi_Admin = response[0][0].User_Assi_Admin;
            this.AddUserModelObj.User_Emai_Reminders = response[0][0].User_Emai_Reminders;
            this.AddUserModelObj.User_Email_FollowUp = response[0][0].User_Email_FollowUp;
            this.AddUserModelObj.User_Email_Note = response[0][0].User_Email_Note;
            this.AddUserModelObj.User_Email_UnAssigned_Wo = response[0][0].User_Email_UnAssigned_Wo;
            this.AddUserModelObj.User_IsActive = response[0][0].User_IsActive;
            this.AddUserModelObj.User_IsDelete = response[0][0].User_IsDelete;
            this.AddUserModelObj.User_LastName = response[0][0].User_LastName;
            this.AddUserModelObj.User_Sys_Record = response[0][0].User_Sys_Record;
            this.AddUserModelObj.User_Text_New_Wo = response[0][0].User_Text_New_Wo;
            this.AddUserModelObj.User_Text_Note = response[0][0].User_Text_Note;
            this.AddUserModelObj.User_Text_Reminders = response[0][0].User_Text_Reminders;
            this.AddUserModelObj.User_Text_FollowUp = response[0][0].User_Text_FollowUp;
            this.AddUserModelObj.User_Text_UnAssigned_Wo = response[0][0].User_Text_UnAssigned_Wo;
            this.AddUserModelObj.User_Wo_History = response[0][0].User_Wo_History;
            this.AddUserModelObj.User_Text_Cancelled = response[0][0].User_Text_Cancelled;
            this.AddUserModelObj.User_Text_Field_Complete = response[0][0].User_Text_Field_Complete;
            this.AddUserModelObj.User_Text_New_Message = response[0][0].User_Text_New_Message;
            this.AddUserModelObj.User_Email_Cancelled = response[0][0].User_Email_Cancelled;
            this.AddUserModelObj.User_Email_Daily_Digest = response[0][0].User_Email_Daily_Digest;
            this.AddUserModelObj.User_Email_Field_Complete = response[0][0].User_Email_Field_Complete;
            this.AddUserModelObj.User_Email_New_Message = response[0][0].User_Email_New_Message;
            this.AddUserModelObj.User_Tracking = response[0][0].User_Tracking;
            this.AddUserModelObj.User_IsActive = response[0][0].User_IsActive;
            if(response[0][0].User_Tracking == true){
              this.usertrackOn = false;
              this.AddUserModelObj.User_Tracking_Time = response[0][0].User_Tracking_Time;
            }


            if (response[0][0].User_Con_Cat_Id != null) {
              this.concateflg = false;
              this.AddUserModelObj.User_Con_Cat_Id = response[0][0].User_Con_Cat_Id;
            }

            if (response[0][0].User_BackgroundDocPath != "") {
              this.imgpath =  response[0][0].User_BackgroundDocPath;
              this.AddUserModelObj.User_BackgroundDocPath =  response[0][0].User_BackgroundDocPath;
            }

            this.selectedItems = JSON.parse(response[0][0].User_AssignClient);
            if (response[1].length > 0) {
              this.FormArrayVal = response[1];
              this.selectChangeHandler(this.FormArrayVal[0].IPL_State);
            }
            //pradeep

            if(this.AddUserModelObj.User_Group==48){
              this.isGroupRoll=true;
            }
            else
            {
              this.isGroupRoll=true;
            }




            this.CommonDocumentUploadModelObj.Common_pkeyID = this.AddUserModelObj.User_pkeyID;
            if (response[2] != null) {
              ////dfebugger
              this.AddressArray = response[2];

              let val = {"ID":this.AddressArray[0].Cont_Coverage_Area_County_Id,"COUNTY":this.AddressArray[0].COUNTY};
              let countydata ={"IPL_StateID":this.AddressArray[0].Cont_Coverage_Area_State_Id,"IPL_StateName":this.AddressArray[0].STATE_CODE}

              this.changestate(countydata)
              this.changeCounty(val);

            }
            this.AddUserModelObj.User_ImagePath = response[0][0].User_ImagePath;
            this.GetuserDocument();
          }


        });
    }

  }

  addconaddress(content){
  ////dfebugger;
    this.valstatedata = undefined;
    this.valCountydata = undefined;
    this.isStateInValid = false;
    this.isCountyInValid = false;
    this.xmodalService.open(content, { windowClass: "xlModal" });
  }

  closeModal(){
    this.xmodalService.dismissAll();
  }

  GetuserDocument() {
    this.xCommonDocumentServices
      .GetUserDocument(this.CommonDocumentUploadModelObj)
      .subscribe(response => {
        this.multipledocPost = response[0];
      });
  }

  // pass
  Passcode: any;

  generatePassword() {


    this.userLoginModel.user_LoginNameForgot=this.AddUserModelObj.User_LoginName
    this.userLoginModel.User_Source = 2;

    this.authService
    .ForgotpasswordPost(this.userLoginModel)
    .subscribe(response => {
      //console.log("resp data", response);
      if (true) {

        this.AddUserModelObj.User_IspassSent=true;
        alert('Password Sent To Your Registered Email Id')
      }
      else
      {
        this.AddUserModelObj.User_IspassSent=false;
      }
    });

  }



  onBlurUserName() {
    //alert(username);
    if (this.AddUserModelObj.User_pkeyID == 0) {
      this.xAddUserServices.CheckUseName(this.AddUserModelObj)
        .subscribe(response => {
          //console.log('check response', response);
          if (response[0][0].UserCount != 0) {
            this.AddUserModelObj.User_LoginName = "";

            this.MessageFlag = "UserName Already Existing..";
            this.commonMessage();
          }
        });
    }
  }
  ziparr = [];
  checkzipRow(val, item,index){
    ////dfebugger
  if (val == true) {
   this.ziparr.push(item)

  }
  else{
    this.ziparr.splice(index, 1);
  }
  //console.log('zip',this.ziparr)
  }

  SubmitConMap(){

    ////dfebugger
    if (this.AddUserModelObj.User_pkeyID != 0) {
      this.ContractorCoverageAreaObj.Cont_Coverage_Area_State_Id = this.stateval;
      this.ContractorCoverageAreaObj.Cont_Coverage_Area_County_Id = this.countyval;
      this.ContractorCoverageAreaObj.AddressArray =  this.ziparr,
      this.ContractorCoverageAreaObj.Cont_Coverage_Area_UserID =  this.AddUserModelObj.User_pkeyID,
       this.xAddUserServices.ContractorAddressPost(this.ContractorCoverageAreaObj).subscribe(res=>{
         this.MessageFlag = "Save Contractor Map Data...";
         this.commonMessage();
       })
    }else{
      this.MessageFlag = "Please Add User Data First...";
      this.commonMessage();
    }


  }
  storezip(){
    // //dfebugger
    let errcnt = 0;
    if (this.valstatedata == null || this.valstatedata == "") {
      this.isStateInValid = true;
      errcnt = errcnt + 1;
    }
    else{
      this.isStateInValid = false;
    }
    if (this.valCountydata == null || this.valCountydata == "") {
      this.isCountyInValid = true;
      errcnt = errcnt + 1;
    }
    else{
      this.isCountyInValid = false;
    }
    if (errcnt > 0) {
      return;
    } else {
      this.CountyZipModelObj.Zip_state_id = this.valstatedata;
      this.CountyZipModelObj.Zip_county_name =  this.valCountydata;
      this.xAddUserServices.AddZip(this.CountyZipModelObj).subscribe(res =>{
        if (res[1] == "-99") {
          this.MessageFlag = "Zip Code is already exists...";
          this.commonMessage();
        }
        else
        {
          this.MessageFlag = "Zip Code Added...";
          this.commonMessage();
        }
      this.changeCounty(this.valCountydata)
      });
    }
  }
  AddMoreAddress()
  {
  let data = {
    Cont_Coverage_Area_PkeyId:  0,
    Cont_Coverage_Area_UserID: 0,
    Cont_Coverage_Area_State_Id: 0,
    Cont_Coverage_Area_County_Id: 0,
    Cont_Coverage_Area_Zip_Code: 0,
    Cont_Coverage_Area_IsActive: true,
    Cont_Coverage_Area_IsDelete: false,
  }
   this.AddressArray.push(data)
  }
  RemoveConAddress(index, Item) {
    let Cnfm = confirm("Are you sure remove this records..?");
    if (Cnfm) {
      if (Item.Cont_Coverage_Area_PkeyId != 0) {
        this.ContractorCoverageAreaObj.Cont_Coverage_Area_PkeyId = Item.Cont_Coverage_Area_PkeyId;
      this.xAddUserServices.ContractorAddressDel(this.ContractorCoverageAreaObj).subscribe(res => {
        this.MessageFlag = "Record has been deleted...";
        this.commonMessage();
        this.getModelData();
      })
      } else {
        this.AddressArray.splice(index, 1);
      }
    }
  }
  checkRowAll() {
    this.checkAll = !this.checkAll;
    this.griddata.forEach(item => item.Cont_Coverage_Area_IsActive = this.checkAll ? true : false);
  }
  usertrackOn:boolean = true;
  usertracktime(val){
   if (val == true) {
     this.usertrackOn = false;
   }
   else{
    this.usertrackOn = true;
   }
  }

   public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
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
  selectChangeHandler(event){
    //debugger
    if (event > 0) {
      this.StateValFlag = false
      //console.log('county',event);
    this.ContractorMapStateObj.IPL_StateID = event;
    this.xAddUserServices.UserCountyDetails(this.ContractorMapStateObj).subscribe(response => {
      //console.log('bg',response);
       this.CountyList = response[0];
       this.drpCountyList = response[0];
    });
    }
    else{
      this.StateValFlag = true;
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

  BindZipAddress(zipcode)
  {
    this.CountyZipAddModelObj.Zip_zip = zipcode;
    this.CountyZipAddModelObj.Type = 1;

    this.xSaveWorkOrderServices
    .GetZipAddData(this.CountyZipAddModelObj)
    .subscribe(response => {
      //debugger;
      if (response[0].length != 0) {
        this.FormArrayVal[0].IPL_City = response[0][0].Zip_city;
        this.FormArrayVal[0].IPL_State= response[0][0].ZipState_id;
      }
    });

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

}

