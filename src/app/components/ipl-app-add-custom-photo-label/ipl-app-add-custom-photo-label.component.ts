import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { inputs } from '@syncfusion/ej2-angular-dropdowns/src/drop-down-list/dropdownlist.component';
import { AddCustomLableModel } from 'src/app/pages/admin/custom-photo-label/add-custom-photo-label/custom-photo-label-model';
import { MultiDropdowns } from 'src/app/pages/admin/custom-photo-label/add-custom-photo-label/custom-photo-label-multi-dropdowns';
import { AddCustomPhotoServices } from 'src/app/pages/admin/custom-photo-label/add-custom-photo-label/custom-photo-label.service';
import { FormFields } from 'src/app/pages/admin/custom-photo-label/constants';
import { ViewCustomPhotoLabelModel } from 'src/app/pages/admin/custom-photo-label/view-custom-photo-label/view-custom-photo-label-model';
import { ViewCustomPhotoLabelServices } from 'src/app/pages/admin/custom-photo-label/view-custom-photo-label/view-custom-photo-label.service';
import { DropdownModel } from 'src/app/pages/models/dropdown-model';
import { AddUserServices } from 'src/app/pages/user/add-user/add-user.service';
import { DocumentAndFormsDTO } from 'src/app/pages/work-order/document-form/document-form-model';
import { WorkOrderDrodownServices } from 'src/app/services/util/dropdown.service';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { IplAppModalContent } from '../iplapp-modal-content/iplapp-modal-content.component';

@Component({
  selector: 'app-ipl-app-add-custom-photo-label',
  templateUrl: './ipl-app-add-custom-photo-label.component.html',
  styleUrls: ['./ipl-app-add-custom-photo-label.component.scss']
})
export class IplAppAddCustomPhotoLabelComponent implements OnInit {

  @Input() PhotoLableId: any;
  @Output() update = new EventEmitter();

  AddCustomLableModelObj: AddCustomLableModel = new AddCustomLableModel();
  ViewCustomPhotoLableModelObj: ViewCustomPhotoLabelModel = new ViewCustomPhotoLabelModel();
  docModel: DocumentAndFormsDTO = new DocumentAndFormsDTO();
  _drpdownmodelObj:DropdownModel = new DropdownModel();
  submitted = false;
  formUsrCommonGroup: UntypedFormGroup;
  MessageFlag: string;
  WorkTypevalFlag = false; // for dropdown
  CustomerNumbervalFlag = false; // for dropdown
  formFields = FormFields;
  isLoading: boolean;
  button: string;
  formArrayVal = [];
  multiDropdowns = MultiDropdowns;
  dropdownList:any;
  customerNumberList:any;
  loanTypeList:any;
  workTypeList:any;
  workTypeCategory:any;
  stateList:any;
  countryList:any;
  isHelpActive = false;
  isDrpSelected = false;
  hidedaa: boolean = true;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private xmodalService: NgbModal,
    private xAddCustomPhotoServices: AddCustomPhotoServices,
    private EncrDecr: EncrDecrService,
    private xViewCustomPhotoLabelServices: ViewCustomPhotoLabelServices,
    private xAddUserServices: AddUserServices,
  ) {
    this.formArrayVal = [
      {
        Task_sett_State: [],
        Task_sett_Country: [],
        Task_sett_Zip: null,
        Task_sett_Customer: [],
        Task_sett_Company: [],
        Task_sett_Lone: [],
        Task_Work_TypeGroup: [],
        WTTaskWorkType: []
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['isSubmitted'] && changes['isSubmitted'].currentValue === true) {
      this.isLoading = false;
      this.button = " Update";
    }
  }

  ngOnInit() {
    this.formUsrCommonGroup = this.formBuilder.group({
      CustomName: ["", Validators.required],
      IsActive: ["", Validators.nullValidator],
      IsAutoAssign: ["", Validators.nullValidator]
    });

    this.GetDropDowndata();
    this.getModelData();
    this.button = this.isEditDisable ? 'Update' : ' Save';
  }
  get fx() {
    return this.formUsrCommonGroup.controls;
  }


  ngOnDestroy(): void {
    this.submitted = false;
    this.AddCustomLableModelObj = new AddCustomLableModel();
  }

  CustomerNumber_Method() {
    this.CustomerNumbervalFlag = false;
  }
  editForms() {
    //debugger;
    this.formUsrCommonGroup.enable();
    this.isEditDisable = false;
    this.button = 'Update';
  }

  // submit form
  formButton() {
   
    this.submitted = true;
    if (this.formUsrCommonGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing";

    if (this.WorkOrderObj !== undefined) {
      this.AddCustomLableModelObj.PhotoLabel_pkeyID = this.WorkOrderObj;
    } else {
      this.AddCustomLableModelObj.PhotoLabel_pkeyID = 0;
    }
    this.AddCustomLableModelObj.AutoAssinArray = this.formArrayVal;
    // debugger;
    this.xAddCustomPhotoServices
      .CustomPhotoDataPost(this.AddCustomLableModelObj)
      .subscribe(response => {
       //debugger;
        if (response[0][0].Status != "-99") {
          this.AddCustomLableModelObj.PhotoLabel_pkeyID = parseInt(response[0][0].PhotoLabel_pkeyID);
          this.MessageFlag = "Custom Photos Saved...!";
          this.submitted = false;
          this.isLoading = false;
          this.WorkOrderObj = parseInt(response[0][0].PhotoLabel_pkeyID);
          this.GetSingleData();
          this.commonMessage();
        }
        else{
          if (response[0][0].Status == "-99") {
            this.MessageFlag = "This Record Allready Exist";
            this.submitted = false;
            this.isLoading = false;
            this.button = "Save"
            this.commonMessage();
          }else{
            this.MessageFlag = "Error while saviving in the database...!";
            this.submitted = false;
            this.commonMessage();
            this.isLoading = false;
            this.button = "Save"
          }

        }
      });
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = "Ok";
    modalRef.result.then(result => { }, reason => {
      this.update.emit();
      this.xmodalService.dismissAll();
    });
  }
  /// end common model
  CompanyList: any; // temp array
  CustomerList: any; // temp array
  WorkTypeList: any; // temp array
  CustomerNumberList: any;
  Loan_TypeList: any;

  GetDropDowndata() {
    this._drpdownmodelObj.Type=1;            //change by sandip
    this.xWorkOrderDrodownServices          //change by sandip
      .DropdownGetWorkOrder(this._drpdownmodelObj)
      .subscribe(response => {
        if (response.length != 0) {
          this.stateList = response[6];
          this.customerNumberList = response[9];
          this.CompanyList = response[0];
          this.workTypeList = response[1];
          this.loanTypeList = response[10];
          this.dropdownList = response[0];
          this.countryList = [];
          this.workTypeCategory = response[11];

          let tempMultiDropList = [
            this.dropdownList,
            this.customerNumberList,
            this.loanTypeList,
            this.workTypeList,
            this.workTypeCategory,
            this.stateList,
            this.countryList
          ]

          tempMultiDropList.forEach((list, index) => {
            //console.log(list, index)
            this.multiDropdowns[index].data = list;
          });

        }
      });
  }

  WorkOrderObj: any;
  isEditDisable = false;

  getModelData() {
    const id1 = this.PhotoLableId;
    if (id1==undefined || id1 == 'new') {
      this.AddCustomLableModelObj = new AddCustomLableModel();
    } else {
      this.WorkOrderObj = parseInt(id1);
      this.GetSingleData();
    }
  }

  GetSingleData() {
    this.ViewCustomPhotoLableModelObj.PhotoLabel_pkeyID = this.WorkOrderObj;
    this.ViewCustomPhotoLableModelObj.Type = 2;
    this.xViewCustomPhotoLabelServices.ViewCustomData(this.ViewCustomPhotoLableModelObj)
      .subscribe(response => {
        // debugger;
        //console.log('custom',response)
        this.AddCustomLableModelObj.PhotoLabel_Name = response[0][0].PhotoLabel_Name;
        this.AddCustomLableModelObj.PhotoLabel_Client_Id = response[0][0].PhotoLabel_Client_Id;
        this.AddCustomLableModelObj.PhotoLabel_WorkType_Id = response[0][0].PhotoLabel_WorkType_Id;
        this.AddCustomLableModelObj.PhotoLabel_Customer_Id = response[0][0].PhotoLabel_Customer_Id;
        this.AddCustomLableModelObj.PhotoLabel_Loan_Id = response[0][0].PhotoLabel_Loan_Id;
        this.AddCustomLableModelObj.PhotoLabel_IsActive = response[0][0].PhotoLabel_IsActive;
        this.AddCustomLableModelObj.PhotoLabel_IsAutoAssign = response[0][0].PhotoLabel_IsAutoAssign;
        this.AddCustomLableModelObj.PhotoLabel_Group_Id = response[0][0].PhotoLabel_Group_Id;
        this.AddCustomLableModelObj.CustomPhotoLabel_Filter_Master_PkeyId = response[0][0].CustomPhotoLabel_Filter_Master_PkeyId;
        this.formArrayVal = response[1];

        if (this.formArrayVal.length > 0) {
          for (let i = 0; this.formArrayVal.length > i; i++) {
            if (this.formArrayVal[i].CustomPhotoLabel_Filter_Client) {
              this.formArrayVal[i].Task_sett_Company = JSON.parse(
                this.formArrayVal[i].CustomPhotoLabel_Filter_Client
              );
            }

            if (this.formArrayVal[i].CustomPhotoLabel_Filter_County) {
              this.formArrayVal[i].Task_sett_Country = JSON.parse(
                this.formArrayVal[i].CustomPhotoLabel_Filter_County
              );
            }

            if (this.formArrayVal[i].CustomPhotoLabel_Filter_Customer) {
              this.formArrayVal[i].Task_sett_Customer = JSON.parse(
                this.formArrayVal[i].CustomPhotoLabel_Filter_Customer
              );
            }

            if (this.formArrayVal[i].CustomPhotoLabel_Filter_LoanType) {
              this.formArrayVal[i].Task_sett_Lone = JSON.parse(
                this.formArrayVal[i].CustomPhotoLabel_Filter_LoanType
              );
            }

            if (this.formArrayVal[i].CustomPhotoLabel_Filter_State) {
              this.formArrayVal[i].Task_sett_State = JSON.parse(
                this.formArrayVal[i].CustomPhotoLabel_Filter_State
              );
            }
            if (this.formArrayVal[i].CustomPhotoLabel_Filter_WorkTypeGroup) {
              this.formArrayVal[i].Task_Work_TypeGroup = JSON.parse(
                this.formArrayVal[i].CustomPhotoLabel_Filter_WorkTypeGroup
              );
            }
            if (this.formArrayVal[i].CustomPhotoLabel_Filter_WorkType) {
              this.formArrayVal[i].WTTaskWorkType = JSON.parse(
                this.formArrayVal[i].CustomPhotoLabel_Filter_WorkType
              );
            }
            if (this.formArrayVal[i].Task_sett_State.length > 0) {
              //console.log(this.formArrayVal[i].Task_sett_State);
              this.docModel.AutoAssinArray = this.formArrayVal;
               this.xAddUserServices.ContractorCountyList(this.docModel).subscribe(response => {
                 //console.log('countyList',response);
                 this.multiDropdowns[6].data = response[0];
              });
            }
          }
        } else {
          this.formArrayVal = [
            {
              Task_sett_State: [],
              Task_sett_Country: [],
              Task_sett_Zip: null,
              Task_sett_Customer: [],
              Task_sett_Company: [],
              Task_sett_Lone: [],
              Task_Work_TypeGroup: [],
              WTTaskWorkType: []
            }
          ];
        }
        this.formUsrCommonGroup.disable();
        this.isEditDisable = true;
      });
  }

  onItemSelect(item: any) {
    if (item.IPL_StateID != undefined) {
     if (this.formArrayVal[0].Task_sett_State.length > 0) {
      this.bindCountyDropDown();
     } else {
       this.multiDropdowns[6].data = [];
       this.formArrayVal[0].Task_sett_Country = [];
     }

    }
   }

   onItemDeSelect(item: any) {
    if (item.IPL_StateID != undefined) {
     if (this.formArrayVal[0].Task_sett_State.length > 0) {
       this.bindCountyDropDown();
     } else {
       this.multiDropdowns[6].data = [];
       this.formArrayVal[0].Task_sett_Country = [];
     }
    }
   }

   bindCountyDropDown()
  {
    //console.log(this.formArrayVal[0].Task_sett_State);
    this.docModel.AutoAssinArray = this.formArrayVal;
     this.xAddUserServices.ContractorCountyList(this.docModel).subscribe(response => {
       //console.log('countyList',response);
       this.multiDropdowns[6].data = response[0];
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

  hideshowDetails(arg) {
    if (arg) {
      this.hidedaa = false;
    } else {
      this.hidedaa = true;
    }
  }
}
