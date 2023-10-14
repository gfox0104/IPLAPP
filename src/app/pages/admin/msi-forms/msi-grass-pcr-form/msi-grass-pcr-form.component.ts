import { Component, Input, OnInit } from '@angular/core';
import { BidItemsFormModel, CommentsFormModel, ConditionReportFormModel, FinalReviewsFormModel, MSIGarassSubjectPropertyPcrFormModel, PhotoManagerFormModel, SubjectPropertyFormModel } from './msi-grass-pcr-form.model';
import { MSIGrassPcrFormsServices } from './msi-grass-pcr-form.service';

@Component({
  selector: 'app-msi-grass-pcr-form',
  templateUrl: './msi-grass-pcr-form.component.html',
  styleUrls: ['./msi-grass-pcr-form.component.scss']
})
export class MSIGarassSubjectPropertyPcrFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId
  websiteList: any = ['tutsmake.com', 'abc.com', 'w3alert.com']
  PCR_HistoryList:MSIGarassSubjectPropertyPcrFormModel[];
  PCR_History:MSIGarassSubjectPropertyPcrFormModel=new MSIGarassSubjectPropertyPcrFormModel();
_mSIGarassSubjectPropertyPcrFormModelObj:MSIGarassSubjectPropertyPcrFormModel=new MSIGarassSubjectPropertyPcrFormModel();
_subjectPropertyFormModelObj:SubjectPropertyFormModel=new SubjectPropertyFormModel()
_conditionReportFormModelObj:ConditionReportFormModel=new ConditionReportFormModel();
_bidItemsFormModelobj:BidItemsFormModel=new BidItemsFormModel();
_photoManagerFormModelObj:PhotoManagerFormModel=new PhotoManagerFormModel()
_commentsFormModelobj:CommentsFormModel=new CommentsFormModel();
_finalReviewsFormModelObj:FinalReviewsFormModel=new FinalReviewsFormModel();
arrayObj: any = [{}]
jsonObj: any = {}
conditionList:{ Id: number; Name: string; }[];
EstimetDamagesList:{ Id: number; Name: string; }[];
DamagesList:{ Id: number; Name: string; }[];
OccupancyList:{ Id: number; Name: string; }[];
OccupancyVerifiedByList:{ Id: number; Name: string; }[];
WinterizedByList:{ Id: number; Name: string; }[];
WinterizeCompletenessList:{ Id: number; Name: string; }[];
isddlDisabled:boolean=true;
ButtonProType:string;
isLoadingProType:boolean;
isLoadingProIAcc:boolean;
ButtonProIAcc:string;
isLoading:boolean;
button:string="Save";
  constructor(private _mSIGrassPcrFormsServices:MSIGrassPcrFormsServices) {
    this._mSIGarassSubjectPropertyPcrFormModelObj=new MSIGarassSubjectPropertyPcrFormModel();
   }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.getMsiGrassData();
    }

    // this.getMsiGrassData()
    this.ddlConditionList();
    this.ddlDamagesList();
    this.ddlEstimetDamagesList();
    this.ddlOccupancyStatusList();
    this.ddlOccupancyVerifiedByList();
    this.ddlWinterizedByList();
    this.ddlWinterizeCompletenessList();
  }

  ddlConditionList(){
    this.conditionList=[
      {
        Id:1,
      Name:"Good"
      },
      {
        Id:2,
      Name:"Fair"
      },
      {
        Id:3,
      Name:"Poor"
      }
    ]
  }

  ddlDamagesList(){
    this.DamagesList=[
      {
        Id:1,
      Name:"Yes"
      },
      {
        Id:2,
      Name:"No"
      },
      {
        Id:3,
      Name:"Unable To Verify"
      }
    ]
  }

  ddlEstimetDamagesList(){
    this.EstimetDamagesList=[
      {
        Id:1,
      Name:"Less than $1,500"
      },
      {
        Id:2,
      Name:"$1,500 - $3,000"
      },
      {
        Id:3,
      Name:"$3,001 - $5,000"
      },
      {
        Id:4,
      Name:"$5,001 - $10,000"
      },
      {
        Id:5,
      Name:"$10,001 - $15,000"
      },
      {
        Id:6,
      Name:"$15,001 - $20,000"
      },
      {
        Id:7,
      Name:"Greater than $20,000"
      },
    ]
  }
  ddlOccupancyStatusList()
  {
    this.OccupancyList=[
      {
        Id:1,
      Name:"1. OWNER OCCUPIED"
      },
      {
        Id:2,
      Name:"2. OCCUPIED"
      },
      {
        Id:3,
      Name:"3. TENANT OCCUPIED"
      },
      {
        Id:4,
      Name:"4. VACANT SECURE"
      },
      {
        Id:5,
      Name:"5. VACANT UNSECURE"
      },
      {
        Id:6,
      Name:"6. PARTIALLY VACANT"
      },
      {
        Id:7,
      Name:"7. UNABLE TO VERIFY"
      },
      {
        Id:8,
      Name:"8. SECURITY GATE"
      },
      {
        Id:9,
      Name:"9. BAD ADDRESS"
      },
      {
        Id:10,
      Name:"10. VACANT LOT"
      }
    ]

  }
  ddlOccupancyVerifiedByList(){
    this.OccupancyVerifiedByList=[
      {
        Id:1,
      Name:"1. DIRECT CONTACT"
      },
      {
        Id:2,
      Name:"2. VISUAL"
      },
      {
        Id:3,
      Name:"3. NEIGHBOR"
      },
      {
        Id:4,
      Name:"4. MAILBOX"
      },
      {
        Id:5,
      Name:"5. UTILITIES"
      },
      {
        Id:6,
      Name:"6. PERSONAL ITEMS"
      },
      {
        Id:7,
      Name:"7. REALTOR"
      },
      {
        Id:8,
      Name:"8. SECURITY GUARD"
      },
      {
        Id:9,
      Name:"9. MANAGER"
      }
    ]
  }
  ddlWinterizedByList(){
    this.WinterizedByList=[
      {
        Id:1,
      Name:"FAFS"
      },
      {
        Id:2,
      Name:"FIVE BROTHERS"
      },
      {
        Id:3,
      Name:"LPS"
      },
      {
        Id:4,
      Name:"MCS"
      },
      {
        Id:5,
      Name:"MSI"
      },
      {
        Id:6,
      Name:"NFR"
      },
      {
        Id:7,
      Name:"OTHER"
      }
    ]
  }
  ddlWinterizeCompletenessList(){
    this.WinterizeCompletenessList=[
      {
        Id:1,
      Name:"Fully Winterized"
      },
      {
        Id:2,
      Name:"Not Winterized"
      },
      {
        Id:3,
      Name:"partially Winterized"
      },
      {
        Id:4,
      Name:"Unknown"
      }

    ]
  }

  OnthereDamagesChanged(event){
    // debugger
    let val=event;
    if(event.target.selectedIndex==1)
    {
      this.isddlDisabled=false;
    }
    else
    {
      this.isddlDisabled=true;
    }

  }

  getMsiGrassData(){
     this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_WO_Id =this.WorkorderId;
     this._mSIGarassSubjectPropertyPcrFormModelObj.Type=3;
     this._mSIGrassPcrFormsServices.GetMsiFORMSData(this._mSIGarassSubjectPropertyPcrFormModelObj)
     .subscribe(res =>{
      if (res[0].length > 0) {

        this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_PkeyId=res[0][0].MSI_Grass_PkeyId
        this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_WO_Id=res[0][0].MSI_Grass_WO_Id

        let General_Inf= JSON.parse(res[0][0].MSI_Grass_SubjectProperty);
        this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_SubjectProperty= General_Inf
        this._subjectPropertyFormModelObj= this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_SubjectProperty

        let Condition_report= JSON.parse(res[0][0].MSI_Grass_ConditionReport);
        this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_ConditionReport= Condition_report
        this._conditionReportFormModelObj= this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_ConditionReport
      }
      if (res[1].length > 0) {

        var convertedDataList=[];
        res[1].forEach(element => {
          var convertedData=new MSIGarassSubjectPropertyPcrFormModel();
          convertedData.MSI_Grass_SubjectProperty=JSON.parse(element.MSI_Grass_SubjectProperty);
          convertedData.ModifiedBy=element.ModifiedBy;
          convertedDataList.push(convertedData);
        });
        this.PCR_HistoryList=convertedDataList;

        //  this.PCR_History.MSI_Grass_SubjectProperty= JSON.parse(res[1][0].MSI_Grass_SubjectProperty);
        //  this.PCR_History.MSI_Grass_ConditionReport= JSON.parse(res[1][0].MSI_Grass_ConditionReport);
      }
    });
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
        this.PostUtilitiesSubmit(false);
        break;

      case 10:
        this.ApplianceSubmit(false);
        break;

      case 11:
        this.AddPCRDamage(false);
        break;

      case 12:
        this.PCRConveyancesave(false);
        break;

      default:
        break;
    }
    this.TabVal = TabNo;
  }
  FormButton1(arg0: boolean) {
  //  debugger
   //this.jsonObj=this._subjectPropertyFormModelObj
   //this._mSIGarassSubjectPropertyPcrFormModelObj.PCR_PCFM_General_Information=JSON.stringify(this._subjectPropertyFormModelObj)

   //let jsonObj = JSON.parse(this._mSIGarassSubjectPropertyPcrFormModelObj.PCR_PCFM_General_Information)
   //let name: string = jsonObj.name
   //let property: string = jsonObj.property
   //this.savePCR_Cyperexx_FormsMasterData();
  }
  ViolationSubmit(arg0: boolean){

    // debugger
    //var val=this._subjectPropertyFormModelObj
  }
  SecuringSubmit(arg0: boolean){

  }
  SubmitWinterization(arg0: boolean){

  }
  YardMaintananceSubmit(arg0: boolean){

  }
  DebrisSubmit(arg0: boolean){

  }
  PcrRoofData(arg0: boolean){

  }
  PcrPoolData(arg0: boolean){

  }
  PostUtilitiesSubmit(arg0: boolean){

  }
  ApplianceSubmit(arg0: boolean){

  }
  AddPCRDamage(arg0: boolean){

  }
  PCRConveyancesave(arg0: boolean){}


  saveMsiGrassPCR_FormsMasterData(){
    // debugger
    if(this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_PkeyId>0)
    {
      this._mSIGarassSubjectPropertyPcrFormModelObj.Type=2;
    }
    else
    {
      this._mSIGarassSubjectPropertyPcrFormModelObj.Type=1;
    }
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_IsActive=true;
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_IsDelete=false;
    this._mSIGarassSubjectPropertyPcrFormModelObj.fwo_pkyeId=this.FWO_PkyeId;
    this._mSIGrassPcrFormsServices.PostMSIGrassFORMSMasterData(this._mSIGarassSubjectPropertyPcrFormModelObj)
    .subscribe(res =>{
// debugger
      if (res[0] > 0) {
        this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_PkeyId = res[0]
        alert('Details Saved Successfully')
      }
      else {
        alert('Something went wrong please try again later...')
      }
    });
  }

  save(){
    this.jsonObj={
      "":""
    }
  }
  saveSubjectProperty(){
    // debugger
    this.jsonModelObjStringify();
    this.saveMsiGrassPCR_FormsMasterData();
  }

  jsonModelObjStringify(){
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_SubjectProperty=JSON.stringify(this._subjectPropertyFormModelObj);
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_ConditionReport=JSON.stringify(this._conditionReportFormModelObj);
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_BidItems=JSON.stringify(this._bidItemsFormModelobj);
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_PhotoManager=JSON.stringify(this._photoManagerFormModelObj);
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_Comments=JSON.stringify(this._commentsFormModelobj);
    this._mSIGarassSubjectPropertyPcrFormModelObj.MSI_Grass_FinalReviews=JSON.stringify(this._finalReviewsFormModelObj);

  }
  ShowDropdownValueInLabel(type,selectedValue)
  {
    var label="";
    if (selectedValue != undefined && selectedValue != null && selectedValue > 0)
    {
      if (type=== 'conditionList') {
        var getObj = this.conditionList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else if (type === 'DamagesList') {
        var getObj = this.DamagesList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else if (type === 'EstimetDamagesList') {
        var getObj = this.EstimetDamagesList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else if (type === 'OccupancyList') {
        var getObj = this.OccupancyList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else if (type === 'OccupancyVerifiedByList') {
        var getObj = this.OccupancyList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else if (type === 'WinterizedByList') {
        var getObj = this.WinterizedByList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else if (type === 'WinterizeCompletenessList') {
        var getObj = this.WinterizeCompletenessList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else if (type === 'WinterizeCompletenessList') {
        var getObj = this.WinterizeCompletenessList.filter((x) => x.Id == selectedValue);
        if (getObj.length > 0) {
          label = getObj[0].Name;
        }
      }
      else
      {
        label="";
      }
    }
    return label;
  }
}
