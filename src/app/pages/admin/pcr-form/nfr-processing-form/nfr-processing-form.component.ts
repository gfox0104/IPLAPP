import { Component, Input, OnInit } from '@angular/core';
import { NFR_Processing_Form_Master,
  NRFP_General,NRFP_Utilities,
  NRFP_Securing,NRFP_Winterization,
  NRFP_Boarding,NRFP_Debris,NRFP_Roof,
  NRFP_Moisture,NRFP_Damages,NRFP_PhotoChecklist, NRFP_Yard
} from './nfr-processing-form.model';
import { NRFProcessingFormService } from './nfr-processing-form.service';

@Component({
  selector: 'app-nfr-processing-form',
  templateUrl: './nfr-processing-form.component.html',
  styleUrls: ['./nfr-processing-form.component.scss']
})
export class NFRProcessingFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:NFR_Processing_Form_Master[];
  PCR_History:NFR_Processing_Form_Master=new NFR_Processing_Form_Master();
  nfr_Processing_Form_Master:NFR_Processing_Form_Master=new NFR_Processing_Form_Master();
  nfrp_General:NRFP_General=new NRFP_General();
  nfrp_Utilities:NRFP_Utilities=new NRFP_Utilities();
  nfrp_Securing:NRFP_Securing=new NRFP_Securing();
  nfrp_Winterization:NRFP_Winterization=new NRFP_Winterization();
  nfrp_Boarding:NRFP_Boarding=new NRFP_Boarding();
  nfrp_Debris:NRFP_Debris=new NRFP_Debris();
  nfrp_Roof:NRFP_Roof=new NRFP_Roof();
  nfrp_Moisture:NRFP_Moisture=new NRFP_Moisture();
  nfrp_Yard:NRFP_Yard=new NRFP_Yard();
  nfrp_Damages:NRFP_Damages=new NRFP_Damages();
  nfrp_PhotoChecklist:NRFP_PhotoChecklist=new NRFP_PhotoChecklist();

  isLoading: boolean;
  button: string = 'Save';

  constructor(private _NRFProcessingFormService:NRFProcessingFormService) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.Get_NFR_ProcessingFormMaster();
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

      case 8:
        this.PcrPoolData(false);
        
        
        break;

      case 9:
        this.Yard(false);
        
        break;

      case 10:
        this.PostUtilitiesSubmit(false);
        
        break;

      case 11:
        this.ApplianceSubmit(false);
        
        break;
      case 12:
        this.AddPCRDamage(false);
          break;

      default:
        break;
    }
    this.TabVal = TabNo;
  }
  Yard(arg0: boolean) {
  }
  AddPCRDamage(arg0: boolean) {

  }
  ApplianceSubmit(arg0: boolean) {

  }
  PostUtilitiesSubmit(arg0: boolean) {

  }
  PcrPoolData(arg0: boolean) {

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
     debugger
    this.nfr_Processing_Form_Master.PCR_General =JSON.stringify(this.nfrp_General);
    this.nfr_Processing_Form_Master.PCR_Utilities =JSON.stringify(this.nfrp_Utilities);
    this.nfr_Processing_Form_Master.PCR_Securing =JSON.stringify(this.nfrp_Securing);
    this.nfr_Processing_Form_Master.PCR_Winterization =JSON.stringify(this.nfrp_Winterization);
    this.nfr_Processing_Form_Master.PCR_Bording =JSON.stringify(this.nfrp_Boarding);
    this.nfr_Processing_Form_Master.PCR_Debris =JSON.stringify(this.nfrp_Debris);
    this.nfr_Processing_Form_Master.PCR_Roof =JSON.stringify(this.nfrp_Roof);
    this.nfr_Processing_Form_Master.PCR_Moisture =JSON.stringify(this.nfrp_Moisture);
    this.nfr_Processing_Form_Master.PCR_Yard =JSON.stringify(this.nfrp_Yard);
    this.nfr_Processing_Form_Master.PCR_Damages =JSON.stringify(this.nfrp_Damages);
    this.nfr_Processing_Form_Master.PCR_PhotoCheckList =JSON.stringify(this.nfrp_PhotoChecklist);
  }
  SaveForm(){
     debugger
    this.jsonModelObjStringify();
    this.Post_NFR_ProcessingFormMaster();
  }
  Post_NFR_ProcessingFormMaster() {
     debugger
    if (this.nfr_Processing_Form_Master.PCR_PkeyID > 0) {
      this.nfr_Processing_Form_Master.Type = 2;
    } else {
      this.nfr_Processing_Form_Master.Type = 1;
    }
    this.nfr_Processing_Form_Master.PCR_IsActive = true;
    this.nfr_Processing_Form_Master.PCR_IsDelete = false;
    this.nfr_Processing_Form_Master.fwo_pkyeId = this.FWO_PkyeId;
    this._NRFProcessingFormService
      .PostNRFProcessingMaster(this.nfr_Processing_Form_Master)
      .subscribe((res) => {
        if (res[0]!=undefined && res[0]!=null) {
          debugger;
        
          var PCR_PkeyID = res[0].PCR_PkeyID;
         
          this.nfr_Processing_Form_Master.PCR_PkeyID = parseInt(PCR_PkeyID);
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  Get_NFR_ProcessingFormMaster() {
    debugger
    this.nfr_Processing_Form_Master.PCR_PkeyID = 0;
    this.nfr_Processing_Form_Master.PCR_WO_ID = this.WorkorderId;
    this.nfr_Processing_Form_Master.Type = 3;
    this._NRFProcessingFormService
      .GetNRFProcessingFormMaster(this.nfr_Processing_Form_Master)
      .subscribe((res) => {
        console.log('res',res)
        if (res[0].length > 0) {
          this.nfr_Processing_Form_Master.PCR_PkeyID=res[0][0].PCR_PkeyID;
          this.nfr_Processing_Form_Master.PCR_WO_ID=res[0][0].PCR_WO_ID;

          this.nfr_Processing_Form_Master.PCR_General =JSON.parse(res[0][0].PCR_General);
          this.nfrp_General =this.nfr_Processing_Form_Master.PCR_General;

          this.nfr_Processing_Form_Master.PCR_Utilities =JSON.parse(res[0][0].PCR_Utilities);
          this.nfrp_Utilities =this.nfr_Processing_Form_Master.PCR_Utilities;

          this.nfr_Processing_Form_Master.PCR_Securing =JSON.parse(res[0][0].PCR_Securing);
          this.nfrp_Securing =this.nfr_Processing_Form_Master.PCR_Securing;

          this.nfr_Processing_Form_Master.PCR_Winterization =JSON.parse(res[0][0].PCR_Winterization);
          this.nfrp_Winterization =this.nfr_Processing_Form_Master.PCR_Winterization;

          this.nfr_Processing_Form_Master.PCR_Bording =JSON.parse(res[0][0].PCR_Bording);
          this.nfrp_Boarding =this.nfr_Processing_Form_Master.PCR_Bording;

          this.nfr_Processing_Form_Master.PCR_Debris =JSON.parse(res[0][0].PCR_Debris);
          this.nfrp_Debris =this.nfr_Processing_Form_Master.PCR_Debris;

          this.nfr_Processing_Form_Master.PCR_Roof =JSON.parse(res[0][0].PCR_Roof);
          this.nfrp_Roof =this.nfr_Processing_Form_Master.PCR_Roof;

          this.nfr_Processing_Form_Master.PCR_Moisture =JSON.parse(res[0][0].PCR_Moisture);
          this.nfrp_Moisture =this.nfr_Processing_Form_Master.PCR_Moisture;

          this.nfr_Processing_Form_Master.PCR_Yard =JSON.parse(res[0][0].PCR_Yard);
          this.nfrp_Yard =this.nfr_Processing_Form_Master.PCR_Yard;

          this.nfr_Processing_Form_Master.PCR_Damages =JSON.parse(res[0][0].PCR_Damages);
          this.nfrp_Damages =this.nfr_Processing_Form_Master.PCR_Damages;

          this.nfr_Processing_Form_Master.PCR_PhotoCheckList =JSON.parse(res[0][0].PCR_PhotoCheckList);
          this.nfrp_PhotoChecklist =this.nfr_Processing_Form_Master.PCR_PhotoCheckList;

        }
        if (res[1].length > 0) {
              
          var convertedDataList=[];
        res[1].forEach(element => {
          var convertedData=new NFR_Processing_Form_Master();
          convertedData.PCR_General=JSON.parse(element.PCR_General);
          convertedData.PCR_Utilities=JSON.parse(element.PCR_Utilities);
          convertedData.PCR_Securing=JSON.parse(element.PCR_Securing);
          convertedData.PCR_Winterization =JSON.parse(element.PCR_Winterization );
          convertedData.PCR_Bording=JSON.parse(element.PCR_Bording);
          convertedData.PCR_Debris=JSON.parse(element.PCR_Debris);
          convertedData.PCR_Roof=JSON.parse(element.PCR_Roof);
          convertedData.PCR_Moisture=JSON.parse(element.PCR_Moisture);
          convertedData.PCR_Yard=JSON.parse(element.PCR_Yard)
          convertedData.PCR_Damages=JSON.parse(element.PCR_Damages);
          convertedData.PCR_PhotoCheckList=JSON.parse(element.PCR_PhotoCheckList);
          convertedData.ModifiedBy=element.ModifiedBy;
          convertedDataList.push(convertedData);
        });
        this.PCR_HistoryList=convertedDataList;









            // this.PCR_History.PCR_General =JSON.parse(res[1][0].PCR_General);
            // this.PCR_History.PCR_Utilities = JSON.parse(res[1][0].PCR_Utilities);
            // this.PCR_History.PCR_Securing = JSON.parse(res[1][0].PCR_Securing);
            // this.PCR_History.PCR_Winterization = JSON.parse(res[1][0].PCR_Winterization);
            // this.PCR_History.PCR_Bording = JSON.parse(res[1][0].PCR_Bording);
            // this.PCR_History.PCR_Debris = JSON.parse(res[1][0].PCR_Debris);
            // this.PCR_History.PCR_Roof = JSON.parse(res[1][0].PCR_Roof);
            // this.PCR_History.PCR_Moisture = JSON.parse(res[1][0].PCR_Moisture);
            // this.PCR_History.PCR_Damages = JSON.parse(res[1][0].PCR_Damages);
            // this.PCR_History.PCR_PhotoCheckList = JSON.parse(res[1][0].PCR_PhotoCheckList);
        }
      });
  }
}
