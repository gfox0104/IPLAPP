import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ViewCompanyInfoModel, filterMasterModel } from "./view-company-info-model";
import { ViewCompanyInfoServices } from "./view-company-info.service";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, GridColumns, Filters } from '../constants';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyInfoModel } from "../add-company-info/add-company-info-model";
import { CompanyInfoServices } from "../add-company-info/add-company-info.service";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";

@Component({
  templateUrl: "./view-company-info.component.html",
  styles:[`
      @media(max-width:900px){
        .onLarge{
          display:none
        }
      }
  `]
})
export class ViewCompanyInfoComponent implements OnInit {
  ViewCompanyInfoModelObj: ViewCompanyInfoModel = new ViewCompanyInfoModel();
  filterMasterModelObj: filterMasterModel = new filterMasterModel();
  CompanyInfoModelObj: CompanyInfoModel = new CompanyInfoModel();
  public griddata: any[];
  buttons = Buttons;
  filters = Filters;
  gridColumns = GridColumns;
  MessageFlag: string;
  public state: State = {};
  constructor(
    private xViewCompanyInfoServices: ViewCompanyInfoServices,
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private xCompanyInfoServices: CompanyInfoServices,
  ) {
    this.GetCompanyData();
  }

  ngOnInit() { }

  GetCompanyData() {
    this.xViewCompanyInfoServices.ViewCompanyInfoData(this.filterMasterModelObj)
      .subscribe(response => {
        //console.log('res',response);
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.YR_Company_pkeyID);
            element.ViewUrl = "/home/company/companyinfo/" + btoa(encrypted);
          });
        }

      });
  }



  filterCall() {
    this.filterMasterModelObj.Type = 3;

    this.xViewCompanyInfoServices.ViewCompanyInfoData(this.filterMasterModelObj)
      .subscribe(response => {
        this.state.take = 15;
        this.state.skip = 0;
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.YR_Company_pkeyID);
            element.ViewUrl = "/home/company/companyinfo/" + btoa(encrypted);
          });

        }

      });
  }

  clearData() {
    this.filterMasterModelObj = new filterMasterModel();
    this.GetCompanyData();
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  checkChange(event, dataItem) {
  ////dfebugger;
    this.CompanyInfoModelObj.YR_Company_pkeyID = dataItem.YR_Company_pkeyID;
    this.CompanyInfoModelObj.YR_Company_IsActive = !dataItem.YR_Company_IsActive;
    this.CompanyInfoModelObj.Type = 3;

    this.xCompanyInfoServices
      .CompanyInfotDataPost(this.CompanyInfoModelObj)
      .subscribe(response => {
      this.MessageFlag = "Company status upated...!";


      this.commonMessage();
        this.GetCompanyData();
      });
  }


  saveFilterData() {
    alert('save called');
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
