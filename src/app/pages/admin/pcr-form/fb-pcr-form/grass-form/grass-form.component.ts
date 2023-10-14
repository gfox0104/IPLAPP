import { Component, OnInit } from '@angular/core';
import { PCRGrassInfoModel, PCRPropertyInfoModel } from 'src/app/pages/client-result/client-result-pcr/client-result-pcr-model';

@Component({
  selector: 'app-grass-form',
  templateUrl: './grass-form.component.html',
  styleUrls: ['./grass-form.component.scss']
})
export class GrassFormComponent implements OnInit {
  PCRGrassInfoModelObj: PCRGrassInfoModel = new PCRGrassInfoModel();
  OtherNote: boolean = true;
  LotSize: boolean = true;
  RealtorInfo: boolean = true;
  DamageNote: boolean = true;
  constructor() { }

  ngOnInit(): void {
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
    //debugger;
    if (arg == "Yes - Completed") {
      this.LotSize = false;
    } else {
      this.LotSize = true;
      this.PCRGrassInfoModelObj.Grass_LotSize = "";

    }
  }

  IsForSale(arg: any): void {
    //debugger;
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

  AllSelectData(DamageArg: string): void {
    this.PCRGrassInfoModelObj.Grass_FireDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_NeglectDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_VandalDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_FrezeDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_StormDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_FloodDamage = DamageArg
    this.PCRGrassInfoModelObj.Grass_RoofLeakDamage = DamageArg
  }

}
