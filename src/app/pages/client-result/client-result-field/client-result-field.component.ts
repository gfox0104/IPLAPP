import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

// import { MasterlayoutComponent } from "../../Home/MasterComponent";
import { TaskBidMasterModel } from '../client-result/client-result-model';
import { ClientResultServices } from '../client-result/client-result.service';
import { EncrDecrService } from "../../../services/util/encr-decr.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./client-result-field.component.html"
})
export class ClientResultFieldComponent implements OnInit {
  decuser:any;
  OfficeResulth:boolean = false;
  processorh:boolean = false;
  tabhide:boolean = false;

  constructor(
    private xRouter: Router,
    // private xMasterlayoutComponent: MasterlayoutComponent,
    private xRoute: ActivatedRoute,
    private xClientResultServices: ClientResultServices,
    private EncrDecr: EncrDecrService,
    private spinner: NgxSpinnerService
  ) {
    if(localStorage.getItem('usertemp_') != null)
    {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval  = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.decuser  =JSON.parse(decval) ;

      switch (this.decuser[0].GroupRoleId) {
        case 1:
          {
            this.OfficeResulth = false;
            this.processorh= false;
            this.tabhide = false;
         
            break;
          }
          case 2:
            {
              this.OfficeResulth = true;
              this.processorh= false;
              this.tabhide = true;
             
              break;
            }
            case 3:
              {
                this.OfficeResulth = false;
                 this.processorh= false;
                 this.tabhide = false;
              
                break;
              }
              case 4:
                {
                  this.OfficeResulth = false;
                  this.processorh= false;
                  this.tabhide = false;
                  break;
                }
                case 5:
                {
                  this.OfficeResulth = false;
                  this.processorh= false;
                  this.tabhide = false;
                  break;
                }
        }
    }
  }
  ngOnInit() {
    this.getModelData();
    this.showSpinner()
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
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
      if (this.BindData == undefined) {
        this.xRouter.navigate(["/workorder"]);
      } else {
      }
    });
  }
}
