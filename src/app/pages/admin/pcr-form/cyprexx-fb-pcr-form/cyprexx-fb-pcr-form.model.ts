export class PCR_CyperexxFormsMasterModel{
    PCR_PCFM_pkeyId:number;
    PCR_PCFM_WO_Id:number;
    PCR_PCFM_CompanyID:number;
    PCR_PCFM_General_Information:any;
    PCR_PCFM_Property_Accessibility:any;
    PCR_PCFM_Property_Type:any;
    PCR_PCFM_Utilities:any;
    PCR_PCFM_Occupancy_Information:any;
    PCR_PCFM_Securing__Lock_Changes:any;
    PCR_PCFM_Grage_shed_outbuilding_securing:any;
    PCR_PCFM_Window_securing:any;
    PCR_PCFM_Pool:any;
    PCR_PCFM_Debris_Hazzards:any;
    PCR_PCFM_Yard:any;
    PCR_PCFM_Hazard_Abatement:any;
    PCR_PCFM_Winterization:any;
    PCR_PCFM_Damages:any;
    PCR_PCFM_Signage:any;
    PCR_PCFM_Canveyance:any;
    PCR_PCFM_General_Comment:any;
    PCR_PCFM_Vendor_Signature:any;
    PCR_PCFM_IsActive:Boolean;
    PCR_PCFM_IsDelete:Boolean;
    ModifiedBy:string;
    Type:number;
    fwo_pkyeId:number;

}

export class GeneralInformationModel{
    DateofPropertyvisit:string;
    LoanNumber:string;
    PropertyAddress:string;
    GpsCoordinates:string;
    WorkOrderNumber:string;
    WorkOrderType:string;
}
export class PropertyAccessibilityModel{
    Wereableaccessproperty:string;
    AccessDeniedBy:string;
    IfOtherexplain:string;
}
export class PropertyTypeModel{
    PropertyType:string;
    VIN:string;
    MultiUnitInformation:string;
    Othermultiunit:string
    Whichwasworkcompletedin:string;
    Describevacantunit:string;

}
export class UtilitiesModel{
    ElectricOn:string;
    GasOn:string;
    WaterOn:string;
    SumpPumpPresent:string;
    SumpPumpOperational:string;
    WaterSource:string;
    AreanyUtilitytobereported:string;
    Ifutilitiesshared:string;
    Isheatingheatproperty:string;
}
export class OccupancyInformationModel{
    WhatistheOccupancyStatus:string;
    OccupancyDeterminedby:string;
    OccupancyDeterminedbyPets :string;
    OccupancyDeterminedbyContact :string;
    OccupancyDeterminedbyOther:string;
    Occupantname:string;
    ifotherExplain:string;
    NeighborHouse:string;
    UnitVacant:string;
    
}
export class SecuringLockChangesModel{
    Haveexteriordoorsrekeyed:string;
    Installedthefollowinglock:string;
    InstalledthefollowinglockDeadbolt:string;
    InstalledthefollowinglockPadlocks:string;
    InstalledthefollowinglockLockbox:string;
    KnoblockKeycode:string;
    KnoblockLocation:string;
    Other:string;
    DeadboltKeycode:string;
    DeadboltLocation:string;
    Lockboxcode:string;
    LockboxLocation:string;
    Other2:string;
    Hasasiderlockbeeninstalled :string;
    Explain:string;
    IsBasementDoorlockedsecured:string;
    Explain2:string;

}
export class GrageShedOutbuildingSecuringModel{
    Isthereagarage:string;
    GarageType:string;
    Isthereacarport:string;
    IsthereOutbuliding:string;
    Isgarageandoutbuildinghasp:string;
    Explain:string;
    Hasautomaticgaragedooropenerunplugged:string;
    Explain2:string;
}
export class WindowSecuringBoardingReglazingModel{
    CompletedBoardingguidelines:string;
    windowsboarded1:string;
    Sizeh1:string;
    Sizew1:string;
    windowsboarded2:string;
    Sizeh2:string;
    Sizew2:string;
    windowsboarded3:string;
    Sizeh3:string;
    Sizew3:string;
    windowsPanesregiazed1:string;
    PanesSizeh1:string;
    PanesSizew1:string;
    windowsPanesregiazed2:string;
    PanesSizeh2:string;
    PanesSizew2:string;
    windowsPanesregiazed3:string;
    PanesSizeh3:string;
    PanesSizew3:string
    Locationfloorwindowsboardedreglaze:string;
    Locationfloorwindowsboardedreglaze2nd:string;
    Locationfloorwindowsboardedreglaze3rd:string;
    Locationfloorwindowsboardedreglaze4th:string;
    LocationfloorwindowsboardedreglazeOther:string;
    Ifotherexplain:string;
    Bidtosecurewindow:string;
    Areallwindowslockedwithhardwere:string;
    Explain1:string;
    IsCrawtspacesecured:string;
    Explain2:string;
    HasDoggleDoorbeensecured:string;
    Explain3:string;
    HasSecuringfrontwindow:string;
    Explain4:string;

}
export class PoolModel{
    IsPoolPresent:string;
    PoolType:string;
    ConditionGroundPool:string;
    IsPoolCovereduidelines:string;
    HavepoolremovedGuidelines:string;
    InthereaHotTub:string;
    Havefencestopreventaccesspool:string;
    Havelanaldoorssecured:string;
    Explain:string;
    SpaCoveredperHUDguidelines:string;
}
export class DebrisHazzardsModel{
    IsherePersonalexterior:string;
    Isthereinteriordebriespresent:string
    Cubicyards1:string
    Locationdescriptionitems:string
    Istheredebrisshedsoutbuildings:string
    Cubicyards2:string
    Locationdescriptionofitems:string
    Ispropertydebitsremoval:string
    Explain:string;
    Arethereanyhazardoursite:string;
    werehazaedousmaterialsremoved:string;
    Cubicyards3:string;
    Locationanddescription:string;
    Isexterminationneededproperty:string;
    ExterminationComments:string;
}
export class YardModel{
    IsHOAmaintaininglawn:string;
    wasgrasspropertyuponarrival:string;
    Height:string;
    Hasagrasscutbeencompletedstandards:string;
    Grasscutbid:string;
    Areentrywaysperlocalordinance:string;
    Sonwiceremovalbid:string;
}
export class HazardAbatementModel{
    Raethereanymissinghandrals:string;
    Locationofmissinghandrals:string;
    Arethereanymissingorcrackedstairs:string;
    Locationmissingcrackedstepsstairs :string;
    Propertyfreeformbothinteriorexterior:string;
    Explain:string;
    Doesthepropertyneedtotrozenpipes:string;
    Bidtothawproperty:string;
    Haswaterheadersteappedperlocalordinance:string;
    Bidtostrapwaterheater:string;
}
export class WinterizationModel{
    Howwinterizationbeencompleted:string;
    Wateroffdisconnected:string;
    WateroffdisconnectedMain:string;
    Wateroffdisconnectedstreet:string;
    WateroffdisconnectedMainNone:string;
    Typeheatingsystem:string;
    Havetoletswinterization:string;
    Explain1:string;
    BoilerHeatingsystemdrained:string;
    Explain2:string;
    Allfixturesdrained:string;
    Explain3:string;
    Allpipesblowncompressedair:string;
    Explain4:string;
    Systemheldpressure:string;
    Explain5:string;
    NontoxicGhycolpouredalltrapsfixtures:string;
    Explain6:string;
    Winterizationnoticespostedinstructed:string;
    Explain7:string;
    Isthebollerwaterwithotherunits:string;
    Recommendingutilitiesturnedon:string;
    Heatsetto55degress:string;
    Arethereanysprinkerpipingpresent:string;
    completedandstillintact:string;
    plumbingheatingsystem:string;
    Bidtorewinterize:string;
}
export class DamagesModel{
    Ispropertyfreesurchargeableboiler:string;
    explosioncanditionsthatdamages:string;
    Dosetheoutsideplumbingdamage:string;
    HaspropertysustainedDamage:string;
    DamageType:string;
    DamageTypeFloodDamage:string;
    DamageTypeFireDamage:string;
    DamageTypeFloces:string;
    DamageTypeFreezeDamageBoiler:string;
    DamageTypeFreezeDamageHeater:string;
    DamageTypeFreezeDamagePipes:string;
    DamageTypeFreezeDamageToile:string;
    DamageTypeFreezeDamagesin:string;
    DamageTypeGuttersInterior:string;
    DamageTypeGuttersExterior:string;
    DamageTypeGuttersDownspouts:string;
    DamageTypeLeakingTubshower:string;
    DamageTypeLeakingsink:string;
    DamageTypeRoofDamage:string;
    DamageTypeSidingFacia:string;
    DamageTypeSmokeDamage:string;
    DamageTypeStructuralFoundation:string;
    DamageTypeToiletVisblCracks:string;
    DamageTypeWaterDamage:string;
    DamageTypeOtherexplain:string;
    OtherDamages:string;
    PossibleCauseofDamage:string;
    PossibleCauseofBroken:string;
    PossibleCauseofDamageEarthquake:string;
    PossibleCauseofDamageElectical:string;
    PossibleCauseofDamageFire:string;
    PossibleCauseofDamageGroundWater:string;
    PossibleCauseofDamageGutter:string;
    PossibleCauseofDamageHaif :string;
    PossibleCauseofDamageHurricane:string;
    PossibleCauseofDamageOccupant :string;
    PossibleCauseofDamageRoof :string;
    PossibleCauseofDamageSewer :string;
    PossibleCauseofDamageStorm:string;
    PossibleCauseofDamageSump:string;
    PossibleCauseofDamageTormado:string;
    PossibleCauseofDamageTheff:string;
    PossibleCauseofDamageVandailsm:string;
    PossibleCauseofDamageWearTear:string;
    PossibleCauseofDamageWndStorm:string;
    PossibleCauseofDamageOtherexplain:string;
    OtherCauseofDamage:string;
    LocationofDamage:string;
    Attic:string;
    Basement:string;
    Bathroom:string;
    Bathroomfloor:string;
    Bedroom:string;
    Bedroomfloor:string;
    DenFamilyRoom:string;

    GarageOutbuilding:string;
    Hallway:string;
    Kitchen:string;
    LivingRoomDrivingRoom:string;
    Other:string;
    ApproximatecostofRepairs:string;
    Areyousubmitingbidsreported:string;
    Explain1:string;
    AreBidPendingremediatedamages:string;
    Explain2:string;
    Discolorrationlocation:string;
    DiscolorrationlocationCarpet:string;
    DiscolorrationlocationDebris:string;
    DiscolorrationlocationFloors:string;
    DiscolorrationlocationFurniture:string;
    DiscolorrationlocationShower:string;
    DiscolorrationlocationWalls:string;
    DiscolorrationlocationOther:string;
    Explain3:string;
    Isdehumidifierthediscoloration :string;
    Arethereanymissingappliancesfixtures:string;
    ACUnit:string;
    Boiler:string;
    Cabinets:string;
    Copper :string;
    Countertops:string;
    Dishwasher:string;
    Furnace:string;
    HotWater:string;
    Refrigerator:string;
    Sinks :string;
    SinksKitchane :string;
    Stove:string;
    Toilets:string;
    Other1   :string;
    Explainother:string;

}
export class SignageModel{
    IsthereCitationtheproperty:string;
    Violationfor:string;
    DatePosted:string;
    ComplianceDate:string;
    ContactNameofIssuer:string;
    Address:string;
    Phone:string;
    IsthereSignProperty:string;
    RealtyCompany:string;
    AgentName:string;
    ContactNumber:string;
    IsCyprexxEmergencyPosted:string;
    Explain:string;
}
export class ConveyanceConditionModel{
    IsPropertyConveyanceCondition:string;
    WhatholdingConveyance:string;
}
export class GeneralCommentsModel{
    GeneralComment:string;
}
export class VendorSignatureModel{
    CompletionDate:string;
    TypedSignature:string;
}
