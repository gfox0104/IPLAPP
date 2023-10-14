import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { AccessUserLogFilters, } from '../../../../components/iplapp-filter-form/user-filter-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';
import { NgxSpinnerService } from "ngx-spinner";
import { State } from "@progress/kendo-data-query";
import { AdminCommonService } from "../../admin-link/admin-common-service";
import { FilterAdminCommonModelDTO } from "../../admin-link/admin-common-model";
import { viewAccessUserLogModal } from "./view-access-user-log-model";
import { viewAccessUserLogService } from "./view-access-user-log-service";


@Component({
  selector: 'app-view-access-user-log',
  templateUrl: './view-access-user-log.component.html',
  styleUrls: ['./view-access-user-log.component.scss']
})
export class ViewAccessUserLogComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;

  filterAdminCommon:FilterAdminCommonModelDTO = new  FilterAdminCommonModelDTO();
  viewAccessUserLogModalModelObj :  viewAccessUserLogModal = new viewAccessUserLogModal();
  public griddata: any[];
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag: String;
  formUsrCommonGroup: UntypedFormGroup;
  AccessUserLogFilters = AccessUserLogFilters;
  isHelpActive = false;
  public state: State = {};


  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private xviewAccessUserLogService:viewAccessUserLogService,
    private xAdminCommonService:AdminCommonService,

  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {
    
  }

  // formButton() {
  //   this.isSubmitted = false;
  //   this.xAddBackgroundProviderService
  //   .CreateUpdateBackgroundProviderDatapost(this.AddBackgroundProviderModalObj)
  //   .subscribe(response => {
  //     // console.log('sandip',response)
  //     if (response[0].Status != "0") {
  //       this.AddBackgroundProviderModalObj.Back_Chk_ProviderID = parseInt(response[0].Back_Chk_ProviderID);
  //       this.MessageFlag = "Background Provider Data Saved...!";
  //       this.isSubmitted = true;
  //       this.AddBackgroundProviderModalObj=new AddBackgroundProviderModal();
  //       this.commonMessage();
  //       this.GetGridData();

  //     }else {
  //       this.MessageFlag = "This Record Allready Exist";
  //       this.isSubmitted = true;
  //       this.commonMessage();
  //     }
  //   });

  // }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {
      if (!this.isHelpActive) {
        this.xmodalService.dismissAll()
      }
    });
  }

//   addstate(event, content) {
// if (event === 'Create Backgroung Provider') {
//       this.formUsrCommonGroup.enable();
//       this.isEditDisable = false;
//       this.AddBackgroundProviderModalObj = new AddBackgroundProviderModal();
//       this.xmodalService.open(content);
//     } else {
//       this.xmodalService.open(this.contentCateFORM);
//     }
//   }
GetGridData() {
    //  debugger
    this.xviewAccessUserLogService
      .ViewAccessUserLogData(this.viewAccessUserLogModalModelObj)
      .subscribe(response => {
        // console.log('sandip2',response)
        if (response.length > 1 && response[1].length > 0) {
          this.viewAccessUserLogModalModelObj.Acc_UserAction= response[1][0].Filter_FilterName;
          this.viewAccessUserLogModalModelObj.Acc_Access_Log_Data= response[1][0].Acc_Access_Log_Data;
          this.viewAccessUserLogModalModelObj.Acc_Type_of_Log= response[1][0].Acc_Type_of_Log;
          this.viewAccessUserLogModalModelObj.Acc_Log_Details= response[1][0].Acc_Log_Details;
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
// showDetails(content, dataItem) {
//     this.AddBackgroundProviderModalObj.Back_Chk_ProviderID = dataItem.Back_Chk_ProviderID;
//     this.AddBackgroundProviderModalObj.Back_Chk_ProviderName = dataItem.Back_Chk_ProviderName;
//     this.AddBackgroundProviderModalObj.Back_Chk_IsActive = dataItem.Back_Chk_IsActive;
//     this.isEditDisable = true;
//     this.formUsrCommonGroup.disable();
//     this.xmodalService.open(content);
//   }


  closeModal() {
    this.xmodalService.dismissAll();
  }

  // clear data
  AddNewState() {
    this.xRouter.navigate(["/state/addstate", 'new']);
  }

  // deleteDetails(event, dataItem) {
  //   //  debugger
  //   var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
  //   if (cfrm == true) {
  //     this.AddBackgroundProviderModalObj.Back_Chk_ProviderID = dataItem.Back_Chk_ProviderID;
  //     this.AddBackgroundProviderModalObj.Back_Chk_IsDelete = true;
  //     this.xAddBackgroundProviderService
  //       .CreateUpdateBackgroundProviderDatapost(this.AddBackgroundProviderModalObj)
  //       .subscribe(response => {
  //         this.MessageFlag = "Deleted Successfully"
  //       this.commonMessage();
  //         this.AddBackgroundProviderModalObj=new AddBackgroundProviderModal();
  //         this.GetGridData();
  //       });
  //   }

  // }



  filterCall() {
    // debugger
    this.viewAccessUserLogModalModelObj.Type = 3;
    this.xviewAccessUserLogService
      .ViewAccessUserLogData(this.viewAccessUserLogModalModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        this.griddata = response[0];
      });
  }
  clearData(){
    this.filterAdminCommon.Filter_PageType=1;
    this.filterAdminCommon.Filter_FilterName=this.viewAccessUserLogModalModelObj.Acc_UserAction;
    this.filterAdminCommon.Type=5;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        this.viewAccessUserLogModalModelObj = new viewAccessUserLogModal();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.filterAdminCommon.Filter_PageType=1;
    this.filterAdminCommon.Filter_FilterName=this.viewAccessUserLogModalModelObj.Acc_UserAction
    this.filterAdminCommon.Type=1;
    this.xAdminCommonService
      .AddUpdateFilterAdminCommonData(this.filterAdminCommon)
      .subscribe(response => {
        // console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }


  DispalyInfo(event) {
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }
  // checkChange(event, dataItem) {
  //   // debugger;
  //   this.AddBackgroundProviderModalObj.Back_Chk_ProviderID =dataItem.Back_Chk_ProviderID;
  //   this.AddBackgroundProviderModalObj.Back_Chk_IsActive = !dataItem.Back_Chk_IsActive;
  //   this.AddBackgroundProviderModalObj.Type = 3;

  //   this.xAddBackgroundProviderService
  //     .CreateUpdateBackgroundProviderDatapost(this.AddBackgroundProviderModalObj)
  //     .subscribe(response => {
  //       this.MessageFlag = "Status upated...!";
  //       this.AddBackgroundProviderModalObj=new AddBackgroundProviderModal();
  //       this.commonMessage();
  //       this.GetGridData();
  //     });
  // }

  // kendo check box event action

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }


}
