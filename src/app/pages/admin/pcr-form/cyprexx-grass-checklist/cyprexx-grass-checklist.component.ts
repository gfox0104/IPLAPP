import { Component, Input, OnInit } from '@angular/core';
import { CG_General_Comments_Model, CG_General_Property_Info_Model, CG_Order_Completion_Model, CG_Pool_Information_Model, CG_Property_Maintenance_Model, CG_Recommended_Services_Model, CG_Utilities_Model, PCR_Cyprexx_Grass_Checklist_Master_Model } from './cyprexx-crass-check-list-model';
import { CyprexxGrassCheckListService } from './cyprexx-grass-check-list.service';

@Component({
  selector: 'app-cyprexx-grass-checklist',
  templateUrl: './cyprexx-grass-checklist.component.html',
  styleUrls: ['./cyprexx-grass-checklist.component.scss']
})
export class CyprexxGrassChecklistComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;


  PCR_HistoryList:PCR_Cyprexx_Grass_Checklist_Master_Model[];
  // PCR_History:PCR_Cyprexx_Grass_Checklist_Master_Model=new PCR_Cyprexx_Grass_Checklist_Master_Model();
  PCR_Cyprexx_Grass_Checklist_Master_Model:PCR_Cyprexx_Grass_Checklist_Master_Model=new PCR_Cyprexx_Grass_Checklist_Master_Model();
  _CG_Property_Maintenance_Model:CG_Property_Maintenance_Model=new CG_Property_Maintenance_Model();
  _CG_General_Property_Info_Model:CG_General_Property_Info_Model=new CG_General_Property_Info_Model();
  _CG_Pool_Information_Model:CG_Pool_Information_Model=new CG_Pool_Information_Model();
  _CG_Utilities_Model:CG_Utilities_Model=new CG_Utilities_Model();
  _CG_Recommended_Services_Model:CG_Recommended_Services_Model=new CG_Recommended_Services_Model();
  _CG_General_Comments_Model:CG_General_Comments_Model=new CG_General_Comments_Model();
  _CG_Order_Completion_Model:CG_Order_Completion_Model=new CG_Order_Completion_Model();



  isLoading: boolean;
  button: string = 'Save';
  constructor(private cyprexxGrassCheckListService:CyprexxGrassCheckListService) { }

  ngOnInit(): void {

    if(this.WorkorderId>0)
    {
      this.GetCyprexxGrassCheckListData();
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

  SaveForm(){
    this.jsonModelObjStringify();
    this.PostCyprexxGrassCheckData();
  }
  jsonModelObjStringify() {
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_General_Property_Info =JSON.stringify(this._CG_General_Property_Info_Model);
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Property_Maintenance =JSON.stringify(this._CG_Property_Maintenance_Model);
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Pool_Information =JSON.stringify(this._CG_Pool_Information_Model);
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Utilities =JSON.stringify(this._CG_Utilities_Model);
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Recommended_Services =JSON.stringify(this._CG_Recommended_Services_Model);
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_General_Comments =JSON.stringify(this._CG_General_Comments_Model);
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Order_Completion =JSON.stringify(this._CG_Order_Completion_Model);
  }

  PostCyprexxGrassCheckData() {
    if (this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_PkeyID > 0) {
      this.PCR_Cyprexx_Grass_Checklist_Master_Model.Type = 2;
    } else {
      this.PCR_Cyprexx_Grass_Checklist_Master_Model.Type = 1;
    }
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_IsActive = true;
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_IsDelete = false;
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.fwo_pkyeId = this.FWO_PkyeId;
    this.cyprexxGrassCheckListService
      .PostCyprexxGrassCheckData(this.PCR_Cyprexx_Grass_Checklist_Master_Model)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetCyprexxGrassCheckListData() {
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_WO_Id = this.WorkorderId;
    this.PCR_Cyprexx_Grass_Checklist_Master_Model.Type = 3;
    this.cyprexxGrassCheckListService
      .GetCyprexxGrassCheckListData(this.PCR_Cyprexx_Grass_Checklist_Master_Model)
      .subscribe((res) => {
        // debugger;
        if (res[0].length > 0) {

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_PkeyID=res[0][0].CG_PkeyID;
          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_WO_Id=res[0][0].CG_WO_Id;

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_General_Property_Info =JSON.parse(res[0][0].CG_General_Property_Info);
          this._CG_General_Property_Info_Model =this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_General_Property_Info;

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Property_Maintenance =JSON.parse(res[0][0].CG_Property_Maintenance);
          this._CG_Property_Maintenance_Model =this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Property_Maintenance;

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Pool_Information =JSON.parse(res[0][0].CG_Pool_Information);
          this._CG_Pool_Information_Model =this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Pool_Information;

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Utilities =JSON.parse(res[0][0].CG_Utilities);
          this._CG_Utilities_Model =this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Utilities;

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Recommended_Services =JSON.parse(res[0][0].CG_Recommended_Services);
          this._CG_Recommended_Services_Model =this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Recommended_Services;

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_General_Comments =JSON.parse(res[0][0].CG_General_Comments);
          this._CG_General_Comments_Model =this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_General_Comments;

          this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Order_Completion =JSON.parse(res[0][0].CG_Order_Completion);
          this._CG_Order_Completion_Model =this.PCR_Cyprexx_Grass_Checklist_Master_Model.CG_Order_Completion;

        }
        if (res[1].length > 0) {


          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_Cyprexx_Grass_Checklist_Master_Model();
            convertedData.CG_Property_Maintenance=JSON.parse(element.CG_Property_Maintenance);
            convertedData.CG_General_Property_Info=JSON.parse(element.CG_General_Property_Info);
            convertedData.CG_Pool_Information=JSON.parse(element.CG_Pool_Information);
            convertedData.CG_Utilities=JSON.parse(element.CG_Utilities);
            convertedData.CG_Recommended_Services=JSON.parse(element.CG_Recommended_Services);
            convertedData.CG_General_Comments=JSON.parse(element.CG_General_Comments);
            convertedData.CG_Order_Completion=JSON.parse(element.CG_Order_Completion);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;

          // this.PCR_History.CG_Property_Maintenance =JSON.parse(res[1][0].CG_Property_Maintenance);
          // this.PCR_History.CG_General_Property_Info =JSON.parse(res[1][0].CG_General_Property_Info);
          // this.PCR_History.CG_Pool_Information =JSON.parse(res[1][0].CG_Pool_Information);
          // this.PCR_History.CG_Utilities =JSON.parse(res[1][0].CG_Utilities);
          // this.PCR_History.CG_Recommended_Services =JSON.parse(res[1][0].CG_Recommended_Services);
          // this.PCR_History.CG_General_Comments =JSON.parse(res[1][0].CG_General_Comments);
          // this.PCR_History.CG_Order_Completion =JSON.parse(res[1][0].CG_Order_Completion);
        }
      });
  }
  PctHistoryConfigureObj: { ColumnName: string, KeyName: string } = { ColumnName: '', KeyName: '' };
  DisplayHistory(ColumnName,KeyName){
    this.PctHistoryConfigureObj.ColumnName=ColumnName;
    this.PctHistoryConfigureObj.KeyName=KeyName;
  }
}
