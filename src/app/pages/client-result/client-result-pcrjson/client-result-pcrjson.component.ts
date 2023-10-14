import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
// import { MasterlayoutComponent } from 'src/IPLAPP/Home/MasterComponent';
import { ClientResultPCRServices } from "../client-result-pcr/client-result-pcr.service";
import { PCR_FiveBrotherModel } from "../client-result-pcr/client-result-pcr-model";
import { TaskBidMasterModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { EncrDecrService } from "src/app/services/util/encr-decr.service";


@Component({
  templateUrl: "./client-result-pcrjson.component.html"
})
export class ClientResultPcrJsonComponent implements OnInit {

  PCR_FiveBrotherModelObj: PCR_FiveBrotherModel = new PCR_FiveBrotherModel();
  MessageFlag;
  constructor(
    private xRouter: Router,
    // private xMasterlayoutComponent: MasterlayoutComponent,
    private xClientResultPCRServices: ClientResultPCRServices,
    private xRoute: ActivatedRoute,
    private xClientResultServices: ClientResultServices,
    private EncrDecr: EncrDecrService
  ) { }

  ngOnInit() {
    this.getModelData();
  }

  ModelObj: any;
  BindData: any;
  TaskBidMasterModelObj: TaskBidMasterModel = new TaskBidMasterModel();
  getModelData() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];
    let workOrderID = this.EncrDecr.get('123456$#@$^@1ERF', atob(workorder1));
    const workorder = parseInt(workOrderID);
    this.TaskBidMasterModelObj.workOrder_ID = workorder;
    this.xClientResultServices
      .WorkorderViewClient(this.TaskBidMasterModelObj)
      .subscribe(response => {
        this.BindData = response[0][0];
        this.xClientResultServices.setPathParam(this.BindData)
        this.ModelObj = this.BindData;
        if (this.ModelObj == undefined) {
          this.xRouter.navigate(["/workorder"]);
        } else {
          this.GetFiveBrotherData();
        }
      });
  }

  GetFiveBrotherData() {
    this.PCR_FiveBrotherModelObj.PCR_FiveBro_WO_ID = this.ModelObj.workOrder_ID;
    this.xClientResultPCRServices
      .GetFiveBrotherDetails(this.PCR_FiveBrotherModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_id = response[0][0].PCR_FiveBro_id;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_WO_ID = response[0][0].PCR_FiveBro_WO_ID;
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Propertyinfo = JSON.parse(response[0][0].PCR_FiveBro_Propertyinfo);

          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Violations = JSON.parse(response[0][0].PCR_FiveBro_Violations);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Securing = JSON.parse(response[0][0].PCR_FiveBro_Securing);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Winterization = JSON.parse(response[0][0].PCR_FiveBro_Winterization);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Yard = JSON.parse(response[0][0].PCR_FiveBro_Yard);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Debris_Hazards = JSON.parse(response[0][0].PCR_FiveBro_Debris_Hazards);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Roof = JSON.parse(response[0][0].PCR_FiveBro_Roof);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Pool = JSON.parse(response[0][0].PCR_FiveBro_Pool);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Utilities = JSON.parse(response[0][0].PCR_FiveBro_Utilities);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Appliances = JSON.parse(response[0][0].PCR_FiveBro_Appliances);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Damages = JSON.parse(response[0][0].PCR_FiveBro_Damages);
          this.PCR_FiveBrotherModelObj.PCR_FiveBro_Conveyance = JSON.parse(response[0][0].PCR_FiveBro_Conveyance);

        }
      });

  }

  back() {
    const workorder1 = this.xRoute.snapshot.params['workorder'];

    this.xRouter.navigate(["/client/clientresult/" + workorder1]);
  }

}