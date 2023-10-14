import { Component, Input, OnInit } from '@angular/core';
import { MG_Access_Issue, MG_Check_Ins, MG_Completion_Info, MG_Expected_Completion_Date, MG_Notes, MG_Property_Info, MG_Validation, PCR_MCS_Grass_Cut_Form_Master_Model } from './mcs-grass-cut-form-model';
import { MCSGrassCustFormServices } from './mcs-grass-cut-form-service';

@Component({
  selector: 'app-mcs-grass-cut-form',
  templateUrl: './mcs-grass-cut-form.component.html',
  styleUrls: ['./mcs-grass-cut-form.component.scss']
})
export class McsGrassCutFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:PCR_MCS_Grass_Cut_Form_Master_Model[];
  // PCR_History:PCR_MCS_Grass_Cut_Form_Master_Model=new PCR_MCS_Grass_Cut_Form_Master_Model();
  PCR_MCS_Grass_Cut_Form_Master_Model:PCR_MCS_Grass_Cut_Form_Master_Model=new PCR_MCS_Grass_Cut_Form_Master_Model();

  MG_Property_Info:MG_Property_Info=new MG_Property_Info();
  MG_Completion_Info:MG_Completion_Info=new MG_Completion_Info();
  MG_Access_Issue:MG_Access_Issue=new MG_Access_Issue();
  MG_Validation:MG_Validation=new MG_Validation();
  MG_Check_Ins:MG_Check_Ins=new MG_Check_Ins();
  MG_Notes:MG_Notes=new MG_Notes();
  MG_Expected_Completion_Date:MG_Expected_Completion_Date=new MG_Expected_Completion_Date();

  isLoading: boolean;
  button: string = 'Save';
  constructor(private _mcsGrassCustFormServices:MCSGrassCustFormServices) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetMCSGrassCutFormMaster();
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



      default:
        break;
    }
    this.TabVal = TabNo;
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
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Property_Info =JSON.stringify(this.MG_Property_Info);
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Completion_Info =JSON.stringify(this.MG_Completion_Info);
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Access_Issue =JSON.stringify(this.MG_Access_Issue);
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Validation =JSON.stringify(this.MG_Validation);
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Check_Ins =JSON.stringify(this.MG_Check_Ins);
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Notes =JSON.stringify(this.MG_Notes);
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Expected_Completion_Date =JSON.stringify(this.MG_Expected_Completion_Date);
  }
  SaveForm(){
    this.jsonModelObjStringify();
    this.PostMCSGrassCutFormMaster();
  }
  PostMCSGrassCutFormMaster() {
    if (this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_PkeyID > 0) {
      this.PCR_MCS_Grass_Cut_Form_Master_Model.Type = 2;
    } else {
      this.PCR_MCS_Grass_Cut_Form_Master_Model.Type = 1;
    }
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_IsActive = true;
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_IsDelete = false;
    this.PCR_MCS_Grass_Cut_Form_Master_Model.fwo_pkyeId = this.FWO_PkyeId;
    this._mcsGrassCustFormServices
      .PostMCSGrassCutFormMaster(this.PCR_MCS_Grass_Cut_Form_Master_Model)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetMCSGrassCutFormMaster() {
    this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_WO_ID = this.WorkorderId;
    this.PCR_MCS_Grass_Cut_Form_Master_Model.Type = 3;
    this._mcsGrassCustFormServices
      .GetMCSGrassCutFormMaster(this.PCR_MCS_Grass_Cut_Form_Master_Model)
      .subscribe((res) => {
        if (res[0].length > 0) {

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_PkeyID=res[0][0].MG_PkeyID;
          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_WO_ID=res[0][0].MG_WO_ID;

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Property_Info =JSON.parse(res[0][0].MG_Property_Info);
          this.MG_Property_Info =this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Property_Info;

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Completion_Info =JSON.parse(res[0][0].MG_Completion_Info);
          this.MG_Completion_Info =this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Completion_Info;

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Access_Issue =JSON.parse(res[0][0].MG_Access_Issue);
          this.MG_Access_Issue =this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Access_Issue;

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Validation =JSON.parse(res[0][0].MG_Validation);
          this.MG_Validation =this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Validation;

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Check_Ins =JSON.parse(res[0][0].MG_Check_Ins);
          this.MG_Check_Ins =this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Check_Ins;

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Notes =JSON.parse(res[0][0].MG_Notes);
          this.MG_Notes =this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Notes;

          this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Expected_Completion_Date =JSON.parse(res[0][0].MG_Expected_Completion_Date);
          this.MG_Expected_Completion_Date =this.PCR_MCS_Grass_Cut_Form_Master_Model.MG_Expected_Completion_Date;
        }
        if (res[1].length > 0) {
          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_MCS_Grass_Cut_Form_Master_Model();
            convertedData.MG_Property_Info=JSON.parse(element.MG_Property_Info);
            convertedData.MG_Completion_Info=JSON.parse(element.MG_Completion_Info);
            convertedData.MG_Access_Issue=JSON.parse(element.MG_Access_Issue);
            convertedData.MG_Validation=JSON.parse(element.MG_Validation);
            convertedData.MG_Check_Ins=JSON.parse(element.MG_Check_Ins);
            convertedData.MG_Notes=JSON.parse(element.MG_Notes);
            convertedData.MG_Expected_Completion_Date=JSON.parse(element.MG_Expected_Completion_Date);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;

          // this.PCR_History.MG_Property_Info =JSON.parse(res[1][0].MG_Property_Info);
          // this.PCR_History.MG_Completion_Info =JSON.parse(res[1][0].MG_Completion_Info);
          // this.PCR_History.MG_Access_Issue =JSON.parse(res[1][0].MG_Access_Issue);
          // this.PCR_History.MG_Validation = JSON.parse(res[1][0].MG_Validation);
          // this.PCR_History.MG_Check_Ins = JSON.parse(res[1][0].MG_Check_Ins);
          // this.PCR_History.MG_Notes = JSON.parse(res[1][0].MG_Notes);
          // this.PCR_History.MG_Expected_Completion_Date = JSON.parse(res[1][0].MG_Expected_Completion_Date);
        }
      });
  }

}
