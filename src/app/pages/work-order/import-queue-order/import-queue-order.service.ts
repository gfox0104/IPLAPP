import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import * as pdfjsLib from 'pdfjs-dist';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HomepageServices } from '../../home/home.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ImportQueueServices {
  private token: any;
  constructor(
    private _http: HttpClient,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
  }
 
 

  private apiImportExcelWorkOrder = BaseUrl + environment.WorkOrder.PostImportWorkOrderExcel;

  public ExcelWorkOrderSave(param: any) {
    // console.log(param);
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
}
