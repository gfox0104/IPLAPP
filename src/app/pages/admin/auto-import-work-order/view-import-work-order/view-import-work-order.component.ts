import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "@progress/kendo-data-query";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { AutoImportFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
// import { MasterlayoutComponent } from "../../../Home/MasterComponent";
import { viewAutoImportWorkorderModel } from "./view-import-work-order-model";
import { AutoImportWorkorderModel } from "../auto-import-work-order/auto-import-work-order-model";
import { AutoImportWorkOrderService } from "../auto-import-work-order/auto-import-work-order.service";
import { ViewAutoImportWoService } from "./view-import-work-order.service";
import { Buttons, GridColumns } from '../constants';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EncrDecrService } from "src/app/services/util/encr-decr.service";
import { WorkOrderDrodownServices } from "src/app/pages/services/common-drop-down/drop-down.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: "./view-import-work-order.component.html"
})

export class ViewAutoImportWoComponent implements OnInit {

  viewAutoImportWorkorderModelObj: viewAutoImportWorkorderModel = new viewAutoImportWorkorderModel();
  AutoImportWorkorderModelObj: AutoImportWorkorderModel = new AutoImportWorkorderModel();
  public griddata: any[];
  buttons = Buttons;
  gridColumns = GridColumns;
  AutoImportFilters = AutoImportFilters;
  MessageFlag: string;
  public state: State = {};
  constructor(
    // private xMasterlayoutComponent: MasterlayoutComponent,
    private xRouter: Router,
    private xAutoImportWorkOrderService: AutoImportWorkOrderService,
    private xViewAutoImportWoService: ViewAutoImportWoService,
    private xmodalService: NgbModal,
    private EncrDecr: EncrDecrService,
    private xWorkOrderDrodownServices: WorkOrderDrodownServices,
    private spinner: NgxSpinnerService,
  ) {
    this.GetCompanyDropDown()
    this.GetGridData();
  }

  ngOnInit() {
    this.spinner.show();
  }

  // this code selected event row
  showDetails(event, dataItem) {
    this.xViewAutoImportWoService.setPathParam(dataItem);
    this.xRouter.navigate(["/home/autoimport/autoimportwo"]);
  }
  GetCompanyDropDown() {
    this.xWorkOrderDrodownServices.DropdownGetWorkOrder().subscribe(response => {
      // //console.log('drdlst',response)
      this.AutoImportFilters[0].data = response[12];

    });
  }

  filterCall() {
    // //console.log('filter',this.viewAutoImportWorkorderModelObj)
    this.viewAutoImportWorkorderModelObj.Type = 4;
    this.xViewAutoImportWoService
      .ViewAutoImportData(this.viewAutoImportWorkorderModelObj)
      .subscribe(response => {
        // //console.log('filter atuo',response)
        this.state.take = 15;
        this.state.skip = 0;
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            this.xViewAutoImportWoService.setPathParam(element);
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.WI_Pkey_ID);
            element.ViewUrl = "/home/autoimport/autoimportwo/" + btoa(encrypted);
          });
        }


      });

  }

  clearData() {
    this.viewAutoImportWorkorderModelObj.Type = 5;
    this.xViewAutoImportWoService
      .AddUpdateFilterAdminImportData(this.viewAutoImportWorkorderModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.viewAutoImportWorkorderModelObj = new   viewAutoImportWorkorderModel();
        this.GetGridData();
      });


  }
  saveFilterData() {
    this.viewAutoImportWorkorderModelObj.Type = 1;
    this.xViewAutoImportWoService
      .AddUpdateFilterAdminImportData(this.viewAutoImportWorkorderModelObj)
      .subscribe(response => {
        // //console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AutoImportWorkorderModelObj.WI_Pkey_ID = dataItem.WI_Pkey_ID;
      this.AutoImportWorkorderModelObj.WI_IsDeleted = true;
      this.AutoImportWorkorderModelObj.WI_IsActive = false;

      this.xAutoImportWorkOrderService
        .AutoImportWorkOrderPost(this.AutoImportWorkorderModelObj)
        .subscribe(response => {
          this.GetGridData();
        });

    }
  }

  //get grid
  GetGridData() {
    this.xViewAutoImportWoService
      .ViewAutoImportData(this.viewAutoImportWorkorderModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        //debugger;
        if (response.length > 1 && response[1].length > 0) {
          this.viewAutoImportWorkorderModelObj.Import_Form_Name =  response[1][0].Import_Filter_ImpFromID;
          this.viewAutoImportWorkorderModelObj.Client_Company_Name =  response[1][0].Import_Filter_ClientName;
          this.viewAutoImportWorkorderModelObj.WI_LoginName =  response[1][0].Import_Filter_LoginName;
          this.viewAutoImportWorkorderModelObj.WI_FriendlyName =  response[1][0].Import_Filter_ImpName;
          this.viewAutoImportWorkorderModelObj.WI_IsActive =  response[1][0].Import_Filter_ImpIsActive;
          this.filterCall();
          this.spinner.hide();
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.WI_Pkey_ID);
              element.ViewUrl = "/home/autoimport/autoimportwo/" + btoa(encrypted);
              this.spinner.hide();
            });
          }
          this.spinner.hide();
        }
      });

  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => { });
  }
  checkChange(event, dataItem) {
    //dfebugger;
    this.AutoImportWorkorderModelObj.WI_Pkey_ID = dataItem.WI_Pkey_ID;
    this.AutoImportWorkorderModelObj.WI_IsActive = !dataItem.WI_IsActive;
    this.AutoImportWorkorderModelObj.Type = 3;

    this.xAutoImportWorkOrderService
    .AutoImportWorkOrderPost(this.AutoImportWorkorderModelObj)
    .subscribe(response => {
      this.MessageFlag = "Auto Import status update...!";
      this.commonMessage();
        this.GetGridData();
      });
  }

  //kendo check box event action

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
