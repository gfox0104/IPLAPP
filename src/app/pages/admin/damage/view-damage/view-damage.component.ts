import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DamageFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
import { AddDamageModel } from "../add-damage/add-damage-model";
import { AddDamageServices } from "../add-damage/add-damage.service";
import { ViewDamageServices } from "./view-damage.service";
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, GridColumns } from '../constants';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  templateUrl: "./view-damage.component.html"
})

export class ViewDamageComponent implements OnInit {
  public griddata: any[];
  AddDamageModelObj: AddDamageModel = new AddDamageModel();
  DamageFilters = DamageFilters;
  MessageFlag: string;

  buttons = Buttons;
  gridColumns = GridColumns;
  public state: State = {};
  constructor(
    private xRouter: Router,
    private xAddDamageServices: AddDamageServices,
    private xViewDamageServices: ViewDamageServices,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();
    this.GetGridData();
  }

  ngOnInit() {}

  // clear data
  AddNewDamages() {
    this.xRouter.navigate(["/damage/adddamage", 'new']);
  }

  // this code selected event row
  showDetails(event, dataItem) {
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', dataItem.Damage_pkeyID);
    this.xRouter.navigate(["/home/damage/adddamage", btoa(encrypted)]);
  }

  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddDamageModelObj.Damage_pkeyID = dataItem.Damage_pkeyID;
      this.AddDamageModelObj.Damage_IsDelete = true;

      this.xAddDamageServices
        .AddDamageDataPost(this.AddDamageModelObj)
        .subscribe(response => {
          //console.log("delete response", response);
          this.AddDamageModelObj.Type = 1;
          this.AddDamageModelObj.Damage_pkeyID = 0;
          this.GetGridData();
        });
    }
  }

  //get grid
  GetGridData() {
    this.xViewDamageServices
      .ViewDamageData(this.AddDamageModelObj)
      .subscribe(response => {
        // console.log('sun1',response)
        if (response.length > 1 && response[1].length > 0) {
          this.AddDamageModelObj.Damage_Type =  response[1][0].Damage_Filter_DamageName;
          this.AddDamageModelObj.Damage_Int =  response[1][0].Damage_Filter_DamageIntExt;
          this.AddDamageModelObj.Damage_Location =  response[1][0].Damage_Filter_DamageLocation;
          this.AddDamageModelObj.Damage_Disc =  response[1][0].Damage_Filter_DamageDesc;
          this.AddDamageModelObj.Damage_IsActive =  response[1][0].Damage_Filter_DamageIsActive;
          this.AddDamageModelObj.Damage_CreatedBy = response[1][0];
          this.AddDamageModelObj.Damage_ModifiedBy = response[1][0];
          this.filterCall();
          this.spinner.hide();
        }
        else
        {
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Damage_pkeyID);
              element.ViewUrl = "/home/damage/adddamage/" + btoa(encrypted);
            });
          }
          this.spinner.hide();
      }
      });
  }

  filterCall() {
    this.AddDamageModelObj.Type = 3;
    this.xViewDamageServices
      .ViewDamageData(this.AddDamageModelObj)
      .subscribe(response => {
        //console.log("resp damage", response);
        this.state.take = 15;
        this.state.skip = 0;
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Damage_pkeyID);
            element.ViewUrl = "/home/damage/adddamage/" + btoa(encrypted);
          });
        }
      });

  }

  clearData() {
    this.AddDamageModelObj.Type = 5;
    this.xViewDamageServices
      .AddUpdateFilterAdminDamageData(this.AddDamageModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.AddDamageModelObj = new AddDamageModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.AddDamageModelObj.Type = 1;
    this.xViewDamageServices
      .AddUpdateFilterAdminDamageData(this.AddDamageModelObj)
      .subscribe(response => {
        //console.log('atuo',response);
        this.MessageFlag = "Filter saved...!";
        this.commonMessage();
        this.filterCall();
      });
  }
  commonMessage() {
    const modalRef = this.xmodalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.result.then(result => { }, reason => {this.xmodalService.dismissAll() });
  }
  checkChange(event, dataItem) {
  ////dfebugger;
    this.AddDamageModelObj.Damage_pkeyID = dataItem.Damage_pkeyID;
    this.AddDamageModelObj.Damage_IsActive = !dataItem.Damage_IsActive;
    this.AddDamageModelObj.Type = 3;
    this.xAddDamageServices
      .AddDamageDataPost(this.AddDamageModelObj)
      .subscribe(response => {
      this.MessageFlag = "Damage status upated...!";
      this.commonMessage();
      this.AddDamageModelObj=new AddDamageModel();
      this.GetGridData();
      });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
