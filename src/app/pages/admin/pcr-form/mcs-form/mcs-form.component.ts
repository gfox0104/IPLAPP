import { Component, Input, OnInit } from '@angular/core';
import { MCS_Check_Ins, MCS_Completion_Info, MCS_Property_Info, MCS_Utilities, MCS_VCL, PCR_MCS_Forms_Master_Model } from './mcs-form.model';
import { MCSFormServices } from './mcs-form.service';

@Component({
  selector: 'app-mcs-form',
  templateUrl: './mcs-form.component.html',
  styleUrls: ['./mcs-form.component.scss']
})
export class McsFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;
  PCR_HistoryList:PCR_MCS_Forms_Master_Model[];
  PCR_History:PCR_MCS_Forms_Master_Model=new PCR_MCS_Forms_Master_Model();
  PCR_MCS_Forms_Master_Model:PCR_MCS_Forms_Master_Model=new PCR_MCS_Forms_Master_Model();
  MCS_Property_Info:MCS_Property_Info=new MCS_Property_Info();
  MCS_Completion_Info:MCS_Completion_Info=new MCS_Completion_Info();
  MCS_Utilities:MCS_Utilities=new MCS_Utilities();
  MCS_VCL:MCS_VCL=new MCS_VCL();
  MCS_Check_Ins:MCS_Check_Ins=new MCS_Check_Ins();

  isLoading: boolean;
  button: string = 'Save';
  constructor(private mcsFormServices:MCSFormServices) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
       this.GetMCSFormMaster();
    }
  }

  TabVal: Number = 1;
  TabClickMethod(TabNo: Number): void {

    switch (this.TabVal) {
      case 1:
        //alert('this tab '+this.TabVal);
        this.FormButton1(false); //property form
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
        this.PcrRoofData(false);
        break;



      // case 6:
      //   this.DebrisSubmit(false);
      //   break;

      // case 7:
      //   this.PcrRoofData(false);
      //   break;



      default:
        break;
    }
    this.TabVal = TabNo;
  }
  PcrRoofData(arg0: boolean) {
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
    this.PCR_MCS_Forms_Master_Model.MCS_Property_Info =JSON.stringify(this.MCS_Property_Info);
    this.PCR_MCS_Forms_Master_Model.MCS_Completion_Info =JSON.stringify(this.MCS_Completion_Info);
    this.PCR_MCS_Forms_Master_Model.MCS_Utilities =JSON.stringify(this.MCS_Utilities);
    this.PCR_MCS_Forms_Master_Model.MCS_VCL =JSON.stringify(this.MCS_VCL);
    this.PCR_MCS_Forms_Master_Model.MCS_Check_Ins =JSON.stringify(this.MCS_Check_Ins);
  }
  SaveForm(){
    this.jsonModelObjStringify();
    this.PostMCSFormMaster();
  }
  PostMCSFormMaster() {
    if (this.PCR_MCS_Forms_Master_Model.MCS_PkeyID > 0) {
      this.PCR_MCS_Forms_Master_Model.Type = 2;
    } else {
      this.PCR_MCS_Forms_Master_Model.Type = 1;
    }
    this.PCR_MCS_Forms_Master_Model.MCS_IsActive = true;
    this.PCR_MCS_Forms_Master_Model.MCS_IsDelete = false;
    this.PCR_MCS_Forms_Master_Model.fwo_pkyeId = this.FWO_PkyeId;
    this.mcsFormServices
      .PostMCSFormMaster(this.PCR_MCS_Forms_Master_Model)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.PCR_MCS_Forms_Master_Model.MCS_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetMCSFormMaster() {
    this.PCR_MCS_Forms_Master_Model.MCS_WO_ID = this.WorkorderId;
    this.PCR_MCS_Forms_Master_Model.Type = 3;
    this.mcsFormServices
      .GetMCSFormMaster(this.PCR_MCS_Forms_Master_Model)
      .subscribe((res) => {
        if (res[0].length > 0) {

          this.PCR_MCS_Forms_Master_Model.MCS_PkeyID=res[0][0].MCS_PkeyID;
          this.PCR_MCS_Forms_Master_Model.MCS_WO_ID=res[0][0].MCS_WO_ID;

          this.PCR_MCS_Forms_Master_Model.MCS_Property_Info =JSON.parse(res[0][0].MCS_Property_Info);
          this.MCS_Property_Info =this.PCR_MCS_Forms_Master_Model.MCS_Property_Info;

          this.PCR_MCS_Forms_Master_Model.MCS_Completion_Info =JSON.parse(res[0][0].MCS_Completion_Info);
          this.MCS_Completion_Info =this.PCR_MCS_Forms_Master_Model.MCS_Completion_Info;

          this.PCR_MCS_Forms_Master_Model.MCS_Utilities =JSON.parse(res[0][0].MCS_Utilities);
          this.MCS_Utilities =this.PCR_MCS_Forms_Master_Model.MCS_Utilities;

          this.PCR_MCS_Forms_Master_Model.MCS_VCL =JSON.parse(res[0][0].MCS_VCL);
          this.MCS_VCL =this.PCR_MCS_Forms_Master_Model.MCS_VCL;

          this.PCR_MCS_Forms_Master_Model.MCS_Check_Ins =JSON.parse(res[0][0].MCS_Check_Ins);
          this.MCS_Check_Ins =this.PCR_MCS_Forms_Master_Model.MCS_Check_Ins;
        }
        if (res[1].length > 0) {

          var convertedDataList=[];
        res[1].forEach(element => {
          var convertedData=new PCR_MCS_Forms_Master_Model();
          convertedData.MCS_Property_Info=JSON.parse(element.MCS_Property_Info);
          convertedData.MCS_Completion_Info=JSON.parse(element.MCS_Completion_Info);
          convertedData.MCS_Utilities=JSON.parse(element.MCS_Utilities);
          convertedData.MCS_VCL=JSON.parse(element.MCS_VCL);
          convertedData.MCS_Check_Ins=JSON.parse(element.MCS_Check_Ins);
          convertedData.ModifiedBy=element.ModifiedBy;
          convertedDataList.push(convertedData);
        });
        this.PCR_HistoryList=convertedDataList;




          // this.PCR_History.MCS_Property_Info =JSON.parse(res[1][0].MCS_Property_Info);
          // this.PCR_History.MCS_Completion_Info =JSON.parse(res[1][0].MCS_Completion_Info);
          // this.PCR_History.MCS_Utilities = JSON.parse(res[1][0].MCS_Utilities);
          // this.PCR_History.MCS_VCL = JSON.parse(res[1][0].MCS_VCL);
          // this.PCR_History.MCS_Check_Ins = JSON.parse(res[1][0].MCS_Check_Ins);
        }
      });
  }
}
