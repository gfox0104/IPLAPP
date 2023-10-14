
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from "src/environments/environment";
import { HomepageServices } from "src/app/pages/home/home.service";
import { NFR_Dump_Receipt_Form_Master } from "./nfr-dump-receipt-form.model";

@Injectable({
    providedIn: "root"
})

export class NRFDumpReceiptFormService {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlFormsMasterData = BaseUrl + environment.ClientResult.PostNfrDumpReceiptFormMasterData;
    public PostNRFDumpReceiptFormMaster(ModelObj: NFR_Dump_Receipt_Form_Master) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.NF_PkeyID = ModelObj.NF_PkeyID;
        ANYDTO.NF_NFR_WO_ID = ModelObj.NF_NFR_WO_ID;
        ANYDTO.NF_NFR_Dump_Receipt = ModelObj.NF_NFR_Dump_Receipt;
        ANYDTO.NF_IsActive = ModelObj.NF_IsActive;
        ANYDTO.NF_IsDelete = ModelObj.NF_IsDelete;
        ANYDTO.fwo_pkyeId = ModelObj.fwo_pkyeId;
        ANYDTO.Type = ModelObj.Type;
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlFormsMasterData, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlgetFormsMasterData = BaseUrl + environment.ClientResult.GetNfrDumpReceiptFormMasterData;
    public GetNRFDumpReceiptFormMaster(ModelObj: NFR_Dump_Receipt_Form_Master) {
        var ANYDTO: any = {};
        ANYDTO.NF_PkeyID = ModelObj.NF_PkeyID;
        ANYDTO.NF_NFR_WO_ID = ModelObj.NF_NFR_WO_ID;
        ANYDTO.Type = ModelObj.Type;
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlgetFormsMasterData, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

}
