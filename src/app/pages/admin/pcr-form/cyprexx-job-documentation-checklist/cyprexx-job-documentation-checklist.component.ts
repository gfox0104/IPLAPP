import { Component, Input, OnInit } from '@angular/core';
import { PCR_Cyprexx_Job_Documentation_Checklist, PCR_JD_Job_Info } from './cyprexx-job-documentation-checklist-model';
import { CyprexxJobDocumentationChecklistService } from './cyprexx-job-documentation-checklist-service';

@Component({
  selector: 'app-cyprexx-job-documentation-checklist',
  templateUrl: './cyprexx-job-documentation-checklist.component.html',
  styleUrls: ['./cyprexx-job-documentation-checklist.component.scss']
})
export class CyprexxJobDocumentationChecklistComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:PCR_Cyprexx_Job_Documentation_Checklist[];
  PCR_History:PCR_Cyprexx_Job_Documentation_Checklist=new PCR_Cyprexx_Job_Documentation_Checklist()
  _PCR_Cyprexx_Job_Documentation_Checklist:PCR_Cyprexx_Job_Documentation_Checklist=new PCR_Cyprexx_Job_Documentation_Checklist()
  _PCR_JD_Job_Info:PCR_JD_Job_Info=new PCR_JD_Job_Info()

  isLoading: boolean;
  button: string = 'Save';

  constructor(private cyprexxJobDocumentationChecklistService:CyprexxJobDocumentationChecklistService) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetCyprexxJobDocumentationChecklist();
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
        this.UploadPhotos(false);
        break;

        default:
        break;
    }
    this.TabVal = TabNo;
  }
  UploadPhotos(arg0: boolean) {

  }

  FormButton1(arg0: boolean) {
  }
  jsonModelObjStringify() {
    this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_Job_Info =JSON.stringify(this._PCR_JD_Job_Info);
    this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_Upload_Photos ="{}";
  }

  SaveForm(){
    debugger
    this.jsonModelObjStringify();
    this.PostCyprexxJobDocumentationChecklist();
  }

  PostCyprexxJobDocumentationChecklist() {
    debugger
    if (this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_PkeyID > 0) {
      this._PCR_Cyprexx_Job_Documentation_Checklist.Type = 2;
    } else {
      this._PCR_Cyprexx_Job_Documentation_Checklist.Type = 1;
    }
    this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_IsActive = true;
    this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_IsDelete = false;
    this._PCR_Cyprexx_Job_Documentation_Checklist.fwo_pkyeId = this.FWO_PkyeId;
    this.cyprexxJobDocumentationChecklistService
      .PostCyprexxJobDocumentationChecklist(this._PCR_Cyprexx_Job_Documentation_Checklist)
      .subscribe((res) => {
        console.log('res122',res)
        if (res[0]!=undefined && res[0]!=null) {
          debugger
          var PCR_JD_PkeyID = res[0].PCR_PkeyID
          this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_PkeyID = parseInt(PCR_JD_PkeyID)
          // this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetCyprexxJobDocumentationChecklist() {
    this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_PkeyID = 0;
    this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_WO_ID = this.WorkorderId;
    this._PCR_Cyprexx_Job_Documentation_Checklist.Type = 3;
    this.cyprexxJobDocumentationChecklistService
      .GetCyprexxJobDocumentationChecklist(this._PCR_Cyprexx_Job_Documentation_Checklist)
      .subscribe((res) => {
        if (res[0].length > 0) {
          this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_PkeyID=res[0][0].PCR_JD_PkeyID;
          this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_WO_ID=res[0][0].PCR_JD_WO_ID;

          this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_Job_Info =JSON.parse(res[0][0].PCR_JD_Job_Info);
          this._PCR_JD_Job_Info =this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_Job_Info;

          this._PCR_Cyprexx_Job_Documentation_Checklist.PCR_JD_Upload_Photos =JSON.parse(res[0][0].PCR_JD_Upload_Photos);
        }
        if (res[1].length > 0) {

          // debugger;

          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_Cyprexx_Job_Documentation_Checklist();
            convertedData.PCR_JD_Job_Info=JSON.parse(element.PCR_JD_Job_Info);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;
          // this.PCR_History.PCR_JD_Job_Info =JSON.parse(res[1][0].PCR_JD_Job_Info);
        }
      });
  }

  PctHistoryConfigureObj: { ColumnName: string, KeyName: string } = { ColumnName: '', KeyName: '' };
  DisplayHistory(ColumnName,KeyName){
    // debugger;
    this.PctHistoryConfigureObj.ColumnName=ColumnName;
    this.PctHistoryConfigureObj.KeyName=KeyName;
  }

}
