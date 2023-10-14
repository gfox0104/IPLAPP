import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CyprexxWinterizationPressureServices } from './cyprexx-winterization-pressure-ckecklist-service';
import { PCR_CW_Pressure_Test_Model, PCR_CyprexxWinterizationPressureModel } from './cyprexx-winterization-pressure-ckecklist.model';
import * as $ from 'jquery';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cyprexx-winterization-pressure-ckecklist',
  templateUrl: './cyprexx-winterization-pressure-ckecklist.component.html',
  styleUrls: ['./cyprexx-winterization-pressure-ckecklist.component.scss']
})
export class CyprexxWinterizationPressureCkecklistComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:PCR_CyprexxWinterizationPressureModel[];
  PCR_CyprexxWinterizationPressureModel:PCR_CyprexxWinterizationPressureModel=new PCR_CyprexxWinterizationPressureModel()
  PCR_CW_Pressure_Test_Model:PCR_CW_Pressure_Test_Model=new PCR_CW_Pressure_Test_Model()

  @ViewChild('HistoryPopover') public HistoryPopover: NgbPopover;

  LotSize: boolean = true;
  breakscapped: boolean = true;
  pressuretesttheWell: boolean = true;
  Breakscapped: boolean = true
  isLoading: boolean;
  button: string = 'Save';
  constructor(private cyprexxWinterizationPressureServices:CyprexxWinterizationPressureServices) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetCyprexxWinterizationPressure()
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


      default:
        break;
    }
    this.TabVal = TabNo;
  }

  ViolationSubmit(arg0: boolean) {

  }
  FormButton1(arg0: boolean) {

  }
  SaveForm(){
    this.jsonModelObjStringify();
    this.PostCyprexxWinterizationPressure();
  }
  jsonModelObjStringify() {
    this.PCR_CyprexxWinterizationPressureModel.PCR_CW_Pressure_Test =JSON.stringify(this.PCR_CW_Pressure_Test_Model);
  }
  PostCyprexxWinterizationPressure() {
    if (this.PCR_CyprexxWinterizationPressureModel.PCR_CW_PkeyID > 0) {
      this.PCR_CyprexxWinterizationPressureModel.Type = 2;
    } else {
      this.PCR_CyprexxWinterizationPressureModel.Type = 1;
    }
    this.PCR_CyprexxWinterizationPressureModel.PCR_CW_IsActive = true;
    this.PCR_CyprexxWinterizationPressureModel.PCR_CW_IsDelete = false;
    this.PCR_CyprexxWinterizationPressureModel.fwo_pkyeId = this.FWO_PkyeId;
    this.cyprexxWinterizationPressureServices
      .PostCyprexxWinterizationPressure(this.PCR_CyprexxWinterizationPressureModel)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.PCR_CyprexxWinterizationPressureModel.PCR_CW_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetCyprexxWinterizationPressure() {
    this.PCR_CyprexxWinterizationPressureModel.PCR_CW_WO_ID = this.WorkorderId;
    this.PCR_CyprexxWinterizationPressureModel.Type = 3;
    this.cyprexxWinterizationPressureServices
      .GetCyprexxWinterizationPressure(this.PCR_CyprexxWinterizationPressureModel)
      .subscribe((res) => {
        if (res[0].length > 0) {

          this.PCR_CyprexxWinterizationPressureModel.PCR_CW_PkeyID=res[0][0].PCR_CW_PkeyID;
          this.PCR_CyprexxWinterizationPressureModel.PCR_CW_WO_ID=res[0][0].PCR_CW_WO_ID;

          this.PCR_CyprexxWinterizationPressureModel.PCR_CW_Pressure_Test =JSON.parse(res[0][0].PCR_CW_Pressure_Test);
          this.PCR_CW_Pressure_Test_Model =this.PCR_CyprexxWinterizationPressureModel.PCR_CW_Pressure_Test;
        }
        if(res[1].length>0)
        {
          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_CyprexxWinterizationPressureModel();
            convertedData.PCR_CW_Pressure_Test=JSON.parse(element.PCR_CW_Pressure_Test);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;
          //here you get the history data
          // this.PCR_History.PCR_CW_Pressure_Test=JSON.parse(res[1][0].PCR_CW_Pressure_Test)
        }
      });
  }


  PctHistoryConfigureObj: { ColumnName: string, KeyName: string } = { ColumnName: '', KeyName: '' };
  DisplayHistory(ColumnName,KeyName){
    this.PctHistoryConfigureObj.ColumnName=ColumnName;
    this.PctHistoryConfigureObj.KeyName=KeyName;
  }
}
