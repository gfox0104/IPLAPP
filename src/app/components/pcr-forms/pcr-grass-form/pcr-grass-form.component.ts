import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PCRGrassInfoModel } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr-model';
import { ClientResultPCRServices } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr.service';
import { IplAppModalContent } from '../../iplapp-modal-content/iplapp-modal-content.component';

@Component({
  selector: 'app-pcr-grass-form',
  templateUrl: './pcr-grass-form.component.html',
  styleUrls: ['./pcr-grass-form.component.scss']
})
export class PcrGrassFormComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;


  PCR_HistoryList:PCRGrassInfoModel[];
  PCRGrassInfoModelObj: PCRGrassInfoModel = new PCRGrassInfoModel();
  // PCR_Hitsory: PCRGrassInfoModel = new PCRGrassInfoModel();
  LotSize: boolean = true;
  OtherNote: boolean = true;
  RealtorInfo: boolean = true;
  DamageNote: boolean = true;
  buttonGrass = "Save"; // buttom loading..
  isLoadingGrass = false; // buttom loading..
  MessageFlag: string;
  constructor(private xClientResultPCRServices: ClientResultPCRServices,
     private modalService: NgbModal,)
    {

    }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetGrassDetail();
    }
  }

  GetGrassDetail() {
    this.PCRGrassInfoModelObj.Grass_WO_ID = this.WorkorderId;
    this.PCRGrassInfoModelObj.Type = 3;
    this.xClientResultPCRServices
      .PCRGrassCutDataGet(this.PCRGrassInfoModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {
          this.PCRGrassInfoModelObj.Grass_PkeyID = response[0][0].Grass_Cut_PkeyID;
          this.PCRGrassInfoModelObj.Grass_WO_ID = response[0][0].Grass_Cut_WO_ID;
          this.PCRGrassInfoModelObj.Grass_GrassCutComp = response[0][0].Grass_Cut_Completed;
          this.PCRGrassInfoModelObj.Grass_UnableToCut = response[0][0].Grass_Cut_Unable_To_Cut;
          this.PCRGrassInfoModelObj.Grass_LotSize = response[0][0].Grass_Cut_LotSize;
          this.PCRGrassInfoModelObj.Grass_OtherNote = response[0][0].Grass_Cut_Other;
          this.PCRGrassInfoModelObj.Grass_ForSale = response[0][0].Grass_Cut_ForSale;
          this.PCRGrassInfoModelObj.Grass_ForRent = response[0][0].Grass_Cut_ForRent;
          this.PCRGrassInfoModelObj.Grass_RealtorPh = response[0][0].Grass_Cut_Realtor_Phone;
          this.PCRGrassInfoModelObj.Grass_RealtorName = response[0][0].Grass_Cut_Realtor_Name;
          this.PCRGrassInfoModelObj.Grass_ExtDamage = response[0][0].Grass_Cut_New_Damage_Found;
          this.PCRGrassInfoModelObj.Grass_FireDamage = response[0][0].Grass_Cut_Damage_Fire;
          this.PCRGrassInfoModelObj.Grass_NeglectDamage = response[0][0].Grass_Cut_Damage_Neglect;
          this.PCRGrassInfoModelObj.Grass_VandalDamage = response[0][0].Grass_Cut_Damage_Vandal;
          this.PCRGrassInfoModelObj.Grass_FrezeDamage = response[0][0].Grass_Cut_Damage_Freeze;
          this.PCRGrassInfoModelObj.Grass_StormDamage = response[0][0].Grass_Cut_Damage_Storm;
          this.PCRGrassInfoModelObj.Grass_FloodDamage = response[0][0].Grass_Cut_Damage_Flood;
          this.PCRGrassInfoModelObj.Grass_RoofLeakDamage = response[0][0].Grass_Cut_Roof_Leak;
          this.PCRGrassInfoModelObj.Grass_ExtDamageNote = response[0][0].Grass_Cut_Explain_New_Damage;
          this.PCRGrassInfoModelObj.Grass_Occupancy = response[0][0].Grass_Cut_Occupancy;
          this.PCRGrassInfoModelObj.Grass_PropertySecure = response[0][0].Grass_Cut_Property_Secure;
          this.PCRGrassInfoModelObj.Grass_PoolSecure = response[0][0].Grass_Cut_Pool_Secured;
          this.PCRGrassInfoModelObj.Grass_PoolPresent = response[0][0].Grass_Cut_Pool_Present;
          this.PCRGrassInfoModelObj.Grass_ViolationPost = response[0][0].Grass_Cut_Violation_Posted;
          this.PCRGrassInfoModelObj.Grass_NotBoarded = response[0][0].Grass_Cut_Opening_Not_Boarded;
          this.PCRGrassInfoModelObj.Grass_Boarded = response[0][0].Grass_Cut_Opening_Boarded;
          this.PCRGrassInfoModelObj.Grass_ExtDebPresent = response[0][0].Grass_Cut_Debris_Present;
          this.PCRGrassInfoModelObj.Grass_TreeTouching = response[0][0].Grass_Cut_Trees_Touching_House;
          this.PCRGrassInfoModelObj.Grass_ShrubsTouching = response[0][0].Grass_Cut_Vines_Touching_House;
          this.PCRGrassInfoModelObj.Grass_dateCompleted = response[0][0].Grass_Cut_Completion_Date;
          this.PCRGrassInfoModelObj.Grass_Comment = response[0][0].Grass_Cut_Explain_violations;
          this.IsUnableToCut(this.PCRGrassInfoModelObj.Grass_UnableToCut);
          this.IsGrassCutCompleted(this.PCRGrassInfoModelObj.Grass_GrassCutComp);
          this.IsForSale(this.PCRGrassInfoModelObj.Grass_ForSale);
          this.IsExteriorDamages(this.PCRGrassInfoModelObj.Grass_ExtDamage);
          this.buttonGrass = "Update";
        }
        else {
          this.buttonGrass = "Save";
        }
        if (response[1].length != 0)
        {
          var convertedDataList=[];
          response[1].forEach(element => {
            var convertedData=new PCRGrassInfoModel();

            convertedData.Grass_PkeyID = element.Grass_Cut_PkeyID;
            convertedData.Grass_WO_ID = element.Grass_Cut_WO_ID;
            convertedData.Grass_GrassCutComp = element.Grass_Cut_Completed;
            convertedData.Grass_UnableToCut = element.Grass_Cut_Unable_To_Cut;
            convertedData.Grass_LotSize = element.Grass_Cut_LotSize;
            convertedData.Grass_OtherNote = element.Grass_Cut_Other;
            convertedData.Grass_ForSale = element.Grass_Cut_ForSale;
            convertedData.Grass_ForRent = element.Grass_Cut_ForRent;
            convertedData.Grass_RealtorPh = element.Grass_Cut_Realtor_Phone;
            convertedData.Grass_RealtorName = element.Grass_Cut_Realtor_Name;
            convertedData.Grass_ExtDamage = element.Grass_Cut_New_Damage_Found;
            convertedData.Grass_FireDamage = element.Grass_Cut_Damage_Fire;
            convertedData.Grass_NeglectDamage = element.Grass_Cut_Damage_Neglect;
            convertedData.Grass_VandalDamage = element.Grass_Cut_Damage_Vandal;
            convertedData.Grass_FrezeDamage = element.Grass_Cut_Damage_Freeze;
            convertedData.Grass_StormDamage = element.Grass_Cut_Damage_Storm;
            convertedData.Grass_FloodDamage = element.Grass_Cut_Damage_Flood;
            convertedData.Grass_RoofLeakDamage = element.Grass_Cut_Roof_Leak;
            convertedData.Grass_ExtDamageNote = element.Grass_Cut_Explain_New_Damage;
            convertedData.Grass_Occupancy = element.Grass_Cut_Occupancy;
            convertedData.Grass_PropertySecure = element.Grass_Cut_Property_Secure;
            convertedData.Grass_PoolSecure = element.Grass_Cut_Pool_Secured;
            convertedData.Grass_PoolPresent = element.Grass_Cut_Pool_Present;
            convertedData.Grass_ViolationPost = element.Grass_Cut_Violation_Posted;
            convertedData.Grass_NotBoarded = element.Grass_Cut_Opening_Not_Boarded;
            convertedData.Grass_Boarded = element.Grass_Cut_Opening_Boarded;
            convertedData.Grass_ExtDebPresent = element.Grass_Cut_Debris_Present;
            convertedData.Grass_TreeTouching = element.Grass_Cut_Trees_Touching_House;
            convertedData.Grass_ShrubsTouching = element.Grass_Cut_Vines_Touching_House;
            convertedData.Grass_dateCompleted = element.Grass_Cut_Completion_Date;
            convertedData.Grass_Comment = element.Grass_Cut_Explain_violations;

            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;
          // this.PCR_Hitsory.Grass_PkeyID = response[1][0].Grass_Cut_PkeyID;
          // this.PCR_Hitsory.Grass_WO_ID = response[1][0].Grass_Cut_WO_ID;
          // this.PCR_Hitsory.Grass_GrassCutComp = response[1][0].Grass_Cut_Completed;
          // this.PCR_Hitsory.Grass_UnableToCut = response[1][0].Grass_Cut_Unable_To_Cut;
          // this.PCR_Hitsory.Grass_LotSize = response[1][0].Grass_Cut_LotSize;
          // this.PCR_Hitsory.Grass_OtherNote = response[1][0].Grass_Cut_Other;
          // this.PCR_Hitsory.Grass_ForSale = response[1][0].Grass_Cut_ForSale;
          // this.PCR_Hitsory.Grass_ForRent = response[1][0].Grass_Cut_ForRent;
          // this.PCR_Hitsory.Grass_RealtorPh = response[1][0].Grass_Cut_Realtor_Phone;
          // this.PCR_Hitsory.Grass_RealtorName = response[1][0].Grass_Cut_Realtor_Name;
          // this.PCR_Hitsory.Grass_ExtDamage = response[1][0].Grass_Cut_New_Damage_Found;
          // this.PCR_Hitsory.Grass_FireDamage = response[1][0].Grass_Cut_Damage_Fire;
          // this.PCR_Hitsory.Grass_NeglectDamage = response[1][0].Grass_Cut_Damage_Neglect;
          // this.PCR_Hitsory.Grass_VandalDamage = response[1][0].Grass_Cut_Damage_Vandal;
          // this.PCR_Hitsory.Grass_FrezeDamage = response[1][0].Grass_Cut_Damage_Freeze;
          // this.PCR_Hitsory.Grass_StormDamage = response[1][0].Grass_Cut_Damage_Storm;
          // this.PCR_Hitsory.Grass_FloodDamage = response[1][0].Grass_Cut_Damage_Flood;
          // this.PCR_Hitsory.Grass_RoofLeakDamage = response[1][0].Grass_Cut_Roof_Leak;
          // this.PCR_Hitsory.Grass_ExtDamageNote = response[1][0].Grass_Cut_Explain_New_Damage;
          // this.PCR_Hitsory.Grass_Occupancy = response[1][0].Grass_Cut_Occupancy;
          // this.PCR_Hitsory.Grass_PropertySecure = response[1][0].Grass_Cut_Property_Secure;
          // this.PCR_Hitsory.Grass_PoolSecure = response[1][0].Grass_Cut_Pool_Secured;
          // this.PCR_Hitsory.Grass_PoolPresent = response[1][0].Grass_Cut_Pool_Present;
          // this.PCR_Hitsory.Grass_ViolationPost = response[1][0].Grass_Cut_Violation_Posted;
          // this.PCR_Hitsory.Grass_NotBoarded = response[1][0].Grass_Cut_Opening_Not_Boarded;
          // this.PCR_Hitsory.Grass_Boarded = response[1][0].Grass_Cut_Opening_Boarded;
          // this.PCR_Hitsory.Grass_ExtDebPresent = response[1][0].Grass_Cut_Debris_Present;
          // this.PCR_Hitsory.Grass_TreeTouching = response[1][0].Grass_Cut_Trees_Touching_House;
          // this.PCR_Hitsory.Grass_ShrubsTouching = response[1][0].Grass_Cut_Vines_Touching_House;
          // this.PCR_Hitsory.Grass_dateCompleted = response[1][0].Grass_Cut_Completion_Date;
          // this.PCR_Hitsory.Grass_Comment = response[1][0].Grass_Cut_Explain_violations;
        }
      });
  }

  IsUnableToCut(arg: any): void {
    if (arg == "Other") {
      this.OtherNote = false;
    } else {
      this.OtherNote = true;
      this.PCRGrassInfoModelObj.Grass_OtherNote = "";
    }
  }

  IsGrassCutCompleted(arg: any): void {
    if (arg == "Yes - Completed") {
      this.LotSize = false;
    } else {
      this.LotSize = true;
      this.PCRGrassInfoModelObj.Grass_LotSize = "";

    }
  }
  IsForSale(arg: any): void {
    if (arg == "Realtor") {
      this.RealtorInfo = false;
    } else {
      this.RealtorInfo = true;
      this.PCRGrassInfoModelObj.Grass_RealtorPh = "";
      this.PCRGrassInfoModelObj.Grass_RealtorName = "";
    }
  }

  IsExteriorDamages(arg: any): void {
    if (arg == "Yes") {
      this.DamageNote = false;
    } else {
      this.DamageNote = true;
      this.PCRGrassInfoModelObj.Grass_ExtDamageNote = "";
    }
  }
  AllSelectGrassData(DamageArg: string): void {
    this.PCRGrassInfoModelObj.Grass_FireDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_NeglectDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_VandalDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_FrezeDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_StormDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_FloodDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_RoofLeakDamage = DamageArg
  }
  GrassSubmit() {
    this.isLoadingGrass = true;
    this.buttonGrass = "Processing";
    this.PCRGrassInfoModelObj.Grass_WO_ID = this.WorkorderId;
    this.PCRGrassInfoModelObj.fwo_pkyeId=this.FWO_PkyeId;
    this.xClientResultPCRServices
      .PCRGrassCutDataPost(this.PCRGrassInfoModelObj)
      .subscribe(response => {
        if (response[0].length != 0) {

          this.isLoadingGrass = false;
          this.buttonGrass = "Update";

          this.MessageFlag = "Grass Detail saved...!";
          this.commonMessage();
        }
      });
  }
  commonMessage() {
    const modalRef = this.modalService.open(IplAppModalContent, { size: "sm", ariaLabelledBy: "modal-basic-title" });
    modalRef.componentInstance.MessageFlag = this.MessageFlag;
    modalRef.componentInstance.buttonTitle = 'OK';
    modalRef.result.then(result => { }, reason => { });
  }
}
