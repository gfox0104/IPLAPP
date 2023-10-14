export class RepairBaseAddRoomModel {
    RB_OrderID: String = "";
    RB_AreaType: string = "";
    RB_AreaLabel: String = "";
    RB_AreaNote: String = "";
    RB_Profit: String = "";
    RB_OverHead: String = "";
}
export class RepairBaseAddRepairModel{
    RB_OrderID: String = "";
    RB_areaId: String = "";
    RB_categoryId: String = "";
    RB_subCategoryId: string = "";
    RB_performActionId: string = "";
    RB_itemXRef: string = "";
    RB_description: string = "";
    RB_vendorPPU: string = "";
    RB_quantity: string = "";
    RB_comments: string = "";
    RB_code: string = "";
}
export class RepairBaseCharactoristicsModel{
    RB_StructureQuality: String = "";
	RB_Condition: String = "";
	RB_LivingArea: String = "";
	RB_Stories: String = "";
	RB_YearBuilt: String = "";
	RB_Bedrooms: String = "";
	RB_Fullbaths: String = "";
	RB_Halfbaths: String = "";
	RB_BasementSize: String = "";
	RB_Site: String = "";
	RB_AttachedGarage: String = "";
	RB_BuiltInGarage: String = "";
	RB_RoofPitch: String = "";
}
export class RepairBaseAddImgModel{
    Rep_Base_OrderId: String = "";
    Rep_Base_RepairAreaId: String = "";
    Rep_Base_RepairId: String = "";
    Rep_Base_Doc_File_Path: string = "";
    Rep_Base_Doc_File_Size: string = "";
    Rep_Base_Doc_File_Name: string = "";
    Rep_Base_Doc_Folder_Name: string = "";
    documentx: File;
}