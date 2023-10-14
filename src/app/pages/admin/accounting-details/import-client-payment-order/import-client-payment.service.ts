import { Injectable } from "@angular/core";
import { tap, catchError } from 'rxjs/operators';
import * as pdfjsLib from 'pdfjs-dist';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HomepageServices } from '../../../home/home.service';
import { environment } from 'src/environments/environment';
import { WorOrderColumn } from "src/app/pages/work-order/work-order-view/work-order-view-model";

@Injectable({
          providedIn: 'root'
        })

export class ImportClientPaymentService{

          private token: any;
          baseUrl = environment.domain
          constructor(
            private _http: HttpClient,
            private xHomepageServices: HomepageServices
          ) {
            this.token = JSON.parse(localStorage.getItem('TOKEN'));
            pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
          }
         
         
        
          private apiImportExcelWorkOrder = BaseUrl + environment. Accounting.PostImportClientPaymentExcel;
        
          public ExcelWorkOrderSave(param: any) {
            debugger
             console.log(param);
            let headers = new HttpHeaders({ "Content-Type": "application/json" });
            headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
            return this._http
              .post<any>(this.apiImportExcelWorkOrder, param, { headers: headers })
              .pipe(
                tap(data => {
                  return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
              );
          }
        
          
         
          
          private apiUrlPOSTp = BaseUrl + environment.WorkOrder.AddOrders;
            public AddBidCodes() {
            ////dfebugger
              var ANYDTO: any = {};
        
              ANYDTO.ConUserName = "MO1069";
              ANYDTO.ConPassword = "805Panther";
              ANYDTO.AuthUserName = "willenterprises";
              ANYDTO.AuthPassword = "00c4da8da7112a6672fc1ae92e4ab116fb8c550a776ca10d";
              ANYDTO.Type = 1;
            
              let headers = new HttpHeaders({ "Content-Type": "application/json" });
              headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
              return this._http
                .post<any>(this.apiUrlPOSTp, ANYDTO, { headers: headers })
                .pipe(
                  tap(data => {
                    return data;
                  }),
                  catchError(this.xHomepageServices.CommonhandleError)
                 
                );
            }

             //get workorderColumn
  private apiUrlGetdatas = this.baseUrl + environment.WorkOrder.GetColumn;
  public WorkorderColumnPostDatas(Modelobj: WorOrderColumn) {
    const User = JSON.parse(localStorage.getItem('usertemp_'));
    var ANYDTO: any = {};
    ANYDTO.WC_UserId = User[0].User_pkeyID;
    ANYDTO.Type = 6;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .post<any>(this.apiUrlGetdatas, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          console.log('sandipreturn',data)
          return data;
          
        }),
      );
  }

            
}
        