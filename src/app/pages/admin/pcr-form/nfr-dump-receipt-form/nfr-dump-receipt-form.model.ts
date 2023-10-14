export class NFR_Dump_Receipt_Form_Master{
  NF_PkeyID:number;
  NF_NFR_WO_ID:number;
  NF_NFR_CompanyId:number;
  NF_NFR_Dump_Receipt:any;
  NF_IsActive:boolean;
  NF_IsDelete:boolean;
  ModifiedBy:string;
  fwo_pkyeId:number;
  Type:number;
}
export class NF_NFR_Dump_Receipt
{
  NFR_DR_WorkOrder:string;
  NFR_DR_MTGCO:string;
  NFR_DR_Address:string;
  NFR_DR_Loan:string;
  NFR_DR_Date:string;
  NFR_DR_CubicYardAmount:string;
  NFR_DR_NumberOfAppliances:string;
  NFR_DR_DescriptionDebrisBeingDumped:string;
  NFR_DR_Disposal_Burned:string;
  NFR_DR_Disposal_LeftAtCurb:string;
  NFR_DR_Disposal_DumpFacility:string;
  NFR_DR_Disposal_PickedUpDisposalCompany:string;
  NFR_DR_DisposalCompany_Description:string;

}
