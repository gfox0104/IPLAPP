import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { WorkOderViewModel, WorOrderColumn, WorOrderColumnjson, WorkOrderActions, ActionSentStore } from './work-order-view-model';
import { environment } from '../../../../environments/environment';
import { CommonStatusDTO } from '../../client-result/common-client-header/common-status-model'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import { BaseUrl } from "src/app/services/apis/rest-api";
import { Observable } from "rxjs";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: "root"
})

export class SaveWorkOrderViewServices {
  public Errorcall;
  private token: any;
  baseUrl = environment.domain
  GlobalVariable: string;

  constructor(private _http: HttpClient, private _Route: Router) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));

    this.GlobalVariable = 'Item per page counting';
  }

  // get user data
  private apiUrlGet = this.baseUrl + environment.WorkOrder.GetWorkOrderData;
  public WorkorderViewPostData(Modelobj: WorkOderViewModel) {
     debugger
    var ANYDTO: any = {};
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.PageNumber =   Modelobj.PageNumber;
    ANYDTO.NoofRows = Modelobj.NoofRows;
    ANYDTO.Skip = Modelobj.Skip;
    ANYDTO.Type = Modelobj.Type;
    //ANYDTO.Type = 1;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          console.log('get return data',data)
          return data;
        }),
      );
  }


  //lazy loading in kindo grid
  // private apiUrl = 'api/RESTIPL/GetWorkOrderData';
  // arg1:any;
  // public fetchData(page: number, pageSize: number): Observable<any> {
  //   debugger
  //   const skip = (page - 1) * pageSize;
  //   const url = `${this.apiUrlGet}?skip=${skip}&take=${pageSize}`;

  
  //   return this._http.post<any>(url,this.arg1).pipe(
  //     map((response: any) => {
  //       return {
  //         data: response.items, // Assuming your API response contains an 'items' array
  //         total: response.totalCount // Assuming your API response contains the total count of items
  //       };
  //     })
  //   );
  // }
  //get workorderColumn
  private apiUrlGetdata = this.baseUrl + environment.WorkOrder.GetJsonColumn;
  public WorkorderColumnPostData(Modelobj: WorOrderColumn) {
    const User = JSON.parse(localStorage.getItem('usertemp_'));
    var ANYDTO: any = {};
    ANYDTO.WC_UserId = User[0].User_pkeyID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .post<any>(this.apiUrlGetdata, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
  //get workorderColumn
  private apiUrlGetdatas = this.baseUrl + environment.WorkOrder.GetColumn;
  public WorkorderColumnPostDatas(Modelobj: WorOrderColumn) {
    const User = JSON.parse(localStorage.getItem('usertemp_'));
    var ANYDTO: any = {};
    ANYDTO.WC_UserId = User[0].User_pkeyID;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .post<any>(this.apiUrlGetdatas, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  //post json column
  private apiUrlpo = this.baseUrl + environment.WorkOrder.postColumn;
  public jsonColumnPostData(Modelobj: WorOrderColumnjson) {
    var ANYDTO: any = {};
    ANYDTO.WC_Show_Column_Jsonarr = Modelobj.WC_Show_Column_Jsonarr;
    ANYDTO.WC_Hide_Column_Jsonarr = Modelobj.WC_Hide_Column_Jsonarr;
    ANYDTO.WC_IsActive = Modelobj.WC_IsActive;
    ANYDTO.WC_IsDelete = Modelobj.WC_IsDelete;
    ANYDTO.WC_UserId = Modelobj.WC_UserId;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlpo, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }

  //filter workorder status data
  private apiUrlstu = this.baseUrl + environment.WorkOrder.FilterWOStatus;
  public FilterWoStatusPostData(Modelobj: CommonStatusDTO) {
     debugger
    var ANYDTO: any = {};
    ANYDTO.whereclause = Modelobj.whereclause;
    ANYDTO.PageNumber =   Modelobj.PageNumber;
    ANYDTO.NoofRows = Modelobj.NoofRows;
    ANYDTO.Skip = Modelobj.Skip;
    ANYDTO.FilterData = Modelobj.FilterData;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlstu, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  /////Action details
 // private apiUrlA = this.baseUrl + "api/RESTIPL/GetWorkOrderActionDetail";
  private apiUrlA = this.baseUrl + environment.WorkOrder.commonmethod;
  public ActionData(Modelobj: WorkOrderActions) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Type = 1;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlA,ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          console.log('action return data',data)
          return data;
          
        }),
      );
  }
  /////post Action data
  private apiUrlAc = this.baseUrl + environment.WorkOrder.PostWorkOrderAction;

  public PostWOActionData(Modelobj: ActionSentStore) {
    var ANYDTO: any = {};
    ANYDTO.Assign_Contractor = Modelobj.Assign_Contractor;
    ANYDTO.Assign_Coordinator = Modelobj.Assign_Coordinator;
    ANYDTO.Assign_Processor = Modelobj.Assign_Processor;
    ANYDTO.Client_Company = Modelobj.Client_Company;
    ANYDTO.Work_Type = Modelobj.Work_Type;
    ANYDTO.Due_Date = Modelobj.Due_Date;
    ANYDTO.Start_Date = Modelobj.Start_Date;
    ANYDTO.Client_Due_Date = Modelobj.Client_Due_Date;
    ANYDTO.Recurring_Order = Modelobj.Recurring_Order;
    ANYDTO.Comments = Modelobj.Comments;
    ANYDTO.Estimated_Date = Modelobj.Estimated_Date;
    ANYDTO.Send_Message = Modelobj.Send_Message;
    ANYDTO.Task = Modelobj.Task;
    ANYDTO.Instructions = Modelobj.Instructions;
    ANYDTO.Category = Modelobj.Category;
    ANYDTO.Background_Provider = Modelobj.Background_Provider;
    ANYDTO.Assign_PCR = Modelobj.Assign_PCR;
    ANYDTO.Cancel_Work_Order = Modelobj.Cancel_Work_Order;
    ANYDTO.Delete_Work_Order = Modelobj.Delete_Work_Order;
    ANYDTO.Mark_Client_Invoice_Paid = Modelobj.Mark_Client_Invoice_Paid;
    ANYDTO.Write_off_Invoice = Modelobj.Write_off_Invoice;
    ANYDTO.Mark_Contractor_Invoice_Paid = Modelobj.Mark_Contractor_Invoice_Paid;
    ANYDTO.Print_WO_Instructions = Modelobj.Print_WO_Instructions;
    ANYDTO.Print_Client_Invoice = Modelobj.Print_Client_Invoice;
    ANYDTO.Export_to_Excel = Modelobj.Export_to_Excel;
    ANYDTO.Download_Photos = Modelobj.Download_Photos;
    ANYDTO.Attach_Document = Modelobj.Attach_Document;
    ANYDTO.Route = Modelobj.Route;
    ANYDTO.WorkActionArray = Modelobj.WorkActionArray;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlAc, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  /////Action Multi invoice print
  private apiInvoice = this.baseUrl + environment.WorkOrder.ClientInvoicePrint;
  public MultipleClientInvoicePrint(param){
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiInvoice, param, { headers: headers })
      .pipe(
        tap(data => {
        }),
      );
  }


  private apiIstruction = this.baseUrl + environment.WorkOrder.InstructionPrint;
  public MultipleInstructionPrint(param){
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiInvoice, param, { headers: headers })
      .pipe(
        tap(data => {
        }),
      );
  }

  private apiUrlMultiAc = this.baseUrl + environment.WorkOrder.MultiActionsWorkOrder;
  public multiActionsWorkOrder(param) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlMultiAc, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  private apiUrlMultiTaskInstAc = this.baseUrl + environment.WorkOrder.PostInstructionwo;
  public multiActionsTaskInst(param) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlMultiTaskInstAc, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  workOrderPassed;
  setWorkOrder(data) {
    this.workOrderPassed = data;
  }

  getWorkOrder() {
    return this.workOrderPassed;
  }

  // save filter data
  private apiUrlsave = this.baseUrl + environment.WorkOrder.postSavefilter;
  public SaveFilterPostData(Modelobj: WorOrderColumnjson) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.WhereClause = Modelobj.WhereClause;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.WF_QueryName = Modelobj.WF_QueryName;
    ANYDTO.PageNumber =   Modelobj.PageNumber;
    ANYDTO.NoofRows = Modelobj.NoofRows;
    ANYDTO.Skip = Modelobj.Skip;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlsave, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }
  private apiUrlpage = this.baseUrl + environment.WorkOrder.postPagesize;
  public SavePagePostData(Modelobj: WorOrderColumnjson) {
    debugger
    var ANYDTO: any = {};

    ANYDTO.Wc_Grid_ShortID = Modelobj.Wc_Grid_ShortID;
    ANYDTO.Type = 7;


    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlpage, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }
  public loadFilter(id) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Type = 5;
    ANYDTO.WF_PkeyID = id;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlsave, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }
  public DeleteFilter(id) {
    var ANYDTO: any = {};
    ANYDTO.Type = 4;
    ANYDTO.WF_PkeyID = id;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlsave, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }

  public ClearFilter() {
    debugger
    var ANYDTO: any = {};
    ANYDTO.Type = 6;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlsave, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }

  private apiUrlMulticlientpay = this.baseUrl + environment.WorkOrder.MultiClientPaymentData;
  public multiActionsClientPayment(param) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlMulticlientpay, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  private GetapiUrlMulticlientpay = this.baseUrl + environment.WorkOrder.GetMultiClientPaymentData;
  public GetMultipleClientInvoicepayment(param) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.GetapiUrlMulticlientpay, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private msgUrl = BaseUrl + environment.ClientResult.AddFirebaseWoMessageData;
  public AddFirebaseWoMessage(WoMessageList : any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.WoMessageList = WoMessageList;
    return this._http
      .post<any>(this.msgUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }

  private conInvUrl = BaseUrl + environment.WorkOrder.GetWoContractorInvoice;
  public GetWoContractorInvoice(WorkOrderList : any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.WorkOrderIDList = WorkOrderList;
    ANYDTO.Type = 1;

    return this._http
      .post<any>(this.conInvUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }

  private locUrl = this.baseUrl + environment.WorkOrder.GetLiveRouteLocation;
  public GetLiveRouteLocationData(param) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.locUrl, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }

  private workOrderIPLNumberUlr = BaseUrl + environment.WorkOrder.GetWorkOrderIPLNumberlist;
  public GetWorkOrderIPLNumberList(WorkOrderID : any,Type:number,IPLNo:string="") {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.WorkOrderID = WorkOrderID;
    ANYDTO.IPLNo = IPLNo;
    ANYDTO.Type = Type;

    return this._http
      .post<any>(this.workOrderIPLNumberUlr, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }
  private apiUrlTracker = this.baseUrl + environment.WorkOrder.GetWorkoOrderTracker;
  public GetWorkoOrderTracker(Modelobj: WorkOderViewModel) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlTracker,ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
  private apiUrlSavelog = this.baseUrl + environment.AccessLog.PostNewAccessLogData;
  public PostNewAccessLog(Access_WorkerOrderID,Access_Master_ID) {
    var ANYDTO: any = {};
    ANYDTO.Access_WorkerOrderID = Access_WorkerOrderID;
    ANYDTO.Access_Master_ID = Access_Master_ID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlSavelog, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }
}
