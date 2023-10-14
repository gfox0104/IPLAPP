import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { IplAppModalContent } from 'src/app/components';

import { RepairBaseHomeService } from './repair-base-home.service';

@Component({
  selector: 'app-repair-base-home',
  templateUrl: './repair-base-home.component.html',
  styleUrls: ['./repair-base-home.component.scss']
})
export class RepairBaseHomeComponent implements OnInit {

  estmateData: any;
  skip: number = 0;
  public griddata: any = [];
  getEstimateUrl = '';
  getEstimateAuth = '';
  MessageFlag: string;
  constructor(
    private xRouter: Router,
    private xRepairBaseHomeService: RepairBaseHomeService,
    private spinner: NgxSpinnerService,
    private xModalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.GetCredentialData();
  }


  createEstimation() {
    //console.log(this.xRouter);
    this.xRouter.navigate(["repairBase/repairMain/repairHome/create"]);
  }
  searchEstimation() {
    this.xRouter.navigate(['repairBase/repairMain/repairHome/search']);
  }

  getEstimate() {
    //debugger
      this.xRepairBaseHomeService
        .getEstimate(this.getEstimateUrl, this.getEstimateAuth)
        .subscribe(
          (response) => {   
            //debugger                        //Next callback
            this.griddata = response['orders'];
            this.spinner.hide();
          },
          (error) => {    
            //debugger;                          //Error callback
            this.spinner.hide();
            this.MessageFlag = "Unable to load data, please check credential and api url..!";
            this.commonMessage();
          })
  }

  GetCredentialData() {
    this.xRepairBaseHomeService
      .GetRepairBaseUserMasterDetail()
      .subscribe(response => {
        //console.log("resp User", response);
        if (response[0].length > 0) {
          //debugger
          this.getEstimateUrl = response[0][0].Rep_UM_TestApiUrl + '/api/v1/orders/orderTypes/' + response[0][0].Rep_UM_ProductType + '/search?pageSize=100&api_key=' + response[0][0].Rep_UM_Apikey;
          this.getEstimateAuth = response[0][0].Rep_UM_ApiAuthorization;
          this.getEstimate();
        }
        else {
          //debugger;
          this.spinner.hide();
          this.MessageFlag = "Unable to load data, please check credential and api url..!";
          this.commonMessage();
        }
      });
  }

  pageChange(event) {
    this.skip = event.skip;
  }

  showDetails(event, dataItem) {
    this.xRouter.navigate(['repairBase/repairMain/repairHome/addRoom', dataItem.id]);
  }

  // common message modal popup
  commonMessage() {
    const modalRef = this.xModalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = "OK";
    modalRef.result.then(result => { }, reason => { });
  }
}
