import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { NgxSpinnerService } from 'ngx-spinner';
import { IplAppModalContent } from 'src/app/components';
import { PropertyLockReasonFilter } from 'src/app/components/iplapp-filter-form/user-filter-form';
import { FilterAdminCommonModelDTO } from '../../admin-link/admin-common-model';
import { AdminCommonService } from '../../admin-link/admin-common-service';
import { Buttons, FormFields } from '../constants';
import { PropertyLockReasonMaster } from './property-lock-reason.model';
import { PropertyLockReasonService } from './property-lock-reason.service';

@Component({
  selector: 'app-property-lock-reason',
  templateUrl: './property-lock-reason.component.html',
  styleUrls: ['./property-lock-reason.component.scss']
})
export class PropertyLockReasonComponent implements OnInit {

  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  filterAdminCommon:FilterAdminCommonModelDTO = new  FilterAdminCommonModelDTO();
  propertyLockReason : PropertyLockReasonMaster = new PropertyLockReasonMaster();
  AddpropertyLockReason : PropertyLockReasonMaster = new PropertyLockReasonMaster();
  public griddata: any[];
  formUsrCommonGroup: UntypedFormGroup;
  FormFields = FormFields;
  buttons = Buttons;
  PropertyLockReasonFilter = PropertyLockReasonFilter;
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;


  isHelpActive = false;
  public state: State = {};
  constructor(private spinner: NgxSpinnerService,
    private xPropertyLockReasonService:PropertyLockReasonService,
    private xAdminCommonService:AdminCommonService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder) {


    }

  ngOnInit(): void {
    this.spinner.show();
    this.GetGridData();

    this.formUsrCommonGroup = this.formBuilder.group({
      Propertyname: ["", Validators.required],
      protype: ["", Validators.nullValidator],
    });
  }
  GetGridData() {
    this.xPropertyLockReasonService
      .GetPropertyLockReason(this.propertyLockReason)
      .subscribe(response => {
        if (response.length > 1 && response[1].length > 0) {
          this.propertyLockReason.LockReason_Name= response[1][0].Filter_FilterName;
          this.propertyLockReason.LockReason_IsActive = response[1][0].Filter_FilterIsActive;
          this.propertyLockReason.LockReason_CreatedBy = response[1][0];
          this.propertyLockReason.LockReason_ModifiedBy = response[1][0];
          this.filterCall();
          this.spinner.hide();
        }
        else {
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
          }

          this.spinner.hide();
        }

      });
      // console.log()
  }

  filterCall() {
    this.propertyLockReason.Type = 3;
    this.xPropertyLockReasonService
      .GetPropertyLockReason(this.propertyLockReason)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });

  }
  clearData(){
    this.filterAdminCommon.Filter_PageType=3;
    this.filterAdminCommon.Filter_FilterName=this.propertyLockReason.LockReason_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.propertyLockReason.LockReason_IsActive;
    this.filterAdminCommon.Type=5;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        this.propertyLockReason = new PropertyLockReasonMaster();
        this.GetGridData();
      });
  }
  saveFilterData() {
    this.filterAdminCommon.Filter_PageType=3;
    this.filterAdminCommon.Filter_FilterName=this.propertyLockReason.LockReason_Name;
    this.filterAdminCommon.Filter_FilterIsActive=this.propertyLockReason.LockReason_IsActive;
    this.filterAdminCommon.Type=1;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        //console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }
  AddLockReason(event, content) {
    // debugger;
    if (event === 'Create Lock Reason') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddpropertyLockReason = new PropertyLockReasonMaster();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  UpdateLockReasonStatus(event, dataItem) {
    this.AddpropertyLockReason=new PropertyLockReasonMaster();
    this.AddpropertyLockReason.LockReason_PkeyID = dataItem.LockReason_PkeyID ;
    this.AddpropertyLockReason.LockReason_IsActive = !dataItem.LockReason_IsActive;
    this.AddpropertyLockReason.Type = 3;

    this.xPropertyLockReasonService
      .PostPropertyLockReason(this.AddpropertyLockReason)
      .subscribe(response => {
        this.MessageFlag = "Status upated...!";
        this.commonMessage();
        this.GetGridData();
      });
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
      if (!this.isHelpActive) {
        this.xmodalService.dismissAll()
      }
    });
  }
  EditLockReason(content, dataItem) {
    // this.WorkOrderObj = dataItem.PA_PkeyID
    this.AddpropertyLockReason=new PropertyLockReasonMaster();
    this.AddpropertyLockReason.LockReason_PkeyID = dataItem.LockReason_PkeyID;
    this.AddpropertyLockReason.LockReason_Name = dataItem.LockReason_Name;
    this.AddpropertyLockReason.LockReason_IsActive = dataItem.LockReason_IsActive;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);
  }
  DeleteLockReason(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddpropertyLockReason.LockReason_PkeyID = dataItem.LockReason_PkeyID ;
      this.AddpropertyLockReason.LockReason_IsDelete = true;
      this.AddpropertyLockReason.Type = 4;
      this.commonMessage();
      this.MessageFlag = "Deleted Successfully"
      this.xPropertyLockReasonService
        .PostPropertyLockReason(this.AddpropertyLockReason)
        .subscribe(response => {
          this.AddpropertyLockReason=new PropertyLockReasonMaster();
          this.GetGridData();
        });

    }
  }
  SubmitForm() {
    this.isSubmitted = false;
    this.xPropertyLockReasonService
    .PostPropertyLockReason(this.AddpropertyLockReason)
    .subscribe(response => {
      if (response[0].Status != "0") {
        this.AddpropertyLockReason.LockReason_PkeyID= parseInt(response[0].LockReason_PkeyID);
        this.MessageFlag = "Property Lock Reason saved...!";
        this.isSubmitted = true;
        this.commonMessage();
        this.GetGridData();

      }else {
        this.MessageFlag = "This Record Allready Exist";
        this.isSubmitted = true;
        this.commonMessage();
      }
    });

  }
  closeModal() {
    this.xmodalService.dismissAll();
  }
  DispalyInfo(event) {
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }

}
