import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AddPhotoHeaderFilters } from '../../../../components/iplapp-filter-form/user-filter-form';
import { EncrDecrService } from '../../../../services/util/encr-decr.service';
import { Buttons, GridColumns } from '../constants';
import { IplAppModalContent } from "src/app/components/iplapp-modal-content/iplapp-modal-content.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { State } from "@progress/kendo-data-query";
import {ViewPhotoHeaderModel} from './view-photoheader-model'
import {AddPhotoHeaderTemplatesModel} from '../add-photoheader/photo-header-template-model'
import { ViewPhotoHeaderServices } from "./view-photoheader.service";
import { AddPhotoHeaderTemplatesServices } from "../add-photoheader/photo-header-template.service";

@Component({
  templateUrl: "./view-photoheader.component.html"
})

export class ViewPhotoHeaderComponent implements OnInit {
  public griddata: any[];
  ViewPhotoHeaderModelObj: ViewPhotoHeaderModel = new ViewPhotoHeaderModel();
  AddPhotoHeaderTemplatesModelObj: AddPhotoHeaderTemplatesModel = new AddPhotoHeaderTemplatesModel();

  AddPhotoHeaderFilters = AddPhotoHeaderFilters;
  MessageFlag: string;

  buttons = Buttons;
  gridColumns = GridColumns;
  public state: State = {};
  constructor(
    private xRouter: Router,
    private EncrDecr: EncrDecrService,
    private xmodalService: NgbModal,
    private xViewPhotoHeaderServices:ViewPhotoHeaderServices,
    private xAddPhotoHeaderTemplatesServices:AddPhotoHeaderTemplatesServices

  ) {
    this.GetGridData();
  }

  ngOnInit() {}

  // clear data
  AddNewDamages() {

  }



  deleteDetails(event, dataItem) {
    var cfrm = confirm("Are you Sure you want to  Delete this Record...!");
    if (cfrm == true) {
      this.AddPhotoHeaderTemplatesModelObj.Photo_head_PkeyId = dataItem.Photo_head_PkeyId;
      this.AddPhotoHeaderTemplatesModelObj.Photo_head_IsDelete = true;
      this.AddPhotoHeaderTemplatesModelObj.Type = 4;

      this.xAddPhotoHeaderTemplatesServices
        .PhotoHeaderDataPost(this.AddPhotoHeaderTemplatesModelObj)
        .subscribe(response => {
          //console.log("delete response", response);
          this.AddPhotoHeaderTemplatesModelObj.Type = 1;
          this.AddPhotoHeaderTemplatesModelObj.Photo_head_PkeyId = 0;
          this.GetGridData();
        });
    }
  }

  //get grid
  GetGridData() {
    this.xViewPhotoHeaderServices
      .ViewPhotoHeaderData(this.AddPhotoHeaderTemplatesModelObj)
      .subscribe(response => {
        if (response.length > 1 && response[1].length > 0) {

          this.AddPhotoHeaderTemplatesModelObj.Photo_head_HeaderTemp =  response[1][0].Photo_Head_Filter_Header_Temp;

          this.AddPhotoHeaderTemplatesModelObj.Photo_head_IsActive =  response[1][0].Photo_Head_Filter_FilterActive;
          this.filterCall();
        }
        else{
          if(response[0]!=undefined)
          {
            this.griddata = response[0];
            this.griddata.forEach(element => {
              var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Photo_head_PkeyId);
              element.ViewUrl = "/home/photo/addPhotoHeader/" + btoa(encrypted);
            });
          }
      }
      });
  }

  filterCall() {
    //debugger
    this.AddPhotoHeaderTemplatesModelObj.Type = 3;
    this.xViewPhotoHeaderServices
    .ViewPhotoHeaderData(this.AddPhotoHeaderTemplatesModelObj)
      .subscribe(response => {

        this.state.take = 15;
        this.state.skip = 0;
        if(response[0]!=undefined)
        {
          this.griddata = response[0];
          this.griddata.forEach(element => {
            var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', element.Photo_head_PkeyId);
            element.ViewUrl = "/home/photo/addPhotoHeader/" + btoa(encrypted);
          });
        }

      });

  }

  clearData() {
    this.AddPhotoHeaderTemplatesModelObj.Type = 5;
    this.xViewPhotoHeaderServices
      .SaveFilterPhotoHeaderData(this.AddPhotoHeaderTemplatesModelObj)
      .subscribe(response => {

        this.AddPhotoHeaderTemplatesModelObj = new AddPhotoHeaderTemplatesModel();
        this.GetGridData();
      });
  }

  saveFilterData() {
    this.AddPhotoHeaderTemplatesModelObj.Type = 1;
    this.xViewPhotoHeaderServices
      .SaveFilterPhotoHeaderData(this.AddPhotoHeaderTemplatesModelObj)
      .subscribe(response => {

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
    this.AddPhotoHeaderTemplatesModelObj.Photo_head_PkeyId = dataItem.Photo_head_PkeyId;
    this.AddPhotoHeaderTemplatesModelObj.Photo_head_IsActive = !dataItem.Photo_head_IsActive;
    this.AddPhotoHeaderTemplatesModelObj.Type = 3;
    this.xAddPhotoHeaderTemplatesServices
        .PhotoHeaderDataPost(this.AddPhotoHeaderTemplatesModelObj)
      .subscribe(response => {

      this.MessageFlag = "Photo Header status upated...!";
      this.commonMessage();
      this.AddPhotoHeaderTemplatesModelObj.Photo_head_PkeyId = 0;
      this.AddPhotoHeaderTemplatesModelObj.Type = 1;
      this.GetGridData();

      });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
