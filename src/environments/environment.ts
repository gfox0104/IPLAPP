export const environment = {
  production: false,
 cloudUrl: 'https://us-central1-rare-lambda-245821.cloudfunctions.net/testappp/', // use for test side
  //  cloudUrl:'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/', // use for live side


      domain: 'https://testapi.ipreservationlive.com/',

    // domain:'https://api.ipreservationlive.com/',
  //domain:'https://prodapi.ipreservationlive.com/',
// domain:'http://localhost:63050/', // use for localhost

  firebase: {
    // apiKey: 'AIzaSyAmk-KtdHYeR2llmxdjE4yu4Y2SNlAMDMk',

    apiKey: "AIzaSyDwlnCYG9h36ojgOi8ynGQ0BpppUw-cli8",
    authDomain: 'rare-lambda-245821.firebaseapp.com',
    databaseURL: 'https://rare-lambda-245821.firebaseio.com',
    projectId: 'rare-lambda-245821',
    storageBucket: 'rare-lambda-245821.appspot.com',
    messagingSenderId: '1095460168527',
    appId: '1:1095460168527:web:1b194864d96f51a1f21b3a',
    // measurementId: 'G-62E7QE63L7',
    measurementId: 'G-C8VR5C349E',
    vapidKey:
      'BO4WWXotLOXvfca1TpTGDlX9Lh4fhG6NcBHohXSRH49uTOmny2xa55Plk0R9c2WmSJ6nEqyZTml390WEL7i7ViY',
  },

  pushNotification: {
    AuthorizationToken:
      'AAAA_w6Do08:APA91bF58SWrcTynUXO-HhcCPy4zPkJUSCo5aGlbjI_l2sryZQ339-idu49ri0POE-hoR7IRGKa2bpXQKEy4tUhuyvXqhI8DwZJl0-txRH_C6dkIUeNI1IOopYrM0H7zKv00ZbUyDIdF',
  },
  userIdleManage:{
    IdleTimer:"30", //Enter in Minute
    countDownTime:"1", //Enter in Minute
  },
  currencySymbol:"$",
  // repairbase: {
  //   username: "MCContractingAdmin",
  //   password: "MaBMg23472",
  //   apiAuthorization: "Basic TUNDb250cmFjdGluZ0FkbWluOk1hQk1nMjM0NzI=",
  //   apikey: "MCCO",
  //   testapi: "https://cors-anywhere.herokuapp.com/https://testwebapi.bluebook.net",
  //   liveapi: "https://cors-anywhere.herokuapp.com/https://webapi.bluebook.net",
  //   productType: 9
  // }
  URL: 'https://live.ipreservationlive.com/',
  ///////////////////////Login Apis

  Login: {
    PostUserLoginData: 'api/RESTAuthentication/PostUserLoginData',
    GetUserLoginPassword: 'api/RESTAuthentication/GetUserLoginPassword',
    ChangeUserLoginPassword: 'api/RESTAuthentication/ChangeUserLoginPassword',
    GetUserProfile: '/api/Mobile/GetUserProfile',
    UpdateProfile: '/api/Mobile/UpdateProfile',
    GetUserViryficationDetails:
      'api/RESTAuthentication/GetUserViryficationDetails',
    ForgotPassword: 'api/RESTAuthentication/PostUserForgotPasswordData',
    ChangePassword: 'api/RESTAuthentication/PostUserChangePasswordData',
    CompanyChangePassword:
      'api/RESTAuthentication/PostCompanyUserChangePassword',
    UserAccessLogLogout: 'api/RESTAuthentication/AddUserAccessLogLogout',
    userRegister: 'api/RESTIPL/PostRegisterCompany',
    userRegisterstate: 'api/RESTIPLDROPDOWN/GetUserregisterStateDrD',
    userRegistercounty: 'api/RESTIPLDROPDOWN/GetUserregisterCountyDrD',
  },

  /////////////////////////////////////////////////Admin All Api
  Admin: {
    //1) Company  Api
    companyPost: 'api/RESTIPL/PostAppCompanyInfoData',
    GetCompany: 'api/RESTIPL/GetAppCompanyList',

    //2)Client Api
    GetClient: 'api/RESTIPL/GetClientCompanyList',
    FilterClient: 'api/RESTIPL/AddUpdateFilterAdminclient',
    PostClient: 'api/RESTIPL/PostClientCompanyDetails',

    //3)User APi
    UserFilter: 'api/RESTIPL/GetUserFilterList',
    UserFilterSave: 'api/RESTIPL/AddUpdateFilterAdminUser',
    PostUser: 'api/RESTIPL/PostUserData',
    CheckUserName: 'api/RESTAuthentication/PostCheckUserNameData',
    CoverageDetails: 'api/RESTIPL/UserCoveragedetail',
    DeleteContractorAddress: 'api/RESTIPL/DeleteContractorMapAddress',
    StateDrd: 'api/RESTIPLDROPDOWN/GetContractorStateDropDown',
    CountyDrd: 'api/RESTIPLDROPDOWN/GetContractorCountyDropDown',
    ConCounty: 'api/RESTIPLDROPDOWN/GetContractorCountyDropDownList',
    ZipChange: 'api/RESTIPL/GetCountyZipChange',
    AddZipCode: 'api/RESTIPL/AddZipCode',
    UserCounty: 'api/RESTIPLDROPDOWN/GetUserCountyDrD',
    UpdateBackgroundCheckData: 'api/WOCTASK/UpdateBackgroundCheckData',
    GetUserDataForCompany: 'api/RESTIPL/GetUserDataForCompany',

    //4) Group Api
    GetGroup: 'api/RESTIPL/GetGroupDetails',
    FilterGroup: 'api/RESTIPL/AddUpdateFilterAdminGroup',
    PostGroup: 'api/RESTIPL/PostGroupDetails',
    GetMenu: 'api/RESTIPL/GetMenuDetails',
    GroupRoleDrd: 'api/RESTIPL/GetGroupRoleDRD',

    //5) contractor Ctegory
    GetContractor: 'api/RESTIPL/GetContractorCateData',
    FilterConCate: 'api/RESTIPL/FilterContractorCateData',
    SaveConFilter: 'api/RESTIPL/AddUpdateFilterAdminConCat',
    PostConCate: 'api/RESTIPL/PostContractorCateData',
    DeleteConCate: 'api/RESTIPL/DeleteContractorCateData',

    //6)EmailTemplate
    GetEmailDrd: 'api/Email/GetEmailDRDDetail',
    GetEmailBody: 'api/Email/GetEmailBodyDetail',
    UpdateEmail: 'api/Email/UpdateEmailTemplateDetail',

    //7) Customer Apis
    GetCustomer: 'api/RESTIPL/GetCustomerNumberData',
    FilterCustomer: 'api/RESTIPL/AddUpdateFilterAdminCutomer',
    PostCustomer: 'api/RESTIPL/PostCustomerNumberData',

    //8) State Apis
    GetState: 'api/RESTIPL/GetStateDetail',
    SaveStateFilter: 'api/RESTIPL/AddUpdateFilterAdminState',
    PostState: 'api/RESTIPL/PostStateData',

    //9)WorkType Apis
    GetWorkType: 'api/RESTIPL/GetWorkTypeDetails',
    SaveWorkTypeFilter: 'api/RESTIPL/AddUpdateFilterAdminWorkType',
    PostWorkType: 'api/RESTIPL/PostWorkTypeDetails',
    PostWTInv: 'api/RESTIPL/PostWorkTypeInvDetails',
    PostWorkTypecat: 'api/RESTIPL/PostWorkTypecatDetails',
    DeleteWorkType: 'api/RESTIPL/DeleteWorkTypecatDetails',

    //10)CustomLableAdmin
    GetCustomLable: 'api/WOCTASK/GetCustomPhotoLabel',
    GetCustomPhotoLabelGroup: '/api/WOCTASK/GetCustomPhotoLabelGroupData',
    PostCstomLableGroup: 'api/WOCTASK/CreateUpdateCustomPhotoLabelGroupData',
    DeleteCustomPhotoLabel: 'api/WOCTASK/DeleteCustomPhotoLabelGroupData',
    FilterCustomLable: 'api/WOCTASK/AddUpdateFilterAdminCustPhLbl',
    PostCustomLable: 'api/WOCTASK/postCustomPhotoLabel',

    //11) Rush Apis
    GetRushes: 'api/RESTIPL/GetRushesData',
    FilterRushes: 'api/WOCTASK/AddUpdateFilterAdminRush',
    PostRushes: 'api/RESTIPL/PostRushesData',

    //12) Category Api
    GetCategory: 'api/RESTIPL/GetMainCateData',
    FilterCategory: 'api/RESTIPL/GetCatefilterData',
    SaveFilterCate: 'api/WOCTASK/AddUpdateFilterAdminCategory',
    PostCategory: 'api/RESTIPL/PostMainCateData',
    DeleteCategory: 'api/RESTIPL/DeleteMainCateData',

    //13) WorkOrder Setting APIs
    PostWorkOrderSetting: 'api/RESTIPL/PostWorkOrderSettingData',
    GenralSetting: 'api/RESTIPL/PostGeneralWorkOrderSettingData',
    GetWorkOrderSetting: 'api/RESTIPL/GetWorkOrderSettingData',
    GetGenralSetting: 'api/RESTIPL/GetGeneralWorkOrderSettingData',

    //14) Task Apis
    GetTask: 'api/RESTIPL/GetTaskMasterDetails',
    SaveFilterTask: 'api/WOCTASK/AddUpdateFilterAdminTask',
    PostTask: 'api/RESTIPL/PostTaskMaster',
    PostTaskGroup: 'api/RESTIPL/PostTaskGroupDetails',
    GetTaskGroup: '/api/RESTIPL/GetTaskGroupDetails',
    PostTaskFilter: 'api/RESTIPL/PostTaskMasterFilterData',
    GetTaskFilter: 'api/RESTIPL/GetTaskMasterFilterData',
    DeleteTaskSettChild: 'api/RESTIPL/DeleteTaskSettingChildMaster',
    DeleteWorkTypeTaskChild: 'api/RESTIPL/DeleteWorkTypeTaskChildMaster',
    DeletePreset: 'api/RESTIPL/DeletePresetTextTaskMasterFilterData',
    AssignTaskDoc: 'api/RESTIPL/TaskDocumentAssineInst',
    TaskdocUpdateInst: 'api/RESTIPL/TaskdocUpdateInstruction',
    GetCountyState: 'api/RESTIPL/GetCountyByStateData',

    //15) Lone Type Apis
    GetLoanType: 'api/RESTIPL/GetLoanTypeData',
    SaveLoanTypeFilter: 'api/RESTIPL/AddUpdateFilterAdminLoan',
    PostLoanType: 'api/RESTIPL/PostLoanTypeData',

    //16)Damages APIs
    GetDamage: 'api/RESTIPL/GetDamageMaster',
    PostApplicant: 'api/WOCTASK/PostApplicantData',
    SaveDamageFilter: 'api/RESTIPL/AddUpdateFilterAdminDamage',
    PostDamage: 'api/RESTIPL/PostDamageMaster',

    //17)UOM Apis
    GetUom: 'api/WOCTASK/GetUomData',
    SaveUomFilter: 'api/WOCTASK/AddUpdateFilterAdminUOM',
    PostUom: 'api/WOCTASK/PostUomData',

    //18)Auto Import Api
    GetWorkOderImport: 'api/RESTIPL/GetWorkOrderImportDetails',
    SaveAutoImportFilter: 'api/RESTIPL/AddUpdateFilterAdminImport',
    PostAutoImport: 'api/RESTIPL/PostWorkOrderImportMasterDetails',

    //19)Auto Instruction
    GetAutoInstruction: 'api/WOCTASK/GetAutoInstructionTask',
    SaveFilterInstruction: 'api/WOCTASK/AddUpdateFilterAdminInstruction',
    PostInstruction: 'api/WOCTASK/PostAutoInstructionTask',
    GetFormsDrd: 'api/RESTIPLDROPDOWN/GetFormDropDown',
    DeleteIntruction: 'api/WOCTASK/DeleteAutoInstructionTask',

    //20) Forms Apis
    PostForm: 'api/Forms/PostFormDetails',
    PostQuestion: 'api/Forms/PostQuestionAnswer',
    GetForm: 'api/Forms/GetFormMaster',
    GetFormFilter: 'api/Forms/GetFormMasterFilter',
    GetPreview: 'api/Forms/GetPreviewData',
    DeleteFilter: 'api/Forms/DeleteFilter',
    DeleteForm: 'api/Forms/DeleteForm',
    DeleteEditQuestion: 'api/Forms/DeleteEditQuestionItems',
    CopyForm: 'api/Forms/CopyForm',
    PostQuestionDetails: 'api/Forms/PostQuestionDetails',
    UpdateQuestionStatus: 'api/Forms/UpdateQuestionStatus',
    GetFormQuestion: 'api/Forms/GetFormQuestion',
    UpdateQuestion: 'api/Forms/UpdateQuestion',
    PostOptions: 'api/Forms/PostOptions',
    PostPhotoRules: 'api/Forms/PostPhotoRules',
    PostAlertRules: 'api/Forms/PostAlertRules',
    PostFieldRules: 'api/Forms/PostFieldRules',
    PostActionRules: 'api/Forms/PostActionRules',
    UpdateFormStatus: 'api/Forms/UpdateFormStatus',
    GetFormDocument: 'api/Forms/GetFormDocument',
    UpdateFormDocument: 'api/Forms/UpdateFormDocument',
    ImportPCRForm: 'api/Forms/ImportPCRForm',
    AddUpdateQuePDFField: 'api/Forms/AddUpdateQuePDFField',
    GetFBFormList: 'api/Forms/GetFBFormList',
    UpdateFBFormStatus: 'api/Forms/UpdateFBFormStatus',
    AddFormWoRelation: 'api/Forms/AddFormWoRelation',
    PostFbDynamicDetail: 'api/Forms/PostFbDynamicDetail',
    AddFilterFormMaster: 'api/Forms/PostFilterAdminFormMaster',
    GetFilterFormMaster: 'api/Forms/GetFilterFormMaster',
    GeneratePdfDocumentForForm: 'api/Forms/GeneratePdfDocumentForForm',

    //21) user tracting apis
    GetActivityTracking:
      'api/UserActivityTracting/GetActivityTrackingFilterDetails',
    GetUserFilterList: 'api/UserActivityTracting/GetUserFilterList',
    DeleteActivityTrackingPhoto:
      'api/UserActivityTracting/DeleteActivityTrackingPhoto',

    //22) Photo header Tempalte

    //23)Contractor score card APIs
    PostScoreCard: 'api/WOCTASK/PostContractorScoreCardSetting',
    GetScoreCard: 'api/WOCTASK/GetContractorScoreCardSetting',

    //24)Contractor Account payable APIs
    PostContractorAccount: 'api/WOCTASK/PostContractorAccountPaySetting',
    GetContractorAccount: 'api/WOCTASK/GetContractorAccountPaySetting',

    //25) Client Configration Apis
    ConfigurationDrd: 'api/RESTIPLDROPDOWN/GetTaskConfigurationDropDown',
    GetTaskConfigration: 'api/RESTIPL/GetTaskConfigurationMasterDetails',
    PostTaskConfigration: 'api/RESTIPL/PostTaskConfigurationMasterDetails',
    GetWorkTypeConfigration: 'api/RESTIPL/GetWorkTypeConfigurationDetails',
    PostWorkTypeConfigration: 'api/RESTIPL/PostWorkTypeConfigurationDetails',
    GetMainCategoryConfigration:
      'api/RESTIPL/GetMainCategoroyConfigurationDetails',
    PostMainCategoryConfigration:
      'api/RESTIPL/PostMainCategoroyConfigurationDetails',
    AddOrdertypecodes: 'api/FBAPI/AddOrdertypecodes',
    AddItemCodes: 'api/FBAPI/AddItemCodes',

    //26)User Live Location APIs
    GetFirebaseLocation: 'api/RESTIPL/GetFirebaseLocation',
    DeleteFirebaseLocation: 'api/RESTIPL/DeleteFirebaseLocation',
    DeleteFirebaseLocationList: 'api/RESTIPL/DeleteFirebaseLocationList',

    //27)Allowables category APIs
    GetAllowablesDetails: 'api/Allowables/GetAllowablesCategory',
    PostAllowablesDetails: 'api/Allowables/PostAllowablesCategory',
    AddAdminFilterAllowablesCategory:
      'api/Allowables/AddUpdateFilterAdminAllowablesCategory',
    //28)Allowables  APIs
    AddUpdateAllowables: 'api/Allowables/AddUpdateAllowables',
    GetAllowablecatDRD: 'api/Allowables/GetAllowablesCategoryDRD',
    GetAllowables: 'api/Allowables/GetAllowables',
    AllowablesFilterSave: 'api/Allowables/AllowablesFilterSave',
    DeleteAllowablesChildDetails: 'api/Allowables/DeleteAllowablesChildDetails',

    //29) Notification APIs
    GetWorkorderNotification: 'api/RESTIPL/GetWorkorderNotificationDetail',
    AddUpdateWorkorderNotification: 'api/RESTIPL/AddWorkorderNotification',
    PostPhotoHeaderTemplate: 'api/WOCTASK/PostPhotoHeaderTemplate',
    GetPhotoHeaderTemplate: 'api/WOCTASK/GetPhotoHeaderTemplate',
    AdminFilterPhotoHeaderTemplate:
      'api/WOCTASK/AdminFilterPhotoHeaderTemplate',
      getRestoredWorkOrderData: 'api/RESTIPL/GetRestoredWorkOrderMasterData',


      // worksetting
      CreateUpdateWorkOrderSettingMaster: 'api/RESTIPL/CreateUpdateWorkOrderSettingMaster',
      GetWorkOrderSettingData: 'api/RESTIPL/GetWorkOrderSettingData',
      GetWorkOrderSettingDataDetails:'api/RESTIPL/GetWorkOrderSettingDataDetails',
    


      // Occupancy Status

      CreateUpdateOccupancyStatus: 'api/RESTIPL/CreateUpdateOccupancyStatusMaster',
      GetOccupancyStatus :'api/RESTIPL/GetOccupancyStatusMaster',

      // PropertyTypeMaster
      CreateUpdatePropertyType : 'api/RESTIPL/CreateUpdatePropertyTypeMaster',
      GetPropertyType: 'api/RESTIPL/GetPropertyTypeMaster',

      // PropertyAlertMaster
      CreateUpdatePropertyAlert : 'api/RESTIPL/CreateUpdatePropertyAlertMaster',
      GetPropertyAlert: 'api/RESTIPL/GetPropertyAlertMaster',

      // LotPricingFilter
      CreateUpdateLotPricingFilter:'api/RESTIPL/PostLotPricingFilterMaster',
      GetLotPricingFilter: 'api/RESTIPL/GetLotPricingFilterMasterData',

      // BackgroundProvider

      CreateUpdateBackgroundProvider: 'api/RESTIPL/CreaterBackgroundCheckinProvider',
      GetBackgroundProvider: 'api/RESTIPL/GetBackgroundCheckinProvider',

      // Access User Log

      GetAccessUserLogNew: 'api/Access/GetAccessUserLogNewMaster',

      //LoanStatus
      CreateUpdateLoanStatus : 'api/RESTIPL/CreateUpdateLoanStatusMaster',
      GetLoanStatus: 'api/RESTIPL/GetLoanStatusMaster',

      //Lock Reason
      PostPropertyLockReasonMaster:'api/RESTIPL/PostPropertyLockReasonMaster',
      GetPropertyLockReasonMaster: 'api/RESTIPL/GetPropertyLockReasonMaster',

      AddUpdateFilterAdminCommon: 'api/RESTIPL/AddUpdateFilterAdminCommon',

      // Work Column Test
      GetWorkColumnMasterDetails: 'api/RESTIPL/Get_Work_ColumnMasterDetails',
      WorkColumnPost: "api/WorkOrderImport/AddAccessColumnGroup"
  },

  //Notification for downloads
  GetDownloadNotification: 'api/RESTIPL/GetPhotosDownloadNotification',

  //////////////////////////////////////////////////////////Support All Apis
  Support: {
    //1) Support Ticket apis
    GetSupportTicket: 'api/Support/GetSupportTicketData',

    //2) Support Ticket details Apis
    GetSupportTicketReply: 'api/Support/GetSupportTicketReplyData',
    PostSupportTicketReply: 'api/Support/PostSupportTicketReplyData',

    PostSupportTicket: 'api/Support/PostSupportTicketData',
    PostIPLAutoSupportticket: 'api/Support/PostIPLAutoSupportticket',

    //3) Vedio Training Apis
    GetTrainingVedio: 'api/Support/GetTrainingVedioData',

    //4)Suggestion Box Apis
    PostSuggestionBox: 'api/Suggestion/PostSuggestionBoxData',
    GetSuggestionBox: 'api/Suggestion/GetSuggestionBoxData',
    AddSuggestionVote: 'api/Suggestion/AddSuggestionVoteData',

    //5)Support Contact Details
    PostContact: 'api/Support/PostContactDetails',
  },

  ///////////////////////////////////////////////////////Reports Apis
  Report: {
    //1) Contractor Reports
    GetContractorPaid: 'api/ContractorReport/GetContractorPaidInvoice',
    GetContractorPending: 'api/ContractorReport/GetContractorPendingInvoice',
    GetCurrentlyDueContractor:
      'api/ContractorReport/GetCurrentlyDueContractorReport',
    GetPendingReport: 'api/ContractorReport/GetPendingReport',
    GetWorkOrder: 'api/RESTIPL/GetWorkOrder',

    //2) Advance Report Apis
    AdvanceReportDrd: 'api/Report/GetAdvanceReportDropDown',
    GetAdvanceReport: 'api/Report/GetAdvanceReportDetail',
    PostWorkOrderFilter: 'api/Report/PostWorkOrderFilterData',
    GetReportWOFilterChild: 'api/Report/GetReportWOFilterChildDetail',
    DeleteWorkOrderFilter: 'api/Report/DeleteWorkOrderFilterChildData',

    //3) Account payable Report Apis
    GetReportDetail: 'api/Report/GetReportDetail',
    ClientPayment: 'api/Report/ClientPaymentDataList',
    ContractorPayment: 'api/Report/ContractorPaymentDataList',
    ReportPdfDetails: 'api/Report/ReportPdfDetailsData',
    AdvanceReportPdfDetailsData: 'api/Report/AdvanceReportPdfDetailsData',
  },

  ///////////////////////////////////////////////////// Resources Apis
  Resources: {
    //1)Document Apis
    PostAddFolder: 'api/formdocs/PostAddFolderDetails',
    GetFileFolder: 'api/formdocs/GetFileFolderData',
    GetParentFolder: 'api/formdocs/GetParentFolderDetails',
    GetEditFile: 'api/formdocs/GetEditFileData',
    UpdateFileMaster: 'api/formdocs/UpdateFileMasterData',
    UpdateFileAutoAssign: 'api/formdocs/AddUpdateFileAutoAssignReference',

    //2) Memo Apis
    GetMassEmail: 'api/FileUpload/GetMassEmailData',
    GetMemo: 'api/RESTIPL/GetMemoData',
    SaveMailTemplate: 'api/RESTIPL/SaveMailTemplate',
    EmailFileUpload: 'api/FileUpload/EmailFileUpload',
    AddMassTemplate: 'api/Suggestion/AddMassTemplateData',
    GetMassTemplate: 'api/Suggestion/GetMassTemplateData',

    //3) Resources Score Card Apis
    CurrentScoreCard: 'api/RESTIPL/CurrentScoreCardDetail',

    //4) Work Order Map and live map  Apis
    GetMobleWorkOrder: 'api/Mobile/GetMobleWorkOrderData',
    GetContractorMap: 'api/RESTIPL/GetContractorMapData',
    GetContractorMaplatlong: 'api/RESTIPL/GetContractorMaplatlongData',

    // 5) Professional Services
    PostProfessionalService: 'api/RESTIPL/PostProfessionalServiceMaster',
    GetProfessionalService: 'api/RESTIPL/GetProfessionalServiceMaster',
    GetContactTypeMaster: 'api/RESTIPL/GetContactTypeMaster',
    PostContactTypeMaster: 'api/RESTIPL/PostContactTypeMaster',
  },

  //////////////////////////////////////////////////////////////Work Order Apis
  WorkOrder: {
    //1) workOrder Apis
    GetWorkOrderData: 'api/RESTIPL/GetWorkOrderData',
    GetJsonColumn: 'api/RESTIPL/GetJsonColumnWorkOrder',
    GetColumn: 'api/RESTIPL/GetColumnWorkOrder',
    postColumn: 'api/RESTIPL/postColumnWorkOrder',
    FilterWOStatus: 'api/RESTIPL/FilterWorkOrderStatus',
    commonmethod: 'api/RESTIPL/GetWorkOrdercommonmethod',
    PostWorkOrderAction: 'api/RESTIPL/PostWorkOrderActionDetail',
    ClientInvoicePrint: 'api/WOCTASK/MultipleClientInvoicePrint',
    InstructionPrint: 'api/WOCTASK/MultipleInstructionPrint',
    MultiActionsWorkOrder: 'api/RESTIPL/MultiActionsWorkOrder',
    PostInstructionwo: 'api/WOCTASK/PostInstructionMultiple',
    postSavefilter: 'api/RESTIPL/postSavefilter',
    postPagesize: 'api/RESTIPL/postSavePagesize',
    GetWoContractorInvoice: 'api/WOCTASK/GetWoContractorInvoice',
    GetLiveRouteLocation: 'api/RESTIPL/GetLiveRouteLocation',
    PostRecuredWorkOrderData: 'api/RESTIPL/PostRecuredWorkOrderData',
    GetZipAddress: 'api/RESTIPL/GetZipAddress',

    //2) Wo Auto Import Apis
    GetWOImportQueueTrans: 'api/RESTIPL/GetWorkOrderImportQueueTrans',
    DeleteWOImportQueueTrans: 'api/RESTIPL/DeleteWorkOrderImportQueueTrans',
    PostWOImportQueueTrans: 'api/RESTIPL/PostWorkOrderImportQueueTrans',
    GetClientForImport: 'api/RESTIPL/GetClientForImport',

    //3)Create New Wo Apis
    PostWorkOrder: 'api/RESTIPL/PostWorkOrderData',
    GetUserMeta: 'api/RESTIPL/GetUserMetaData',
    UpadateWorkOrderStatus: 'api/RESTIPL/UpadateWorkOrderStatusDetails',
    PostIPLAuto: 'api/WOCTASK/PostIPLAutoData',
    PostdeleteWorkOrder: 'api/RESTIPL/PostdeleteWorkOrderData',

    //from mobile
    UpdateWoEstimateDate: 'api/Mobile/UpdateEstimateDateWorkOrderData',

    GetWorkOrderIPLNumberlist: 'api/RESTIPLDROPDOWN/GetWorkOrderIPLNumberlist',

    //4)Import Queue  Apis
    PostImportWorkOrderExcel: 'api/RESTIPL/PostImportWorkOrderExcel',
    AddOrders: 'api/FBAPI/AddOrders',
    MultiClientPaymentData: 'api/RESTIPL/MultiClientPaymentData',
    GetMultiClientPaymentData: 'api/RESTIPL/GetMultiClientPaymentData',

    //5) ECD Notes
    PostEcdNotes: 'api/RESTIPL/PostECDNoteData',
    GetECDNoteList: 'api/RESTIPL/GetECDNotesList',

    GetWorkoOrderTracker: 'api/RESTIPL/GetWorkoOrderTracker',
  },

  /////////////////////////Client results Api
  ClientResult: {
    GetWOClientResult: 'api/RESTIPL/GetWorkOrderDataClientResult',
    GetWoFormMaster: 'api/Forms/GetWoFormMaster',
    DeleteWoFormMaster: 'api/Forms/DeleteWoFormMaster',
    PostTaskBidData: 'api/WOCTASK/PostTaskBidData',
    GetWorkOrderPastData: 'api/RESTIPL/GetWorkOrderPastData',
    UpdateBidStatusDetails: 'api/RESTIPL/UpdateBidStatusDetails',
    GetTaskBidGetWorkOrder: 'api/WOCTASK/ClientResultTaskBidGetWorkOrderGet',
    PostTaskInvoice: 'api/WOCTASK/ClientResultTaskInvoicePost',
    PostTaskDamage: 'api/WOCTASK/ClientResultTaskDamagePost',
    DownloadZipFile: 'Home/DownloadZipFile',
    GetSingleImagedata: 'api/MultiPhoto/GetSingleImagedata',
    CopyWorkOrder: 'api/WorkOrderImport/PostCopyWorkOrderData',
    GetWOHistory: 'api/RESTIPL/GetWorkOrderHistory',
    PastWOHistory: 'api/RESTIPL/GetPastWorkOrderHistory',
    GetMapOffice: 'api/RESTIPL/GetMapOfficeData',
    GetOfficeDocument: 'api/RESTIPL/GetOfficeDocument',
    DeleteOfficeDocument: 'api/RESTIPL/DeleteOfficeDocument',
    GetTaskPreset: 'api/WOCTASK/GetTaskPreset',
    ContractorInvoicePdfDetailsData:
      'api/WOCTASK/ContractorInvoicePdfDetailsData',
    ClientInvoicePdfDetailsData: 'api/WOCTASK/ClientInvoicePdfDetailsData',


    PostTaskViolation: 'api/WOCTASK/ClientResultTaskViolationPost',
    PostTaskHazard: 'api/WOCTASK/ClientResultTaskHazardPost',
    UpdateTaskStatus_DamageViolationHazard: 'api/RESTIPL/UpdateTaskStatusDamageViolationHazard',
    //2)Client Result Sync Apis
    UploadBidSync: 'api/FBAPI/UploadBidSync',
    UploadInvoiceSync: 'api/FBAPI/UploadInvoiceSync',
    UploadPreservationSync: 'api/FBAPI/UploadPreservationSync',
    UploadPhotoSync: 'api/FBAPI/UploadPhotoSync',
    UploadGrassSync: 'api/FBAPI/UploadGrassSync',
    UploadDamageSync: 'api/FBAPI/UploadDamageSync',

    //3)Client Result Instruction Apis
    GetInstructionType: 'api/WOCTASK/GetInstructionType',
    GetInstructionTask: 'api/WOCTASK/GetInstructionTask',
    GetInstructionTaskName: 'api/WOCTASK/GetInstructionTaskName',
    PostDeleteInstruction: 'api/WOCTASK/PostDeleteInstruction',
    PostInstructionClient: 'api/WOCTASK/PostInstruction',
    GetInstruction: 'api/WOCTASK/GetInstruction',
    GetAccessLogData: 'api/Access/GetAccessLogData',
    GetNewAccessLogData: 'api/Access/GetNewAccessLogData',
    DeleteInstructionFile: 'api/RESTIPL/DeleteInstructionFile',

    //4) Client Result Pcr Apis
    PostPropertyInfo: 'api/RESTPCR/PostPropertyInfoData',
    GetPropertyInfo: 'api/RESTPCR/GetPropertyInfoData',
    PostPCRFiveBrother: 'api/RESTPCR/PostPCRFiveBrotherData',
    PostPCRViolation: 'api/RESTPCR/PostPCRViolationData',
    GetPCRViolation: 'api/RESTPCR/GetPCRViolationData',
    PostPCRSecuring: 'api/RESTPCR/PostPCRSecuringData',
    GetPCRSecuring: 'api/RESTPCR/GetPCRSecuringData',
    PostPCRAppliance: 'api/RESTPCR/PostPCRApplianceData',
    GetPCRAppliance: 'api/RESTPCR/GetPCRApplianceData',
    PostPCRWinterization: 'api/RESTPCR/PostPCRWinterizationData',
    GetPCRWinterization: 'api/RESTPCR/GetPCRWinterizationData',
    PostPCRYard: 'api/RESTPCR/PostPCRYardData',
    GetPCRYard: 'api/RESTPCR/GetPCRYardData',
    PostPCRPool: 'api/RESTPCR/PostPCRPoolData',
    GetPCRPool: 'api/RESTPCR/GetPCRPoolData',
    PostPCRDebris: 'api/RESTPCR/PostPCRDebrisData',
    GetPCRDebris: 'api/RESTPCR/GetPCRDebrisData',
    PostPCRUtilities: 'api/RESTPCR/PostPCRUtilitiesData',
    GetPCRUtilities: 'api/RESTPCR/GetPCRUtilitiesData',
    PostPCRDamage: 'api/RESTPCR/PostPCRDamageData',
    GetPCRDamage: 'api/RESTPCR/GetPCRDamageData',
    GetPCRDropDown: 'api/RESTIPLDROPDOWN/GetPCRDataDropDown',
    PostPCRConveyance: 'api/RESTPCR/PostPCRConveyanceData',
    GetPCRConveyance: 'api/RESTPCR/GetPCRConveyanceData',
    PostPCRRoof: 'api/RESTPCR/PostPCRRoofData',
    GetPCRRoof: 'api/RESTPCR/GetPCRRoofData',
    GetPCRFiveBrother: 'api/RESTPCR/GetPCRFiveBrotherData',
    PostPCRGrassCut: 'api/RESTPCR/PostPCRGrassCutData',
    GetPCRGrassCut: 'api/RESTPCR/GetPCRGrassCutData',
    PostPcrCyperxxFORMSMASTERData: 'api/RESTPCR/SavePcrCyperxxFORMSMASTERData',
    GetPcrCyperxxFORMSMASTERData: 'api/RESTPCR/GetPCRCYPREXXFORMSMASTERData',

    PostCyprexxGrassCheckData: 'api/RESTPCR/PostCyprexxGrassCheckData',
    GetCyprexxGrassCheckListData: 'api/RESTPCR/GetCyprexxGrassCheckListData',

    PostCyprexxWinterizationPressure: 'api/RESTPCR/PostCyprexxWinterizationPressure',
    GetCyprexxWinterizationPressure: 'api/RESTPCR/GetCyprexxWinterizationPressure',

    PostCyprexxUniversalDamageChecklist: 'api/RESTPCR/PostCyprexxUniversalDamageChecklist',
    GetCyprexxUniversalDamageChecklist: 'api/RESTPCR/GetCyprexxUniversalDamageChecklist',

    PostMsiGrassPcrFORMSMASTERData: 'api/RESTPCR/SaveMsiGrassPcrFormsMasterData',
    GetMsiGrassPcrFORMSMASTERData: 'api/RESTPCR/GetMsiGrassPcrFORMSMASTERData',

    PostMsiPreservationPcrForm: 'api/RESTPCR/PostMsiPreservationPcrForm',
    GetMsiPreservationPcrForm: 'api/RESTPCR/GetMsiPreservationPcrForm',

    PostServiceLinkForm: 'api/RESTPCR/PostServiceLinkForm',
    GetServiceLinkForm: 'api/RESTPCR/GetServiceLinkForm',

    PostMCSFormMaster: 'api/RESTPCR/PostMCSFormMaster',
    GetMCSFormMaster: 'api/RESTPCR/GetMCSFormMaster',

    PostPCRInspectionForm: 'api/RESTPCR/PostPCRInspectionForm',
    GetPCRInspectionForm: 'api/RESTPCR/GetPCRInspectionForm',

    PostMCSGrassCutFormMaster: 'api/RESTPCR/PostMCSGrassCutFormMaster',
    GetMCSGrassCutFormMaster: 'api/RESTPCR/GetMCSGrassCutFormMaster',

    PostMcsMaintenanceVendorChecklistFormMaster: 'api/RESTPCR/PostMcsMaintenanceVendorChecklistFormMaster',
    GetMcsMaintenanceVendorChecklistFormMaster: 'api/RESTPCR/GetMcsMaintenanceVendorChecklistFormMaster',

    PostNRFProcessingFormMaster: 'api/RESTPCR/Post_NRF_PropertyConditionReportData',
    GetNRFProcessingMaster: 'api/RESTPCR/Get_NRF_PropertyConditionReportData',

    PostNfrDumpReceiptFormMasterData: 'api/RESTPCR/PostNfrDumpReceiptFormMasterData',
    GetNfrDumpReceiptFormMasterData: 'api/RESTPCR/GetNfrDumpReceiptFormMasterData',

    PostCyprexxJobDocumentationChecklist: 'api/RESTPCR/PostCyprexxJobDocumentationChecklist',
    GetCyprexxJobDocumentationChecklist: 'api/RESTPCR/GetCyprexxJobDocumentationChecklist',

    CreateUpdateCyprexxPropertyConditionChecklist:'api/RESTIPL/CreateUpdateCyprexxPropertyConditionChecklist',
    GetCyprexxPropertyConditionChecklist:'api/RESTIPL/GetCyprexxPropertyConditionChecklist',

    //5) Client Result Photos Apis
    GetCLientResultPhotos: 'api/MultiPhoto/GetCLientResultPhotos',
    DeleteClientResultsPhotos: 'api/RESTIPL/PostDeleteClientResultsPhotos',
    TaskDeleteClientResultsPhotos:
      'api/RESTIPL/PostTaskDeleteClientResultsPhotos',
    GettaskbidPhotos: 'api/WOCTASK/GettaskbidPhotosdetails',
    GetCLientResultPhotosMaster: 'api/MultiPhoto/GetCLientResultPhotosMaster',
    UpdateCLientResultPhotos: 'api/MultiPhoto/UpdateCLientResultPhotosMaster',
    PostUpdateclientphoto: 'api/MultiPhoto/PostUpdateclientphoto',
    postCustomPhotoLabel: 'api/WOCTASK/postCustomPhotoLabel',
    GetCustomPhotoLabel: 'api/WOCTASK/GetCustomPhotoLabel',
    PostWOCustomPhotoLabel: 'api/WOCTASK/PostWOCustomPhotoLabel',
    AddClientResultFoH: 'api/MultiPhoto/AddClientResultFoHData',
    MoveCopyClientPhoto: 'api/MultiPhoto/MoveCopyClientPhotoData',
    ImageBackground: 'api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground',
    GetCLientResultPhotosMasterHistory:
      'api/MultiPhoto/GetCLientResultPhotosMasterHistory',
    GetClientResultPhotoInfo: 'api/MultiPhoto/GetClientResultPhotoInfo',
    GetPhotoTransferBidTask: 'api/WOCTASK/GetPhotoTransferBidTask',
    ClientResultsPhotoData: 'api/WOCTASK/ClientResultsPhotoData',
    DownloadZipFileBackend: 'api/downloadPhotoZip/PostZipDownloadHook',
    DownloadZip: 'api/downloadZip',
    DeleteClientResultMultiple: 'api/MultiPhoto/PostDeleteClientResultsPhotos',
    //6)Client Result Invoice Apis
    GetClientResultInvoiceWOIDAutoCom:
      'api/WOCTASK/GetClientResultInvoiceWOIDAutoCom',
    GetDropDownData: '/api/RESTIPLDROPDOWN/GetDropDownDataClientResult',
    GetStatusDrd: '/api/RESTIPLDROPDOWN/GetStatusDropDown',
    ContractorInvoice: 'api/WOCTASK/ClientResultContractorInvoice',
    ContractorInvoice_Multiple:"api/WOCTASK/ClientResultContractorInvoice_Multiple",
    ClientInvoice: 'api/WOCTASK/ClientResultClientInvoice',
    ClientInvoice_Multiple: 'api/WOCTASK/ClientResultClientInvoice_Multiple',
    ClientPaymentData: 'api/RESTIPL/ClientPaymentData',
    ContractorPaymentData: 'api/RESTIPL/ContractorPaymentData',
    GetClientPaymentData: 'api/RESTIPL/GetClientPaymentData',
    GetContractorPaymentData: 'api/RESTIPL/GetContractorPaymentData',
    CreateUpdateContractorPayment: 'api/WOCTASK/CreateUpdateContractorPayment',
    CreateUpdateContractorPayment_Multiple: 'api/WOCTASK/CreateUpdateContractorPayment_Multiple',
    ClientExpensePayment: 'api/WOCTASK/GetContractorClientExpensePaymentData',
    PostScoreCarddata: 'api/RESTIPL/PostScoreCard_DataData',

    //////// Client Result Message Apis
    PostUserMessage: 'api/RESTIPL/PostUserMessageDetail',
    GetIPLChatFile: 'api/WOMessage/GetIPLChatFile',
    GetAllWorkOrderData: 'api/WOMessage/GetAllWorkOrderData',
    GetmessageWOData: 'api/WOMessage/GetWorkOrderData',
    GetWorkOrderDataOnSearch: 'api/WOMessage/GetWorkOrderDataOnSearch',
    AddFirebaseWoMessageData: 'api/WOMessage/AddFirebaseWoMessageData',
    GetMessageWorkOrderUser: 'api/WOMessage/GetMessageWorkOrderUser', // Find API
    GetMessageAdminUser: 'api/WOMessage/GetMessageAdminUser', // Find API
    //////
    AddClientResultPropertyInfoData:
      'api/RESTIPL/AddClientResultPropertyInfoData',
    GetClientResultPropertyInfoData:
      'api/RESTIPL/GetClientResultPropertyInfoData',
    GetClientResultPropertySettingsData:
      'api/RESTIPL/GetClientResultPropertySettingsData',
      GetClientResultPropertyTeamData:
      'api/RESTIPL/GetClientResultPropertyTeamData',
      GetClientResultPropertyLoanSettingsData:
      'api/RESTIPL/GetClientResultPropertyLoanSettingsData',
      GetClientResultPropertyServiceDatesData:
      'api/RESTIPL/GetClientResultPropertyServiceDatesData',
    GetClientResultPhotoHistoryData:
      'api/RESTIPL/GetClientResultPhotoHistoryData',
    UpdateCLientResultPhotosTimeStamp:
      'api/MultiPhoto/UpdateCLientResultPhotosTimeStamp',
    AddClientResultPropertySettingData:
      'api/RESTIPL/AddClientResultPropertySettingData',
      AddClientResultPropertyTeamData:
      'api/RESTIPL/AddClientResultPropertyTeamData',
      AddClientResultPropertyLoanSettingsData:
      'api/RESTIPL/AddClientResultPropertyLoanSettingsData',
      AddClientResultPropertyServiceDatesData:
      'api/RESTIPL/AddClientResultPropertyServiceDatesData',
      PostClientResultPropertyInfoMasterTest:
      'api/RESTIPL/PostClientResultPropertyInfoMasterTestDetails',
      GetClientResultPropertyInfoMasterTest:
      'api/RESTIPL/GetClientResultPropertyInfoMasterTestDetails',
  },
  RepairBase: {
    RepairBaseProfitOverHead: 'api/RepairBase/AddRepairBaseProfitOverHeadData',
    GetRepairBaseUserMaster: 'api/RepairBase/GetRepairBaseUserMasterData',
  },
  Accounting: {
    //1)Account Apis
    GetAccountList: 'api/Account/GetAccountList',
    CreateUpdateAccount: 'api/Account/CreateUpdateAccount',
    AccountTypeDrd: 'api/AccountType/GetDropDownAccountType',
    AccountDetailsDrd:
      'api/AccountType/GetDropDownAccountDetailsByAccountTypeId',
    GetAccountDetails: 'api/Account/GetAccountDetailsByAccountId',
    GetAccountChild: 'api/Account/GetAccountChildByAccountId',
    GetAccountActivity: 'api/Account/GetAccountActivityByAccountId',

    //2)Bill Apis
    GetBillList: 'api/Bill/GetBillList',
    GetUserFilter: 'api/RESTIPL/GetUserFilterList',
    GetBill: 'api/Bill/GetBill',
    CreateUpdateBill: 'api/Bill/CreateUpdateBill',
    CreateBillPayment: 'api/Bill/CreateUpdateBillPayment',
    GetBillByVendorId: 'api/Bill/GetBillByVendorId',
    CreateUpdateBillReceivePayment: 'api/Bill/CreateUpdateBillReceivePayment',
    GetPaidBill: 'api/Bill/GetPaidBillList',
    BillBankDeposit: 'api/Bill/BillBankDeposit',

    //3) Client Apis
    GetClient: 'api/Client/GetClientList',
    CreateClient: 'api/Client/CreateUpdateClient',

    //4) Coa Apis
    GetAccounts: 'api/account/GetAccounts',

    //5) Company Apis
    PostCompany: 'api/Company/PostCompany',
    GetCompanyDetails: 'api/Company/GetCompanyDetails',

    //6)Contractor Apis
    GetVendorFilter: 'api/User/GetVendorFilterList',
    PostUserData: 'api/User/PostUserData',
    CreateAccVendor: 'api/User/CreateUpdateAccVendor',

    //7)Deshboard Apis
    GetDashborad: 'api/Dashboard/GetDashborad',
    GetDefaultDashborad: 'api/Dashboard/GetDefaultDashboradDetails',

    //8)Import Client payment Aips
    GetClientCompanyList: 'api/RESTIPL/GetClientCompanyList',
    PostContact: 'api/Support/PostContactDetails',

    PostImportClientPaymentExcel: 'api/RESTIPL/CreateUpdateImportClientPaymentExcel',

    //9)Invoice Aips
    GetInvoiceList: 'api/Invoice/GetInvoiceList',
    GetUserFilterList: 'api/RESTIPL/GetUserFilterList',
    GetInvoice: 'api/Invoice/GetInvoice',
    GetInvoiceByCustomerId: 'api/Invoice/GetInvoiceByCustomerId',
    CreateInvoice: 'api/Invoice/CreateUpdateInvoice',
    CreateInvoicePayment: 'api/Invoice/CreateUpdateInvoicePayment',
    CreateInvoiceReceive: 'api/Invoice/CreateUpdateInvoiceReceivePayment',
    GetPaidInvoice: 'api/Invoice/GetPaidInvoiceList',
    InvoiceBankDeposit: 'api/Invoice/InvoiceBankDeposit',

    //10)Journal Aips
    GetJournalList: 'api/Journal/GetJournalList',
    GetJournal: 'api/Journal/GetJournalById',
    DeleteJournal: 'api/Journal/DeleteJournal',
    CreateJournal: 'api/Journal/CreateUpdateJournal',
    PostJournal: 'api/Journal/PostJournal',

    //11)Ledger Aips
    GetLedgerList: 'api/Ledger/GetLedgerList',

    //12)
    GetTrialBalance: 'api/AccountReport/GetTrialBalance',
    GetBalanceSheet: 'api/AccountReport/GetBalanceSheet',
    GetIncomeStatement: 'api/AccountReport/GetIncomeStatement',
    GetProfitAndLoss: 'api/AccountReport/GetProfitAndLoss',

    //13) task
    GetTaskMasterList: 'api/Task/GetTaskMasterList',
    GetAccTask: 'api/Task/GetAccTask',
    DeleteAccTask: 'api/Task/DeleteAccTask',
    CreateAccTask: 'api/Task/CreateUpdateAccTask',

    //reports Apia
    Report: {
      //1)Account Payable Report
      GetAccountPayableReports: 'api/AccountReport/GetAccountPayableReports',
      GetAccountPayableReportsPDF:
        'api/AccountReport/GetAccountPayableReportsPDF',

      //2)Account Receivable
      GetAccountReceivableReports:
        'api/AccountReport/GetAccountReceivableReports',
      GetAccountReceivableReportsPDF:
        'api/AccountReport/GetAccountReceivableReportsPDF',

      //3)Balance Sheet
      GetBalanceSheetReports: 'api/AccountReport/GetBalanceSheetReports',
      GetBalanceSheetPDF: 'api/AccountReport/GetBalanceSheetPDF',

      //4) Income Statement
      GetIncomeStatement: 'api/AccountReport/GetIncomeStatement',
      GetIncomeStatementPDF: 'api/AccountReport/GetIncomeStatementPDF',

      //5)Journal
      GetJournalReports: 'api/AccountReport/GetJournalReports',
      GetJournalPDF: 'api/AccountReport/GetJournalPDF',

      //6)ProfitAndLoss
      GetProfitAndLossReports: 'api/AccountReport/GetProfitAndLossReports',
      GetProfitLossPDF: 'api/AccountReport/GetProfitLossPDF',

      //7)Profit And Loss By Customer
      GetProfitAndLossByCustomerReports:
        'api/AccountReport/GetProfitAndLossByCustomerReports',
      GetProfitLossByCustomerPDF:
        'api/AccountReport/GetProfitLossByCustomerPDF',

      //8)Profit And Loss By Month
      GetProfitAndLossByMonthReports:
        'api/AccountReport/GetProfitAndLossByMonthReports',
      GetProfitLossByMonthPDF: 'api/AccountReport/GetProfitLossByMonthPDF',

      //9)Profit And Loss Comparison
      GetProfitAndLossComparisonReports:
        'api/AccountReport/GetProfitAndLossComparisonReports',
      GetProfitLossComparisonPDF:
        'api/AccountReport/GetProfitLossComparisonPDF',

      //10)Profit And Loss Details
      GetProfitAndLossDetailsReports:
        'api/AccountReport/GetProfitAndLossDetailsReports',
      GetProfitAndLossDetailsPDF:
        'api/AccountReport/GetProfitAndLossDetailsPDF',

      //11)Trial Balance
      GetTrialBalance: 'api/AccountReport/GetTrialBalance',
      GetTrialBalancePDF: 'api/AccountReport/GetTrialBalancePDF',
      //12)Profit And Loss By Vendor
      GetProfitAndLossByVendorReports:
        'api/AccountReport/GetProfitAndLossByVendorReports',
      GetProfitLossByVendorPDF: 'api/AccountReport/GetProfitLossByVendorPDF',
      apicreateworkOrderPdf: 'api/FileUpload/CreateWorkOrderPdf',
    },
  },
  AccessLog:{
    PostNewAccessLogData: 'api/Access/PostNewAccessLogData',
    GetNewAccessLogData: 'api/Access/GetNewAccessLogData',
  }
};
