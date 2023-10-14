export class MSIGarassSubjectPropertyPcrFormModel{
    MSI_Grass_PkeyId:number;
    MSI_Grass_WO_Id:number;
    MSI_Grass_CompanyID:number;
    MSI_Grass_SubjectProperty:any;
    MSI_Grass_ConditionReport:any;
    MSI_Grass_BidItems:any;
    MSI_Grass_PhotoManager:any;
    MSI_Grass_Comments:any;
    MSI_Grass_FinalReviews:any;
    MSI_Grass_IsActive:boolean;
    MSI_Grass_IsDelete:boolean;
    ModifiedBy:string;
    fwo_pkyeId:number;
    Type:number;

}

export class SubjectPropertyFormModel{

    //MSI_Grass_PkeyId:number;
    MapCode:any;
    HomePhoneNo:any;
    LawnSize:any;
    keyedTo:any;
    Condition:any;
    AreThereDamages:any;
    EyeBallEstmateofDamages:any;
    DateWorkWasCompleted:any;
    AspenAbcNo:any;
    OccupancyStatus:any;
    OccupancyVerifiedBy:any;
    RealtorName:any;
    RealtorPhoneNo:any;
    TenentName:any;
    TenentPhoneNo:any;
    WinterizedBy:any;
    WinterizeDate:any;
    WinterizeCompleteness:any;
    Reviews:any;
    MsiGrass_IsActive:boolean;
    MsiGrass_IsDelete:boolean;
    Type:number;

}
export class ConditionReportFormModel{

    windowsbrokenradio:boolean=false;
    windowsbrokencomments:any;
    roofradio:boolean=false;
    roofcomments:any;
    vandalismradio:boolean=false;
    vandalismcomments:any;
    firemradio:boolean=false;
    firecomments:any;
    waterradio:boolean=false;
    watercomments:any;
    swimmingradio:boolean=false;
    swimmingcomments:any;
    arepoolspecsradio:boolean=false;
    arepoolspecscomments:any;
    aresaleradio:boolean=false;
    aresalecomments:any;
    ifyesradio:boolean=false;
    ifyescomments:any;
    photosradio:boolean=false;
    photoscomments:any;
    locksradio:boolean=false;
    lockscomments:any;
    padlocksradio:boolean=false;
    padlockscomments:any;
    keysradio:boolean=false;
    keyscomments:any;
    winterization_utilitiesradio:boolean=false;
    winterization_utilitiescomments:any;
    winterization_waterradio:boolean=false;
    winterization_watercomments:any;
    winterization_evidenceburstradio:boolean=false;
    winterization_evidenceburscomments:any;
    winterization_evidencefreezeradio:boolean=false;
    winterization_evidencefreezecomments:any;
    winterization_allfixturesradio:boolean=false;
    winterization_allfixturescomments:any;
    winterization_allpipesradio:boolean=false;
    winterization_allpipescomments:any;
    winterization_boilerradio:boolean=false;
    winterization_boilercomments:any;
    winterization_antiradio:boolean=false;
    winterization_anticomments:any;
    winterization_tagradio:boolean=false;
    winterization_tagcomments:any;
    winterization_sumpradio:boolean=false;
    winterization_sumpcomments:any;
    mobilehome_yearcomments:any;
    mobilehome_makecomments:any;
    mobilehome_modelcomments:any;
    mobilehome_lengthcomments:any;
    mobilehome_widthcomments:any;
    mobilehome_sizecomments:any;
    mobilehome_vinumbercomments:any;
    mobilehome_tagnumbercomments:any;
    mobilehome_serialnumbercomments:any;
    winterization_wheelsradio:boolean=false;
    mobilehome_wheelscomments:any;
    winterization_affectedsradio:boolean=false;
    mobilehome_affectedcomments:any;
    winterization_skirtedsradio:boolean=false;
    mobilehome_skirtedcomments:any;

    debrishealth_radio:boolean=false;
    debrishealth_comments:any;
    debrisexteriorconsist_radio:boolean=false;
    debrisexteriorconsist_comments:any;
    debrisinteriorconsist_radio:boolean=false;
    debrisinteriorconsist_comments:any;
    debriscity_radio:boolean=false;
    debriscity_comments:any;
    debrispersonal_radio:boolean=false;
    debrispersonal_comments:any;
    debrislown_radio:boolean=false;
    debrislown_comments:any;
    debris_comments:any;
    debrisexteriorgeneralgood_radio:boolean=false;
    debrisexteriorgeneralfair_radio:boolean=false;
    debrisexteriorgeneralpoor_radio:boolean=false;
    debrisexteriorgeneraldameged_radio:boolean=false;
    debrisinteriorgeneralgood_radio:boolean=false;
    debrisinteriorgeneralfair_radio:boolean=false;
    debrisinteriorgeneralpoor_radio:boolean=false;
    debrisinteriorgeneraldameged_radio:boolean=false;
    debrisinteriorgeneralna_radio:boolean=false;
    debrisevidence_radio:boolean=false;
    debrisispropertyin_radio:boolean=false;
    debriispropertyin_comments:any;
    debrisarebids_radio:boolean=false;
    debrispersonalproperty_radio:boolean=false;
    debrisisthisproperty_radio:boolean=false;
    debrisisdetermindby:any;
    debrisisprepairedby:any;
    debrisdateprepaired:any;
    livingroomwallgood_radio:boolean=false;
    livingroomwallfair_radio:boolean=false;
    livingroomwallpoor_radio:boolean=false;
    livingroomwallmissing_radio:boolean=false;
    livingroomwall_comments:any;
    livingroomfloorgood_radio:boolean=false;
    livingroomfloorfair_radio:boolean=false;
    livingroomfloorpoor_radio:boolean=false;
    livingroomfloormissing_radio:boolean=false;
    livingroomfloor_comments:any;
    livingroomsubfloorgood_radio:boolean=false;
    livingroomsubfloorfair_radio:boolean=false;
    livingroomsubfloorpoor_radio:boolean=false;
    livingroomsubfloormissing_radio:boolean=false;
    livingroomsubfloor_comments:any;
    livingroomceilinggood_radio:boolean=false;
    livingroomceilingfair_radio:boolean=false;
    livingroomceilingpoor_radio:boolean=false;
    livingroomceilingmissing_radio:boolean=false;
    livingroomceiling_comments:any;
    livingroomwindowglassgood_radio:boolean=false;
    livingroomwindowglassfair_radio:boolean=false;
    livingroomwindowglasspoor_radio:boolean=false;
    livingroomwindowglassmissing_radio:boolean=false;
    livingroomwindowglass_comments:any;

    diningroomwallgood_radio:boolean=false;
    diningroomwallfair_radio:boolean=false;
    diningroomwallpoor_radio:boolean=false;
    diningroomwallmissing_radio:boolean=false;
    diningroomwall_comments:any;
    diningroomfloorgood_radio:boolean=false;
    diningroomfloorfair_radio:boolean=false;
    diningroomfloorpoor_radio:boolean=false;
    diningroomfloormissing_radio:boolean=false;
    diningroomfloor_comments:any;
    diningroomsubfloorgood_radio:boolean=false;
    diningroomsubfloorfair_radio:boolean=false;
    diningroomsubfloorpoor_radio:boolean=false;
    diningroomsubfloormissing_radio:boolean=false;
    diningroomsubfloor_comments:any;
    diningroomceilinggood_radio:boolean=false;
    diningroomceilingfair_radio:boolean=false;
    diningroomceilingpoor_radio:boolean=false;
    diningroomceilingmissing_radio:boolean=false;
    diningroomceiling_comments:any;
    diningroomwindowglassgood_radio:boolean=false;
    diningroomwindowglassfair_radio:boolean=false;
    diningroomwindowglasspoor_radio:boolean=false;
    diningroomwindowglassmissing_radio:boolean=false;
    diningroomwindowglass_comments:any;

    bedroomwallgood_radio:boolean=false;
    bedroomwallfair_radio:boolean=false;
    bedroomwallpoor_radio:boolean=false;
    bedroomwallmissing_radio:boolean=false;
    bedroomwall_comments:any;
    bedroomfloorgood_radio:boolean=false;
    bedroomfloorfair_radio:boolean=false;
    bedroomfloorpoor_radio:boolean=false;
    bedroomfloormissing_radio:boolean=false;
    bedroomfloor_comments:any;
    bedroomsubfloorgood_radio:boolean=false;
    bedroomsubfloorfair_radio:boolean=false;
    bedroomsubfloorpoor_radio:boolean=false;
    bedroomsubfloormissing_radio:boolean=false;
    bedroomsubfloor_comments:any;
    bedroomceilinggood_radio:boolean=false;
    bedroomceilingfair_radio:boolean=false;
    bedroomceilingpoor_radio:boolean=false;
    bedroomceilingmissing_radio:boolean=false;
    bedroomceiling_comments:any;
    bedroomwindowglassgood_radio:boolean=false;
    bedroomwindowglassfair_radio:boolean=false;
    bedroomwindowglasspoor_radio:boolean=false;
    bedroomwindowglassmissing_radio:boolean=false;
    bedroomwindowglass_comments:any;

    bathroomwallgood_radio:boolean=false;
    bathroomwallfair_radio:boolean=false;
    bathroomwallpoor_radio:boolean=false;
    bathroomwallmissing_radio:boolean=false;
    bathroomwall_comments:any;
    bathroomfloorgood_radio:boolean=false;
    bathroomfloorfair_radio:boolean=false;
    bathroomfloorpoor_radio:boolean=false;
    bathroomfloormissing_radio:boolean=false;
    bathroomfloor_comments:any;
    bathroomsubfloorgood_radio:boolean=false;
    bathroomsubfloorfair_radio:boolean=false;
    bathroomsubfloorpoor_radio:boolean=false;
    bathroomsubfloormissing_radio:boolean=false;
    bathroomsubfloor_comments:any;
    bathroomceilinggood_radio:boolean=false;
    bathroomceilingfair_radio:boolean=false;
    bathroomceilingpoor_radio:boolean=false;
    bathroomceilingmissing_radio:boolean=false;
    bathroomceiling_comments:any;
    bathroomwindowglassgood_radio:boolean=false;
    bathroomwindowglassfair_radio:boolean=false;
    bathroomwindowglasspoor_radio:boolean=false;
    bathroomwindowglassmissing_radio:boolean=false;
    bathroomwindowglass_comments:any;

    kitchensinkgood_radio:boolean=false;
    kitchensinkfair_radio:boolean=false;
    kitchensinkpoor_radio:boolean=false;
    kitchensinkmissing_radio:boolean=false;
    kitchensink_comments:any;
    kitchencabinentgood_radio:boolean=false;
    kitchencabinentfair_radio:boolean=false;
    kitchencabinentpoor_radio:boolean=false;
    kitchencabinentmissing_radio:boolean=false;
    kitchencabinent_comments:any;
    kitchenwallgood_radio:boolean=false;
    kitchenwallfair_radio:boolean=false;
    kitchenwallpoor_radio:boolean=false;
    kitchenwallmissing_radio:boolean=false;
    kitchenwall_comments:any;
    kitchenfloorgood_radio:boolean=false;
    kitchenfloorfair_radio:boolean=false;
    kitchenfloorpoor_radio:boolean=false;
    kitchenfloormissing_radio:boolean=false;
    kitchenfloor_comments:any;
    kitchensubfloorgood_radio:boolean=false;
    kitchensubfloorfair_radio:boolean=false;
    kitchensubfloorpoor_radio:boolean=false;
    kitchensubfloormissing_radio:boolean=false;
    kitchensubfloor_comments:any;
    kitchenceilinggood_radio:boolean=false;
    kitchenceilingfair_radio:boolean=false;
    kitchenceilingpoor_radio:boolean=false;
    kitchenceilingmissing_radio:boolean=false;
    kitchenceiling_comments:any;
    kitchenwindowgood_radio:boolean=false;
    kitchenwindowfair_radio:boolean=false;
    kitchenwindowpoor_radio:boolean=false;
    kitchenwindowmissing_radio:boolean=false;
    kitchenwindow_comments:any;
    kitchendishwashergood_radio:boolean=false;
    kitchendishwasherfair_radio:boolean=false;
    kitchendishwasherpoor_radio:boolean=false;
    kitchendishwashermissing_radio:boolean=false;
    kitchendishwasher_comments:any;
    kitchenclotheswashergood_radio:boolean=false;
    kitchenclotheswasherfair_radio:boolean=false;
    kitchenclotheswasherpoor_radio:boolean=false;
    kitchenclotheswashermissing_radio:boolean=false;
    kitchenclotheswasher_comments:any;
    kitchenclothesdryergood_radio:boolean=false;
    kitchenclothesdryerfair_radio:boolean=false;
    kitchenclothesdryerpoor_radio:boolean=false;
    kitchenclothesdryermissing_radio:boolean=false;
    kitchenclothesdryer_comments:any;

    appliancesfurngood_radio:boolean=false;
    appliancesfurnfair_radio:boolean=false;
    appliancesfurnpoor_radio:boolean=false;
    appliancesfurnmissing_radio:boolean=false;
    appliancesfurn_comments:any;
    appliancesairgood_radio:boolean=false;
    appliancesairfair_radio:boolean=false;
    appliancesairpoor_radio:boolean=false;
    appliancesairmissing_radio:boolean=false;
    appliancesair_comments:any;
    applianceswatergood_radio:boolean=false;
    applianceswaterfair_radio:boolean=false;
    applianceswaterpoor_radio:boolean=false;
    applianceswatermissing_radio:boolean=false;
    applianceswater_comments:any;
    appliancesrangegood_radio:boolean=false;
    appliancesrangefair_radio:boolean=false;
    appliancesrangepoor_radio:boolean=false;
    appliancesrangemissing_radio:boolean=false;
    appliancesrange_comments:any;
    appliancesrefrigeratorgood_radio:boolean=false;
    appliancesrefrigeratorfair_radio:boolean=false;
    appliancesrefrigeratorpoor_radio:boolean=false;
    appliancesrefrigeratormissing_radio:boolean=false;
    appliancesrefrigerator_comments:any;
    conditionreportreviewandsubmit:any;
    Type:number;

}
export class BidItemsFormModel{

    WinterizedBy:any;
    WinterizeDate:any;
    WinterizeCompleteness:any;
    Reviews:any;
    MsiGrass_IsActive:boolean;
    MsiGrass_IsDelete:boolean;
    Type:number;

}
export class PhotoManagerFormModel{

    WinterizedBy:any;
    WinterizeDate:any;
    WinterizeCompleteness:any;
    Reviews:any;
    MsiGrass_IsActive:boolean;
    MsiGrass_IsDelete:boolean;
    Type:number;

}
export class CommentsFormModel{

    WinterizedBy:any;
    WinterizeDate:any;
    WinterizeCompleteness:any;
    Reviews:any;
    MsiGrass_IsActive:boolean;
    MsiGrass_IsDelete:boolean;
    Type:number;

}
export class FinalReviewsFormModel{

    WinterizedBy:any;
    WinterizeDate:any;
    WinterizeCompleteness:any;
    Reviews:any;
    MsiGrass_IsActive:boolean;
    MsiGrass_IsDelete:boolean;
    Type:number;

}
