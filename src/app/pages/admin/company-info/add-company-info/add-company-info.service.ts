import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { CompanyInfoModel } from './add-company-info-model';
import { BaseUrl, CloudUrl } from '../../../../services/apis/rest-api';
import { Documentmodel } from './add-company-info-model';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class CompanyInfoServices {

  public token: any;
  userData: any;
  pkeyuserId = 0;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    this.userData = JSON.parse(localStorage.getItem('usertemp_'));
    if (this.userData != null) {
      this.pkeyuserId = this.userData[0].User_pkeyID;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
     
    } 

  }
  showPosition(position) {
 
    //debugger

 let detail =    {
Lat:   position.coords.latitude,
long:  position.coords.longitude
    }
localStorage.setItem('lat',detail.Lat)
localStorage.setItem('long',detail.long)

  }
  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.companyPost;

  public CompanyInfotDataPost(Modelobj: CompanyInfoModel) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.YR_Company_pkeyID = Modelobj.YR_Company_pkeyID;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.YR_Company_Address = Modelobj.YR_Company_Address;
    ANYDTO.YR_Company_City = Modelobj.YR_Company_City;
    ANYDTO.YR_Company_Con_Name = Modelobj.YR_Company_Con_Name;
    ANYDTO.YR_Company_Email = Modelobj.YR_Company_Email;
    ANYDTO.YR_Company_IsActive = Modelobj.YR_Company_IsActive;
    ANYDTO.YR_Company_Logo = Modelobj.YR_Company_Logo;
    ANYDTO.YR_Company_App_logo = Modelobj.YR_Company_App_logo;
    ANYDTO.YR_Company_Name = Modelobj.YR_Company_Name;
    ANYDTO.YR_Company_PDF_Heading = Modelobj.YR_Company_PDF_Heading;
    ANYDTO.YR_Company_Phone = Modelobj.YR_Company_Phone;
    ANYDTO.YR_Company_Support_Email = Modelobj.YR_Company_Support_Email;
    ANYDTO.YR_Company_Support_Phone = Modelobj.YR_Company_Support_Phone;
    ANYDTO.YR_Company_Zip = Modelobj.YR_Company_Zip;
    ANYDTO.YR_Company_State = Modelobj.YR_Company_State;
    ANYDTO.YR_Company_IsDelete = Modelobj.YR_Company_IsDelete;
    ANYDTO.YR_Company_UserID = this.pkeyuserId;
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.YR_Company_pkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.YR_Company_IsDelete) {
        ANYDTO.Type = 4;
      }
    }
    else{
      ANYDTO.Type = 3;
    } 

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

  
  public readFile(file, w, h) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = async() => {
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
        }
      }

      fr.readAsDataURL(file);
    });
  }
  public async CompanyImageUpdate(Modelobj: Documentmodel) {
    //debugger
    let ANYDTO: any = {};
    let latetute = localStorage.getItem('lat')
    let longitute = localStorage.getItem('long')

    var data = new FormData();
    const pkeyId = Modelobj.App_Com_Img_pkeyID;// work order nmber

    ANYDTO.workOrderNumber = 0;
    ANYDTO.IPLNO = 'Company';
    ANYDTO.Client_Result_Photo_StatusType = 0;
    ANYDTO.Client_Result_Photo_Wo_ID =  parseInt(Modelobj.Pkey_Id);// work order nmber;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Filedata.name;
    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.Client_Result_Photo_Type = 1;
    ANYDTO.Client_Result_Photo_GPSLatitude = 54.43553989213321
    ANYDTO.Client_Result_Photo_GPSLongitude = 28.73842144012451
    ANYDTO.Client_Result_Photo_GPSAltitude = 3.5415
    ANYDTO.Client_Result_Photo_Model="Model"
    ANYDTO.Client_Result_Photo_Make = 'Make'
    ANYDTO.Client_Result_Photo_DateTimeOriginal = Modelobj.date;
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


    if (Modelobj.Filedata.name == null) {
      ANYDTO.Client_Result_Photo_FileName = Modelobj.Filedata.name;;
    }
    ANYDTO.Client_Result_Photo_FilePath =Modelobj.App_Com_Img_FilePath;
    ANYDTO.Type = Modelobj.Type;

    ANYDTO.Image =  Modelobj.Filedata;
    ANYDTO.Client_PageCalled = 3;
    
    ANYDTO.ReqType = 1;  // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 1;
    ANYDTO.Client_Result_Photo_Ch_ID = 0;
    ANYDTO.Client_Result_Photo_ID = Modelobj.App_Com_Img_pkeyID;
    
    const uploadapi = environment.cloudUrl + 'upload';
    // const uploadapi = 'http://localhost:3000/upload';
    const ImageLg = await this.readFile(Modelobj.Filedata, 1024, 768);
    const Image = await this.readFile(Modelobj.Filedata, 640, 480);
    const ImageSm = await this.readFile(Modelobj.Filedata, 320, 240);
    ANYDTO.Image = Image
    ANYDTO.ImageSm = ImageSm;
    ANYDTO.ImageLg = ImageLg;

    //console.log('image',ANYDTO)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }
  // get document
  private apiUrl = BaseUrl + "/api/RESTIPLUPLOAD/GetAppCompanyInfoImageData";

  public GetCompanyDocument(Modelobj: CompanyInfoModel) {
    var GetDocDTO: any = {};
    GetDocDTO.App_Com_Img_pkeyID = 0;
    GetDocDTO.App_Com_Img_CompanyID = Modelobj.YR_Company_pkeyID;
    GetDocDTO.Type = 3;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrl, GetDocDTO, { headers: headers })
      .pipe(tap(data => {
        return data;
      }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get document
  private apiUrlGetSingle = BaseUrl + "api/RESTIPL/GetAppCompanySingle";

  public GetAppCompanySingle(Modelobj: CompanyInfoModel) {
    var AnyDTO: any = {};
    AnyDTO.YR_Company_UserID = Modelobj.UserID;
    AnyDTO.YR_Company_pkeyID = Modelobj.YR_Company_pkeyID;
    AnyDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrlGetSingle, AnyDTO, { headers: headers })
      .pipe(tap(data => {
        return data;
      }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
