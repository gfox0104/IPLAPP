import { Component, Input, OnInit } from '@angular/core';
import { MVC_Check_Ins, MVC_Completion_Info, MVC_Damage, MVC_Notes, MVC_Property_Info, MVC_Utilities, MVC_Validation, MVC_Violation, MVC_Winterization_Info, PCR_MCS_Maintenance_Vendor_Checklist_Model } from './mcs-maintenance-vendor-checklist-model';
import { McsMaintenanceVendorChecklistService } from './mcs-maintenance-vendor-checklist-service';

@Component({
  selector: 'app-mcs-maintenance-vendor-checklist',
  templateUrl: './mcs-maintenance-vendor-checklist.component.html',
  styleUrls: ['./mcs-maintenance-vendor-checklist.component.scss']
})
export class McsMaintenanceVendorChecklistComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:PCR_MCS_Maintenance_Vendor_Checklist_Model[];
  // PCR_History:PCR_MCS_Maintenance_Vendor_Checklist_Model=new PCR_MCS_Maintenance_Vendor_Checklist_Model();
  PCR_MCS_Maintenance_Vendor_Checklist_Model:PCR_MCS_Maintenance_Vendor_Checklist_Model=new PCR_MCS_Maintenance_Vendor_Checklist_Model();
  MVC_Property_Info:MVC_Property_Info=new MVC_Property_Info();
  MVC_Completion_Info:MVC_Completion_Info=new MVC_Completion_Info();
  MVC_Utilities:MVC_Utilities=new MVC_Utilities();
  MVC_Damages:MVC_Damage=new MVC_Damage();
  MVC_Winterization_Info:MVC_Winterization_Info=new MVC_Winterization_Info();
  MVC_Violation:MVC_Violation=new MVC_Violation();
  MVC_Validation:MVC_Validation=new MVC_Validation();
  MVC_Check_Ins:MVC_Check_Ins=new MVC_Check_Ins();
  MVC_Notes:MVC_Notes=new MVC_Notes();

  isLoading: boolean;
  button: string = 'Save';

  constructor(private _mcsMaintenanceVendorChecklistService:McsMaintenanceVendorChecklistService) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetMcsMaintenanceVendorChecklistFormMaster();
    }
  }

  TabVal: Number = 1;
  TabClickMethod(TabNo: Number): void {

    switch (this.TabVal) {
      case 1:
        this.FormButton1(false);
        break;

      case 2:
        this.ViolationSubmit(false);
        break;

      case 3:
        this.SecuringSubmit(false);
        break;

      case 4:
        this.SubmitWinterization(false);
        break;

      case 5:
        this.YardMaintananceSubmit(false);
        break;

      case 6:
        this.DebrisSubmit(false);
        break;

      case 7:
        this.PcrRoofData(false);
        break;

        case 8:
          this.PCRConveyancesave(false);
          break;

          case 9:
            this.Winterization(false);
            break



      default:
        break;
    }
    this.TabVal = TabNo;
  }
  Winterization(arg0: boolean) {
  }
  PCRConveyancesave(arg0: boolean) {
  }
  PcrRoofData(arg0: boolean) {
  }
  DebrisSubmit(arg0: boolean) {
  }
  YardMaintananceSubmit(arg0: boolean) {
  }
  SubmitWinterization(arg0: boolean) {
  }
  SecuringSubmit(arg0: boolean) {
  }
  ViolationSubmit(arg0: boolean) {
  }
  FormButton1(arg0: boolean) {
  }


  jsonModelObjStringify() {
    // debugger;
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Property_Info =JSON.stringify(this.MVC_Property_Info);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Completion_Info =JSON.stringify(this.MVC_Completion_Info);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Utilities =JSON.stringify(this.MVC_Utilities);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Damage =JSON.stringify(this.MVC_Damages);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Winterization_Info =JSON.stringify(this.MVC_Winterization_Info);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Violation =JSON.stringify(this.MVC_Violation);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Validation =JSON.stringify(this.MVC_Validation);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Check_Ins =JSON.stringify(this.MVC_Check_Ins);
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Notes =JSON.stringify(this.MVC_Notes);
  }
  SaveForm(){
    this.jsonModelObjStringify();
    this.PostMcsMaintenanceVendorChecklistFormMaster();
  }
  PostMcsMaintenanceVendorChecklistFormMaster() {
    if (this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_PkeyID > 0) {
      this.PCR_MCS_Maintenance_Vendor_Checklist_Model.Type = 2;
    } else {
      this.PCR_MCS_Maintenance_Vendor_Checklist_Model.Type = 1;
    }
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_IsActive = true;
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_IsDelete = false;
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.fwo_pkyeId = this.FWO_PkyeId;
    this._mcsMaintenanceVendorChecklistService
      .PostMcsMaintenanceVendorChecklistFormMaster(this.PCR_MCS_Maintenance_Vendor_Checklist_Model)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetMcsMaintenanceVendorChecklistFormMaster() {
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_WO_ID = this.WorkorderId;
    this.PCR_MCS_Maintenance_Vendor_Checklist_Model.Type = 3;
    this._mcsMaintenanceVendorChecklistService
      .GetMcsMaintenanceVendorChecklistFormMaster(this.PCR_MCS_Maintenance_Vendor_Checklist_Model)
      .subscribe((res) => {
        if (res[0].length > 0) {

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_PkeyID=res[0][0].MVC_PkeyID;
          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_WO_ID=res[0][0].MVC_WO_ID;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Property_Info =JSON.parse(res[0][0].MVC_Property_Info);
          this.MVC_Property_Info =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Property_Info;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Completion_Info =JSON.parse(res[0][0].MVC_Completion_Info);
          this.MVC_Completion_Info =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Completion_Info;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Utilities =JSON.parse(res[0][0].MVC_Utilities);
          this.MVC_Utilities =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Utilities;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Damage =JSON.parse(res[0][0].MVC_Damage);
          this.MVC_Damages =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Damage;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Winterization_Info =JSON.parse(res[0][0].MVC_Winterization_Info);
          this.MVC_Winterization_Info =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Winterization_Info;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Violation =JSON.parse(res[0][0].MVC_Violation);
          this.MVC_Violation =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Violation;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Validation =JSON.parse(res[0][0].MVC_Validation);
          this.MVC_Validation =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Validation;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Check_Ins =JSON.parse(res[0][0].MVC_Check_Ins);
          this.MVC_Check_Ins =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Check_Ins;

          this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Notes =JSON.parse(res[0][0].MVC_Notes);
          this.MVC_Notes =this.PCR_MCS_Maintenance_Vendor_Checklist_Model.MVC_Notes;
        }
        if (res[1].length > 0) {
          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_MCS_Maintenance_Vendor_Checklist_Model();
            convertedData.MVC_Property_Info=JSON.parse(element.MVC_Property_Info);
            convertedData.MVC_Completion_Info=JSON.parse(element.MVC_Completion_Info);
            convertedData.MVC_Utilities=JSON.parse(element.MVC_Utilities);
            convertedData.MVC_Damage=JSON.parse(element.MVC_Damage);
            convertedData.MVC_Winterization_Info=JSON.parse(element.MVC_Winterization_Info);
            convertedData.MVC_Violation=JSON.parse(element.MVC_Violation);
            convertedData.MVC_Validation=JSON.parse(element.MVC_Validation);
            convertedData.MVC_Check_Ins=JSON.parse(element.MVC_Check_Ins);
            convertedData.MVC_Notes=JSON.parse(element.MVC_Notes);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;

          // this.PCR_History.MVC_Property_Info =JSON.parse(res[1][0].MVC_Property_Info);
          // this.PCR_History.MVC_Completion_Info =JSON.parse(res[1][0].MVC_Completion_Info);
          // this.PCR_History.MVC_Utilities = JSON.parse(res[1][0].MVC_Utilities);
          // this.PCR_History.MVC_Damage = JSON.parse(res[1][0].MVC_Damage);
          // this.PCR_History.MVC_Winterization_Info = JSON.parse(res[1][0].MVC_Winterization_Info);
          // this.PCR_History.MVC_Violation = JSON.parse(res[1][0].MVC_Violation);
          // this.PCR_History.MVC_Validation = JSON.parse(res[1][0].MVC_Validation);
          // this.PCR_History.MVC_Check_Ins = JSON.parse(res[1][0].MVC_Check_Ins);
          // this.PCR_History.MVC_Notes = JSON.parse(res[1][0].MVC_Notes);

        }
      });
  }
}
