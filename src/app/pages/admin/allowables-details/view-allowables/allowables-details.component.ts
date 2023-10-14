import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { IplAppModalContent } from 'src/app/components/iplapp-modal-content/iplapp-modal-content.component';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { AllowablesDetails } from './allowables-details.model';
import { AllowablesServices } from './allowables-details.service';
import {Buttons} from '../constants/buttons'
import {FormFields} from '../constants/form-fields'
import { AddAllowableFilters } from 'src/app/components/iplapp-filter-form/user-filter-form';
import { PostAllowablesDetails } from '../add-allowables/allowables-details.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-allowables-details',
  templateUrl: './allowables-details.component.html',
  styleUrls: ['./allowables-details.component.scss'],

})
export class AllowablesDetailsComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  public griddata: any[];
  AllowablesDetailsObj:AllowablesDetails = new AllowablesDetails()
  PostAllowablesDetailsObj:PostAllowablesDetails = new PostAllowablesDetails();
  buttons = Buttons;
  filters = AddAllowableFilters;
   FormFields = FormFields;
  formUsrCommonGroup: UntypedFormGroup;
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag:string;
  WorkOrderObj:any;
  public state: State = {};
  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xAllowablesServices :AllowablesServices,
    private spinner: NgxSpinnerService,

  ) {
    this.GetGridData();

  }

  ngOnInit() {
    this.spinner.show();
     this.formUsrCommonGroup = this.formBuilder.group({
      allowablesVal: ["", Validators.required],
      startallowablesVal: ["", Validators.required],
      endallowablesVal: ["", Validators.required],
      catallowablesVal: ["", Validators.required],
      allowcheckboxval: ["", Validators.nullValidator]
  });}




    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => {this.xmodalService.dismissAll() });
    }
    closeModal() {
      this.xmodalService.dismissAll();
    }
  //get grid
  GetGridData() {
    this.xAllowablesServices.GetAllowablesDetail(this.AllowablesDetailsObj)
    .subscribe(response =>{
      // console.log('veiw11',response)
      if (response.length > 1 && response[1].length > 0) {
        this.AllowablesDetailsObj.Allowable_Name = response[1][0].Filter_Admin_Allowable_Name;
        this.AllowablesDetailsObj.Allowable_IsActive = response[1][0].Filter_Admin_Allowable_Isallowable;
        this.AllowablesDetailsObj.Allowable_StartDate = response[1][0].Filter_Admin_Allowable_StartDate;
        this.AllowablesDetailsObj.Allowable_EndDate = response[1][0].Filter_Admin_Allowable_EndDate;
        this.AllowablesDetailsObj.Allowable_OverallAllowables = response[1][0].Filter_Admin_Allowable_OverallAllowables;
        this.AllowablesDetailsObj.Allowable_CreatedBy = response[1][0];
        this.AllowablesDetailsObj.Allowable_ModifiedBy = response[1][0];
        this.filterCall();
        this.spinner.hide();
      }
      else{
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
           var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Allowable_PKeyId);
           element.ViewUrl = "/home/allowables/addallowales/" + btoa(encrypted);

         });
        }
        this.spinner.hide();
      }
    })
  }



  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.PostAllowablesDetailsObj.Allowable_PKeyId = dataItem.Allowable_PKeyId;
      this.PostAllowablesDetailsObj.Allowable_IsDelete = true;

      this.xAllowablesServices
      .PostAllowableMasterData(this.PostAllowablesDetailsObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  filterCall() {
    this.AllowablesDetailsObj.Type = 3;
    this.xAllowablesServices.GetAllowablesDetail(this.AllowablesDetailsObj)
    .subscribe(response => {
      this.state.take = 15;
      this.state.skip = 0;
      this.griddata = response[0];
    });

   }

   clearData() {
    this.AllowablesDetailsObj.Type = 5;
    this.xAllowablesServices
    .AddUpdateFilterAdminAllowableData(this.AllowablesDetailsObj)
    .subscribe(response => {
      this.AllowablesDetailsObj = new   AllowablesDetails();
      this.GetGridData();
    })
   }

   saveFilterData() {
    this.AllowablesDetailsObj.Type = 1;
    this.xAllowablesServices
    .AddUpdateFilterAdminAllowableData(this.AllowablesDetailsObj)
    .subscribe(response => {
      this.MessageFlag = "Allowables filter saved...!";
      this.commonMessage();
      this.filterCall();
    })
   }

  // clear data
  AddNewItem() {

  }
  checkChange(event, dataItem) {
    this.PostAllowablesDetailsObj.Allowable_PKeyId = dataItem.Allowable_PKeyId;
    this.PostAllowablesDetailsObj.Allowable_IsActive = !dataItem.Allowable_IsActive;
    this.PostAllowablesDetailsObj.Type = 3;

    this.xAllowablesServices
    .PostAllowableMasterData(this.PostAllowablesDetailsObj)
    .subscribe(response => {
      this.MessageFlag = "Status upated...!";
      this.commonMessage();
        this.GetGridData();
      });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

}
