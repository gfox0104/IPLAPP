import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { HomepageServices } from "../../../home/home.service";
import { WorkSettingsPageModel } from "./work-setting-model";

@Injectable({
    providedIn: "root"
  })
  export class WorkSettingsPageServices {
  
    public token: any;
  
    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlGet = BaseUrl + environment.Admin.GetWorkOrderSettingDataDetails;

    public GetWorkOrderSettingDataDetails(Modelobj:WorkSettingsPageModel ) {
     
        //debugger
      var ANYDTO: any = {};
      ANYDTO.Type = Modelobj.Type;
      ANYDTO.WOS_PkeyID= Modelobj.WOS_PkeyID;
  
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            console.log('return',data)
            return data;
            
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

    // CreateUpdateWorkOrderSetting
    private apiUrlPOST = BaseUrl + environment.Admin.CreateUpdateWorkOrderSettingMaster;
    // debugger
    public CreateUpdateWorkOrderSettingMaster(Modelobj: WorkSettingsPageModel) {
      var ANYDTO: any = {};
      ANYDTO.WOS_PkeyID = Modelobj.WOS_PkeyID;
      ANYDTO.WOS_Contractor_Work_Order_Rejection = Modelobj.WOS_Contractor_Work_Order_Rejection;
      ANYDTO.WOS_Work_Order_To_Previous_Contractor = Modelobj.WOS_Work_Order_To_Previous_Contractor;
      ANYDTO.WOS_Contractor_Compancy_Name = Modelobj.WOS_Contractor_Compancy_Name;
      ANYDTO.WOS_Contractor_Vendor_Id = Modelobj.WOS_Contractor_Vendor_Id;
      ANYDTO.WOS_Contractor_list_Sorting = Modelobj.WOS_Contractor_list_Sorting;
      ANYDTO.WOS_EST_Completion_Date = Modelobj.WOS_EST_Completion_Date;
      ANYDTO.WOS_EST_Date_Allowed_Past = Modelobj.WOS_EST_Date_Allowed_Past;
      ANYDTO.WOS_EST_Date_List_Shows = Modelobj.WOS_EST_Date_List_Shows;
      ANYDTO.WOS_Browser_Tab_Name = Modelobj.WOS_Browser_Tab_Name;
      ANYDTO.WOS_Company_Name_On_Work_Order  = Modelobj.WOS_Company_Name_On_Work_Order;
      ANYDTO.WOS_Default_Timezone = Modelobj.WOS_Default_Timezone;
      ANYDTO.WOS_Client_Name_To_Office_Staff = Modelobj.WOS_Client_Name_To_Office_Staff;
      ANYDTO.WOS_Remove_Pricing  = Modelobj.WOS_Remove_Pricing;
      ANYDTO.WOS_Highlight_Pricing = Modelobj.WOS_Highlight_Pricing;
      ANYDTO.WOS_Loan_On_Work_Orders = Modelobj.WOS_Loan_On_Work_Orders;
      ANYDTO.WOS_Client_Company_On_Work_Orders = Modelobj.WOS_Client_Company_On_Work_Orders;
      ANYDTO.WOS_Customer_On_Work_Orders = Modelobj.WOS_Customer_On_Work_Orders;
      ANYDTO.WOS_Documents_Expiration = Modelobj.WOS_Documents_Expiration;
      ANYDTO.WOS_Contractor_Availability = Modelobj.WOS_Contractor_Availability;
      ANYDTO.WOS_Escalated_Work_Order = Modelobj.WOS_Escalated_Work_Order;
      ANYDTO.WOS_Allows_Duplicate_Work_Order = Modelobj.WOS_Allows_Duplicate_Work_Order;
      ANYDTO.WOS_Work_Orders_To_Previous_Contractor = Modelobj.WOS_Work_Orders_To_Previous_Contractor;
      ANYDTO.WOS_Work_Order_Assigned_Coordinator = Modelobj.WOS_Work_Order_Assigned_Coordinator;
      ANYDTO.WOS_Work_Order_Assigned_Processor = Modelobj.WOS_Work_Order_Assigned_Processor;
      ANYDTO.WOS_Work_Order_Email = Modelobj.WOS_Work_Order_Email;
      ANYDTO.WOS_Contractor_Alert_for_U_read = Modelobj.WOS_Contractor_Alert_for_U_read;
      ANYDTO.WOS_Contractor_Late_Orders = Modelobj.WOS_Contractor_Late_Orders;
      ANYDTO.WOS_Contractor_Opens_Orders = Modelobj.WOS_Contractor_Opens_Orders;
      ANYDTO.WOS_Photos_be_Labeled = Modelobj.WOS_Photos_be_Labeled;
      ANYDTO.WOS_Allow_Date_Stamps = Modelobj.WOS_Allow_Date_Stamps;
      ANYDTO.WOS_Allow_Metadata = Modelobj.WOS_Allow_Metadata;
      ANYDTO.WOS_Date_Stamp_Format = Modelobj.WOS_Date_Stamp_Format;
      ANYDTO.WOS_Minimum_Number_of_Photos = Modelobj.WOS_Minimum_Number_of_Photos;
      ANYDTO.WOS_Bid_Photo_Labels = Modelobj.WOS_Bid_Photo_Labels;
      ANYDTO.WOS_Completion_Photo_Lables = Modelobj.WOS_Completion_Photo_Lables;
      ANYDTO.WOS_Damage_Photo_Lables = Modelobj.WOS_Damage_Photo_Lables;
      ANYDTO.WOS_Inspection_Photo_Lables = Modelobj.WOS_Inspection_Photo_Lables;
      ANYDTO.WOS_Custom_Photo_Lables = Modelobj.WOS_Custom_Photo_Lables;
      ANYDTO.WOS_Allow_Invoice_Number = Modelobj.WOS_Allow_Invoice_Number;
      ANYDTO.WOS_Show_Completion_Comments = Modelobj.WOS_Show_Completion_Comments;
      ANYDTO.WOS_Allow_Metadata_To_Modified = Modelobj.WOS_Allow_Metadata_To_Modified;
      ANYDTO.WOS_Dafault_Transfer_Completion_Task = Modelobj.WOS_Dafault_Transfer_Completion_Task;
      ANYDTO.WOS_Contractor_Invoice_Flat_Fee = Modelobj.WOS_Contractor_Invoice_Flat_Fee;
      ANYDTO.WOS_Client_Invoice_Flat_Fee = Modelobj.WOS_Client_Invoice_Flat_Fee;
      ANYDTO.WOS_Print_Company_Logo_Invoice = Modelobj.WOS_Print_Company_Logo_Invoice;
      ANYDTO.WOS_Print_ABC_Number_on_Invoice = Modelobj.WOS_Print_ABC_Number_on_Invoice;
      ANYDTO.WOS_Print_Invoice_Date = Modelobj.WOS_Print_Invoice_Date;
      ANYDTO.WOS_IsActive = Modelobj.WOS_IsActive
      ANYDTO.UserID = Modelobj.UserID;
      ANYDTO.Type = Modelobj.Type;
  
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

}
