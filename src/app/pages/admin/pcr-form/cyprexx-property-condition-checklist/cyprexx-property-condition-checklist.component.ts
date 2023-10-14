import { Component, Input, OnInit } from '@angular/core';
import { PCR_Cyprexx_Property_Condition_Checklist, PCR_PC_General_Property_Questions, PCR_PC_Signature, } from './cyprexx-property-condition-checklist-model';
import { CyprexxPropertyConditionChecklistService} from './cyprexx-property-condition-checklist-service'

@Component({
  selector: 'app-cyprexx-property-condition-checklist',
  templateUrl: './cyprexx-property-condition-checklist.component.html',
  styleUrls: ['./cyprexx-property-condition-checklist.component.scss']
})
export class CyprexxPropertyConditionChecklistComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;
  PCR_HistoryList:PCR_Cyprexx_Property_Condition_Checklist[];
  _PCR_Cyprexx_Property_Condition_Checklist:PCR_Cyprexx_Property_Condition_Checklist=new PCR_Cyprexx_Property_Condition_Checklist()
  _PCR_PC_General_Property_Questions:PCR_PC_General_Property_Questions=new PCR_PC_General_Property_Questions()
  _PCR_PC_Signature:PCR_PC_Signature=new PCR_PC_Signature()

  isLoading: boolean;
  button: string = 'Save';

  constructor(private CyprexxPropertyConditionChecklistService:CyprexxPropertyConditionChecklistService) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this. GetCyprexxPropertyConditionChecklist();
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
        this.Signature(false);
        break;

        default:
        break;
    }
    this.TabVal = TabNo;
  }
  Signature(arg0: boolean) {
  }
  FormButton1(arg0: boolean) {
  }

  jsonModelObjStringify() {
    // debugger

    this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_General_Property_Questions =JSON.stringify(this._PCR_PC_General_Property_Questions);
    // console.log(this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_General_Property_Questions)
    this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_Signature =JSON.stringify(this._PCR_PC_Signature);
  }

  SaveForm(){
    this.jsonModelObjStringify();
    this.CreateUpdateCyprexxPropertyConditionChecklist();
  }

  CreateUpdateCyprexxPropertyConditionChecklist() {
    if (this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_PkeyID > 0) {
      this._PCR_Cyprexx_Property_Condition_Checklist.Type = 2;
    } else {
      this._PCR_Cyprexx_Property_Condition_Checklist.Type = 1;
    }
    this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_IsActive = true;
    this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_IsDelete = false;
    this._PCR_Cyprexx_Property_Condition_Checklist.fwo_pkyeId = this.FWO_PkyeId;
    this.CyprexxPropertyConditionChecklistService
      .CreateUpdateCyprexxPropertyConditionChecklist(this._PCR_Cyprexx_Property_Condition_Checklist)
      .subscribe((res) => {
        if (res[0]!=undefined && res[0]!=null) {
          this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }

  GetCyprexxPropertyConditionChecklist() {
    // debugger
    this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_WO_ID = this.WorkorderId;
    this._PCR_Cyprexx_Property_Condition_Checklist.Type = 3;
    this.CyprexxPropertyConditionChecklistService
      .GetCyprexxPropertyConditionChecklist(this._PCR_Cyprexx_Property_Condition_Checklist)
      .subscribe((res) => {
        if (res[0].length > 0) {
          this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_PkeyID=res[0][0].PCR_PC_PkeyID;
          this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_WO_ID=res[0][0].PCR_PC_WO_ID;

          this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_General_Property_Questions =JSON.parse(res[0][0].PCR_PC_General_Property_Questions);
          this._PCR_PC_General_Property_Questions =this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_General_Property_Questions;

          this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_Signature =JSON.parse(res[0][0].PCR_PC_Signature);
          this._PCR_PC_Signature =this._PCR_Cyprexx_Property_Condition_Checklist.PCR_PC_Signature;
        }
        if (res[1].length > 0) {

          // debugger;

          var convertedDataList=[];
          res[1].forEach(element => {
            // debugger
            var convertedData=new PCR_Cyprexx_Property_Condition_Checklist();
            convertedData.PCR_PC_General_Property_Questions=JSON.parse(element.PCR_PC_General_Property_Questions);
            convertedData.PCR_PC_Signature=JSON.parse(element.PCR_PC_Signature)
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
           
          });
          this.PCR_HistoryList=convertedDataList;
        }
      });
  }

  PctHistoryConfigureObj: { ColumnName: string, KeyName: string } = { ColumnName: '', KeyName: '' };
  DisplayHistory(ColumnName,KeyName){
    
    this.PctHistoryConfigureObj.ColumnName=ColumnName;
    this.PctHistoryConfigureObj.KeyName=KeyName;
  }

}
