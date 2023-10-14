import { Component, Input, OnInit } from '@angular/core';
import { PCR_Five_Brothers_Inspection_Form_Model,INS_Inspection } from './inspection-form-model';
import { PCRInspectionFormService } from './inspection-form-service';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:PCR_Five_Brothers_Inspection_Form_Model[];
  PCR_History:PCR_Five_Brothers_Inspection_Form_Model=new PCR_Five_Brothers_Inspection_Form_Model();
  PCR_Five_Brothers_Inspection_Form_Model:PCR_Five_Brothers_Inspection_Form_Model=new PCR_Five_Brothers_Inspection_Form_Model();
  INS_Inspection:INS_Inspection=new INS_Inspection();

  isLoading: boolean;
  button: string = 'Save';
  constructor(private pCRInspectionFormService:PCRInspectionFormService) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetPCRInspectionForm();
    }
  }

  jsonModelObjStringify() {
    this.PCR_Five_Brothers_Inspection_Form_Model.INS_Inspection =JSON.stringify(this.INS_Inspection);
  }
  SaveForm(){
    this.jsonModelObjStringify();
    this.POSTPCRInspectionForm();
  }
  POSTPCRInspectionForm() {
    if (this.PCR_Five_Brothers_Inspection_Form_Model.INS_PkeyID > 0) {
      this.PCR_Five_Brothers_Inspection_Form_Model.Type = 2;
    } else {
      this.PCR_Five_Brothers_Inspection_Form_Model.Type = 1;
    }
    this.PCR_Five_Brothers_Inspection_Form_Model.INS_IsActive = true;
    this.PCR_Five_Brothers_Inspection_Form_Model.INS_IsDelete = false;
    this.PCR_Five_Brothers_Inspection_Form_Model.fwo_pkyeId = this.FWO_PkyeId;
    this.pCRInspectionFormService
      .POSTPCRInspectionForm(this.PCR_Five_Brothers_Inspection_Form_Model)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.PCR_Five_Brothers_Inspection_Form_Model.INS_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetPCRInspectionForm() {
    this.PCR_Five_Brothers_Inspection_Form_Model.INS_WO_ID = this.WorkorderId;
    this.PCR_Five_Brothers_Inspection_Form_Model.Type = 3;
    this.pCRInspectionFormService
      .GetPCRInspectionForm(this.PCR_Five_Brothers_Inspection_Form_Model)
      .subscribe((res) => {
        if (res[0].length > 0) {

          this.PCR_Five_Brothers_Inspection_Form_Model.INS_PkeyID=res[0][0].INS_PkeyID;
          this.PCR_Five_Brothers_Inspection_Form_Model.INS_WO_ID=res[0][0].INS_WO_ID;

          this.PCR_Five_Brothers_Inspection_Form_Model.INS_Inspection =JSON.parse(res[0][0].INS_Inspection);
          this.INS_Inspection =this.PCR_Five_Brothers_Inspection_Form_Model.INS_Inspection;
        }
        if (res[1].length > 0) {
          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_Five_Brothers_Inspection_Form_Model();
            convertedData.INS_Inspection=JSON.parse(element.INS_Inspection);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;
          // this.PCR_History.INS_Inspection=JSON.parse(res[1][0].INS_Inspection);
        }
      });
  }

}
