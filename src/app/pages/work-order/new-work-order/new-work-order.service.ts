import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import {
  WorkOrderModel,
  GetUserMetaDataModel,
  UpdateStausDataModel,
  ActionRecurringModel
} from "./new-work-order-model";
import { environment } from '../../../../environments/environment';
import { HomepageServices } from "../../home/home.service";
import { CountyZipModel } from "../../user/add-user/add-user-model";

@Injectable({
  providedIn: "root"
})
export class SaveWorkOrderServices {

  public Errorcall;
  private token: any;

  baseUrl = environment.domain;
  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlGet = this.baseUrl + environment.WorkOrder.PostWorkOrder;

  public WorkorderPostData(Modelobj: WorkOrderModel) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
    ANYDTO.workOrderInfo = Modelobj.workOrderInfo;
    ANYDTO.address1 = Modelobj.address1;
    ANYDTO.address2 = Modelobj.address2;
    ANYDTO.city = Modelobj.city;
    ANYDTO.state = Modelobj.state;
    ANYDTO.zip = Modelobj.zip;
    ANYDTO.country = Modelobj.country;

    ANYDTO.status = Modelobj.status;
    ANYDTO.dueDate = Modelobj.dueDate;
    ANYDTO.startDate = Modelobj.startDate;
    ANYDTO.clientInstructions = Modelobj.Comments;
    ANYDTO.clientStatus = Modelobj.clientStatus;
    ANYDTO.clientDueDate = Modelobj.clientDueDate;
    ANYDTO.gpsLatitude = Modelobj.gpsLatitude;
    ANYDTO.gpsLongitude = Modelobj.gpsLongitude;

    ANYDTO.IsActive = Modelobj.IsActive;
    ANYDTO.currUserId = Modelobj.currUserId;
    ANYDTO.WorkType = Modelobj.WorkType;
    ANYDTO.Company = Modelobj.Company;
    ANYDTO.Com_Name = Modelobj.Com_Name;
    ANYDTO.Com_Phone = Modelobj.Com_Phone;
    ANYDTO.Com_Email = Modelobj.Com_Email;
    ANYDTO.Contractor = Modelobj.Contractor;
    ANYDTO.Received_Date = Modelobj.Received_Date;
    ANYDTO.Complete_Date = Modelobj.Complete_Date;
    ANYDTO.Cancel_Date = Modelobj.Cancel_Date;
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Mortgagor = Modelobj.Mortgagor;
    ANYDTO.Category = Modelobj.Category;
    ANYDTO.Loan_Info = Modelobj.Loan_Info;
    ANYDTO.Customer_Number = Modelobj.Customer_Number;
    ANYDTO.Cordinator = Modelobj.Cordinator;
    ANYDTO.BATF = Modelobj.BATF;
    ANYDTO.IsEdit = Modelobj.IsEdit;
    ANYDTO.ISInspection = Modelobj.ISInspection;
    ANYDTO.Lotsize = Modelobj.Lotsize;
    ANYDTO.Rush = Modelobj.Rush;
    ANYDTO.Lock_Code = Modelobj.Lock_Code;
    ANYDTO.Broker_Info = Modelobj.Broker_Info;
    ANYDTO.Comments = Modelobj.Comments;
    ANYDTO.Lock_Location = Modelobj.Lock_Location;
    ANYDTO.Key_Code = Modelobj.Key_Code;
    ANYDTO.Gate_Code = Modelobj.Gate_Code;
    ANYDTO.Loan_Number = Modelobj.Loan_Number;
    ANYDTO.Processor = Modelobj.Processor;
    ANYDTO.DateCreated = Modelobj.DateCreated;

    ANYDTO.Recurring = Modelobj.Recurring;
    ANYDTO.Recurs_CutOffDate = Modelobj.Recurs_CutOffDate;
    ANYDTO.Recurs_Day = Modelobj.Recurs_Day;
    ANYDTO.Recurs_Limit = Modelobj.Recurs_Limit;
    ANYDTO.Recurs_Period = Modelobj.Recurs_Period;
    //debugger;
    ANYDTO.Recurs_ReceivedDateArray = Modelobj.Recurs_ReceivedDateArray;
    ANYDTO.Recurs_DueDateArray = Modelobj.Recurs_DueDateArray;
    ANYDTO.Background_Provider = Modelobj.Background;
    ANYDTO.EstimatedDate = Modelobj.EstimatedDate;
    ANYDTO.Type = 1;

    if (Modelobj.workOrder_ID != 0) {
      if (Modelobj.valdef == 5) {
        ANYDTO.Type = 5;
      }
      else if (Modelobj.Type == 6) {
        ANYDTO.Type = 6;
      }
      else if (Modelobj.Type == 10) {
        ANYDTO.Type = 10;
      }
      else {
        ANYDTO.Type = 2;
      }
    }

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
  public LockUnloadEdit_WorkOrder(workOrder_ID:Number,isEditlock:boolean) {
    // debugger;
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = workOrder_ID;
    ANYDTO.IsEdit = isEditlock;
    ANYDTO.Type = 9;
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

  // get user data
  private apiUrlGet1 = this.baseUrl + environment.WorkOrder.GetUserMeta;
  public WorkorderGetUserMetaData(Modelobj: GetUserMetaDataModel) {
    var ANYDTO: any = {};
    ANYDTO.client_pkyeId = Modelobj.client_pkyeId;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet1, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // staus update
  private apiUrlGet2 = this.baseUrl + environment.WorkOrder.UpadateWorkOrderStatus;
  public Workorderstatus(Modelobj: UpdateStausDataModel) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.status = Modelobj.status;
    ANYDTO.IsActive = Modelobj.IsActive;
    ANYDTO.UserId = Modelobj.UserId;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet2, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get user data
  private apiUrlGet12 = this.baseUrl + environment.WorkOrder.PostIPLAuto;
  public WorkorderAutoGenerateId() {
    var ANYDTO: any = {};
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet12, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // delete Work Order
  private apiUrldel = this.baseUrl + environment.WorkOrder.PostdeleteWorkOrder;
  public deleteworkorder(Modelobj: WorkOrderModel) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrldel, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Recurring Work Order
  private apiUrlRec = this.baseUrl + environment.WorkOrder.PostRecuredWorkOrderData;

  public PostRecuredWorkOrder(param: any) {

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlRec, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlgetzip= this.baseUrl + environment.WorkOrder.GetZipAddress;

  public GetZipAddData(Modelobj:CountyZipModel) {

    var ANYDTO: any = {};
    ANYDTO.Zip_zip = Modelobj.Zip_zip;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlgetzip, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlwoEstimateDate = this.baseUrl + environment.WorkOrder.UpdateWoEstimateDate;
  public UpdateWoEstimatedDate(workOrder_ID:number,EstimatedDate:Date) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = workOrder_ID;
    ANYDTO.EstimatedDate = EstimatedDate;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlwoEstimateDate, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
