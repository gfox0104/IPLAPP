import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { CompanyInfoModel } from "./add-company-info-model";
import { CompanyInfoServices } from "./add-company-info.service";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { Documentmodel } from "./add-company-info-model";
import { WorkOrderDrodownServices } from '../../../services/common-drop-down/drop-down.service';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { ViewCompanyInfoModel } from '../view-company-info/view-company-info-model';
import { IplAppModalContent } from '../../../../components/iplapp-modal-content/iplapp-modal-content.component';
import { BindChatDataModel } from "src/app/pages/message/message-model";
import { MessageService } from "src/app/pages/message/message.service";
import { DatePipe } from "@progress/kendo-angular-intl";

@Component({
  templateUrl: "./add-company-info.component.html",
  providers: [DatePipe]
})
export class CompanyInfoComponent implements OnInit {
  submitted = false; // submitted;
  formUsrCommonGroup: UntypedFormGroup;
  button = "Save"; // buttom loading..
  isLoading = false; // buttom loading..
  MessageFlag: string; // custom msg sathi
  dropCkck = false; // common only drop down
  StateFlag = false; // for dropdown
  isHelpActive = false; // for set help tag flag
  StateList: any;

  CompanyInfoModelObj: CompanyInfoModel = new CompanyInfoModel();
  ViewCompanyInfoModelObj: ViewCompanyInfoModel = new ViewCompanyInfoModel();
  DocumentmodelObj: Documentmodel = new Documentmodel();
  BindChatDataModelObj: BindChatDataModel = new BindChatDataModel();
  myDate = new Date();
  constructor(
    private formBuilder: UntypedFormBuilder,
    private xmodalService: NgbModal,
    private xCompanyInfoServices: CompanyInfoServices,
    private xRouter: Router,
    private xRoute: ActivatedRoute,
    private EncrDecr: EncrDecrService,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xMessageService: MessageService,
    private datePipe: DatePipe
  ) {
    this.GetState();
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      CompanyNameVal: ["", Validators.required],
      ContactNameVal: ["", Validators.required],
      EmailVal: ["", [Validators.required, Validators.email]],
      PhoneVal: ["", Validators.required],
      AddressVal: ["", Validators.required],
      CityVal: ["", Validators.required],
      ZipVal: ["", Validators.required],

      disbledFaltu: ["", Validators.nullValidator],
      disbledFaltu1: ["", Validators.nullValidator],
      disbledFaltu2: ["", Validators.nullValidator],
      disbledFaltux: ["", Validators.min],
      fileedit: ["", Validators.nullValidator],
    });

    //this.formUsrCommonGroup.disable();
    this.getModelData();
  }

  // shortcurt Namefor form sathi
  get fx() {
    return this.formUsrCommonGroup.controls;
  }

  // submit form
  FormButton() {
    //debugger
    this.submitted = true;
    this.CompanyInfoModelObj;

    // only drop down
    this.dropCkck = false;

    if (this.CompanyInfoModelObj.YR_Company_State == 0) {
      this.StateFlag = true;
      this.dropCkck = true;
    }

    if (this.dropCkck) {
      return;
    }

    // stop here if form is invalid
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    if (this.ModelObj ) {
      this.ViewCompanyInfoModelObj.YR_Company_pkeyID = this.ModelObj;
    }

    // all valid data to save
    this.xCompanyInfoServices
      .CompanyInfotDataPost(this.CompanyInfoModelObj)
      .subscribe(response => {
        if (response[0].Status != "0") {
          this.CompanyInfoModelObj.YR_Company_pkeyID = parseInt(
            response[0].YR_Company_pkeyID
          );
          this.MessageFlag = "Company information Saved...!";
          this.isLoading = false;
          this.button = "Update";
          this.commonMessage();
          this.DocumentCall(response[0].YR_Company_pkeyID);
          this.getModelData();
        }
      });
  }

  State_Method() {
    this.StateFlag = false;
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }

  Clearx() {

  }

  ModelObj: Number =0;
  IsEditDisable = false;
  getModelData() {
    
    this.GetSingleData();
  
  }
applogo:any;
  GetSingleData() {
    this.CompanyInfoModelObj.YR_Company_pkeyID = this.ModelObj;
    this.CompanyInfoModelObj.UserID = this.ModelObj;
    const User = JSON.parse(localStorage.getItem('usertemp_'));
    this.CompanyInfoModelObj.UserID = User[0].User_pkeyID;
    this.CompanyInfoModelObj.Type = 2;
    this.xCompanyInfoServices.GetAppCompanySingle(this.CompanyInfoModelObj)
      .subscribe(response => {
        
        //console.log('ckeck',response);
        if (response.length != 0) {
          this.CompanyInfoModelObj.YR_Company_pkeyID = response[0][0].YR_Company_pkeyID;
          this.CompanyInfoModelObj.YR_Company_Name = response[0][0].YR_Company_Name;
          this.CompanyInfoModelObj.YR_Company_Con_Name = response[0][0].YR_Company_Con_Name;
          this.CompanyInfoModelObj.YR_Company_Email = response[0][0].YR_Company_Email;
          this.CompanyInfoModelObj.YR_Company_Phone = response[0][0].YR_Company_Phone;
          this.CompanyInfoModelObj.YR_Company_Address = response[0][0].YR_Company_Address;
          this.CompanyInfoModelObj.YR_Company_City = response[0][0].YR_Company_City;
          this.CompanyInfoModelObj.YR_Company_State = response[0][0].YR_Company_State;
          this.CompanyInfoModelObj.YR_Company_Zip = response[0][0].YR_Company_Zip;
          this.CompanyInfoModelObj.YR_Company_Logo = response[0][0].YR_Company_Logo;
          this.applogo = response[0][0].YR_Company_App_logo;
          this.CompanyInfoModelObj.YR_Company_App_logo = response[0][0].YR_Company_App_logo;
          this.CompanyInfoModelObj.YR_Company_Support_Email = response[0][0].YR_Company_Support_Email;
          this.CompanyInfoModelObj.YR_Company_Support_Phone = response[0][0].YR_Company_Support_Phone;
          this.CompanyInfoModelObj.YR_Company_PDF_Heading = response[0][0].YR_Company_PDF_Heading;
          this.CompanyInfoModelObj.YR_Company_IsActive = response[0][0].YR_Company_IsActive;
          this.formUsrCommonGroup.disable();
          this.IsEditDisable = true;
          this.button = "Update";
          this.CompanyInfoModelObj.Type = 2;
          this.GetDocumentFile();
       
        }
      }); 
  }

  Back() {
    this.xRouter.navigate(["/company/viewcompany"]);
  }


  getnamefile: any; //img sath
  processImage(imageInput: any) {
    //debugger
    this.getnamefile = imageInput.target.files[0];
    
  }

  

  // enteract between save btn and document upload
  DocumentCall(pkeyId: any) {
    //debugger
    this.DocumentmodelObj.Pkey_Id = pkeyId;
    this.DocumentmodelObj.Filedata = this.getnamefile;
    this.DocumentmodelObj.date =  this.datePipe.transform(this.myDate, 'yyyy:MM:dd HH:mm:ss');
    this.xCompanyInfoServices
      .CompanyImageUpdate(this.DocumentmodelObj)
      .then((res) => {
        res.subscribe(response => {
         
        
        });
      });
  }
 

  // check extension img or not
  ImgFlag = false;
  GetExtension(imgpathx: any) {
    var extsn = imgpathx.split(".").pop();
    if (
      extsn == "jpg" ||
      extsn == "png" ||
      extsn == "PNG" ||
      extsn == "JPG" ||
      extsn == "JPEG" ||
      extsn == "jpeg"
    ) {
      this.ImgFlag = true;
    } else if (extsn == "pdf" || extsn == "docx" || extsn == "doc") {
      this.ImgFlag = false;
    }
  }
  imgpath:string;
  GetDocumentFile() {
    this.CompanyInfoModelObj.YR_Company_pkeyID = this.CompanyInfoModelObj.YR_Company_pkeyID; 
    //debugger
    this.xCompanyInfoServices
      .GetCompanyDocument(this.CompanyInfoModelObj)
      .subscribe(response => {
        //console.log('image',response);
        if (response[0].length != 0) {
          this.ImgFlag = true;
          this.imgpath =  response[0][0].App_Com_Img_FilePath;
         
        }
      });
  }

  EditForms() {
    this.IsEditDisable = false;
    this.formUsrCommonGroup.enable();
  }

  GetState() {
    this.xWorkOrderDrodownServices.StateDropDownData()
      .subscribe(response => {
        //console.log('m', response)
        this.StateList = response[0];
      });
  }

  processFile(imageInput: any) {
    //debugger
    if (imageInput.target.files.length == 1) {
  
      const getnamefile = imageInput.target.files[0].name;
      const extsn = getnamefile.split(".").pop();
      // here checking file extension
      if (imageInput.target.files[0].size <= 10485760) {
        this.BindChatDataModelObj.documentx = imageInput.target.files[0];
        this.BindChatDataModelObj.Common_pkeyID = 0
        this.BindChatDataModelObj.Client_PageCalled = 11
        this.BindChatDataModelObj.Client_Result_Photo_ID =  this.CompanyInfoModelObj.YR_Company_pkeyID;
        this.BindChatDataModelObj.Chat_FileName = getnamefile;
        this.BindChatDataModelObj.Type = 1;// nely entry
        if (this.BindChatDataModelObj.Chat_FilePath != "") {
          this.BindChatDataModelObj.Type = 2;// for update
        }
        this.DocumentlogoCall();
      }
    }
    else {
      alert('Please Select File First');
    }
  }

  //enteract between save btn and document upload
  DocumentlogoCall() {
    //debugger;
    if (this.BindChatDataModelObj.documentx.type.startsWith("image")) {
      this.xMessageService
      .ChatImageUpLoad(this.BindChatDataModelObj)
      .then(res => {
        res.subscribe(response => {
        //console.log('company image',response)
      
        
        });
      })
     
    }

  }
// addede by unnati
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
