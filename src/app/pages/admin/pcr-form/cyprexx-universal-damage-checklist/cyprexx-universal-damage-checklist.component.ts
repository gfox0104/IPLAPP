import { Component, Input, OnInit } from '@angular/core';
import { CyprexxUniversalDamageChecklistServices } from './cyprexx-universal-damage-checklist-service';
import { PCR_CU_General_Info, PCR_Cyprexx_Universal_Damage_Modal,PCR_CU_Interior_Access_Information } from './cyprexx-universal-damage-checklist.model';

@Component({
  selector: 'app-cyprexx-universal-damage-checklist',
  templateUrl: './cyprexx-universal-damage-checklist.component.html',
  styleUrls: ['./cyprexx-universal-damage-checklist.component.scss']
})
export class CyprexxUniversalDamageChecklistComponent implements OnInit {

  @Input() WorkorderId: number;
  @Input() FWO_PkyeId: number;

LotSize: boolean = true;
LotSize1: boolean = true;
LotSize2: boolean = true;
LotSize3: boolean = true;
LotSize4: boolean = true;
LotSize5: boolean = true;
LotSize6: boolean = true;
LotSize7: boolean = true;
LotSize8: boolean = true;
LotSize9: boolean = true;
  PCR_HistoryList:PCR_Cyprexx_Universal_Damage_Modal[];
  PCR_History:PCR_Cyprexx_Universal_Damage_Modal=new PCR_Cyprexx_Universal_Damage_Modal();
  PCR_Cyprexx_Universal_Damage_Modal:PCR_Cyprexx_Universal_Damage_Modal=new PCR_Cyprexx_Universal_Damage_Modal();
  PCR_CU_General_Info:PCR_CU_General_Info=new PCR_CU_General_Info();
  PCR_CU_Interior_Access_Information:PCR_CU_Interior_Access_Information=new PCR_CU_Interior_Access_Information();


  isLoading: boolean;
  button: string = 'Save';
  other: any=[];
  other1: any=[];
  other3: any =[];
  other4: any =[];
  formUsrCommonGroup: any;
  isEditDisable: boolean;
  noencheck: any;
  constructor(private cyprexxUniversalDamageChecklistServices:CyprexxUniversalDamageChecklistServices) { }

  ngOnInit(): void {
    if(this.WorkorderId>0)
    {
      this.GetCyprexxUniversalDamageChecklist();
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
        this.InteriorAccessInformation(false);
        break;

        case 3:
        this.UploadPhotos(false);
        break;

        default:
        break;
    }
    this.TabVal = TabNo;
  }
  UploadPhotos(arg0: boolean) {

  }

  InteriorAccessInformation(arg0: boolean) {

  }

  FormButton1(arg0: boolean) {
  }

  SaveForm(){
    this.jsonModelObjStringify();
    this.PostCyprexxUniversalDamageChecklist();

  }
  jsonModelObjStringify() {
    this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_General_Info =JSON.stringify(this.PCR_CU_General_Info);
    this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_Interior_Access_Information =JSON.stringify(this.PCR_CU_Interior_Access_Information);
  }
  PostCyprexxUniversalDamageChecklist() {
    if (this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_PkeyID > 0) {
      this.PCR_Cyprexx_Universal_Damage_Modal.Type = 2;
    } else {
      this.PCR_Cyprexx_Universal_Damage_Modal.Type = 1;
    }
    this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_IsActive = true;
    this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_IsDelete = false;
    this.PCR_Cyprexx_Universal_Damage_Modal.fwo_pkyeId = this.FWO_PkyeId;
    this.cyprexxUniversalDamageChecklistServices
      .PostCyprexxUniversalDamageChecklist(this.PCR_Cyprexx_Universal_Damage_Modal)
      .subscribe((res) => {
        if (res[0] > 0) {
          this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_PkeyID = res[0];
          alert('Details Saved Successfully');
        } else {
          alert('Something went wrong please try again later...');
        }
      });
  }
  GetCyprexxUniversalDamageChecklist() {
    this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_WO_ID = this.WorkorderId;
    this.PCR_Cyprexx_Universal_Damage_Modal.Type = 3;
    this.cyprexxUniversalDamageChecklistServices
      .GetCyprexxUniversalDamageChecklist(this.PCR_Cyprexx_Universal_Damage_Modal)
      .subscribe((res) => {
        if (res[0].length > 0) {

          this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_PkeyID=res[0][0].PCR_CU_PkeyID;
          this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_WO_ID=res[0][0].PCR_CU_WO_ID;

          this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_General_Info =JSON.parse(res[0][0].PCR_CU_General_Info);
          this.PCR_CU_General_Info =this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_General_Info;




          this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_Interior_Access_Information =JSON.parse(res[0][0].PCR_CU_Interior_Access_Information);
          this.PCR_CU_Interior_Access_Information =this.PCR_Cyprexx_Universal_Damage_Modal.PCR_CU_Interior_Access_Information;

          this.IslocateCompleted(this.PCR_CU_General_Info.PCR_GI_LocateProperty);
          this.IsGrassCutCompleted(this.PCR_CU_General_Info.PCR_GI_AccessProperty);
          this.IsInteriorAccessCompleted(this.PCR_CU_Interior_Access_Information.PCR_IAI_IsAccessInterior)
        }
        if (res[1].length > 0) {

          // debugger;

          var convertedDataList=[];
          res[1].forEach(element => {
            var convertedData=new PCR_Cyprexx_Universal_Damage_Modal();
            convertedData.PCR_CU_General_Info=JSON.parse(element.PCR_CU_General_Info);
            convertedData.PCR_CU_Interior_Access_Information=JSON.parse(element.PCR_CU_Interior_Access_Information);
            convertedData.ModifiedBy=element.ModifiedBy;
            convertedDataList.push(convertedData);
          });
          this.PCR_HistoryList=convertedDataList;

          // this.PCR_History.PCR_CU_General_Info =JSON.parse(res[1][0].PCR_CU_General_Info);
          // this.PCR_History.PCR_CU_Interior_Access_Information =JSON.parse(res[1][0].PCR_CU_Interior_Access_Information);
        }
      });
  }

  PctHistoryConfigureObj: { ColumnName: string, KeyName: string } = { ColumnName: '', KeyName: '' };
  DisplayHistory(ColumnName,KeyName){
    // debugger;
    this.PctHistoryConfigureObj.ColumnName=ColumnName;
    this.PctHistoryConfigureObj.KeyName=KeyName;
  }

  IsGrassCutCompleted(arg: any): void {
    // debugger;
    if (arg == "No") {
      this.LotSize = false;
    } else {
      this.LotSize = true;
      

    }
  }

  IsOtherCompleted(arg: any): void {
    //debugger;
    if (arg == "Vacant and Not Secured") {
      this.LotSize1 = true;
    } else {
      this.LotSize1 = false;
      this.other.PCR_GI_IsPropertyOccupiedOrVacant = "";

    }
  }

  IslocateCompleted(arg: any): void {
    if (arg == "No") {
      this.LotSize2 = false;
    } else {
      this.LotSize2 = true;

    }
  }

  IsOtherableCompleted(arg: any): void {
    //debugger;
    if (arg == "Vacant and Not Secured1") {
      this.LotSize3 = true;
    } else {
      this.LotSize3 = false;
      this.other1.PCR_GI_IsPropertyOccupiedOrVacant1 = "";

    }
  }

  IsMobileCompleted(arg: any): void {
    //debugger;
    if (arg == "Mobile_Home") {
      this.LotSize4 = true;
    } else {
      this.LotSize4 = false;
      this.other3.PCR_GI_PropertyType = "";

    }
  }
  IsotherCompleted(arg: any): void {
    //debugger;
    if (arg == "Other") {
      this.LotSize5 = true;
    } else {
      this.LotSize5 = false;
      this.other4.PCR_GI_PropertyType = "";

    }
  }
  IspoolCompleted(arg: any): void {
    //debugger;
    if (arg == "yes-1") {
      this.LotSize6 = false;
    } else {
      this.LotSize6 = true;
      this.PCR_CU_General_Info.PCR_GI_IsPoolOrHotTubPresent = "";

    }
  }

  IsInteriorAccessCompleted(arg: any): void {
    //debugger;
    if (arg == "No") {
      this.LotSize7 = false;
    } else {
      this.LotSize7 = true;
      this.PCR_CU_Interior_Access_Information.PCR_IAI_IsAccessInterior_Sub="";
      this.PCR_CU_Interior_Access_Information.PCR_IAI_IsAccessInterior_Explain="";
      // this.PCR_CU_Interior_Access_Information.PCR_IAI_IsAccessInterior = "";

    }
  }

  IsInteriorDamagesCompleted(arg: any): void {
    //debugger;
    if (arg == "Yes-1") {
      this.LotSize8 = false;
    } else {
      this.LotSize8 = true;
      this.PCR_CU_Interior_Access_Information.PCR_IAI_IsAtticPresent = "";

    }
  }

  IsInteriorUtilitiesCompleted(arg: any): void {
    //debugger;
    if (arg == "Yes") {
      this.LotSize9 = false;
    } else {
      this.LotSize9 = true;

    }
  }
  isExteriorDamages() {
    var IsVisible=false;
    if(this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_None)
    {

      IsVisible=false;
    }
    else if(this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Gutters
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Soffit
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Drainage
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Trap
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Roof
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Foundation
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Paint
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Masonry
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Siding
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Electrical
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Plumbing
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_DecksOrPorches
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Fences
      || this.PCR_CU_General_Info.PCR_GI_ExteriorDamage_Other)
    {
      IsVisible=true;
    }
    return IsVisible;

  }

  isSecuringinfo(){
    var IsVisibles=false;
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_KnoblockLocation_Other){
      IsVisibles=true
    }
    else{
      IsVisibles=false;
    }
    return IsVisibles

  }

  isSecuringinfo2(){
    var IsVisibles=false;
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_DeadboltLocation_Other){
      IsVisibles=true
    }
    else{
      IsVisibles=false;
    }
    return IsVisibles

  }

  isSecuringinfo3(){
    var IsVisibles=false;
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_LockboxLocation_Other){
      IsVisibles=true
    }
    else{
      IsVisibles=false;
    }
    return IsVisibles

  }
  isSecuringinfo4(){
    var IsVisibles=false;
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_PadlockLocation_Other){
      IsVisibles=true
    }
    else{
      IsVisibles=false;
    }
    return IsVisibles

  }

  isInteriorDamages() {
    var IsVisible=false;
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Kitchen
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_DiningRoom
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Utility
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Garage
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Basement
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Stairs
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Foyer
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Hall
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Bedrooms
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Bathrooms
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Closet
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_LivingRoom
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Attic
      ||this.PCR_CU_Interior_Access_Information.PCR_IAI_InteriorDamage_Other)
    {

      IsVisible=true;
    }
    else
    {
      IsVisible=false;
    }
    return IsVisible;

  }


  Issharedutility(){
    var IsVisibles=false;
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_SharedUtilities_Other){
      IsVisibles=true
    }
    else{
      IsVisibles=false;
    }
    return IsVisibles

  }

  LotSize11:boolean=true;
  IsinoperableorleakingCompleted(arg: any): void {
    //debugger;
    if (arg == "Yes") {
      this.LotSize11 = false;
    } else {
      this.LotSize11 = true;

    }
  }

  leakingtank:boolean=true;
  IsgastankonthepropertyCompleted(arg: any): void {
    //debugger;
    if (arg == "Yes") {
      this.leakingtank = false;
    } else {
      this.leakingtank = true;

    }
  }

  BoardingDetails:boolean=true;
  IsBoardingDetails(arg: any): void {
    //debugger;
    if (arg == "Yes") {
      this.BoardingDetails = false;
    } else {
      this.BoardingDetails = true;

    }
  }

  IfOccupancyInfo(){
    var IsVisibles=false;
    if(this.PCR_CU_General_Info.PCR_GI_IsOther){
      IsVisibles=true
    }
    else{
      IsVisibles=false;
    }
    return IsVisibles

  }

  PropertyInfomissinfno(){
    // debugger
    if(this.PCR_CU_General_Info.PCR_GI_PropertyType=='Commercial' ||this.PCR_CU_General_Info.PCR_GI_PropertyType=='Single Family'||this.PCR_CU_General_Info.PCR_GI_PropertyType=='Multi-Unit' ||this.PCR_CU_General_Info.PCR_GI_PropertyType== 'Condo/Townhouse' ||this.PCR_CU_General_Info.PCR_GI_PropertyType== 'Modular/Manufactured Home' ||this.PCR_CU_General_Info.PCR_GI_PropertyType== 'High Rise'){
          return true;
    }
    else{
      return false;
    }
  }

  OccupancyInfo(){
    // debugger
    if(this.PCR_CU_General_Info.PCR_GI_IsPropertyOccupiedOrVacant=='Owner' ||this.PCR_CU_General_Info.PCR_GI_IsPropertyOccupiedOrVacant=='NewOwner'||this.PCR_CU_General_Info.PCR_GI_IsPropertyOccupiedOrVacant=='Tenant'){
          return true;
    }
    else {
      return false;
    }
  }

  OccupancyInfocheck(){
    // debugger
    if(this.PCR_CU_General_Info.PCR_GI_IsPropertyOccupiedOrVacant=='Vacant and Secured' ||this.PCR_CU_General_Info.PCR_GI_IsPropertyOccupiedOrVacant=='Vacant and Not Secured'||this.PCR_CU_General_Info.PCR_GI_IsPropertyOccupiedOrVacant=='Partially Vacant'){
          return true;
    }
    else {
      return false;
    }
  }

  isWinterization(){
    // debugger
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_WinterizationType=='Winterized' ||this.PCR_CU_Interior_Access_Information.PCR_IAI_WinterizationType=='Not Winterized'||this.PCR_CU_Interior_Access_Information.PCR_IAI_WinterizationType=='N/A'){
          return true;
    }
    else {
      return false;
    }
  }
  iswiterCompromised(){
    // debugger
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_WinterizationType=='Compromised'){
          return true;
    }
    else {
      return false;
    }
  }

  isInteriorUtilities() {
    var IsVisible=false;
    if(this.PCR_CU_Interior_Access_Information.PCR_IAI_PresentUtilityMeters_ElectricMeter
      && this.PCR_CU_Interior_Access_Information.PCR_IAI_PresentUtilityMeters_GasMeter
      && this.PCR_CU_Interior_Access_Information.PCR_IAI_PresentUtilityMeters_WaterMeter)
    {

      IsVisible=true;
    }
    else
    {
      IsVisible=false;
    }
    return IsVisible;
    
  }

  
  
}
