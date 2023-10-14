import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BindDataModel,
  PrintPdfObject,
  TaskBidMasterModel,
  TaskPresetModel,
} from './client-result-model';
import { environment } from '../../../../environments/environment';
import { ClientResultPhotoModel } from '../client-result-photo/client-result-photo-model';
import { CopyWorkOderModel } from './client-result-model';
import { HomepageServices } from '../../home/home.service';
import { Subject } from 'rxjs';
import { Task_Status_Damage_Violation_Hazard } from '../components/constants/Task_Status_Damage_Violation_Hazard';

@Injectable({
  providedIn: 'root',
})
export class ClientResultServices {
  public Errorcall;
  private token: any;
  baseUrl = environment.domain;
  pathParam: any;
  copydetail: any;
  public workorder: any;
  downloadUrl = new Subject();

  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices,
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlGet = this.baseUrl + environment.ClientResult.GetWOClientResult;
  public WorkorderViewClient(Modelobj: TaskBidMasterModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          // return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetformsMaster =
    this.baseUrl + environment.ClientResult.GetWoFormMaster;
  public GetformsMaster(type: number, wo: number) {
    //debugger
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.Type = type;
    ANYDTO.WorkOrderId = wo;

    return this._http
      .post<any>(this.apiUrlGetformsMaster, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlUpdateFormStatus =
    this.baseUrl + environment.Admin.UpdateFormStatus;
  public PostUpdateFormStatus(formId: number, Type: number) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.FormId = formId;
    ANYDTO.Type = Type;
    return this._http
      .post<any>(this.apiUrlUpdateFormStatus, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlDeleteForm =
    this.baseUrl + environment.ClientResult.DeleteWoFormMaster;
  public DeleteForm(formId: number) {
    //debugger
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.Fwo_pkyeId = formId;
    ANYDTO.Type = 4;
    return this._http
      .post<any>(this.apiUrlDeleteForm, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrpost1 = this.baseUrl + environment.ClientResult.PostTaskBidData;
  public ClientResultTaskBidPost(Modelobj: TaskBidMasterModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.TaskBidMasterDTO = Modelobj.ClientResultBidTaskArray;
    ANYDTO.Task_Bid_WO_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrpost1, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetPastData =
    this.baseUrl + environment.ClientResult.GetWorkOrderPastData;
  public ClientPastDataPost(param) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetPastData, param, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlStatusUpdate =
    this.baseUrl + environment.ClientResult.UpdateBidStatusDetails;
  public historyStatusUpdate(param: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlStatusUpdate, param, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrpost11 =
    this.baseUrl + environment.ClientResult.GetTaskBidGetWorkOrder;
  public ClientResultTaskBidGetWorkOrderId(Modelobj: TaskBidMasterModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Task_Bid_WO_ID = Modelobj.Task_Bid_WO_ID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrpost11, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrpost1x = this.baseUrl + environment.ClientResult.PostTaskInvoice;
  public ClientResultTaskInvoicePost(Modelobj: TaskBidMasterModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.Task_Invoice_MasterDTO = Modelobj.ClientResultCreateCompletionArray;
    ANYDTO.Task_Inv_WO_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrpost1x, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrpost1xd = this.baseUrl + environment.ClientResult.PostTaskDamage;
  public ClientResultTaskDamagePost(Modelobj: TaskBidMasterModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.TaskDamageMaster = Modelobj.ClientResultDamageArray;
    ANYDTO.Task_Inv_WO_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrpost1xd, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrpost1xx =
    this.baseUrl + environment.ClientResult.DownloadZipFile;
  public imagesDownLoadZip() {
    var ANYDTO: any = {};

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http
      .post<any>(this.apiUrpost1xx, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // get Single image data
  private apiUrlimageGet =
    this.baseUrl + environment.ClientResult.GetSingleImagedata;
  public SingleImageData(Modelobj: ClientResultPhotoModel) {
    var ANYDTO: any = {};
    ANYDTO.Client_Result_Photo_StatusType = 99;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http
      .post<any>(this.apiUrlimageGet, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  ///////////////////////////////// Copy Work Order Api
  private apiUrpostcopyxd =
    this.baseUrl + environment.ClientResult.CopyWorkOrder;
  public CopyWorkOrderDetailsPost(Modelobj: CopyWorkOderModel) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.WorkOderInfo = Modelobj.WorkOderInfo;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrpostcopyxd, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  ////////////////// workOrder Hiistory

  private apiUrposthistory =
    this.baseUrl + environment.ClientResult.GetWOHistory;
  public WorkOrderHistoryPost(Modelobj: TaskBidMasterModel) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrposthistory, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  /////////past wo history
  private apiUrpast = this.baseUrl + environment.ClientResult.PastWOHistory;
  public pastHistoryPost(Modelobj: TaskBidMasterModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.PageNumber =   Modelobj.PageNumber;
    ANYDTO.NoofRows = Modelobj.NoofRows;
    ANYDTO.Skip = Modelobj.Skip;
    ANYDTO.FilterData = Modelobj.FilterData;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrpast, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrmap = this.baseUrl + environment.ClientResult.GetMapOffice;
  public getmapdata(Modelobj: TaskBidMasterModel) {
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrmap, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //Get office document
  private getofficedocumentUrl =
    this.baseUrl + environment.ClientResult.GetOfficeDocument;
  public GetOfficeDocument(Modelobj: BindDataModel) {
    let ANYDTO: any = {};
    ANYDTO.Wo_Office_Doc_PkeyId = Modelobj.Wo_Office_Doc_PkeyId;
    ANYDTO.Wo_Office_Doc_Wo_ID = Modelobj.Common_pkeyID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.getofficedocumentUrl, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //delete office document
  private deleteofficedocumentUrl =
    this.baseUrl + environment.ClientResult.DeleteOfficeDocument;
  public DeleteOfficeDocument(Modelobj: BindDataModel) {
    let ANYDTO: any = {};
    ANYDTO.Wo_Office_Doc_PkeyId = Modelobj.Wo_Office_Doc_PkeyId;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.deleteofficedocumentUrl, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //preset task change event
  private presetUrl = this.baseUrl + environment.ClientResult.GetTaskPreset;
  public gettaskpreset(Modelobj: TaskPresetModel) {
    let ANYDTO: any = {};
    ANYDTO.Task_Preset_pkeyId = Modelobj.Task_Preset_pkeyId;
    ANYDTO.Task_Preset_ID = Modelobj.Task_Preset_ID;
    ANYDTO.Type = 2;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.presetUrl, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private piGetUrl =
    this.baseUrl + environment.ClientResult.GetClientResultPhotoHistoryData;
  public GetClientResultPhotoHistory(Modelobj: ClientResultPhotoModel) {
    //dfebugger
    var ANYDTO: any = {};
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;
    ANYDTO.Type = Modelobj.Type;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.piGetUrl, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  setPathParam(param) {
    this.pathParam = param;
  }

  getPathParam() {
    return this.pathParam;
  }

  goDataZ: any;
  masterFunctionCallClinetTaskDropDown(DataZ: any) {
    this.goDataZ = DataZ;
  }
  masterFunctionGetdataClinetTaskDropDown() {
    return this.goDataZ;
  }

  private downloadFileFromBackendUrl =
  this.baseUrl + environment.ClientResult.DownloadZipFileBackend;
  public downloadFileFromBackend(Modelobj)
  {
    var ANYDTO: any = {};

    ANYDTO.FolderName = Modelobj.FolderName;
    ANYDTO.Files = Modelobj.Files;
    ANYDTO.Labels = Modelobj.labelArray;
    ANYDTO.WorkOrderNumner = Modelobj.workOrderNumber;
    ANYDTO.Address = Modelobj.address1;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.workOrder_ID;
    ANYDTO.Type = 1;
    // debugger;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    //headers.append('Connection', 'keep-alive');
    return this._http
      .post<any>(this.downloadFileFromBackendUrl, Modelobj, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apicreateworkOrderPdf = this.baseUrl + environment.Accounting.Report.apicreateworkOrderPdf;
  public createworkOrderPdf(printPdfObject:PrintPdfObject) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = printPdfObject.workOrder_ID;
    ANYDTO.Type =printPdfObject.Type;
    ANYDTO.IsFiledResult =printPdfObject.IsFiledResult;
    ANYDTO.IsOfficeResult =printPdfObject.IsOfficeResult;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      //.post<any>(this.apicreateworkOrderPdf, ANYDTO, { headers: headers })
      .post<Blob>(this.apicreateworkOrderPdf, ANYDTO,  {headers: headers, responseType: 'blob' as 'json', })
      .pipe(
        tap((data) => {
          // debugger
           return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // listen event

  isDownloadNeeded() {
    return this.downloadUrl.asObservable();
  }
  private violationPost = this.baseUrl + environment.ClientResult.PostTaskViolation;
  public ClientResultTaskViolationPost(Modelobj: TaskBidMasterModel) {
    var ANYDTO: any = {};
    ANYDTO.TaskViolationMaster = Modelobj.ClientResultViolationArray;
    ANYDTO.Task_Inv_WO_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.violationPost, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private hazardPost = this.baseUrl + environment.ClientResult.PostTaskHazard;
  public ClientResultTaskHazardPost(Modelobj: TaskBidMasterModel) {
    var ANYDTO: any = {};
    ANYDTO.TaskHazardMaster = Modelobj.ClientResultHazardArray;
    ANYDTO.Task_Inv_WO_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.hazardPost, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private UpdateTaskStatusUrl = this.baseUrl + environment.ClientResult.UpdateTaskStatus_DamageViolationHazard;
  public UpdateTaskStatus_DamageViolationHazard(Modelobj: Task_Status_Damage_Violation_Hazard) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.UpdateTaskStatusUrl, Modelobj, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
