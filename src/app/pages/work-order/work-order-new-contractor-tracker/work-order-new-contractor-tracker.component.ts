import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SafeStyle } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IplAppModalContent } from 'src/app/components';
import { EncrDecrService } from 'src/app/services/util/encr-decr.service';
import { SaveWorkOrderServices } from '../new-work-order/new-work-order.service';
import { WorkOderViewModel } from '../work-order-view/work-order-view-model';
import { SaveWorkOrderViewServices } from '../work-order-view/work-order-view-service';
import { GridColumns } from './constant/columns';

@Component({
  selector: 'app-work-order-new-contractor-tracker',
  templateUrl: './work-order-new-contractor-tracker.component.html',
  styleUrls: ['./work-order-new-contractor-tracker.component.scss']
})
export class WorkOrderNewContractorTrackerComponent implements OnInit {

  public WorkOderViewModelobj: WorkOderViewModel = new WorkOderViewModel();
  gridData:any;
  gridColumns = GridColumns;
  actionIPLNOs: Array<any>;
  formUsrCommonGroup: UntypedFormGroup;
  EstimateDate:any;
  MessageFlag="";
  user;
  constructor(private xSaveWorkOrderViewServices: SaveWorkOrderViewServices,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private xSaveWorkOrderServices: SaveWorkOrderServices,
    private EncrDecr: EncrDecrService) {

      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      this.user = JSON.parse(decval);
     }

  ngOnInit(): void {
    this.GetWorkoOrderTracker();
    this.formUsrCommonGroup = this.formBuilder.group({
    });
  }
  GetWorkoOrderTracker() {
    this.WorkOderViewModelobj.Type=2;
    this.xSaveWorkOrderViewServices
      .GetWorkoOrderTracker(this.WorkOderViewModelobj)
      .subscribe(response => {

        var orignaldata=response[0];
        if(orignaldata!=undefined && orignaldata.length>0)
        {
          orignaldata.forEach(item => {
            const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', item.workOrder_ID);
            if (this.user[0].GroupRoleId === 2) {
              item.ViewUrl = "/client/clientresultinstruction/" + btoa(encrypted);
            } else {
              item.ViewUrl = "/client/clientresultinstruction/" + btoa(encrypted);
            }
            item.ViewPhotosUrl = "/client/clientresultphoto/" + btoa(encrypted);
          });

          this.gridData=orignaldata;
        }
      });
  }
  openECDNotesModal(dataItem,content) {
    this.actionIPLNOs =[{ IPLNO: dataItem.IPLNO,WorkOrder_Id:dataItem.workOrder_ID }]
    this.modalService.open(content, { windowClass: "lgModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  OpenEstimateDateModal(dataItem,content) {
    this.EstimateDate=dataItem.EstimatedDate;
    this.actionIPLNOs =[{ IPLNO: dataItem.IPLNO,WorkOrder_Id:dataItem.workOrder_ID }]
    this.modalService.open(content, { windowClass: "small" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  openMessageBox(dataItem,messageBox) {
    this.actionIPLNOs =[{ IPLNO: dataItem.IPLNO,WorkOrder_Id:dataItem.workOrder_ID }]
    this.modalService.open(messageBox, { windowClass: "xlModal" }).result.then(result => { }, reason => { window.scroll(0, 0); });
  }
  SubmitForm(){
    if(this.actionIPLNOs.length>0)
    {
      this.xSaveWorkOrderServices.UpdateWoEstimatedDate(this.actionIPLNOs[0].WorkOrder_Id,this.EstimateDate)
      .subscribe(response => {
        if (response[0].Status == 1) {
          this.actionIPLNOs=[];
          this.MessageFlag = "WO Estimated Date updated...!";
          this.GetWorkoOrderTracker();
          this.commonMessage();
        }
      })
    }
  }
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'Continue...';
    modalRef.result.then(result => { }, reason => { this.modalService.dismissAll() });
  }
  SetColor(color){
    if(color==null || color=="" || color==" " || color=="#FFFFFF" || color=="FFFFFF")
    {
      return "black"
    }
    else
    {
      return "#"+color;
    }
  }
  public colorDate(date, field): SafeStyle {
    if (date === null || date === undefined || field !== 'dueDate') return;
    let dueDate = new Date(date);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dueDate > tomorrow) return;
    return dueDate >= today ? '#FCF998' : '#F09EA0';
  }
}
