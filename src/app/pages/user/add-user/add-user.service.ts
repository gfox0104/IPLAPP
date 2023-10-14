import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { AddUserModel, WorkOrderCustomize, ContractorMap, ContractorMapState, ContractorCoverageArea, CountyZipModel } from './add-user-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { environment } from 'src/environments/environment';
import { DocumentAndFormsDTO, FileMasterModel } from '../../work-order/document-form/document-form-model';


@Injectable({
  providedIn: "root"
})
export class AddUserServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);

    }
  }
  // post data
  private apiUrlPOST = BaseUrl + environment.Admin.PostUser;


  public UsertDataPost(Modelobj: AddUserModel) {
    ////////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    ANYDTO.Carrier = Modelobj.Carrier;
    ANYDTO.User_Comments = Modelobj.User_Comments;
    ANYDTO.User_Active = Modelobj.User_Active;
    ANYDTO.User_Alert_EmailReply = Modelobj.User_Alert_EmailReply;
    ANYDTO.User_Alert_Ready_Office = Modelobj.User_Alert_Ready_Office;
    ANYDTO.User_Assi_Admin = Modelobj.User_Assi_Admin;
    ANYDTO.User_Auto_Assign = Modelobj.User_Auto_Assign;
    ANYDTO.User_CompanyName = Modelobj.User_CompanyName;
    ANYDTO.User_VendoID = Modelobj.User_VendoID;
    ANYDTO.User_Contractor = Modelobj.User_Contractor;
    ANYDTO.User_Disc_percentage = Modelobj.User_Disc_percentage;
    ANYDTO.User_Emai_Reminders = Modelobj.User_Emai_Reminders;
    ANYDTO.User_Email = Modelobj.User_Email;
    ANYDTO.User_Email_FollowUp = Modelobj.User_Email_FollowUp;
    ANYDTO.User_Email_New_Wo = Modelobj.User_Email_New_Wo;
    ANYDTO.User_Email_Note = Modelobj.User_Email_Note;
    ANYDTO.User_Email_UnAssigned_Wo = Modelobj.User_Email_UnAssigned_Wo;
    ANYDTO.User_FirstName = Modelobj.User_FirstName;
    ANYDTO.User_Group = Modelobj.User_Group;
    ANYDTO.User_LastName = Modelobj.User_LastName;
    ANYDTO.User_Leg_Address = Modelobj.User_Leg_Address;
    ANYDTO.User_Leg_Address1 = Modelobj.User_Leg_Address1
    ANYDTO.User_Leg_City = Modelobj.User_Leg_City;
    ANYDTO.User_Leg_FirstName = Modelobj.User_Leg_FirstName;
    ANYDTO.User_Leg_LastName = Modelobj.User_Leg_LastName;
    ANYDTO.User_Leg_Notes = Modelobj.User_Leg_Notes;
    ANYDTO.User_Leg_State = Modelobj.User_Leg_State;
    ANYDTO.User_Misc_Contractor_Score = Modelobj.User_Misc_Contractor_Score;
    ANYDTO.User_Misc_Device_Id = Modelobj.User_Misc_Device_Id;
    ANYDTO.User_Misc_Insurance_Expire = Modelobj.User_Misc_Insurance_Expire;
    ANYDTO.User_Misc_Pruvan_Username = Modelobj.User_Misc_Pruvan_Username;
    ANYDTO.User_Misc_PushKey = Modelobj.User_Misc_PushKey;
    ANYDTO.User_Misc_Service_Id = Modelobj.User_Misc_Service_Id;
    ANYDTO.User_Misc_StartDate = Modelobj.User_Misc_StartDate;
    ANYDTO.User_Password = Modelobj.User_Password;
    ANYDTO.User_Sys_Record = Modelobj.User_Sys_Record;
    ANYDTO.User_Text_FollowUp = Modelobj.User_Text_FollowUp;
    ANYDTO.User_Text_New_Wo = Modelobj.User_Text_New_Wo;
    ANYDTO.User_Text_Note = Modelobj.User_Text_Note;
    ANYDTO.User_Text_Reminders = Modelobj.User_Text_Reminders;
    ANYDTO.User_Text_UnAssigned_Wo = Modelobj.User_Text_UnAssigned_Wo;
    ANYDTO.User_Tme_Zone = Modelobj.User_Tme_Zone;
    ANYDTO.User_Wo_History = Modelobj.User_Wo_History;
    ANYDTO.User_WorkOrder = Modelobj.User_WorkOrder;
    ANYDTO.User_Zip = Modelobj.User_Zip;
    ANYDTO.User_Leg_CellPhone = Modelobj.User_Leg_CellPhone;
    ANYDTO.User_CellNumber = Modelobj.User_CellNumber;
    ANYDTO.User_LoginName = Modelobj.User_LoginName;
    ANYDTO.StrAddressArray = Modelobj.StrAddressArray;
    ANYDTO.User_OpenOrderDisCriteria = Modelobj.User_OpenOrderDisCriteria;
    ANYDTO.User_PastWorkOrder = Modelobj.User_PastWorkOrder;
    ANYDTO.User_PastOrderDisCriteria = Modelobj.User_PastOrderDisCriteria;
    ANYDTO.User_BackgroundCheckProvider = Modelobj.User_BackgroundCheckProvider;
    ANYDTO.User_BackgroundCheckId = Modelobj.User_BackgroundCheckId;
    ANYDTO.User_SelectOrderDisCriteria = Modelobj.User_SelectOrderDisCriteria;
    ANYDTO.User_Processor = Modelobj.User_Processor;
    ANYDTO.User_Cordinator = Modelobj.User_Cordinator;
    ANYDTO.User_Email_Cancelled = Modelobj.User_Email_Cancelled;
    ANYDTO.User_Email_New_Message = Modelobj.User_Email_New_Message;
    ANYDTO.User_Email_Field_Complete = Modelobj.User_Email_Field_Complete;
    ANYDTO.User_Email_Daily_Digest = Modelobj.User_Email_Daily_Digest;
    ANYDTO.User_Text_Cancelled = Modelobj.User_Text_Cancelled;
    ANYDTO.User_Text_New_Message = Modelobj.User_Text_New_Message;
    ANYDTO.User_Text_Field_Complete = Modelobj.User_Text_Field_Complete;
    ANYDTO.User_AssignClient = Modelobj.User_AssignClient;
    ANYDTO.UserDocumentArray = Modelobj.UserDocumentArray;
    debugger;
    ANYDTO.User_IsActive = Modelobj.User_IsActive;
    ANYDTO.User_IsDelete = Modelobj.User_IsDelete;
    ANYDTO.User_Con_Cat_Id = Modelobj.User_Con_Cat_Id;
    ANYDTO.User_Tracking = Modelobj.User_Tracking;
    ANYDTO.User_Tracking_Time = Modelobj.User_Tracking_Time;


    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.User_pkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.User_IsDelete) {
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
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }
  // check user Name
  // post data
  private apiUrlPOST2 = BaseUrl + environment.Admin.CheckUserName;

  public CheckUseName(Modelobj: AddUserModel) {
    //////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    ////dfebugger;
    var ANYDTO: any = {};

    ANYDTO.User_LoginName = Modelobj.User_LoginName;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST2, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {

          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }

  //document upload
  public readDoc(file) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = () => {
        resolve(fr.result);
      }

      fr.readAsDataURL(file);
    });
  }
  public async CommonDocumentsUpdate(Modelobj: WorkOrderCustomize) {
    //debugger;
    const StrEditDTO: any = {};
    StrEditDTO.docx = Modelobj.documentx;


    const ANYDTO: any = {};

    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.IPLNO = 'User_Doc';
    ANYDTO.Client_Result_Photo_Type = 1;
      ANYDTO.Client_PageCalled = 5;
      ANYDTO.Client_Result_Photo_ID = Modelobj.wo_Custo_pkeyID;
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.wo_Custo_UserId;
      ANYDTO.User_Doc_RecievedDate = Modelobj.wo_Custo_RecievedDate;
      ANYDTO.Client_Result_Photo_FileType = Modelobj.wo_Custo_NotificationDate;
      ANYDTO.User_Doc_Exp_Date = Modelobj.wo_Custo_ExpDate;
      ANYDTO.Client_Result_File_Desc = Modelobj.wo_Custo_DocType;

      ANYDTO.Client_Result_Photo_FileName = StrEditDTO.docx.name;
      ANYDTO.Client_Result_Photo_FolderName = 'User_Doc';
      ANYDTO.User_Doc_AlertUser = Modelobj.wo_Custo_AlertUser;
      ANYDTO.Client_Result_Photo_IsActive = Modelobj.wo_Custo_IsActive;
      ANYDTO.Client_Result_Photo_IsDelete = Modelobj.wo_Custo_IsDelete;

    ANYDTO.Type = 1;
    ANYDTO.Image = StrEditDTO.docx;
    ANYDTO.ReqType = 1;  // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 2; //  // 1 for Image 2 for Doc

    const uploadapi = environment.cloudUrl + 'upload';
    const formData = new FormData()
    var data = JSON.stringify(ANYDTO)
    formData.append('ANYDTO','anydto')
    formData.append('xyz',data)

    formData.append('videoFile',ANYDTO.Image, ANYDTO.Client_Result_Photo_FileName)
    //console.log('request packet', ANYDTO,formData)
    let headers = new HttpHeaders({Authorization:'Bearer ' + `${this.token}` });
    return this._http.post<any>(uploadapi, formData, { headers: headers }).pipe(
      tap(data => {
        //console.log('cloudfunctions FireBase Third Party tools', data);
        return data;
      }),
      catchError(this.handleError)
    );
  }
  public readFile(file, w, h) {
    const fr = new FileReader();
    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      }

      fr.onloadend = () => {
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
          resolve(canvas.toDataURL("image/jpeg"));
        }
      }

      fr.readAsDataURL(file);
    });
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
  public async BackgroundDocumentsUpdate(Modelobj: AddUserModel) {
  //debugger
  let latetute = localStorage.getItem('lat')
  let longitute = localStorage.getItem('long')
    const StrEditDTO: any = {};
    const ANYDTO: any = {};






    var data = new FormData();
    const pkeyId = 0;// work order nmber
StrEditDTO.docx = Modelobj.documentx;
    ANYDTO.workOrderNumber = 0;
    ANYDTO.IPLNO = 'Background_Doc';
    ANYDTO.Client_Result_Photo_StatusType = 0;
    ANYDTO.Client_Result_Photo_Wo_ID =  0;// work order nmber;
    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.Client_Result_Photo_Type = 1;
    ANYDTO.Client_Result_Photo_GPSLatitude = latetute
    ANYDTO.Client_Result_Photo_GPSLongitude =  longitute
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


    if (StrEditDTO.docx == undefined) {
      ANYDTO.Client_Result_Photo_FileName = Modelobj.User_BackgroundDocName;

    }else{
      ANYDTO.Client_Result_Photo_FileName = StrEditDTO.docx.name;
    }
    ANYDTO.Client_Result_Photo_FilePath =Modelobj.User_BackgroundDocPath;
    ANYDTO.Type = 5;
    ANYDTO.User_BackgroundCheckProvider = Modelobj.User_BackgroundCheckProvider.toString();
    ANYDTO.Client_Result_Photo_FileType = Modelobj.User_BackgroundCheckId

    ANYDTO.Image =  StrEditDTO.docx;
    ANYDTO.Client_PageCalled = 6;

    ANYDTO.ReqType = 1;  // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 1;
    ANYDTO.Client_Result_Photo_Ch_ID = 0;
    ANYDTO.Client_Result_Photo_ID = Modelobj.User_pkeyID;

    const uploadapi = environment.cloudUrl + 'upload';
    // const uploadapi = 'http://localhost:3000/upload';
    const ImageLg = await this.readFile(StrEditDTO.docx, 1024, 768);
    const Image = await this.readFile(StrEditDTO.docx, 640, 480);
    const ImageSm = await this.readFile(StrEditDTO.docx, 320, 240);
    ANYDTO.Image = Image
    ANYDTO.ImageSm = ImageSm;
    ANYDTO.ImageLg = ImageLg;



    //console.log(ANYDTO,'anydto')

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  private apiUrlcon= BaseUrl + environment.Admin.CoverageDetails;
  public ContractorAddressPost(Modelobj:ContractorCoverageArea) {
    ////dfebugger;
    //console.log('arr',Modelobj)
    var ANYDTO: any = {};
    ANYDTO.Cont_Coverage_Area_PkeyId = Modelobj.Cont_Coverage_Area_PkeyId;
    ANYDTO.Cont_Coverage_Area_State_Id = Modelobj.Cont_Coverage_Area_State_Id;
    ANYDTO.Cont_Coverage_Area_County_Id = Modelobj.Cont_Coverage_Area_County_Id;
    ANYDTO.StrAddressArray = Modelobj.AddressArray;
    ANYDTO.Cont_Coverage_Area_UserID = Modelobj.Cont_Coverage_Area_UserID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlcon, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrldel= BaseUrl + environment.Admin.DeleteContractorAddress;
  public ContractorAddressDel(Modelobj:ContractorCoverageArea) {
    var ANYDTO: any = {};
    ANYDTO.Cont_Coverage_Area_PkeyId = Modelobj.Cont_Coverage_Area_PkeyId;
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
  private apiUrlstate= BaseUrl + environment.Admin.StateDrd;
  public ContractorState(Modelobj:ContractorMapState) {
    ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.IPL_StateID = Modelobj.IPL_StateID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlstate, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }
  private apiUrlcounty= BaseUrl + environment.Admin.CountyDrd;
  public ContractorCounty(Modelobj:ContractorMapState) {
    var ANYDTO: any = {};
    ANYDTO.UserID = Modelobj.UserID
    var obj = {
      IPL_StateID:Modelobj.IPL_StateID,
      Zip_state_id: Modelobj.IPL_StateName,
      Zip_county_name: Modelobj.Zip_county_name,
    };

    ANYDTO.FilterData = JSON.stringify(obj);

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlcounty, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  private apiUrlcountyList = BaseUrl + environment.Admin.ConCounty;
  public ContractorCountyList (Modelobj:DocumentAndFormsDTO) {
    ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Fold_Pkey_Id = Modelobj.Fold_Pkey_Id;
    ANYDTO.Fold_Auto_Assine_PkeyId = Modelobj.Fold_Auto_Assine_PkeyId;
    ANYDTO.Fold_Name = Modelobj.Fold_Name;
    ANYDTO.Fold_Parent_Id = Modelobj.Fold_Parent_Id;
    ANYDTO.Fold_Desc = Modelobj.Fold_Desc;
    ANYDTO.Fold_IsActive = Modelobj.Fold_IsActive;
    ANYDTO.Fold_IsDelete = Modelobj.Fold_IsDelete;
    ANYDTO.AutoAssinArray = Modelobj.AutoAssinArray;
    ANYDTO.PermisionArray = Modelobj.PermisionArray;
    ANYDTO.UserID = Modelobj.UserID;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlcountyList, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  private apiUrlcountyZip= BaseUrl + environment.Admin.ZipChange;
  public CountyZipChange(Modelobj:CountyZipModel) {
    var ANYDTO: any = {};
    ANYDTO.Zip_county_name = Modelobj.Zip_county_name;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlcountyZip, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }
  private apiUrladdzip= BaseUrl + environment.Admin.AddZipCode;
  public AddZip(Modelobj:CountyZipModel) {
    var ANYDTO: any = {};
    ANYDTO.Zip_ID = Modelobj.Zip_ID;
    ANYDTO.Zip_zip = Modelobj.Zip_zip;
    ANYDTO.Zip_state_id = Modelobj.Zip_state_id;
    ANYDTO.Zip_county_name = Modelobj.Zip_county_name;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrladdzip, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  private apiUrlurcounty= BaseUrl + environment.Admin.UserCounty;
  public UserCountyDetails(Modelobj:ContractorMapState) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.UserID = Modelobj.UserID
    ANYDTO.IPL_StateID = Modelobj.IPL_StateID
    ANYDTO.Type = 2


    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlurcounty, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }

  private apiUrlback = BaseUrl + environment.Admin.UpdateBackgroundCheckData;
  public BackgroundUpdate(Modelobj:AddUserModel) {
    ////dfebugger;
    //console.log('arr',Modelobj)
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    ANYDTO.User_BackgroundCheckProvider = Modelobj.User_BackgroundCheckProvider;
    ANYDTO.User_BackgroundDocPath = Modelobj.User_BackgroundDocPath;
    ANYDTO.User_BackgroundCheckId = Modelobj.User_BackgroundCheckId;
    ANYDTO.User_BackgroundDocName = Modelobj.User_BackgroundDocName;
    ANYDTO.Type = 5;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlback, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User...');
      window.location.href = '/admin/login';
    } else {
      alert("Invalid Request...");
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something's wrong, please try again later...");
  }
}
