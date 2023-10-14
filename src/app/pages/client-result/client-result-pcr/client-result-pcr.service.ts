import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import {
  PCRPropertyInfoModel,
  PCR_FiveBrotherModel,
  PCR_Violation_Model,
  PCR_Securing_Model,
  PCR_ApplianceModel,
  PCR_WinterizationModel,
  PCR_Yard_MaintenanceModel,
  PCR_PoolModel,
  PCR_DebrisModel,
  PCR_UtilitiesModel,
  PCR_ConveyanceModel,
  PCR_Damage_MasterModel,
  PCR_RoofModel,
  PCRGrassInfoModel
} from "./client-result-pcr-model";
import { environment } from "../../../../environments/environment";
import { HomepageServices } from "../../home/home.service";


@Injectable({
  providedIn: "root"
})
export class ClientResultPCRServices {

  private token: any;
  baseUrl = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOSTx = this.baseUrl + environment.ClientResult.PostPropertyInfo;

  public PropertyInfoPost(Modelobj: PCRPropertyInfoModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Pro_PkeyID = Modelobj.PCR_Pro_PkeyID;
    ANYDTO.PCR_Prop_WO_ID = Modelobj.PCR_Prop_WO_ID;
    ANYDTO.PCR_Prop_MasterID = Modelobj.PCR_Prop_MasterID;
    ANYDTO.PCR_Prop_ValType = Modelobj.PCR_Prop_ValType;
    ANYDTO.PCR_Prop_ForSale = Modelobj.PCR_Prop_ForSale;
    ANYDTO.PCR_Prop_Sold = Modelobj.PCR_Prop_Sold;
    ANYDTO.PCR_Prop_Broker_Phone = Modelobj.PCR_Prop_Broker_Phone;
    ANYDTO.PCR_Prop_Broker_Name = Modelobj.PCR_Prop_Broker_Name;
    ANYDTO.PCR_Prop_Maintained = Modelobj.PCR_Prop_Maintained;
    ANYDTO.PCR_Prop_Maintained_ByOther = Modelobj.PCR_Prop_Maintained_ByOther;
    ANYDTO.PCR_Prop_Maintained_Items_Utilities =
      Modelobj.PCR_Prop_Maintained_Items_Utilities;
    ANYDTO.PCR_Prop_Maintained_Items_Grass =
      Modelobj.PCR_Prop_Maintained_Items_Grass;
    ANYDTO.PCR_Prop_Maintained_Items_Snow_Removal =
      Modelobj.PCR_Prop_Maintained_Items_Snow_Removal;
    ANYDTO.PCR_Prop_Maintained_Items_Interior_Repaiars =
      Modelobj.PCR_Prop_Maintained_Items_Interior_Repaiars;
    ANYDTO.PCR_Prop_Maintained_Items_Exterior_Repairs =
      Modelobj.PCR_Prop_Maintained_Items_Exterior_Repairs;
    ANYDTO.PCR_Prop_Active_Listing = Modelobj.PCR_Prop_Active_Listing;
    ANYDTO.PCR_Prop_Basement_Present = Modelobj.PCR_Prop_Basement_Present;
    ANYDTO.PCR_Prop_Property_Type_Vacant_Land =
      Modelobj.PCR_Prop_Property_Type_Vacant_Land;
    ANYDTO.PCR_Prop_Property_Type_Single_Family =
      Modelobj.PCR_Prop_Property_Type_Single_Family;
    ANYDTO.PCR_Prop_Property_Type_Multi_Family =
      Modelobj.PCR_Prop_Property_Type_Multi_Family;
    ANYDTO.PCR_Prop_Property_Type_Mobile_Home =
      Modelobj.PCR_Prop_Property_Type_Mobile_Home;
    ANYDTO.PCR_Prop_Property_Type_Condo = Modelobj.PCR_Prop_Property_Type_Condo;
    ANYDTO.PCR_Prop_Permit_Required = Modelobj.PCR_Prop_Permit_Required;
    ANYDTO.PCR_Prop_Permit_Number = Modelobj.PCR_Prop_Permit_Number;
    ANYDTO.PCR_OurBuildings_Garages = Modelobj.PCR_OurBuildings_Garages;
    ANYDTO.PCR_OurBuildings_Sheds = Modelobj.PCR_OurBuildings_Sheds;
    ANYDTO.PCR_OurBuildings_Caports = Modelobj.PCR_OurBuildings_Caports;
    ANYDTO.PCR_OurBuildings_Bams = Modelobj.PCR_OurBuildings_Bams;
    ANYDTO.PCR_OurBuildings_Pool_House = Modelobj.PCR_OurBuildings_Pool_House;
    ANYDTO.PCR_OurBuildings_Other_Building =
      Modelobj.PCR_OurBuildings_Other_Building;
    ANYDTO.PCR_Prop_Garage = Modelobj.PCR_Prop_Garage;
    ANYDTO.PCR_Prop_Condo_Association_Property =
      Modelobj.PCR_Prop_Condo_Association_Property;
    ANYDTO.PCR_HOA_Name = Modelobj.PCR_HOA_Name;
    ANYDTO.PCR_HOA_Phone = Modelobj.PCR_HOA_Phone;
    ANYDTO.PCR_Prop_No_Of_Unit = Modelobj.PCR_Prop_No_Of_Unit;
    ANYDTO.PCR_Prop_Common_Entry = Modelobj.PCR_Prop_Common_Entry;
    ANYDTO.PCR_Prop_Unit1 = Modelobj.PCR_Prop_Unit1;
    ANYDTO.PCR_Prop_Unit1_Occupied = Modelobj.PCR_Prop_Unit1_Occupied;
    ANYDTO.PCR_Prop_Unit2 = Modelobj.PCR_Prop_Unit2;
    ANYDTO.PCR_Prop_Unit2_Occupied = Modelobj.PCR_Prop_Unit2_Occupied;
    ANYDTO.PCR_Prop_Unit3 = Modelobj.PCR_Prop_Unit3;
    ANYDTO.PCR_Prop_Unit3_Occupied = Modelobj.PCR_Prop_Unit3_Occupied;
    ANYDTO.PCR_Prop_Unit4 = Modelobj.PCR_Prop_Unit4;
    ANYDTO.PCR_Prop_Unit4_Occupied = Modelobj.PCR_Prop_Unit4_Occupied;
    ANYDTO.PCR_Prop_Property_Vacant = Modelobj.PCR_Prop_Property_Vacant;
    ANYDTO.PCR_Prop_Occupancy_Verified_Contact_Owner =
      Modelobj.PCR_Prop_Occupancy_Verified_Contact_Owner;
    ANYDTO.PCR_Prop_Occupancy_Verified_Personal_Visible =
      Modelobj.PCR_Prop_Occupancy_Verified_Personal_Visible;
    ANYDTO.PCR_Prop_Occupancy_Verified_Neighbor =
      Modelobj.PCR_Prop_Occupancy_Verified_Neighbor;
    ANYDTO.PCR_Prop_Occupancy_Verified_Utilities_On =
      Modelobj.PCR_Prop_Occupancy_Verified_Utilities_On;
    ANYDTO.PCR_Prop_Occupancy_Verified_Visual =
      Modelobj.PCR_Prop_Occupancy_Verified_Visual;
    ANYDTO.PCR_Prop_Occupancy_Verified_Direct_Con_Tenant =
      Modelobj.PCR_Prop_Occupancy_Verified_Direct_Con_Tenant;
    ANYDTO.PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor =
      Modelobj.PCR_Prop_Occupancy_Verified_Direct_Con_Mortgagor;
    ANYDTO.PCR_Prop_Occupancy_Verified_Direct_Con_Unknown =
      Modelobj.PCR_Prop_Occupancy_Verified_Direct_Con_Unknown;
    ANYDTO.PCR_Prop_Owner_Maintaining_Property =
      Modelobj.PCR_Prop_Owner_Maintaining_Property;
    ANYDTO.PCR_Prop_Other = Modelobj.PCR_Prop_Other;
    ANYDTO.PRC_Prop_IsActive = Modelobj.PRC_Prop_IsActive;
    ANYDTO.PRC_Prop_IsDelete = Modelobj.PRC_Prop_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;

    ANYDTO.PRC_Prop_dateCompleted = Modelobj.PRC_Prop_dateCompleted;
    ANYDTO.PRC_Prop_badAddress = Modelobj.PRC_Prop_badAddress;
    ANYDTO.PRC_Prop_orderCompleted = Modelobj.PRC_Prop_orderCompleted;

    ANYDTO.PCR_Prop_Property_Vacant_Notes =
      Modelobj.PCR_Prop_Property_Vacant_Notes;
    ANYDTO.PCR_Prop_Property = Modelobj.PCR_Prop_Property;
    ANYDTO.PRC_Prop_PropertyVacantBadAddressProvide_dtls = Modelobj.PRC_Prop_PropertyVacantBadAddressProvide_dtls;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Pro_PkeyID != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTx, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGet = this.baseUrl + environment.ClientResult.GetPropertyInfo;

  public GetPropertyInfo(Modelobj: PCRPropertyInfoModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Pro_PkeyID = Modelobj.PCR_Pro_PkeyID;
    ANYDTO.PCR_Prop_WO_ID = Modelobj.PCR_Prop_WO_ID;
    ANYDTO.Type = 3;
    // let headers = new HttpHeaders({ "Content-Type": "application/json" });
    // headers = headers.append('Auhtorization', 'Bearer ' + `${this.token}`);
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOSTJson =
    this.baseUrl + environment.ClientResult.PostPCRFiveBrother;

  public FiveBroDataPost(Modelobj: PCR_FiveBrotherModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_FiveBro_id = Modelobj.PCR_FiveBro_id;
    ANYDTO.PCR_FiveBro_Json = Modelobj.PCR_FiveBro_Json;
    ANYDTO.PCR_FiveBro_Valtype = Modelobj.PCR_FiveBro_Valtype;
    ANYDTO.PCR_FiveBro_WO_ID = Modelobj.PCR_FiveBro_WO_ID;

    ANYDTO.PCR_FiveBro_IsActive = Modelobj.PCR_FiveBro_IsActive;
    //ANYDTO.PCR_FiveBro_IsDelete = Modelobj.PCR_FiveBro_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOSTVoi = this.baseUrl + environment.ClientResult.PostPCRViolation;

  public VoilationDataPost(Modelobj: PCR_Violation_Model) {
    // debugger
    let ANYDTO: any = {};
    ANYDTO.PCR_Violation_pkeyId = Modelobj.PCR_Violation_pkeyId;
    ANYDTO.PCR_Violation_MasterID = Modelobj.PCR_Violation_MasterID;
    ANYDTO.PCR_Violation_WO_ID = Modelobj.PCR_Violation_WO_ID;
    ANYDTO.PCR_Violation_ValType = Modelobj.PCR_Violation_ValType;
    ANYDTO.PCR_Violation_Any_Citation = Modelobj.PCR_Violation_Any_Citation;
    ANYDTO.PCR_Violation_Describe_Citation =
      Modelobj.PCR_Violation_Describe_Citation;
    ANYDTO.PCR_Violation_High_Vandalism_Area =
      Modelobj.PCR_Violation_High_Vandalism_Area;
    ANYDTO.PCR_Violation_Describe_High_Vandalism_Reason =
      Modelobj.PCR_Violation_Describe_High_Vandalism_Reason;
    ANYDTO.PCR_Violation_Any_Unusual_Circumstances =
      Modelobj.PCR_Violation_Any_Unusual_Circumstances;
    ANYDTO.PCR_Violation_Attached_Proof_Path =
      Modelobj.PCR_Violation_Attached_Proof_Path;
    ANYDTO.PCR_Violation_Attached_Proof_Size =
      Modelobj.PCR_Violation_Attached_Proof_Size;
    ANYDTO.PCR_Violation_Describe = Modelobj.PCR_Violation_Describe;
    ANYDTO.PCR_Violation_Attached_NoticesPosted_FilePath = Modelobj.PCR_Violation_Attached_NoticesPosted_FilePath
    ANYDTO.PCR_Violation_Attached_NoticesPosted_FileName = Modelobj.PCR_Violation_Attached_NoticesPosted_FileName
    ANYDTO.PCR_Violation_IsActive = Modelobj.PCR_Violation_IsActive;
    ANYDTO.PCR_Violation_IsDelete = Modelobj.PCR_Violation_IsDelete;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId =Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Violation_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTVoi, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetVio = this.baseUrl + environment.ClientResult.GetPCRViolation;

  public GetViolation(Modelobj: PCR_Violation_Model) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Violation_pkeyId = Modelobj.PCR_Violation_pkeyId;
    ANYDTO.PCR_Violation_WO_ID = Modelobj.PCR_Violation_WO_ID;
    ANYDTO.Type = 3;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetVio, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOSTJSuc = this.baseUrl + environment.ClientResult.PostPCRSecuring;

  public SecurityDataPost(Modelobj: PCR_Securing_Model) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Securing_pkeyId = Modelobj.PCR_Securing_pkeyId;
    ANYDTO.PCR_Securing_MasterId = Modelobj.PCR_Securing_MasterId;
    ANYDTO.PCR_Securing_WO_Id = Modelobj.PCR_Securing_WO_Id;
    ANYDTO.PCR_Securing_ValType = Modelobj.PCR_Securing_ValType;
    ANYDTO.PCR_Securing_On_Arrival = Modelobj.PCR_Securing_On_Arrival;
    ANYDTO.PCR_Securing_On_Departure = Modelobj.PCR_Securing_On_Departure;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Missing_Doors =
      Modelobj.PCR_Securing_Not_Secure_Reason_Missing_Doors;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Door_Open =
      Modelobj.PCR_Securing_Not_Secure_Reason_Door_Open;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Missing_Locks =
      Modelobj.PCR_Securing_Not_Secure_Reason_Missing_Locks;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Broken_Windows =
      Modelobj.PCR_Securing_Not_Secure_Reason_Broken_Windows;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Missing_Window =
      Modelobj.PCR_Securing_Not_Secure_Reason_Missing_Window;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Window_Open =
      Modelobj.PCR_Securing_Not_Secure_Reason_Window_Open;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Broken_Door =
      Modelobj.PCR_Securing_Not_Secure_Reason_Broken_Door;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Bids_Pending =
      Modelobj.PCR_Securing_Not_Secure_Reason_Bids_Pending;
    ANYDTO.PCR_Securing_Not_Secure_Reason_Damage_Locks =
      Modelobj.PCR_Securing_Not_Secure_Reason_Damage_Locks;
    ANYDTO.PCR_Securing_Boarded_Arrival = Modelobj.PCR_Securing_Boarded_Arrival;
    ANYDTO.PCR_Securing_No_Of_First_Floor_Window =
      Modelobj.PCR_Securing_No_Of_First_Floor_Window;
    ANYDTO.PCR_Securing_More_Boarding_Still_Required_OR_Not =
      Modelobj.PCR_Securing_More_Boarding_Still_Required_OR_Not;
    ANYDTO.PCR_Securing_IsActive = Modelobj.PCR_Securing_IsActive;
    ANYDTO.PCR_Securing_IsDelete = Modelobj.PCR_Securing_IsDelete;

    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Doors;
    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Door_Open =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Door_Open;
    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Locks;
    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Broken_Windows;
    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Missing_Window =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Missing_Window;
    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Broken_Door =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Broken_Door;
    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Bids_Pending;
    ANYDTO.PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks =
      Modelobj.PCR_Securing_Depart_Not_Secure_Reason_Damage_Locks;

    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    ANYDTO.Type = 1;
    if (Modelobj.PCR_Securing_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTJSuc, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetSecur = this.baseUrl + environment.ClientResult.GetPCRSecuring;

  public GetSecuring(Modelobj: PCR_Securing_Model) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Securing_pkeyId = Modelobj.PCR_Securing_pkeyId;
    ANYDTO.PCR_Securing_WO_Id = Modelobj.PCR_Securing_WO_Id;
    ANYDTO.Type = 3;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetSecur, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlpost = this.baseUrl + environment.ClientResult.PostPCRAppliance;

  public PostAppliance(Modelobj: PCR_ApplianceModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Appliance_pkeyId = Modelobj.PCR_Appliance_pkeyId;
    ANYDTO.PCR_Appliance_MasterId = Modelobj.PCR_Appliance_MasterId;
    ANYDTO.PCR_Appliance_WO_Id = Modelobj.PCR_Appliance_WO_Id;
    ANYDTO.PCR_Appliance_ValType = Modelobj.PCR_Appliance_ValType;
    ANYDTO.PCR_Appliance_Refrigerator = Modelobj.PCR_Appliance_Refrigerator;
    ANYDTO.PCR_Appliance_Stove = Modelobj.PCR_Appliance_Stove;
    ANYDTO.PCR_Appliance_Stove_Wall_Oven =
      Modelobj.PCR_Appliance_Stove_Wall_Oven;
    ANYDTO.PCR_Appliance_Dishwasher = Modelobj.PCR_Appliance_Dishwasher;
    ANYDTO.PCR_Appliance_Build_In_Microwave =
      Modelobj.PCR_Appliance_Build_In_Microwave;
    ANYDTO.PCR_Appliance_Dryer = Modelobj.PCR_Appliance_Dryer;
    ANYDTO.PCR_Appliance_Washer = Modelobj.PCR_Appliance_Washer;
    ANYDTO.PCR_Appliance_Air_Conditioner =
      Modelobj.PCR_Appliance_Air_Conditioner;
    ANYDTO.PCR_Appliance_Hot_Water_Heater =
      Modelobj.PCR_Appliance_Hot_Water_Heater;
    ANYDTO.PCR_Appliance_Dehumidifier = Modelobj.PCR_Appliance_Dehumidifier;
    ANYDTO.PCR_Appliance_Furnace = Modelobj.PCR_Appliance_Furnace;
    ANYDTO.PCR_Appliance_Water_Softener = Modelobj.PCR_Appliance_Water_Softener;
    ANYDTO.PCR_Appliance_Boiler = Modelobj.PCR_Appliance_Boiler;
    ANYDTO.PCR_Appliance_IsActive = Modelobj.PCR_Appliance_IsActive;
    ANYDTO.PCR_Appliance_IsDelete = Modelobj.PCR_Appliance_IsDelete;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Appliance_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlpost, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetApplience =
    this.baseUrl + environment.ClientResult.GetPCRAppliance;

  public GetApplience(Modelobj: PCR_ApplianceModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Appliance_pkeyId = Modelobj.PCR_Appliance_pkeyId;
    ANYDTO.PCR_Appliance_WO_Id = Modelobj.PCR_Appliance_WO_Id;
    ANYDTO.Type = 3;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetApplience, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //  wintrelizetion

  private apiUrlPOSTwJson =
    this.baseUrl + environment.ClientResult.PostPCRWinterization;

  public WinterizationDataPost(Modelobj: PCR_WinterizationModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Winterization_pkeyId = Modelobj.PCR_Winterization_pkeyId;
    ANYDTO.PCR_Winterization_MasterId = Modelobj.PCR_Winterization_MasterId;
    ANYDTO.PCR_Winterization_WO_Id = Modelobj.PCR_Winterization_WO_Id;
    ANYDTO.PCR_Winterization_ValType = Modelobj.PCR_Winterization_ValType;
    ANYDTO.PCR_Winterization_Upon_Arrival =
      Modelobj.PCR_Winterization_Upon_Arrival;
    ANYDTO.PCR_Winterization_Compleate_This_Order_Yes =
      Modelobj.PCR_Winterization_Compleate_This_Order_Yes;
    ANYDTO.PCR_Winterization_Upon_Arrival_Never_Winterized =
      Modelobj.PCR_Winterization_Upon_Arrival_Never_Winterized;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Allowable =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Allowable;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Upon_Arrival;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Out_Season =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Out_Season;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_TernedOff =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_TernedOff;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Prop_Damaged;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_Damage;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Plumbing_IsMissing;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_AllReady_Winterized;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Common_Water_Line;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Maintaining_Utilities;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Other =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Other;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text;
    ANYDTO.PCR_Winterization_Heating_System =
      Modelobj.PCR_Winterization_Heating_System;
    ANYDTO.PCR_Winterization_Posted_Signs =
      Modelobj.PCR_Winterization_Posted_Signs;
    ANYDTO.PCR_Winterization_Common_Water_Line =
      Modelobj.PCR_Winterization_Common_Water_Line;
    ANYDTO.PCR_Winterization_AntiFreeze_Toilet =
      Modelobj.PCR_Winterization_AntiFreeze_Toilet;
    ANYDTO.PCR_Winterization_Water_Heater_Drained =
      Modelobj.PCR_Winterization_Water_Heater_Drained;
    ANYDTO.PCR_Winterization_Water_Off_At_Curb =
      Modelobj.PCR_Winterization_Water_Off_At_Curb;
    ANYDTO.PCR_Winterization_Blown_All_Lines =
      Modelobj.PCR_Winterization_Blown_All_Lines;
    ANYDTO.PCR_Winterization_System_Held_Pressure =
      Modelobj.PCR_Winterization_System_Held_Pressure;

    ANYDTO.PCR_Winterization_Disconnected_Water_Meter_Yes =
      Modelobj.PCR_Winterization_Disconnected_Water_Meter_Yes;
    ANYDTO.PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve =
      Modelobj.PCR_Winterization_Disconnected_Water_Meter_No_Shut_Valve;
    ANYDTO.PCR_Winterization_Disconnected_Water_Meter_No_Common_Water_Line =
      Modelobj.PCR_Winterization_Disconnected_Water_Meter_No_Common_Water_Line;
    ANYDTO.PCR_Winterization_Disconnected_Water_Meter_No_Unable_To_Locate =
      Modelobj.PCR_Winterization_Disconnected_Water_Meter_No_Unable_To_Locate;
    ANYDTO.PCR_Winterization_Disconnected_Water_Meter_No_Prohibited_Ordinance =
      Modelobj.PCR_Winterization_Disconnected_Water_Meter_No_Prohibited_Ordinance;
    ANYDTO.PCR_Winterization_Disconnected_Water_Meter_No_Others =
      Modelobj.PCR_Winterization_Disconnected_Water_Meter_No_Others;
    ANYDTO.PCR_Winterization_Radiant_Heat_Boiler_Drained =
      Modelobj.PCR_Winterization_Radiant_Heat_Boiler_Drained;
    ANYDTO.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened =
      Modelobj.PCR_Winterization_Radiant_Heat_Zone_Valves_Opened;
    ANYDTO.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler =
      Modelobj.PCR_Winterization_Radiant_Heat_AntiFreeze_Boiler;
    ANYDTO.PCR_Winterization_If_Well_System_Breaker_Off =
      Modelobj.PCR_Winterization_If_Well_System_Breaker_Off;
    ANYDTO.PCR_Winterization_If_Well_System_Pressure_Tank_Drained =
      Modelobj.PCR_Winterization_If_Well_System_Pressure_Tank_Drained;
    ANYDTO.PCR_Winterization_If_Well_System_Supply_Line_Disconnect =
      Modelobj.PCR_Winterization_If_Well_System_Supply_Line_Disconnect;
    ANYDTO.PCR_Winterization_Interior_Main_Valve_Shut_Off =
      Modelobj.PCR_Winterization_Interior_Main_Valve_Shut_Off;
    ANYDTO.PCR_Winterization_Interior_Main_Valve_Reason =
      Modelobj.PCR_Winterization_Interior_Main_Valve_Reason;
    ANYDTO.PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System =
      Modelobj.PCR_Winterization_Interior_Main_Valve_Fire_Suppression_System;
    ANYDTO.PCR_Winterization_To_Bid = Modelobj.PCR_Winterization_To_Bid;
    ANYDTO.PCR_Winterization_To_Bit_Text =
      Modelobj.PCR_Winterization_To_Bit_Text;
    ANYDTO.PCR_Winterization_Description =
      Modelobj.PCR_Winterization_Description;
    ANYDTO.PCR_Winterization_System_Type =
      Modelobj.PCR_Winterization_System_Type;
    ANYDTO.PCR_Winterization_Reason = Modelobj.PCR_Winterization_Reason;
    ANYDTO.PCR_Winterization_Amount = Modelobj.PCR_Winterization_Amount;
    ANYDTO.PCR_Winterization_Winterize_Men =
      Modelobj.PCR_Winterization_Winterize_Men;
    ANYDTO.PCR_Winterization_Winterize_Hrs =
      Modelobj.PCR_Winterization_Winterize_Hrs;

    ANYDTO.PCR_Winterization_IsActive = Modelobj.PCR_Winterization_IsActive;
    ANYDTO.PCR_FiveBro_IsDelete = Modelobj.PCR_Winterization_IsDelete;
    ANYDTO.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text =
      Modelobj.PCR_Winterization_Reason_Wint_NotCompleted_Other_Text;
    ANYDTO.PCR_Winterization_Disconnected_Water_Meter_Other_Text =
      Modelobj.PCR_Winterization_Disconnected_Water_Meter_Other_Text;
    ANYDTO.PCR_Winterization_TextArea_Comment =
      Modelobj.PCR_Winterization_TextArea_Comment;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Winterization_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTwJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetwJson =
    this.baseUrl + environment.ClientResult.GetPCRWinterization;

  public GetWinterizationDetails(Modelobj: PCR_WinterizationModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Winterization_pkeyId = Modelobj.PCR_Winterization_pkeyId;
    ANYDTO.PCR_Winterization_WO_Id = Modelobj.PCR_Winterization_WO_Id;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetwJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlpostyard = this.baseUrl + environment.ClientResult.PostPCRYard;

  public postyard(Modelobj: PCR_Yard_MaintenanceModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Yard_Maintenance_pkeyId = Modelobj.PCR_Yard_Maintenance_pkeyId;
    ANYDTO.PCR_Yard_Maintenance_MasterId =
      Modelobj.PCR_Yard_Maintenance_MasterId;
    ANYDTO.PCR_Yard_Maintenance_WO_Id = Modelobj.PCR_Yard_Maintenance_WO_Id;
    ANYDTO.PCR_Yard_Maintenance_ValType = Modelobj.PCR_Yard_Maintenance_ValType;

    ANYDTO.PCR_Yard_Maintenance_Grass_Cut_Completed =
      Modelobj.PCR_Yard_Maintenance_Grass_Cut_Completed;
    ANYDTO.PCR_Yard_Maintenance_Lot_Size =
      Modelobj.PCR_Yard_Maintenance_Lot_Size;
    ANYDTO.PCR_Yard_Maintenance_Cuttable_Area =
      Modelobj.PCR_Yard_Maintenance_Cuttable_Area;
    ANYDTO.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght =
      Modelobj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Lenght;
    ANYDTO.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width =
      Modelobj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Width;
    ANYDTO.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height =
      Modelobj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Lot_Dimension_Height;
    ANYDTO.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut =
      Modelobj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Bid_For_Inital_Cut;
    ANYDTO.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut =
      Modelobj.PCR_Yard_Maintenance_Bit_To_Cut_Grass_Reason_For_Inital_Cut;
    ANYDTO.PCR_Yard_Maintenance_Bid_Recut =
      Modelobj.PCR_Yard_Maintenance_Bid_Recut;
    ANYDTO.PCR_Yard_Maintenance_Reason_For_Recut =
      Modelobj.PCR_Yard_Maintenance_Reason_For_Recut;
    ANYDTO.PCR_Yard_Maintenance_Trees_Cut_Back_Order =
      Modelobj.PCR_Yard_Maintenance_Trees_Cut_Back_Order;
    ANYDTO.PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House =
      Modelobj.PCR_Yard_Maintenance_Arrival_Shrubs_Touching_House;
    ANYDTO.PCR_Yard_Maintenance_Arrival_Trees_Touching_House =
      Modelobj.PCR_Yard_Maintenance_Arrival_Trees_Touching_House;
    ANYDTO.PCR_Yard_Maintenance_Depature_Trees =
      Modelobj.PCR_Yard_Maintenance_Depature_Trees;
    ANYDTO.PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines =
      Modelobj.PCR_Yard_Maintenance_Were_Trimmed_Insurer_Guidlines;

    ANYDTO.PCR_Yard_Maintenance_Grass_Maintained_No =
      Modelobj.PCR_Yard_Maintenance_Grass_Maintained_No;

    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Length;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Width;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Dimensions_Height;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Quantity;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Unit_Price;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Bid_Amount;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Location =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Location;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_House;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Touching_Other_Structure;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Within_Street_View;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Reasons_Affecting_Fencing;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Causing_Damage;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Shrubs_Describe =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Shrubs_Describe;

    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Length;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Width;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Dimensions_Height;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Quantity =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Quantity;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Unit_Price;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Bid_Amount;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Location =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Location;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_House;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Touching_Other_Structure;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Within_Street_View;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Reasons_Affecting_Fencing;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Causing_Damage;
    ANYDTO.PCR_Yard_Maintenance_Bid_To_Trim_Describe =
      Modelobj.PCR_Yard_Maintenance_Bid_To_Trim_Describe;

    ANYDTO.PCR_Yard_Maintenance_IsActive =
      Modelobj.PCR_Yard_Maintenance_IsActive;
    ANYDTO.PCR_Yard_Maintenance_IsDelete =
      Modelobj.PCR_Yard_Maintenance_IsDelete;
      ANYDTO.PCR_Yard_Grass_LotSize =
      Modelobj.PCR_Yard_Grass_LotSize
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Yard_Maintenance_pkeyId != 0) {
      ANYDTO.Type = 2;
    }
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlpostyard, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetYard = this.baseUrl + environment.ClientResult.GetPCRYard;

  public GetYardMaintain(Modelobj: PCR_Yard_MaintenanceModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Yard_Maintenance_pkeyId = Modelobj.PCR_Yard_Maintenance_pkeyId;
    ANYDTO.PCR_Yard_Maintenance_WO_Id = Modelobj.PCR_Yard_Maintenance_WO_Id;
    ANYDTO.Type = 3;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetYard, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // pcr pool

  private apiUrlPOSTpJson = this.baseUrl + environment.ClientResult.PostPCRPool;

  public PoolDataPost(Modelobj: PCR_PoolModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Pool_pkeyId = Modelobj.PCR_Pool_pkeyId;
    ANYDTO.PCR_Pool_MasterId = Modelobj.PCR_Pool_MasterId;
    ANYDTO.PCR_Pool_WO_Id = Modelobj.PCR_Pool_WO_Id;
    ANYDTO.PCR_Pool_ValType = Modelobj.PCR_Pool_ValType;
    ANYDTO.PCR_Pool_Info_Pool_Present = Modelobj.PCR_Pool_Info_Pool_Present;
    ANYDTO.PCR_Pool_Diameter_Ft = Modelobj.PCR_Pool_Diameter_Ft;
    ANYDTO.PCR_Pool_Length_Ft = Modelobj.PCR_Pool_Length_Ft;
    ANYDTO.PCR_Pool_Width_Ft = Modelobj.PCR_Pool_Width_Ft;
    ANYDTO.PCR_Pool_Condition_Good = Modelobj.PCR_Pool_Condition_Good;
    ANYDTO.PCR_Pool_Type_InGround = Modelobj.PCR_Pool_Type_InGround;
    ANYDTO.PCR_Pool_Secure_On_This_Order =
      Modelobj.PCR_Pool_Secure_On_This_Order;
    ANYDTO.PCR_Pool_Is_There_Fence = Modelobj.PCR_Pool_Is_There_Fence;
    ANYDTO.PCR_Pool_Is_It_Locked = Modelobj.PCR_Pool_Is_It_Locked;
    ANYDTO.PCR_Pool_Water_Level_Full = Modelobj.PCR_Pool_Water_Level_Full;
    ANYDTO.PCR_Pool_Did_You_Drain_It = Modelobj.PCR_Pool_Did_You_Drain_It;
    ANYDTO.PCR_Pool_Dismantled_Removed = Modelobj.PCR_Pool_Dismantled_Removed;
    ANYDTO.PCR_Pool_Is_There_Depression_Left =
      Modelobj.PCR_Pool_Is_There_Depression_Left;
    ANYDTO.PCR_Pool_Secured_Per_Guidelines =
      Modelobj.PCR_Pool_Secured_Per_Guidelines;
    ANYDTO.PCR_Pool_Is_The_Pool_Converted_Prevents_Entry =
      Modelobj.PCR_Pool_Is_The_Pool_Converted_Prevents_Entry;
    ANYDTO.PCR_Pool_Hot_Tub_Present = Modelobj.PCR_Pool_Hot_Tub_Present;
    ANYDTO.PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover =
      Modelobj.PCR_Pool_Bids_Drain_Shock_Install_Safety_Cover;
    ANYDTO.PCR_Pool_Bid_To_Install_Safety_Cover =
      Modelobj.PCR_Pool_Bid_To_Install_Safety_Cover;
    ANYDTO.PCR_Pool_Bid_To_Drain = Modelobj.PCR_Pool_Bid_To_Drain;
    ANYDTO.PCR_Pool_Bid_To_Dismantle = Modelobj.PCR_Pool_Bid_To_Dismantle;
    ANYDTO.PCR_Pool_Drain_Remove = Modelobj.PCR_Pool_Drain_Remove;
    ANYDTO.PCR_Pool_Bid_To_Fill_Hole = Modelobj.PCR_Pool_Bid_To_Fill_Hole;
    ANYDTO.PCR_Pool_Size_Of_Hole = Modelobj.PCR_Pool_Size_Of_Hole;
    ANYDTO.PCR_Pool_Size_Of_Hole = Modelobj.PCR_Pool_Size_Of_Hole;
    ANYDTO.PCR_Pool_Cubic_Yds_Of_Dirt = Modelobj.PCR_Pool_Cubic_Yds_Of_Dirt;
    ANYDTO.PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers =
      Modelobj.PCR_Pool_Secure_This_Order_No_Secure_By_FiveBrothers;
    ANYDTO.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained =
      Modelobj.PCR_Pool_Hot_Tub_Present_Yes_Covered_Drained;
    ANYDTO.PCR_Pool_Hot_Tub_Did_You_Secure =
      Modelobj.PCR_Pool_Hot_Tub_Did_You_Secure;
    ANYDTO.PCR_Pool_Hot_Tub_Bids_Diameter_Ft =
      Modelobj.PCR_Pool_Hot_Tub_Bids_Diameter_Ft;
    ANYDTO.PCR_Pool_Hot_Tub_Bids_Length_Ft =
      Modelobj.PCR_Pool_Hot_Tub_Bids_Length_Ft;
    ANYDTO.PCR_Pool_Hot_Tub_Bids_Width_Ft =
      Modelobj.PCR_Pool_Hot_Tub_Bids_Width_Ft;
    ANYDTO.PCR_Pool_Hot_Tub_Bids_Bid_To_Drain =
      Modelobj.PCR_Pool_Hot_Tub_Bids_Bid_To_Drain;
    ANYDTO.PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover =
      Modelobj.PCR_Pool_Hot_Tub_Bids_Bit_To_Install_Cover;
    ANYDTO.PCR_Pool_Hot_Tub_Bids_Drain_Secure =
      Modelobj.PCR_Pool_Hot_Tub_Bids_Drain_Secure;
    ANYDTO.PCR_Pool_IsActive = true;
    ANYDTO.PCR_Pool_IsDelete = false;

    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Pool_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTpJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetpJson = this.baseUrl + environment.ClientResult.GetPCRPool;

  public GetPcrPoolDetails(Modelobj: PCR_PoolModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Pool_pkeyId = Modelobj.PCR_Pool_pkeyId;
    ANYDTO.PCR_Pool_WO_Id = Modelobj.PCR_Pool_WO_Id;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetpJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlpostdebris = this.baseUrl + environment.ClientResult.PostPCRDebris;

  public postdebris(Modelobj: PCR_DebrisModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Debris_pkeyId = Modelobj.PCR_Debris_pkeyId;
    ANYDTO.PCR_Debris_pkeyId = Modelobj.PCR_Debris_pkeyId;
    ANYDTO.PCR_Debris_Master_Id = Modelobj.PCR_Debris_Master_Id;
    ANYDTO.PCR_Debris_WO_Id = Modelobj.PCR_Debris_WO_Id;
    ANYDTO.PCR_Debris_ValType = Modelobj.PCR_Debris_ValType;

    ANYDTO.PCR_Debris_Remove_Any_Interior_Debris =
      Modelobj.PCR_Debris_Remove_Any_Interior_Debris;
    ANYDTO.PCR_Debris_Is_There_Interior_Debris_Present =
      Modelobj.PCR_Debris_Is_There_Interior_Debris_Present;
    ANYDTO.PCR_Debris_Describe = Modelobj.PCR_Debris_Describe;
    ANYDTO.PCR_Debris_Cubic_Yards = Modelobj.PCR_Debris_Cubic_Yards;

    ANYDTO.PCR_Debris_Broom_Swept_Condition =
      Modelobj.PCR_Debris_Broom_Swept_Condition;
    ANYDTO.PCR_Debris_Broom_Swept_Condition_Describe =
      Modelobj.PCR_Debris_Broom_Swept_Condition_Describe;

    ANYDTO.PCR_Debris_Remove_Exterior_Debris =
      Modelobj.PCR_Debris_Remove_Exterior_Debris;
    ANYDTO.PCR_Debris_Exterior_Debris_Present =
      Modelobj.PCR_Debris_Exterior_Debris_Present;

    ANYDTO.PCR_Debris_Exterior_Debris_Describe =
      Modelobj.PCR_Debris_Exterior_Debris_Describe;
    ANYDTO.PCR_Debris_Exterior_Debris_Cubic_Yard =
      Modelobj.PCR_Debris_Exterior_Debris_Cubic_Yard;

    ANYDTO.PCR_Debris_Exterior_Debris_Visible_From_Street =
      Modelobj.PCR_Debris_Exterior_Debris_Visible_From_Street;
    ANYDTO.PCR_Debris_Exterior_On_The_Lawn =
      Modelobj.PCR_Debris_Exterior_On_The_Lawn;
    ANYDTO.PCR_Debris_Exterior_Vehicles_Present =
      Modelobj.PCR_Debris_Exterior_Vehicles_Present;
    ANYDTO.PCR_Debris_Exterior_Vehicles_Present_Describe =
      Modelobj.PCR_Debris_Exterior_Vehicles_Present_Describe;

    ANYDTO.PCR_Debris_Dump_Recipt_Name = Modelobj.PCR_Debris_Dump_Recipt_Name;
    ANYDTO.PCR_Debris_Dump_Recipt_Address =
      Modelobj.PCR_Debris_Dump_Recipt_Address;
    ANYDTO.PCR_Debris_Dump_Recipt_Phone = Modelobj.PCR_Debris_Dump_Recipt_Phone;
    ANYDTO.PCR_Debris_Dump_Recipt_Desc_what_was_Dump =
      Modelobj.PCR_Debris_Dump_Recipt_Desc_what_was_Dump;
    ANYDTO.PCR_Debris_Dump_Recipt_Means_Of_Disposal =
      Modelobj.PCR_Debris_Dump_Recipt_Means_Of_Disposal;

    ANYDTO.PCR_Debris_InteriorHazards_Health_Present =
      Modelobj.PCR_Debris_InteriorHazards_Health_Present;
    ANYDTO.PCR_Debris_InteriorHazards_Health_Present_Describe =
      Modelobj.PCR_Debris_InteriorHazards_Health_Present_Describe;
    ANYDTO.PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard =
      Modelobj.PCR_Debris_InteriorHazards_Health_Present_Cubic_Yard;

    ANYDTO.PCR_Debris_Exterior_Hazards_Health_Present =
      Modelobj.PCR_Debris_Exterior_Hazards_Health_Present;
    ANYDTO.PCR_Debris_Exterior_Hazards_Health_Present_Describe =
      Modelobj.PCR_Debris_Exterior_Hazards_Health_Present_Describe;
    ANYDTO.PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards =
      Modelobj.PCR_Debris_Exterior_Hazards_Health_PresentCubic_Yards;
    ANYDTO.PCR_Debris_IsActive = Modelobj.PCR_Debris_IsActive;
    ANYDTO.PCR_Debris_IsDelete = Modelobj.PCR_Debris_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Debris_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlpostdebris, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGETdebris = this.baseUrl + environment.ClientResult.GetPCRDebris;

  public GETdebris(Modelobj: PCR_DebrisModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Debris_pkeyId = Modelobj.PCR_Debris_pkeyId;
    ANYDTO.PCR_Debris_WO_Id = Modelobj.PCR_Debris_WO_Id;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGETdebris, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlpostUtilities =
    this.baseUrl + environment.ClientResult.PostPCRUtilities;

  public PostUtilities(Modelobj: PCR_UtilitiesModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Utilities_pkeyId = Modelobj.PCR_Utilities_pkeyId;
    ANYDTO.PCR_Utilities_MasterId = Modelobj.PCR_Utilities_MasterId;
    ANYDTO.PCR_Utilities_WO_Id = Modelobj.PCR_Utilities_WO_Id;
    ANYDTO.PCR_Utilities_ValType = Modelobj.PCR_Utilities_ValType;

    ANYDTO.PCR_Utilities_On_Arrival_Water =
      Modelobj.PCR_Utilities_On_Arrival_Water;
    ANYDTO.PCR_Utilities_On_Departure_Water =
      Modelobj.PCR_Utilities_On_Departure_Water;

    ANYDTO.PCR_Utilities_On_Arrival_Gas = Modelobj.PCR_Utilities_On_Arrival_Gas;
    ANYDTO.PCR_Utilities_On_Departure_Gas =
      Modelobj.PCR_Utilities_On_Departure_Gas;

    ANYDTO.PCR_Utilities_On_Arrival_Electric =
      Modelobj.PCR_Utilities_On_Arrival_Electric;
    ANYDTO.PCR_Utilities_On_Departure_Electric =
      Modelobj.PCR_Utilities_On_Departure_Electric;

    ANYDTO.PCR_Utilities_Sump_Pump = Modelobj.PCR_Utilities_Sump_Pump;
    ANYDTO.PCR_Utilities_Sump_Pump_Commend =
      Modelobj.PCR_Utilities_Sump_Pump_Commend;
    ANYDTO.PCR_Utilities_Sump_Pump_Sump_Test =
      Modelobj.PCR_Utilities_Sump_Pump_Sump_Test;

    ANYDTO.PCR_Utilities_Main_Breaker_And_Operational =
      Modelobj.PCR_Utilities_Main_Breaker_And_Operational;
    ANYDTO.PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace =
      Modelobj.PCR_Utilities_Sump_Pump_Missing_Bid_To_Replace;

    ANYDTO.PCR_Utilities_Transferred_Activated =
      Modelobj.PCR_Utilities_Transferred_Activated;

    ANYDTO.PCR_Utilities_Reason_UtilitiesNot_Transferred =
      Modelobj.PCR_Utilities_Reason_UtilitiesNot_Transferred;
    ANYDTO.PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes =
      Modelobj.PCR_Utilities_Reason_UtilitiesNot_Transferred_Other_Notes;

    ANYDTO.PCR_Utilities_Transferred_Water_Co_Name =
      Modelobj.PCR_Utilities_Transferred_Water_Co_Name;
    ANYDTO.PCR_Utilities_Transferred_Water_Address =
      Modelobj.PCR_Utilities_Transferred_Water_Address;
    ANYDTO.PCR_Utilities_Transferred_Water_Phone =
      Modelobj.PCR_Utilities_Transferred_Water_Phone;
    ANYDTO.PCR_Utilities_Transferred_Water_Acct =
      Modelobj.PCR_Utilities_Transferred_Water_Acct;

    ANYDTO.PCR_Utilities_Transferred_Gas_Co_Name =
      Modelobj.PCR_Utilities_Transferred_Gas_Co_Name;
    ANYDTO.PCR_Utilities_Transferred_Gas_Address =
      Modelobj.PCR_Utilities_Transferred_Gas_Address;
    ANYDTO.PCR_Utilities_Transferred_Gas_Phone =
      Modelobj.PCR_Utilities_Transferred_Gas_Phone;
    ANYDTO.PCR_Utilities_Transferred_Gas_Acct =
      Modelobj.PCR_Utilities_Transferred_Gas_Acct;

    ANYDTO.PCR_Utilities_Transferred_Electric_Co_Name =
      Modelobj.PCR_Utilities_Transferred_Electric_Co_Name;
    ANYDTO.PCR_Utilities_Transferred_Electric_Address =
      Modelobj.PCR_Utilities_Transferred_Electric_Address;
    ANYDTO.PCR_Utilities_Transferred_Electric_Phone =
      Modelobj.PCR_Utilities_Transferred_Electric_Phone;
    ANYDTO.PCR_Utilities_Transferred_Electric_Acct =
      Modelobj.PCR_Utilities_Transferred_Electric_Acct;

    ANYDTO.PCR_Utilities_IsActive = Modelobj.PCR_Utilities_IsActive;
    ANYDTO.PCR_Utilities_IsDelete = Modelobj.PCR_Utilities_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Utilities_pkeyId != 0) {
      ANYDTO.Type = 2;
    }
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlpostUtilities, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetUtilities =
    this.baseUrl + environment.ClientResult.GetPCRUtilities;

  public GETUtilities(Modelobj: PCR_UtilitiesModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Utilities_pkeyId = Modelobj.PCR_Utilities_pkeyId;
    ANYDTO.PCR_Utilities_WO_Id = Modelobj.PCR_Utilities_WO_Id;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetUtilities, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // PCR Add Damage

  private apiUrlPOSTdSuc = this.baseUrl + environment.ClientResult.PostPCRDamage;

  public PCRDamageDataPost(Modelobj: PCR_Damage_MasterModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Damage_pkeyId = Modelobj.PCR_Damage_pkeyId;
    ANYDTO.PCR_Damage_MasterId = Modelobj.PCR_Damage_MasterId;
    ANYDTO.PCR_Damage_WO_Id = Modelobj.PCR_Damage_WO_Id;
    ANYDTO.PCR_Damage_ValType = Modelobj.PCR_Damage_ValType;
    ANYDTO.PCR_Damage_Fire_Smoke_Damage_Yes =
      Modelobj.PCR_Damage_Fire_Smoke_Damage_Yes;
    ANYDTO.PCR_Damage_Mortgagor_Neglect_Yes =
      Modelobj.PCR_Damage_Mortgagor_Neglect_Yes;
    ANYDTO.PCR_Damage_Vandalism_Yes = Modelobj.PCR_Damage_Vandalism_Yes;
    ANYDTO.PCR_Damage_Freeze_Damage_Yes = Modelobj.PCR_Damage_Freeze_Damage_Yes;
    ANYDTO.PCR_Damage_Storm_Damage_Yes = Modelobj.PCR_Damage_Storm_Damage_Yes;
    ANYDTO.PCR_Damage_Flood_Damage_Yes = Modelobj.PCR_Damage_Flood_Damage_Yes;
    ANYDTO.PCR_Damage_Water_Damage_Yes = Modelobj.PCR_Damage_Water_Damage_Yes;
    ANYDTO.PCR_Damage_Wear_And_Tear_Yes = Modelobj.PCR_Damage_Wear_And_Tear_Yes;
    ANYDTO.PCR_Damage_Unfinished_Renovation_Yes =
      Modelobj.PCR_Damage_Unfinished_Renovation_Yes;
    ANYDTO.PCR_Damage_Structural_Damage_Yes =
      Modelobj.PCR_Damage_Structural_Damage_Yes;
    ANYDTO.PCR_Damage_Excessive_Humidty_Yes =
      Modelobj.PCR_Damage_Excessive_Humidty_Yes;
    ANYDTO.PCR_Urgent_Damages_Roof_Leak_Yes =
      Modelobj.PCR_Urgent_Damages_Roof_Leak_Yes;
    ANYDTO.PCR_Urgent_Damages_Roof_Traped_Yes =
      Modelobj.PCR_Urgent_Damages_Roof_Traped_Yes;
    ANYDTO.PCR_Urgent_Damages_Mold_Damage_Yes =
      Modelobj.PCR_Urgent_Damages_Mold_Damage_Yes;
    ANYDTO.PCR_Urgent_Damages_SeePage_Yes =
      Modelobj.PCR_Urgent_Damages_SeePage_Yes;
    ANYDTO.PCR_Urgent_Damages_Flooded_Basement_Yes =
      Modelobj.PCR_Urgent_Damages_Flooded_Basement_Yes;
    ANYDTO.PCR_Urgent_Damages_Foundation_Cracks_Yes =
      Modelobj.PCR_Urgent_Damages_Foundation_Cracks_Yes;
    ANYDTO.PCR_Urgent_Damages_Wet_Carpet_Yes =
      Modelobj.PCR_Urgent_Damages_Wet_Carpet_Yes;
    ANYDTO.PCR_Urgent_Damages_Water_Stains_Yes =
      Modelobj.PCR_Urgent_Damages_Water_Stains_Yes;
    ANYDTO.PCR_Urgent_Damages_Floors_Safety_Yes =
      Modelobj.PCR_Urgent_Damages_Floors_Safety_Yes;
    ANYDTO.PCR_Urgent_Damages_Other_Causing_Damage_Yes =
      Modelobj.PCR_Urgent_Damages_Other_Causing_Damage_Yes;
    ANYDTO.PCR_Urgent_Damages_Other_Safety_Issue_Yes =
      Modelobj.PCR_Urgent_Damages_Other_Safety_Issue_Yes;
    ANYDTO.PCR_System_Damages_HVAC_System_Damage_Yes =
      Modelobj.PCR_System_Damages_HVAC_System_Damage_Yes;
    ANYDTO.PCR_System_Damages_Electric_Damage_Yes =
      Modelobj.PCR_System_Damages_Electric_Damage_Yes;
    ANYDTO.PCR_System_Damages_Plumbing_Damage_Yes =
      Modelobj.PCR_System_Damages_Plumbing_Damage_Yes;
    ANYDTO.PCR_System_Damages_Uncapped_Wire_Yes =
      Modelobj.PCR_System_Damages_Uncapped_Wire_Yes;
    ANYDTO.PCR_Damages_FEMA_Damages_Yes = Modelobj.PCR_Damages_FEMA_Damages_Yes;
    ANYDTO.PCR_Damages_FEMA_Neighborhood_Level_Light =
      Modelobj.PCR_Damages_FEMA_Neighborhood_Level_Light;
    ANYDTO.PCR_Damages_FEMA_Trailer_Present =
      Modelobj.PCR_Damages_FEMA_Trailer_Present;
    ANYDTO.PCR_Damages_FEMA_Property_Level_Light_Moderate =
      Modelobj.PCR_Damages_FEMA_Property_Level_Light_Moderate;
    ANYDTO.PCR_Damages_Property_Habitable =
      Modelobj.PCR_Damages_Property_Habitable;
    ANYDTO.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind =
      Modelobj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Wind;
    ANYDTO.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water =
      Modelobj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Water;
    ANYDTO.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire =
      Modelobj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Fire;
    ANYDTO.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood =
      Modelobj.PCR_Damages_Property_Habitable_FEMA_Damage_Cause_By_Flood;
    ANYDTO.PCR_Damages_FEMA_Damage_Estimate =
      Modelobj.PCR_Damages_FEMA_Damage_Estimate;
    ANYDTO.PCR_Damages_Damage = Modelobj.PCR_Damages_Damage;
    ANYDTO.PCR_Damages_Status = Modelobj.PCR_Damages_Status;
    ANYDTO.PCR_Damages_Cause = Modelobj.PCR_Damages_Cause;
    ANYDTO.PCR_Damages_Int_Ext = Modelobj.PCR_Damages_Int_Ext;
    ANYDTO.PCR_Damages_Building = Modelobj.PCR_Damages_Building;
    ANYDTO.PCR_Damages_Room = Modelobj.PCR_Damages_Room;
    ANYDTO.PCR_Damages_Description = Modelobj.PCR_Damages_Description;
    ANYDTO.PCR_Damages_Qty = Modelobj.PCR_Damages_Qty;
    ANYDTO.PCR_Damages_Estimate = Modelobj.PCR_Damages_Estimate;
    ANYDTO.PCR_Damages_IsActive = true;
    ANYDTO.PCR_Damages_IsDelete = false;

    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Damage_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTdSuc, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // get PCR Damage Data

  private apiUrlGetdaJson = this.baseUrl + environment.ClientResult.GetPCRDamage;

  public GetPcrDamageDetails(Modelobj: PCR_Damage_MasterModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Damage_pkeyId = Modelobj.PCR_Damage_pkeyId;
    ANYDTO.PCR_Damage_WO_Id = Modelobj.PCR_Damage_WO_Id;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetdaJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // pcrdrd

  private apiUrlGetdrdJson =
    this.baseUrl + environment.ClientResult.GetPCRDropDown;

  public GetPcrDRDDetails() {
    let ANYDTO: any = {};

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
     headers = headers.append('Authorization','Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetdrdJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // pcr conveyance save data

  private apiUrlPOSTConuc =
    this.baseUrl + environment.ClientResult.PostPCRConveyance;

  public PCRConveyanceDataPost(Modelobj: PCR_ConveyanceModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Conveyance_pkeyID = Modelobj.PCR_Conveyance_pkeyID;
    ANYDTO.PCR_Conveyance_MasterID = Modelobj.PCR_Conveyance_MasterID;
    ANYDTO.PCR_Conveyance_Wo_ID = Modelobj.PCR_Conveyance_Wo_ID;
    ANYDTO.PCR_Conveyance_ValType = Modelobj.PCR_Conveyance_ValType;
    ANYDTO.PCR_Conveyance_Work_Order_Instruction =
      Modelobj.PCR_Conveyance_Work_Order_Instruction;
    ANYDTO.PCR_Conveyance_Secured_Per_Guidelines =
      Modelobj.PCR_Conveyance_Secured_Per_Guidelines;
    ANYDTO.PCR_Conveyance_Additional_Damage =
      Modelobj.PCR_Conveyance_Additional_Damage;
    ANYDTO.PCR_Conveyance_Bid_On_This_Visit =
      Modelobj.PCR_Conveyance_Bid_On_This_Visit;
    ANYDTO.PCR_Conveyance_Need_Maintenance =
      Modelobj.PCR_Conveyance_Need_Maintenance;
    ANYDTO.PCR_Conveyance_Broom_Swept_Condition =
      Modelobj.PCR_Conveyance_Broom_Swept_Condition;
    ANYDTO.PCR_Conveyance_HUD_Guidelines =
      Modelobj.PCR_Conveyance_HUD_Guidelines;
    ANYDTO.PCR_Conveyance_Accidental_Entry =
      Modelobj.PCR_Conveyance_Accidental_Entry;
    ANYDTO.PCR_Conveyance_Features_Are_Secure =
      Modelobj.PCR_Conveyance_Features_Are_Secure;
    ANYDTO.PCR_Conveyance_In_Place_Operational =
      Modelobj.PCR_Conveyance_In_Place_Operational;
    ANYDTO.PCR_Conveyance_Property_Of_Animals =
      Modelobj.PCR_Conveyance_Property_Of_Animals;
    ANYDTO.PCR_Conveyance_Intact_Secure = Modelobj.PCR_Conveyance_Intact_Secure;
    ANYDTO.PCR_Conveyance_Water_Instruction =
      Modelobj.PCR_Conveyance_Water_Instruction;
    ANYDTO.PCR_Conveyance_Free_Of_Water = Modelobj.PCR_Conveyance_Free_Of_Water;
    ANYDTO.PCR_Conveyance_Moisture_has_Eliminated =
      Modelobj.PCR_Conveyance_Moisture_has_Eliminated;
    ANYDTO.PCR_Conveyance_Orderdinance = Modelobj.PCR_Conveyance_Orderdinance;
    ANYDTO.PCR_Conveyance_Uneven = Modelobj.PCR_Conveyance_Uneven;
    ANYDTO.PCR_Conveyance_Conveyance_Condition =
      Modelobj.PCR_Conveyance_Conveyance_Condition;
    ANYDTO.PCR_Conveyance_Damage = Modelobj.PCR_Conveyance_Damage;
    ANYDTO.PCR_Conveyance_Debris = Modelobj.PCR_Conveyance_Debris;
    ANYDTO.PCR_Conveyance_Repairs = Modelobj.PCR_Conveyance_Repairs;
    ANYDTO.PCR_Conveyance_Hazards = Modelobj.PCR_Conveyance_Hazards;
    ANYDTO.PCR_Conveyance_Other = Modelobj.PCR_Conveyance_Other;
    ANYDTO.PCR_Conveyance_Describe = Modelobj.PCR_Conveyance_Describe;
    ANYDTO.PCR_Conveyance_Note = Modelobj.PCR_Conveyance_Note;
    ANYDTO.PCR_Conveyance_Work_Order_Instruction_Reason =
      Modelobj.PCR_Conveyance_Work_Order_Instruction_Reason;
    ANYDTO.PCR_Conveyance_Secured_Per_Guidelines_Reason =
      Modelobj.PCR_Conveyance_Secured_Per_Guidelines_Reason;
    ANYDTO.PCR_Conveyance_HUD_Guidelines_Reasponce =
      Modelobj.PCR_Conveyance_HUD_Guidelines_Reasponce;
    ANYDTO.PCR_Conveyance_Shrubs_or_tree =
      Modelobj.PCR_Conveyance_Shrubs_or_tree;

    ANYDTO.PCR_Conveyance_IsActive = true;
    ANYDTO.PCR_Conveyance_IsDelete = false;

    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Conveyance_pkeyID != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTConuc, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get GetConveyanceData

  private apiUrlGetConveyanceJson =
    this.baseUrl + environment.ClientResult.GetPCRConveyance;

  public GetConveyanceDetails(Modelobj: PCR_ConveyanceModel) {
    let ANYDTO: any = {};
    ANYDTO.PCR_Conveyance_pkeyID = Modelobj.PCR_Conveyance_pkeyID;
    ANYDTO.PCR_Conveyance_Wo_ID = Modelobj.PCR_Conveyance_Wo_ID;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetConveyanceJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //pcr Roof data
  private apiUrlPOSTrJson = this.baseUrl + environment.ClientResult.PostPCRRoof;

  public PostRoofData(Modelobj: PCR_RoofModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Roof_pkeyId = Modelobj.PCR_Roof_pkeyId;
    ANYDTO.PCR_Roof_MasterId = Modelobj.PCR_Roof_MasterId;
    ANYDTO.PCR_Roof_WO_Id = Modelobj.PCR_Roof_WO_Id;
    ANYDTO.PCR_Roof_ValType = Modelobj.PCR_Roof_ValType;
    ANYDTO.PCR_Roof_Roof_Shape_Pitched_Roof =
      Modelobj.PCR_Roof_Roof_Shape_Pitched_Roof;
    ANYDTO.PCR_Roof_Leak = Modelobj.PCR_Roof_Leak;
    ANYDTO.PCR_Roof_Leak_Case = Modelobj.PCR_Roof_Leak_Case;
    ANYDTO.PCR_Roof_Leak_Other = Modelobj.PCR_Roof_Leak_Other;
    ANYDTO.PCR_Roof_Leak_Location_Dimension =
      Modelobj.PCR_Roof_Leak_Location_Dimension;
    ANYDTO.PCR_Roof_Roof_Damage = Modelobj.PCR_Roof_Roof_Damage;
    ANYDTO.PCR_Roof_Location_Dimensions = Modelobj.PCR_Roof_Location_Dimensions;
    ANYDTO.PCR_Roof_Water_Strains = Modelobj.PCR_Roof_Water_Strains;
    ANYDTO.PCR_Roof_Water_Strains_Case = Modelobj.PCR_Roof_Water_Strains_Case;
    ANYDTO.PCR_Roof_Water_Strains_Dimension =
      Modelobj.PCR_Roof_Water_Strains_Dimension;
    ANYDTO.PCR_Roof_Did_You_Perform_Roof_Repair =
      Modelobj.PCR_Roof_Did_You_Perform_Roof_Repair;
    ANYDTO.PCR_Roof_Bid_To_Repair = Modelobj.PCR_Roof_Bid_To_Repair;
    ANYDTO.PCR_Roof_Did_You_Perform_Emergency_Traping =
      Modelobj.PCR_Roof_Did_You_Perform_Emergency_Traping;
    ANYDTO.PCR_Roof_Explain_Bid_Trap = Modelobj.PCR_Roof_Explain_Bid_Trap;
    ANYDTO.PCR_Roof_Bid_To_Trap_Dimension_size_x =
      Modelobj.PCR_Roof_Bid_To_Trap_Dimension_size_x;
    ANYDTO.PCR_Roof_Bid_To_Trap_Dimension_size_y =
      Modelobj.PCR_Roof_Bid_To_Trap_Dimension_size_y;
    ANYDTO.PCR_Roof_Bid_To_Trap_Location =
      Modelobj.PCR_Roof_Bid_To_Trap_Location;
    ANYDTO.PCR_Roof_Bid_To_Trap_Description =
      Modelobj.PCR_Roof_Bid_To_Trap_Description;
    ANYDTO.PCR_Roof_Bid_To_Trap_Bid_Amount =
      Modelobj.PCR_Roof_Bid_To_Trap_Bid_Amount;
    ANYDTO.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x =
      Modelobj.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_x;
    ANYDTO.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y =
      Modelobj.PCR_Roof_Bid_To_Tar_Patch_Dimension_size_y;
    ANYDTO.PCR_Roof_Bid_To_Tar_Patch_Location =
      Modelobj.PCR_Roof_Bid_To_Tar_Patch_Location;
    ANYDTO.PCR_Roof_Bid_To_Tar_Patch_dias =
      Modelobj.PCR_Roof_Bid_To_Tar_Patch_dias;
    ANYDTO.PCR_Roof_Bid_To_Tar_Patch_Bid_Amount =
      Modelobj.PCR_Roof_Bid_To_Tar_Patch_Bid_Amount;
    ANYDTO.PCR_Roof_Bid_To_Replace = Modelobj.PCR_Roof_Bid_To_Replace;
    ANYDTO.PCR_Roof_Reason_Cant_Repair_Due_To =
      Modelobj.PCR_Roof_Reason_Cant_Repair_Due_To;
    ANYDTO.PCR_Roof_Reason_Cant_Repair_Due_To_TEXT =
      Modelobj.PCR_Roof_Reason_Cant_Repair_Due_To_TEXT;
    ANYDTO.PCR_Roof_Reason_Preventive_Due_To =
      Modelobj.PCR_Roof_Reason_Preventive_Due_To;
    ANYDTO.PCR_Roof_Reason_Leaking = Modelobj.PCR_Roof_Reason_Leaking;
    ANYDTO.PCR_Roof_Reason_Other = Modelobj.PCR_Roof_Reason_Other;
    ANYDTO.PCR_Roof_Bid_To_Description = Modelobj.PCR_Roof_Bid_To_Description;
    ANYDTO.PCR_Roof_Bid_To_Location_Entire_Roof =
      Modelobj.PCR_Roof_Bid_To_Location_Entire_Roof;
    ANYDTO.PCR_Roof_Bid_To_Location_Front =
      Modelobj.PCR_Roof_Bid_To_Location_Front;
    ANYDTO.PCR_Roof_Bid_To_Location_Back =
      Modelobj.PCR_Roof_Bid_To_Location_Back;
    ANYDTO.PCR_Roof_Bid_To_Location_Left_Side =
      Modelobj.PCR_Roof_Bid_To_Location_Left_Side;
    ANYDTO.PCR_Roof_Bid_To_Location_Right_Side =
      Modelobj.PCR_Roof_Bid_To_Location_Right_Side;
    ANYDTO.PCR_Roof_Building_House = Modelobj.PCR_Roof_Building_House;
    ANYDTO.PCR_Roof_Building_Garage = Modelobj.PCR_Roof_Building_Garage;
    ANYDTO.PCR_Roof_Building_Out_Building =
      Modelobj.PCR_Roof_Building_Out_Building;
    ANYDTO.PCR_Roof_Building_Pool_House = Modelobj.PCR_Roof_Building_Pool_House;
    ANYDTO.PCR_Roof_Building_Shed = Modelobj.PCR_Roof_Building_Shed;
    ANYDTO.PCR_Roof_Building_Bam = Modelobj.PCR_Roof_Building_Bam;
    ANYDTO.PCR_Roof_Item_Used_Roof_Type = Modelobj.PCR_Roof_Item_Used_Roof_Type;
    ANYDTO.PCR_Roof_Item_Used_DRD = Modelobj.PCR_Roof_Item_Used_DRD;
    ANYDTO.PCR_Roof_Item_Used_Size = Modelobj.PCR_Roof_Item_Used_Size;
    ANYDTO.PCR_Roof_Item_Used_Amount = Modelobj.PCR_Roof_Item_Used_Amount;
    ANYDTO.PCR_Roof_Item_Used_Felt_Type = Modelobj.PCR_Roof_Item_Used_Felt_Type;
    ANYDTO.PCR_Roof_Item_Used_Felt_Type_DRD =
      Modelobj.PCR_Roof_Item_Used_Felt_Type_DRD;
    ANYDTO.PCR_Roof_Item_Used_Felt_Type_Size =
      Modelobj.PCR_Roof_Item_Used_Felt_Type_Size;
    ANYDTO.PCR_Roof_Item_Used_Felt_Type_Amount =
      Modelobj.PCR_Roof_Item_Used_Felt_Type_Amount;
    ANYDTO.PCR_Roof_Item_Used_Sheathing = Modelobj.PCR_Roof_Item_Used_Sheathing;
    ANYDTO.PCR_Roof_Item_Used_Sheathing_DRD =
      Modelobj.PCR_Roof_Item_Used_Sheathing_DRD;
    ANYDTO.PCR_Roof_Item_Used_Sheathing_Size =
      Modelobj.PCR_Roof_Item_Used_Sheathing_Size;
    ANYDTO.PCR_Roof_Item_Used_Sheathing_Amount =
      Modelobj.PCR_Roof_Item_Used_Sheathing_Amount;
    ANYDTO.PCR_Roof_Item_Used_Deck_Thikness =
      Modelobj.PCR_Roof_Item_Used_Deck_Thikness;
    ANYDTO.PCR_Roof_Item_Used_Deck_Thikness_DRD =
      Modelobj.PCR_Roof_Item_Used_Deck_Thikness_DRD;
    ANYDTO.PCR_Roof_Item_Used_Drip_Edge = Modelobj.PCR_Roof_Item_Used_Drip_Edge;
    ANYDTO.PCR_Roof_Item_Used_Drip_Edge_Size =
      Modelobj.PCR_Roof_Item_Used_Drip_Edge_Size;
    ANYDTO.PCR_Roof_Item_Used_Drip_Edge_Amount =
      Modelobj.PCR_Roof_Item_Used_Drip_Edge_Amount;
    ANYDTO.PCR_Roof_Item_Used_Ice_Water_Barrier =
      Modelobj.PCR_Roof_Item_Used_Ice_Water_Barrier;
    ANYDTO.PCR_Roof_Item_Used_Ice_Water_Barrier_Size =
      Modelobj.PCR_Roof_Item_Used_Ice_Water_Barrier_Size;
    ANYDTO.PCR_Roof_Item_Used_Ice_Water_Barrier_Amount =
      Modelobj.PCR_Roof_Item_Used_Ice_Water_Barrier_Amount;
    ANYDTO.PCR_Roof_Item_Used_No_Of_Vents =
      Modelobj.PCR_Roof_Item_Used_No_Of_Vents;
    ANYDTO.PCR_Roof_Item_Used_No_Of_Vents_Text =
      Modelobj.PCR_Roof_Item_Used_No_Of_Vents_Text;
    ANYDTO.PCR_Roof_Item_Used_No_Of_Vents_Amount =
      Modelobj.PCR_Roof_Item_Used_No_Of_Vents_Amount;
    ANYDTO.PCR_Roof_Item_Used_Roof_Debris =
      Modelobj.PCR_Roof_Item_Used_Roof_Debris;
    ANYDTO.PCR_Roof_Item_Used_Roof_Debris_Size =
      Modelobj.PCR_Roof_Item_Used_Roof_Debris_Size;
    ANYDTO.PCR_Roof_Item_Used_Roof_Debris_Amount =
      Modelobj.PCR_Roof_Item_Used_Roof_Debris_Amount;
    ANYDTO.PCR_Roof_Item_Used_Dempster_Rental =
      Modelobj.PCR_Roof_Item_Used_Dempster_Rental;
    ANYDTO.PCR_Roof_Item_Used_Dempster_Rental_Size =
      Modelobj.PCR_Roof_Item_Used_Dempster_Rental_Size;
    ANYDTO.PCR_Roof_Item_Used_Dempster_Rental_Amount =
      Modelobj.PCR_Roof_Item_Used_Dempster_Rental_Amount;
    ANYDTO.PCR_Bid_Amount = Modelobj.PCR_Bid_Amount;
    ANYDTO.PCR_Roof_IsActive = Modelobj.PCR_Roof_IsActive;
    ANYDTO.PCR_Roof_IsDelete = Modelobj.PCR_Roof_IsDelete;

    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.PCR_Roof_pkeyId != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTrJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //get roof
  private apiUrlGetrJson = this.baseUrl + environment.ClientResult.GetPCRRoof;

  public GetPcrRoofDetails(Modelobj: PCR_RoofModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_Roof_pkeyId = Modelobj.PCR_Roof_pkeyId;
    ANYDTO.PCR_Roof_WO_Id = Modelobj.PCR_Roof_WO_Id;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetrJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get five brother json data

  private apiUrlGetfJson = this.baseUrl + environment.ClientResult.GetPCRFiveBrother;

  public GetFiveBrotherDetails(Modelobj: PCR_FiveBrotherModel) {
    let ANYDTO: any = {};

    ANYDTO.PCR_FiveBro_id = Modelobj.PCR_FiveBro_id;
    ANYDTO.PCR_FiveBro_WO_ID = Modelobj.PCR_FiveBro_WO_ID;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetfJson, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // common handler
  private handleError(error: HttpErrorResponse) {

    if (error.status == 401) {
      alert('Unauthorized User...');
      window.location.href = '/admin/login';
    } else {
      alert("Invalid Request...");
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
    }
    // return an observable with a user-facing error message
    return throwError("Something's wrong, please try again later...");
  }

  private apiUrlPOSTGrass = this.baseUrl + environment.ClientResult.PostPCRGrassCut;

  public PCRGrassCutDataPost(Modelobj: PCRGrassInfoModel) {
    let ANYDTO: any = {};
    ANYDTO.Grass_Cut_PkeyID = Modelobj.Grass_PkeyID;
    ANYDTO.Grass_Cut_Completed = Modelobj.Grass_GrassCutComp;
    ANYDTO.Grass_Cut_LotSize = Modelobj.Grass_LotSize;
    ANYDTO.Grass_Cut_Unable_To_Cut = Modelobj.Grass_UnableToCut;
    ANYDTO.Grass_Cut_Other = Modelobj.Grass_OtherNote;
    ANYDTO.Grass_Cut_Completion_Date = Modelobj.Grass_dateCompleted;
    ANYDTO.Grass_Cut_ForSale = Modelobj.Grass_ForSale;
    ANYDTO.Grass_Cut_ForRent = Modelobj.Grass_ForRent;
    ANYDTO.Grass_Cut_Realtor_Phone = Modelobj.Grass_RealtorPh;
    ANYDTO.Grass_Cut_Realtor_Name = Modelobj.Grass_RealtorName;
    ANYDTO.Grass_Cut_New_Damage_Found = Modelobj.Grass_ExtDamage;
    ANYDTO.Grass_Cut_Damage_Fire = Modelobj.Grass_FireDamage;
    ANYDTO.Grass_Cut_Damage_Neglect = Modelobj.Grass_NeglectDamage;
    ANYDTO.Grass_Cut_Damage_Vandal = Modelobj.Grass_VandalDamage;
    ANYDTO.Grass_Cut_Damage_Freeze = Modelobj.Grass_FrezeDamage;
    ANYDTO.Grass_Cut_Damage_Storm = Modelobj.Grass_StormDamage;
    ANYDTO.Grass_Cut_Damage_Flood = Modelobj.Grass_FloodDamage;
    ANYDTO.Grass_Cut_Roof_Leak = Modelobj.Grass_RoofLeakDamage;
    ANYDTO.Grass_Cut_Explain_New_Damage = Modelobj.Grass_ExtDamageNote;
    ANYDTO.Grass_Cut_Occupancy = Modelobj.Grass_Occupancy;
    ANYDTO.Grass_Cut_Property_Secure = Modelobj.Grass_PropertySecure;
    ANYDTO.Grass_Cut_Pool_Present = Modelobj.Grass_PoolPresent;
    ANYDTO.Grass_Cut_Pool_Secured = Modelobj.Grass_PoolSecure;
    ANYDTO.Grass_Cut_Violation_Posted = Modelobj.Grass_ViolationPost;
    ANYDTO.Grass_Cut_Opening_Not_Boarded = Modelobj.Grass_NotBoarded;
    ANYDTO.Grass_Cut_Opening_Boarded = Modelobj.Grass_Boarded;
    ANYDTO.Grass_Cut_Debris_Present = Modelobj.Grass_ExtDebPresent;
    ANYDTO.Grass_Cut_Trees_Touching_House = Modelobj.Grass_TreeTouching;
    ANYDTO.Grass_Cut_Vines_Touching_House = Modelobj.Grass_ShrubsTouching;
    ANYDTO.Grass_Cut_Explain_violations = Modelobj.Grass_Comment;
    ANYDTO.Grass_Cut_IsActive = true;
    ANYDTO.Grass_Cut_IsDelete = false;
    ANYDTO.Grass_Cut_WO_ID = Modelobj.Grass_WO_ID;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    ANYDTO.Type = 1;
    ANYDTO.fwo_pkyeId = Modelobj.fwo_pkyeId;
    if (Modelobj.Grass_PkeyID != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTGrass, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetGrass = this.baseUrl + environment.ClientResult.GetPCRGrassCut;

  public PCRGrassCutDataGet(Modelobj: PCRGrassInfoModel) {
    let ANYDTO: any = {};
    ANYDTO.Grass_Cut_PkeyID = Modelobj.Grass_PkeyID;
    ANYDTO.Grass_Cut_WO_ID = Modelobj.Grass_WO_ID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetGrass, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
