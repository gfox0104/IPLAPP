import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { HomepageServices } from '../../home/home.service';
import { BaseUrl } from "src/app/services/apis/rest-api";

import { BindDataModel } from "../client-result/client-result-model";
import { ClientResultPIModel } from "../client-result-property-info/client-result-property-info-model";
// import { ClientResultPIModel } from "./client-result-new-property-info-model";

@Injectable({
    providedIn: "root"
  })

  export class ClientResultPIServices {
    public Errorcall;
    public token: any;
    baseUrl = environment.domain;
  
    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
  
    private pipostUrl = BaseUrl + environment.ClientResult.AddClientResultPropertyInfoData;
    public AddClientResultPropertyInfoPost(Modelobj: ClientResultPIModel) {
      // debugger
      var ANYDTO: any = {};
      ANYDTO.CRPI_PkeyID = Modelobj.PI_PkeyID;
      ANYDTO.CRPI_WO_ID = Modelobj.PI_WO_ID;
      ANYDTO.CRPI_LockCode = Modelobj.PI_LockCode;
      ANYDTO.CRPI_LockBox = Modelobj.PI_LockBox;
      ANYDTO.CRPI_LotSize = Modelobj.PI_LotSize;
      ANYDTO.CRPI_Lot_Size_Pricing  = Modelobj.CRPI_Lot_Size_Pricing 
      ANYDTO.CRPI_ICC = Modelobj.PI_ICC;
      ANYDTO.CRPI_ICCDate = Modelobj.PI_ICCDate;
      ANYDTO.CRPI_DaysInDefault = Modelobj.PI_DaysInDefault;
      ANYDTO.CRPI_VPRRequired = Modelobj.PI_VPRRequired;
      ANYDTO.CRPI_VPRField = Modelobj.PI_VPRField;
      ANYDTO.CRPI_VPRExpDate = Modelobj.PI_VPRExpDate;
      ANYDTO.CRPI_InitDefaultDate = Modelobj.PI_InitDefaultDate;
      ANYDTO.CRPI_PtvDate = Modelobj.PI_PtvDate;
      ANYDTO.CRPI_InitSecureDate = Modelobj.PI_InitSecureDate;
      ANYDTO.CRPI_DidRecDate = Modelobj.PI_DidRecDate;
      ANYDTO.CRPI_RecurringDate = Modelobj.PI_RecurringDate;
      ANYDTO.CRPI_IsActive = Modelobj.PI_IsActive;
      ANYDTO.CRPI_OrCovDate = Modelobj.PI_OrCovDate;
      ANYDTO.CRPI_ExtReqDate = Modelobj.PI_ExtReqDate;
      ANYDTO.CRPI_NewCovDate = Modelobj.PI_NewCovDate;
      ANYDTO.CRPI_ExtReq = Modelobj.PI_ExtReq;
      ANYDTO.CRPI_Gason = Modelobj.PI_Gason;
      ANYDTO.CRPI_Wateron = Modelobj.PI_Wateron;
      ANYDTO.CRPI_Elcton = Modelobj.PI_Elcton;
      ANYDTO.CRPI_GasLR = Modelobj.PI_GasLR;
      ANYDTO.CRPI_GasTS = Modelobj.PI_GasTS;
      ANYDTO.CRPI_WaterLR = Modelobj.PI_WaterLR;
      ANYDTO.CRPI_WaterTS = Modelobj.PI_WaterTS;
      ANYDTO.CRPI_ElctLR = Modelobj.PI_ElctLR;
      ANYDTO.CRPI_ElctTS = Modelobj.PI_ElctTS;
      ANYDTO.CRPI_BrokerInfo = Modelobj.CRPI_BrokerInfo;
      ANYDTO.CRPI_LoanNumber = Modelobj.CRPI_LoanNumber;
      ANYDTO.CRPI_LoanType = (Modelobj.CRPI_LoanType).toString();
      ANYDTO.CRPI_Mortgagor = Modelobj.CRPI_Mortgagor;
      ANYDTO.CRPI_Loan_Status = Modelobj.CRPI_Loan_Status;
      ANYDTO.CRPI_Occupanct_Status = Modelobj.CRPI_Occupanct_Status;
      ANYDTO.CRPI_Property_Locked = Modelobj.CRPI_Property_Locked;
      ANYDTO.CRPI_Property_Alert = Modelobj.CRPI_Property_Alert;
      ANYDTO.CRPI_Property_Status = Modelobj.CRPI_Property_Status;
      ANYDTO.CRPI_Property_Type = Modelobj.CRPI_Property_Type;
      ANYDTO.CRPI_Front_Of_HouseImagePath = Modelobj.CRPI_Front_Of_HouseImagePath;
      ANYDTO.CRPI_Front_Of_HouseImageName = Modelobj.CRPI_Front_Of_HouseImageName;
      ANYDTO.CRPI_GPS_Latitude = Modelobj.CRPI_GPS_Latitude;
      ANYDTO.CRPI_GPS_longitude = Modelobj.CRPI_GPS_longitude;
      ANYDTO.Type = Modelobj.Type;
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.pipostUrl, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }
  
    private piGetUrl = BaseUrl + environment.ClientResult.GetClientResultPropertyInfoData;
    public GetClientResultPropertyInfo(Modelobj: ClientResultPIModel) {
      // debugger
      var ANYDTO: any = {};
      ANYDTO.CRPI_PkeyID = Modelobj.PI_PkeyID;
      ANYDTO.CRPI_WO_ID = Modelobj.PI_WO_ID;
      ANYDTO.Type = Modelobj.Type;
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.piGetUrl, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }
  
    public async CommonPhotosUpdate(Modelobj: BindDataModel) {
      // debugger;
      let latetute = localStorage.getItem('lat');
      let longitute = localStorage.getItem('long');
  
      var StrEditDTO: any = {};
  
      StrEditDTO.docx = Modelobj.documentx;
      var data = new FormData();
      const pkeyId = Modelobj.Common_pkeyID.toString(); // work order nmber
      let ANYDTO: any = {};
      ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
      ANYDTO.IPLNO = Modelobj.IPLNO;
      ANYDTO.Client_Result_Photo_StatusType =
        Modelobj.Client_Result_Photo_StatusType;
      ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString(); // work order nmber;
      ANYDTO.Client_Result_Photo_FileName = Modelobj.Client_Result_Photo_FileName;
      ANYDTO.Client_Result_Photo_Seq = Modelobj.Client_Result_Photo_Seq;
      ANYDTO.Client_Result_Photo_IsActive = 1;
      ANYDTO.Client_Result_Photo_Type = 1;
  
      ANYDTO.Client_Result_Photo_GPSLatitude = latetute;
  
      ANYDTO.Client_Result_Photo_GPSLongitude = longitute;
      ANYDTO.Client_Result_Photo_GPSAltitude = 3.5415;
      ANYDTO.Client_Result_Photo_Model = 'Model';
      ANYDTO.Client_Result_Photo_Make = 'Make';
      ANYDTO.Client_Result_Photo_DateTimeOriginal = Modelobj.datedetals;
      ANYDTO.Rating = 4;
      ANYDTO.ExposureTime = [1, 2618];
      ANYDTO.ISOSpeedRatings = [100];
      ANYDTO.Saturation = 0;
      ANYDTO.Sharpness = 0;
      ANYDTO.Contrast = 0;
      ANYDTO.MeteringMode = 5;
      ANYDTO.Flash = 24;
      ANYDTO.MaxApertureValue = [169, 100];
      ANYDTO.FocalLength = [24, 5];
      ANYDTO.FocalLengthIn35mmFilm = 10;
      ANYDTO.ShutterSpeedValue = [114234, 10061];
  
      if (Modelobj.Client_Result_Photo_FileName == null) {
        ANYDTO.Client_Result_Photo_FileName = StrEditDTO.docx.name;
      }
      ANYDTO.Client_Result_Photo_FilePath = Modelobj.Client_Result_Photo_FilePath;
      ANYDTO.Type = Modelobj.Type;
  
      ANYDTO.Image = StrEditDTO.docx;
  
      ANYDTO.ReqType = 1; // 1 for Desktop 2 for Mobile
      ANYDTO.ContentType = 7;
      ANYDTO.Client_Result_Photo_Ch_ID = 0;
      ANYDTO.Client_Result_Photo_ID = 0;
  
      const uploadapi = environment.cloudUrl + 'upload';
      // const uploadapi = 'http://localhost:3000/upload';
      const ImageLg = await this.readFile(StrEditDTO.docx, 1024, 768);
      const Image = await this.readFile(StrEditDTO.docx, 640, 480);
      const ImageSm = await this.readFile(StrEditDTO.docx, 320, 240);
      ANYDTO.Image = Image;
      ANYDTO.ImageSm = ImageSm;
      ANYDTO.ImageLg = ImageLg;
      console.log('ANYDTO', ANYDTO);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
    }
  
    public readFile(file, w, h) {
      const fr = new FileReader();
      return new Promise((resolve, reject) => {
        fr.onerror = (err) => {
          reject(err);
        };
  
        fr.onloadend = async () => {
          const canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
  
          // set its dimension to target size
          canvas.width = w;
          canvas.height = h;
  
          const image = new Image();
          image.src = fr.result.toString();
          image.onload = function () {
            // draw source image into the off-screen canvas:
            ctx.drawImage(image, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg'));
          };
        };
  
        fr.readAsDataURL(file);
      });
    }
  }