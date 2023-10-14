import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import * as piexif from 'piexifjs';
import { buffer, catchError, tap } from 'rxjs/operators';
import * as ExifReader from 'exifreader';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
  ClientResultPhotoModel,
  TaskBidPhoto,
  Custom_PhotoLabel,
  WorkOrder_CustomPhotoLabel,
  ClientPhotoRef,
} from './client-result-photo-model';
import { environment } from '../../../../environments/environment';
import { BindDataModel } from '../client-result/client-result-model';
import { HomepageServices } from '../../home/home.service';
import { async } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';

@Injectable({
  providedIn: 'root',
})
export class ClientResultOldPhotoServices {
  public Lat;
  public Long;
  private token: any;
  baseUrl = environment.domain;

  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices,
    private sanitizer: DomSanitizer
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }

  showPosition(position) {
    //debugger

    let detail = {
      Lat: position.coords.latitude,
      long: position.coords.longitude,
    };
    localStorage.setItem('lat', detail.Lat);
    localStorage.setItem('long', detail.long);
  }
  // private apiUrlGet = this.baseUrl + "api/MultiPhoto/GetCLientResultPhotos";
  private apiUrlGet = environment.ClientResult.GetCLientResultPhotos;

  public ViewCLientImagesData(Modelobj: ClientResultPhotoModel) {
    let ANYDTO: any = {};

    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;
    ANYDTO.IPLNO = Modelobj.IPLNO;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public downloadZipforWorkorder(workOrderId: any, files: any, labels: any) {
    let ANYDTO: any = {};

    ANYDTO.Files = -files;
    ANYDTO.Labels = labels;
    ANYDTO.FolderName = 'abc';
    ANYDTO.WorkOrderNumber = workOrderId;
    ANYDTO.Address = 'address';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(environment.ClientResult.DownloadZip, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // add document for mutiple client phtotos

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

  dataURItoBlob(dataURI) {
    //debugger
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  public async SinglePhotoUpdate(Modelobj: BindDataModel, edited) {
    let latetute = localStorage.getItem('lat');
    let longitute = localStorage.getItem('long');
    var StrEditDTO: any = {};
    StrEditDTO.docx = Modelobj.documentx;
    let ANYDTO: any = {};

    ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Client_Result_Photo_StatusType =
      Modelobj.Client_Result_Photo_StatusType;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString(); // work order nmber;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Client_Result_Photo_FileName;
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.Client_Result_Photo_FilePath;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Client_Result_Photo_IsActive = 1;
    ANYDTO.Client_Result_Photo_Type = 1;
    ANYDTO.Client_Result_Photo_Ch_ID = 0;
    ANYDTO.Image = StrEditDTO.docx;
    ANYDTO.ReqType = 1; // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 1; //  // 1 for Image 2 for Doc
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
    ANYDTO.Client_Result_Photo_ID = 0;
    //const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/upload';

    const uploadapi = environment.cloudUrl + 'upload';
    // const uploadapi = 'http://localhost:3000/upload';
    var str = edited;
    var res = str.split('data:image/png;base64,');

    const base64 = res[1];
    const imageName = edited.photoLabel;
    const imageBlob = this.dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

    const ImageLg = await this.readFile(imageFile, 1024, 768);
    const Image = await this.readFile(imageFile, 640, 480);
    const ImageSm = await this.readFile(imageFile, 320, 240);

    ANYDTO.Image = Image;
    ANYDTO.ImageLg = ImageLg;
    ANYDTO.ImageSm = ImageSm;
    //console.log('edit',ANYDTO)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  public readDoc(file) {
    const fr = new FileReader();

    return new Promise((resolve, reject) => {
      fr.onerror = (err) => {
        reject(err);
      };

      fr.onloadend = () => {
        resolve(fr.result);
      };

      fr.readAsDataURL(file);
    });
  }

  public async CommonPhotosUpdate(Modelobj: BindDataModel) {
    // debugger;

    var latetute="";
    var longitute="";
    latetute = localStorage.getItem('WO_lat');
    longitute =localStorage.getItem('WO_long');
    if(latetute==="" || longitute==="")
    {
      latetute = localStorage.getItem('lat');
      longitute = localStorage.getItem('long');
    }


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
    ANYDTO.ContentType = 1;
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
      catchError(this.handleError)
    );
  }

  public async CommonDocumentsUpdate(Modelobj: BindDataModel) {
    debugger
    const StrEditDTO: any = {};
    StrEditDTO.docx = Modelobj.documentx;
    const pkeyId = Modelobj.workOrderNumber.toString();
    const ANYDTO: any = {};

    ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Client_Result_Photo_StatusType =
      Modelobj.Client_Result_Photo_StatusType;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString(); // work order nmber;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Client_Result_Photo_FileName;
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.Client_Result_Photo_FilePath;
    ANYDTO.Client_Result_Photo_IsActive = true;
    ANYDTO.Client_Result_Photo_Type = 1;

    if (Modelobj.Client_PageCalled == 1) {
      ANYDTO.Client_PageCalled = 1;
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.Client_Result_Photo_Ch_ID;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Inst_Doc_PkeyID;
    } else if (Modelobj.Client_PageCalled == 3) {
      ANYDTO.Client_PageCalled = 3;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Inst_Doc_PkeyID;
      ANYDTO.Client_Result_Photo_Ch_ID = 0;
    } else if (Modelobj.Client_PageCalled == 4) {
      ANYDTO.Client_PageCalled = 4;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.Client_Result_Photo_Ch_ID;
      ANYDTO.Client_Result_File_Desc = Modelobj.Client_Result_File_Desc;
      ANYDTO.Fold_Is_AutoAssign = Modelobj.Fold_Is_AutoAssign;
    } else if (Modelobj.Client_PageCalled == 7) {
      ANYDTO.Client_PageCalled = 7;
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.Client_Result_Photo_Ch_ID;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Inst_Doc_PkeyID;
      ANYDTO.WorkOrder_ID_Data = Modelobj.WorkOrder_ID_Data;
    } else if (Modelobj.Client_PageCalled == 8) {
      ANYDTO.Client_PageCalled = 8;
      ANYDTO.Client_PaClient_PageCalledgeCalled = 8;
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.Client_Result_Photo_Ch_ID;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    } else if (Modelobj.Client_PageCalled == 10) {
      ANYDTO.Client_PageCalled = 10;
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.Client_Result_Photo_Ch_ID;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    }
    else if (Modelobj.Client_PageCalled == 11) {
      ANYDTO.Client_PageCalled = 11;
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.Client_Result_Photo_Ch_ID;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    }

    else 
    {
      ANYDTO.Client_Result_Photo_Ch_ID = Modelobj.Client_Result_Photo_Ch_ID;
      ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
      ANYDTO.Client_PageCalled = 2;
    }

    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Image = StrEditDTO.docx;
    ANYDTO.ReqType = 1; // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 2; //  // 1 for Image 2 for Doc

    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + `${this.token}`,
    });
    if (ANYDTO.ContentType == 1) {
      const uploadapi = environment.cloudUrl + 'upload';
      const doc = await this.readDoc(StrEditDTO.docx);
      ANYDTO.Image = doc;
      return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
    } else if (ANYDTO.ContentType == 2) {
      const uploadapi = environment.cloudUrl + 'upload';
      const formData = new FormData();
      var data = JSON.stringify(ANYDTO);
      formData.append('ANYDTO', 'anydto');
      formData.append('xyz', data);

      formData.append(
        'videoFile',
        ANYDTO.Image,
        ANYDTO.Client_Result_Photo_FileName
      );
      //console.log('request packet', ANYDTO,formData)
      return this._http
        .post<any>(uploadapi, formData, { headers: headers })
        .pipe(
          tap((data) => {
            return data;
          }),
          catchError(this.handleError)
        );
    }
    //debugger
  }

  public async CommonDocumentsUpdatePCR(Modelobj: BindDataModel) {
    debugger
    const StrEditDTO: any = {};
    StrEditDTO.docx = Modelobj.documentx;
    const pkeyId = Modelobj.workOrderNumber.toString();
    const ANYDTO: any = {};

    ANYDTO.workOrderNumber = Modelobj.workOrderNumber;
    ANYDTO.IPLNO = Modelobj.IPLNO;
    ANYDTO.Client_Result_Photo_StatusType =
      Modelobj.Client_Result_Photo_StatusType;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Common_pkeyID.toString(); // work order nmber;
    ANYDTO.Client_Result_Photo_FileName = Modelobj.Client_Result_Photo_FileName;
    ANYDTO.Client_Result_Photo_FilePath = Modelobj.Client_Result_Photo_FilePath;
    ANYDTO.Client_Result_Photo_IsActive = true;
    ANYDTO.Client_Result_Photo_Type = 1;

    
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Image = StrEditDTO.docx;
    ANYDTO.ReqType = 1; // 1 for Desktop 2 for Mobile
    ANYDTO.ContentType = 2; //  // 1 for Image 2 for Doc
    ANYDTO.Client_PageCalled = 13;

    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + `${this.token}`,
    });
    // if (ANYDTO.ContentType == 1) {
    //   const uploadapi = environment.cloudUrl + 'upload';
    //   const doc = await this.readDoc(StrEditDTO.docx);
    //   ANYDTO.Image = doc;
    //   return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
    //     tap((data) => {
    //       return data;
    //     }),
    //     catchError(this.handleError)
    //   );
    //  } 
    // else if (ANYDTO.ContentType == 2) {
      const uploadapi = environment.cloudUrl + 'upload';
      const formData = new FormData();
      var data = JSON.stringify(ANYDTO);
      formData.append('ANYDTO', 'anydto');
      formData.append('xyz', data);

      formData.append(
        'videoFile',
        ANYDTO.Image,
        ANYDTO.Client_Result_Photo_FileName
      );
      //console.log('request packet', ANYDTO,formData)
      return this._http
        .post<any>(uploadapi, formData, { headers: headers })
        .pipe(
          tap((data) => {
            console.log('return',data)
            return data;
          }),
          catchError(this.handleError)
        );
    // }
    //debugger
  }


  //Delete Client Photo
  private apiUrlPOSTConuc =
    this.baseUrl + environment.ClientResult.DeleteClientResultsPhotos;

  public DeleteCLientImagesData(Modelobj: ClientResultPhotoModel) {
    let ANYDTO: any = {};

    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTConuc, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  ///task according delete photo
  private apiUrlPOSTtask =
    this.baseUrl + environment.ClientResult.TaskDeleteClientResultsPhotos;

  public DeleteTaskCLientPhotoData(Modelobj: ClientPhotoRef) {
    let ANYDTO: any = {};
    ANYDTO.CRP_New_pkeyId = Modelobj.CRP_New_pkeyId;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTtask, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  // get task bid photos
  private apiUrlGettask =
    this.baseUrl + environment.ClientResult.GettaskbidPhotos;

  public taskphotoClient(Modelobj: TaskBidPhoto) {
    var ANYDTO: any = {};

    ANYDTO.Task_Bid_TaskID = Modelobj.Task_Bid_TaskID;
    ANYDTO.Task_Bid_WO_ID = Modelobj.Task_Bid_WO_ID;
    ANYDTO.Task_Bid_Sys_Type = 1;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGettask, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGetMaster =
    this.baseUrl + environment.ClientResult.GetCLientResultPhotosMaster;

  public ViewCLientImagesDataMaster(Modelobj: ClientResultPhotoModel) {
    debugger
    let ANYDTO: any = {};

    ANYDTO.Type = 1; //Modelobj.Type; // becoz complet f
    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetMaster, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  ///////////////////
  private apiUrlGetre =
    this.baseUrl + environment.ClientResult.UpdateCLientResultPhotos;
  public ReloadCLientImagesDataMaster(Modelobj: ClientResultPhotoModel) {
    //debugger
    let ANYDTO: any = {};

    ANYDTO.Type = 3;
    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetre, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  ////////////////
  //update Client Results Photos
  private apiUrlPOST =
    this.baseUrl + environment.ClientResult.PostUpdateclientphoto;

  public UpdateDataPost(Modelobj: ClientResultPhotoModel) {
    let ANYDTO: any = {};
    ANYDTO.ImageArray = Modelobj.ImageArray;
    ANYDTO.Task_Bid_TaskID = Modelobj.Client_Result_Photo_TaskId;
    ANYDTO.Client_Result_Photo_StatusType =
      Modelobj.Client_Result_Photo_StatusType;
    ANYDTO.Client_Result_Photo_Task_Bid_pkeyID =
      Modelobj.Client_Result_Photo_Task_Bid_pkeyID;
    ANYDTO.Type = 5;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //custome photo post single
  private apiUrlPOSTx =
    this.baseUrl + environment.ClientResult.postCustomPhotoLabel;

  public CustomPhotoLabelPost(Modelobj: Custom_PhotoLabel) {
    let ANYDTO: any = {};
    ANYDTO.PhotoLabel_pkeyID = Modelobj.PhotoLabel_pkeyID;
    ANYDTO.PhotoLabel_Name = Modelobj.PhotoLabel_Name;
    ANYDTO.PhotoLabel_IsCustom = Modelobj.PhotoLabel_IsCustom;
    ANYDTO.PhotoLabel_IsActive = Modelobj.PhotoLabel_IsActive;
    ANYDTO.PhotoLabel_IsDelete = Modelobj.PhotoLabel_IsDelete;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.PhotoLabel_Valtype = 1;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTx, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //custome photo get re
  private apiUrlGETx =
    this.baseUrl + environment.ClientResult.GetCustomPhotoLabel;

  public CustomPhotoLabelGET(model: ClientResultPhotoModel) {
    let ANYDTO: any = {};
    ANYDTO.PhotoLabel_pkeyID = 0;
    ANYDTO.Type = 4;
    ANYDTO.workOrder_ID = model.Client_Result_Photo_Wo_ID;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGETx, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //custome photo post ALL Label
  private apiUrlPOSTxp =
    this.baseUrl + environment.ClientResult.PostWOCustomPhotoLabel;

  public WOCustomPhotoLabelPost(Modelobj: WorkOrder_CustomPhotoLabel) {
    let ANYDTO: any = {};
    ANYDTO.WorkOrderPhotoLabel_pkeyID = Modelobj.WorkOrderPhotoLabel_pkeyID;
    ANYDTO.WorkOrderPhotoLabel_WO_ID = Modelobj.WorkOrderPhotoLabel_WO_ID;
    ANYDTO.WorkOrderPhotoLabel_IsActive = Modelobj.WorkOrderPhotoLabel_IsActive;
    ANYDTO.WorkOrderPhotoLabel_IsDelete = Modelobj.WorkOrderPhotoLabel_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Custom_PhotoLabel_MasterDTO = Modelobj.Custom_PhotoLabel_MasterDTO;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTxp, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // common handler
  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User...');
      window.location.href = '/admin/login';
    } else {
      alert('Invalid Request...');
    }

    // return an observable wi bad happenedth a user-facing error message
    return throwError("Something's wrong, please try again later...");
  }

  public downloadImages(req: any) {
    // debugger
    const downloadAPI = environment.cloudUrl + 'downloadZip';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post(downloadAPI, req, {
        responseType: "blob",
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  // zip multiple download
  public multipledownloadImages(req: any) {
    const downloadAPI = environment.cloudUrl + 'downloadZipMultiple';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .post(downloadAPI, req, {
        responseType: 'arraybuffer',
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  public downloadImagesWithTimeStamp(req: any) {
    const downloadAPI = environment.cloudUrl + 'downloadZipTimeStamp';
    return this._http
      .post(downloadAPI, req, {
        responseType: 'arraybuffer',
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  public downloadSingleImage(url: string) {
    return this._http.get(url, {
      responseType: 'blob',
    });
  }

  public downloadSingleDoc(req: any) {
    const downloadAPI = environment.cloudUrl + 'downloadSingle';
    return this._http
      .post(downloadAPI, req, {
        responseType: 'arraybuffer',
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  //foh details
  private apiUrlfoh =
    this.baseUrl + environment.ClientResult.AddClientResultFoH;

  public AddFOhPhoto(Modelobj: ClientResultPhotoModel) {
    let ANYDTO: any = {};

    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;
    ANYDTO.CRP_New_pkeyId = Modelobj.CRP_New_pkeyId;
    if(Modelobj.UnlableArrayJson!=null)
    {
      ANYDTO.PhotoArrayJson = Modelobj.UnlableArrayJson;
    }
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlfoh, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  //update time and date for photos
  private apiUrltime =
    this.baseUrl + environment.ClientResult.UpdateCLientResultPhotosTimeStamp;

  public updateTimeStamp(Modelobj: ClientResultPhotoModel) {
    // debugger
    let ANYDTO: any = {};
    ANYDTO.Client_Result_Photo_UploadTimestamp =
      Modelobj.Client_Result_Photo_UploadTimestamp;
    // ANYDTO.Client_Result_Photo_DateTimeOriginal = Modelobj.Client_Result_Photo_DateTimeOriginal;
    ANYDTO.Dataitems = Modelobj.Dataitems;
    ANYDTO.Type = 9;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrltime, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          console.log('sandippati',data)
          return data;
          
        }),
        catchError(this.handleError)
      );
  }
  //photo transfer
  private urlPhotoTransfer =
    this.baseUrl + environment.ClientResult.MoveCopyClientPhoto;
  public photoTransferApi(param) {
    debugger
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.urlPhotoTransfer, param, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //get client result photo history
  private apiUrlGethistory =
    this.baseUrl + environment.ClientResult.GetCLientResultPhotosMasterHistory;

  public ViewCLientImagesDataHistory(Modelobj: ClientResultPhotoModel) {
    debugger
    let ANYDTO: any = {};

    ANYDTO.Type = 1; //Modelobj.Type; // becoz complet f
    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGethistory, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //get client result photo history
  private apiUrlGetInfo =
    this.baseUrl + environment.ClientResult.GetClientResultPhotoInfo;

  public GetClientResultPhotoInfoData(Modelobj: ClientResultPhotoModel) {
    let ANYDTO: any = {};

    ANYDTO.Type = 1; //Modelobj.Type; // becoz complet f
    ANYDTO.Client_Result_Photo_ID = Modelobj.Client_Result_Photo_ID;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetInfo, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get task bid photos transfer
  private apiGettask =
    this.baseUrl + environment.ClientResult.GetPhotoTransferBidTask;

  public GetPhotoTransferTask(Modelobj: TaskBidPhoto) {
    var ANYDTO: any = {};
    ANYDTO.Type = 1;
    ANYDTO.WO_IPLNO = Modelobj.WO_IPLNO;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiGettask, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlPOSTc =
    this.baseUrl + environment.ClientResult.ClientResultsPhotoData;
  public GetClientResultsPhotoDetailPdf(Modelobj: ClientResultPhotoModel) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.Type = 1;
    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;
    ANYDTO.valtype = Modelobj.valtype;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<Blob>(this.apiUrlPOSTc, ANYDTO, {
        headers: headers,
        responseType: 'blob' as 'json',
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private deleteClientphotoUlr =this.baseUrl + environment.ClientResult.DeleteClientResultMultiple;

  public DeleteClientPhoto_Multiple(Modelobj: ClientResultPhotoModel) {
    let ANYDTO: any = {};

    ANYDTO.Client_Result_Photo_Wo_ID = Modelobj.Client_Result_Photo_Wo_ID;
    if(Modelobj.ImageArray!=null)
    {
      ANYDTO.PhotoArrayJson = Modelobj.ImageArray;
    }
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.deleteClientphotoUlr, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  //     showPosition(position) {
  //         //debugger
  //      let detail =    {
  //     Lat:   position.coords.latitude,
  //     long:  position.coords.longitude
  //         }
  // //this.test = detail;

  // this.Long = position.coords.latitude
  // this.Lat =detail.Lat;
  // //console.log('p',this.Long)
  // //console.log('M',this.Lat)

  //       }
}
