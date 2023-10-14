import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '@progress/kendo-angular-charts';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { NgxSpinnerService } from 'ngx-spinner';
import { IplAppModalContent } from 'src/app/components';
import { AllowableFilters } from 'src/app/components/iplapp-filter-form/user-filter-form';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import {Buttons,} from '../constants/buttons';
import {FormFields} from '../constants/form-fields'
import { AddAllowablesModel, ViewAllowablesModel } from './view-allowables-details-model';
import { ViewAllowablesServices } from './view-allowables-details.service';
@Component({
  selector: 'app-view-allowables-details',
  templateUrl: './view-allowables-details.component.html',
  styleUrls: ['./view-allowables-details.component.scss']
})
export class ViewAllowablesDetailsComponent implements OnInit {
  @ViewChild('contentCateFORM') contentCateFORM: ElementRef;
  public griddata: any[];
  ViewAllowablesModelObj:ViewAllowablesModel = new ViewAllowablesModel();
  AddAllowablesModelObj:AddAllowablesModel = new AddAllowablesModel();
buttons = Buttons;
  filters = AllowableFilters;
  FormFields = FormFields;
  formUsrCommonGroup: UntypedFormGroup;
  isEditDisable = false;
  isSubmitted: boolean;
  MessageFlag:string;
  WorkOrderObj:any;
  public state: State = {};
  isHelpActive = false;
  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xViewAllowablesServices:ViewAllowablesServices,
    private spinner: NgxSpinnerService,
  ) {
    this.GetGridData();
  }

  ngOnInit() {
    this.spinner.show();
     this.formUsrCommonGroup = this.formBuilder.group({
      allowablesnameVal: ["", Validators.required],
      allowcheckboxval: ["", Validators.nullValidator]
  });}

  addallowables(event, content) {
    //debugger
    if (event === 'Add Category') {
      this.formUsrCommonGroup.enable();
      this.isEditDisable = false;
      this.AddAllowablesModelObj = new AddAllowablesModel();
      this.xmodalService.open(content);
    } else {
      this.xmodalService.open(this.contentCateFORM);
    }
  }

    // submit form
    formButton() {
      this.isSubmitted = false;
      if (this.WorkOrderObj !== undefined) {
        this.AddAllowablesModelObj.Allowables_Cat_PkeyId = this.WorkOrderObj;
      } else {
        this.AddAllowablesModelObj.Allowables_Cat_PkeyId = 0;
      }

      this.xViewAllowablesServices
      .PostAllowableData(this.AddAllowablesModelObj)
      .subscribe(response =>{
          if (response[0].Status != "0") {
            this.AddAllowablesModelObj.Allowables_Cat_PkeyId = parseInt(response[0].Allowables_Cat_PkeyId);
            this.MessageFlag = "Category Data Saved...!";
            this.isSubmitted = true;
            this.commonMessage();
            this.GetGridData();
          }

        });

    }

    // common message modal popup
    commonMessage() {
      const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
      modalRef.componentInstance.MessageFlag = this.MessageFlag;
      modalRef.result.then(result => { }, reason => {
        if (!this.isHelpActive) {
          this.xmodalService.dismissAll();
        }
       });
    }
    closeModal() {
      this.xmodalService.dismissAll();
    }
  //get grid
  GetGridData() {
    this.xViewAllowablesServices.GetAllowablesData(this.ViewAllowablesModelObj)
    .subscribe(response =>{
      // console.log('sun12',response)

      if (response.length > 1 && response[1].length > 0) {
        this.ViewAllowablesModelObj.Allowables_Cat_Name = response[1][0].Allowables_Cat_Filter_Name;
        this.ViewAllowablesModelObj.Allowables_Cat_IsActive = response[1][0].Allowables_Cat_Filter_IsCateActive;
        this.ViewAllowablesModelObj.Allowables_Cat_CreatedBy = response[1][0];
        this.ViewAllowablesModelObj.Allowables_Cat_ModifiedBy = response[1][0];
        this.filterCall();
        this.spinner.hide();
      }
      else{
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
        }
        this.spinner.hide();
      }
    })
  }

  // this code selected event row
  showDetails(content, dataItem) {
//debugger
this.WorkOrderObj  =  dataItem.Allowables_Cat_PkeyId;
    this.AddAllowablesModelObj.Allowables_Cat_PkeyId = dataItem.Allowables_Cat_PkeyId;
    this.AddAllowablesModelObj.Allowables_Cat_Name = dataItem.Allowables_Cat_Name;
    this.AddAllowablesModelObj.Allowables_Cat_IsActive = dataItem.Allowables_Cat_IsActive;
    this.isEditDisable = true;
    this.formUsrCommonGroup.disable();
    this.xmodalService.open(content);

  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddAllowablesModelObj.Allowables_Cat_PkeyId = dataItem.Allowables_Cat_PkeyId;
      this.AddAllowablesModelObj.Allowables_Cat_IsDelete = true;

      this.xViewAllowablesServices
        .PostAllowableData(this.AddAllowablesModelObj)
        .subscribe(response => {
          this.GetGridData();
        });
    }
  }

  filterCall() {
    this.ViewAllowablesModelObj.Type = 3;
    this.xViewAllowablesServices
    .GetAllowablesData(this.ViewAllowablesModelObj)
    .subscribe(response => {
      this.state.take = 15;
      this.state.skip = 0;
      this.griddata = response[0];
    });

   }

   clearData() {
    this.ViewAllowablesModelObj.Type = 5;
    this.xViewAllowablesServices
    .AddUpdateFilterAdminAllowableCategoryData(this.ViewAllowablesModelObj)
    .subscribe(response => {
      this.ViewAllowablesModelObj = new   ViewAllowablesModel();
      this.GetGridData();
    })
   }

   saveFilterData() {
    this.ViewAllowablesModelObj.Type = 1;
    this.xViewAllowablesServices
    .AddUpdateFilterAdminAllowableCategoryData(this.ViewAllowablesModelObj)
    .subscribe(response => {
      this.MessageFlag = "Allowables Category filter saved...!";
      this.commonMessage();
      this.filterCall();
    })
   }

  // clear data
  AddNewItem() {

  }
  checkChange(event, dataItem) {
    this.AddAllowablesModelObj.Allowables_Cat_PkeyId = dataItem.Allowables_Cat_PkeyId;
    this.AddAllowablesModelObj.Allowables_Cat_IsActive = !dataItem.Allowables_Cat_IsActive;
    this.AddAllowablesModelObj.Type = 3;

    this.xViewAllowablesServices
        .PostAllowableData(this.AddAllowablesModelObj)
    .subscribe(response => {
      this.MessageFlag = "Status upated...!";


      this.commonMessage();
        this.GetGridData();
      });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

  DispalyInfo(event) {
    //debugger;
    this.isHelpActive = event.isHelpActive;
    this.MessageFlag = "Add Information for " + event.lblName;
    this.commonMessage();
  }

}
