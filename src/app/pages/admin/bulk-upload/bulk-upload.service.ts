import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseUrl } from "../../../services/apis/rest-api";
import { HomepageServices } from "../../home/home.service";
import {environment} from '../../../../environments/environment'
import { BindDataModel } from "../../client-result/client-result/client-result-model";
@Injectable({
  providedIn: "root"
})

export class BulkUploadServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  public async MultiBulkUpdate(Modelobj: BindDataModel) {
    //debugger
  Modelobj.documentx;
    var data = new FormData();
    const pkeyId = Modelobj.Common_pkeyID.toString();
    let ANYDTO: any = {};
    ANYDTO.workOrderNumber = 'Sr.No';
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Client_Result_Photo_StatusType = Modelobj.Client_Result_Photo_StatusType;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString();// work order nmber;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Client_Result_Photo_FileName;
    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.Client_Result_Photo_Type = 1;


   
    ANYDTO.Client_Result_Photo_GPSLatitude = '19.78.234';
    
    ANYDTO.Client_Result_Photo_GPSLongitude = "17.78.234";
    ANYDTO.Client_Result_Photo_GPSAltitude = 3.5415
    ANYDTO.Client_Result_Photo_Model="Model"
    ANYDTO.Client_Result_Photo_Make = 'Make'
    ANYDTO.Client_Result_Photo_DateTimeOriginal = Modelobj.datedetals;
    ANYDTO.Rating = 4
    ANYDTO.ExposureTime = [1,2618]
    ANYDTO.ISOSpeedRatings = [100]
    ANYDTO.Saturation = 0
    ANYDTO.Sharpness = 0
    ANYDTO.Contrast = 0
    ANYDTO.MeteringMode = 5
    ANYDTO.Flash = 24
    ANYDTO.MaxApertureValue=[169,100]
    ANYDTO.FocalLength = [24,5]
    ANYDTO.FocalLengthIn35mmFilm = 10
    ANYDTO.ShutterSpeedValue = [114234,10061]


    if (Modelobj.Client_Result_Photo_FileName == null) {
      ANYDTO.Client_Result_Photo_FileName = 'abc';
    }
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.Client_Result_Photo_FilePath;
    ANYDTO.Type = Modelobj.Type;

    
    
    ANYDTO.ReqType = 1;  // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 1;
    ANYDTO.Client_Result_Photo_Ch_ID = 0;
    ANYDTO.Client_Result_Photo_ID = 0;
    
     const uploadapi = environment.cloudUrl + 'upload';
    // const uploadapi = 'http://localhost:3000/upload';
    const ImageLg =  Modelobj.documentx;
    const Image =  Modelobj.documentx;
    const ImageSm =  Modelobj.documentx;
    ANYDTO.Image = Image
 
  //  console.log('ANYDTO',ANYDTO)
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>( uploadapi ,ANYDTO, { headers: headers }).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User...');
      window.location.href = '/admin/login';
    } else {
      alert("Invalid Request...");
    }
    
    // return an observable wi bad happenedth a user-facing error message
    return throwError("Something's wrong, please try again later...");
  }

}
