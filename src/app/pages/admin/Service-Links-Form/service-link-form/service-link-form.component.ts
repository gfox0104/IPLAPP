import { Component, Input, OnInit } from '@angular/core';
import { Service_Link_Form_Master_Model, SL_General_Information, SL_PCR2_VI_Violation_Information, SL_Property_Condition_Report1, SL_Property_Condition_Report2 } from './service-link-form.model';
import { ServiceLinkFormService } from './service-link-form.service';

@Component({
  selector: 'app-service-link-form',
  templateUrl: './service-link-form.component.html',
  styleUrls: ['./service-link-form.component.scss']
})
export class ServiceLinkFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

  PCR_HistoryList:Service_Link_Form_Master_Model[];
  // PCR_History:Service_Link_Form_Master_Model=new Service_Link_Form_Master_Model();

  Service_Link_Form_Master_Model:Service_Link_Form_Master_Model=new Service_Link_Form_Master_Model();
  SL_General_Information:SL_General_Information=new SL_General_Information();
  SL_Property_Condition_Report1:SL_Property_Condition_Report1=new SL_Property_Condition_Report1();
  SL_Property_Condition_Report2:SL_Property_Condition_Report2=new SL_Property_Condition_Report2();
  SL_PCR2_VI_Violation_Information:SL_PCR2_VI_Violation_Information=new SL_PCR2_VI_Violation_Information();
  ViolationInformation:SL_PCR2_VI_Violation_Information[]=[];

  TotalDebitAmount = 0;

  isLoading: boolean;
  button: string = 'Save';
  commonDropdownList:{ Id: string; Name: string; }[];
  constructor(private serviceLinkFormService:ServiceLinkFormService) {
    this.ddlCommonDropdownOption();
   }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetServiceLinkForm();
    }
  }

  ddlCommonDropdownOption(){
    this.commonDropdownList=[
      {
        Id:"Yes",
        Name:"Yes"
      },
      {
        Id:"No",
        Name:"No"
      },
      {
        Id:"Unknown",
        Name:"Unknown"
      }
    ]
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
  SaveFormDetails(){
    this.jsonModelObjStringify();
    this.PostServiceLinkForm();
  }

  jsonModelObjStringify() {
    this.Service_Link_Form_Master_Model.SL_General_Information =JSON.stringify(this.SL_General_Information);
    this.Service_Link_Form_Master_Model.SL_Property_Condition_Report1 =JSON.stringify(this.SL_Property_Condition_Report1);
    this.SL_Property_Condition_Report2.SL_PCR2_VI_Violation_Information=this.ViolationInformation;
    this.Service_Link_Form_Master_Model.SL_Property_Condition_Report2 =JSON.stringify(this.SL_Property_Condition_Report2);
  }
  GetServiceLinkForm() {
    this.Service_Link_Form_Master_Model.SL_WO_ID = this.WorkorderId;
    this.Service_Link_Form_Master_Model.Type = 3;
    this.serviceLinkFormService
      .GetServiceLinkForm(this.Service_Link_Form_Master_Model)
      .subscribe((res) => {
        if (res[0].length > 0) {

          this.Service_Link_Form_Master_Model.SL_Pkey_ID=res[0][0].SL_Pkey_ID;
          this.Service_Link_Form_Master_Model.SL_WO_ID=res[0][0].SL_WO_ID;

          this.Service_Link_Form_Master_Model.SL_General_Information =JSON.parse(res[0][0].SL_General_Information);
          this.SL_General_Information =this.Service_Link_Form_Master_Model.SL_General_Information;

          this.Service_Link_Form_Master_Model.SL_Property_Condition_Report1 =JSON.parse(res[0][0].SL_Property_Condition_Report1);
          this.SL_Property_Condition_Report1 =this.Service_Link_Form_Master_Model.SL_Property_Condition_Report1;

          this.Service_Link_Form_Master_Model.SL_Property_Condition_Report2 =JSON.parse(res[0][0].SL_Property_Condition_Report2);
          this.SL_Property_Condition_Report2 =this.Service_Link_Form_Master_Model.SL_Property_Condition_Report2;
          this.ViolationInformation=this.Service_Link_Form_Master_Model.SL_Property_Condition_Report2.SL_PCR2_VI_Violation_Information;
        }
        if (res[1].length > 0) {
          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new Service_Link_Form_Master_Model();
            convertedData.SL_General_Information=JSON.parse(element.SL_General_Information);
            convertedData.SL_Property_Condition_Report1=JSON.parse(element.SL_Property_Condition_Report1);
            convertedData.SL_Property_Condition_Report2=JSON.parse(element.SL_Property_Condition_Report2);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;

          // this.PCR_History.SL_General_Information =JSON.parse(res[1][0].SL_General_Information);
          // this.PCR_History.SL_Property_Condition_Report1 =JSON.parse(res[1][0].SL_Property_Condition_Report1);
          // this.PCR_History.SL_Property_Condition_Report2 =JSON.parse(res[1][0].SL_Property_Condition_Report2);

        }
      });
  }
  PostServiceLinkForm() {
    if (this.Service_Link_Form_Master_Model.SL_Pkey_ID > 0) {
      this.Service_Link_Form_Master_Model.Type = 2;
    } else {
      this.Service_Link_Form_Master_Model.Type = 1;
    }
    this.Service_Link_Form_Master_Model.SL_IsActive = true;
    this.Service_Link_Form_Master_Model.SL_IsDelete = false;
    this.Service_Link_Form_Master_Model.fwo_pkyeId = this.FWO_PkyeId;

    this.serviceLinkFormService
      .PostServiceLinkForm(this.Service_Link_Form_Master_Model)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.Service_Link_Form_Master_Model.SL_Pkey_ID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  AddViolationInformation(){
    this.ViolationInformation.push(this.SL_PCR2_VI_Violation_Information);
    this.SL_PCR2_VI_Violation_Information=new SL_PCR2_VI_Violation_Information();
  }
  DeleteViolationInformation(index){
    this.ViolationInformation.splice(index, 1);
  }
  ViolationType(violation:SL_PCR2_VI_Violation_Information){
    var violationTypeText="";
    if(violation.SL_PCR2_VI_ViolationsType_AbandonedVehioles)
    {
      violationTypeText+="Abandoned Vehioles"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_NoTrespassing)
    {
      violationTypeText+="No Trespassing"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_ExteriorDebris)
    {
      violationTypeText+="Exterior Debris"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_PastDueRentOrUtilities)
    {
      violationTypeText+="Past Due Rent/Utilities"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_DebrisRemoval)
    {
      violationTypeText+="Debris Removal"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_GrassOrYardCare)
    {
      violationTypeText+="Grass/Yard Care"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_PublicNuisanceDamage)
    {
      violationTypeText+="Public Nuisance Damage"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_DoNotEnter)
    {
      violationTypeText+="Do Not Enter"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_InteriorDebris)
    {
      violationTypeText+="Interior Debris"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_Other)
    {
      violationTypeText+="Other"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_Demoltions)
    {
      violationTypeText+="Demoltions"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_llegalConversion)
    {
      violationTypeText+="llegal Conversion"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_Safety)
    {
      violationTypeText+="Safety"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_DoNotOccupy)
    {
      violationTypeText+="Do Not Occupy"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_MethLba)
    {
      violationTypeText+="Meth Lba"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_Condemnation)
    {
      violationTypeText+="Condemnation"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_Health)
    {
      violationTypeText+="Health"+", ";
    }
    if(violation.SL_PCR2_VI_ViolationsType_Pool)
    {
      violationTypeText+="Pool"+", ";
    }
    return violationTypeText;
  }
}
