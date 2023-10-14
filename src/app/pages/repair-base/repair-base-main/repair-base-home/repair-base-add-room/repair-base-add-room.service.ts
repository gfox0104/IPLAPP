import { Injectable } from '@angular/core';
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { RepairBaseAddRoomModel, RepairBaseAddRepairModel, RepairBaseAddImgModel } from './repair-base-add-room.model';
import { environment } from '../../../../../../environments/environment';
import { HomepageServices } from '../../../../home/home.service';
import { BaseUrl } from 'src/app/services/apis/rest-api';

@Injectable({
  providedIn: 'root'
})
export class RepairBaseAddRoomService {
  public token: any;
  public Errorcall;
  // apiUrl = environment.repairbase.testapi;
  // liveApiUrl = environment.repairbase.liveapi;
  orderTypeID = 9;

  constructor(
    private _http: HttpClient,
    private xHomepageServices: HomepageServices
  ) {
    
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  public getOrder(ModelObj: RepairBaseAddRoomModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public getCharacteristics(ModelObj: RepairBaseAddRoomModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/characteristics?api_key' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public getAreaTypesCatalog(apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/areatypescatalog?api_key=' + apiKey ;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public getRoomData(ModelObj: RepairBaseAddRoomModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/areas?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public createArea(ModelObj: RepairBaseAddRoomModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiPostAreaUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/areas?api_key=' + apiKey;
    let body = 
    {
      areaType: ModelObj.RB_AreaType,
      areaLabel: ModelObj.RB_AreaLabel,
      notes: ModelObj.RB_AreaNote
    }
    return this._http
      .post<any>(apiPostAreaUrl, body, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public getCategory(apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/ordertypes/'+this.orderTypeID+'/categories?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public getSubCategory(ModelObj: RepairBaseAddRepairModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/categories/'+ModelObj.RB_categoryId+'/subcategories?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public getPerformAction(ModelObj: RepairBaseAddRepairModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/actiontypes/categories/'+ModelObj.RB_categoryId+'/subcategories/'+ModelObj.RB_subCategoryId+'/actiontypes?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public getActionDetail(ModelObj: RepairBaseAddRepairModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/repairscatalog/categories/'+ModelObj.RB_categoryId+'/subcategories/'+ModelObj.RB_subCategoryId+'/actiontypes/'+ModelObj.RB_performActionId+'/repairItems?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public addRepair(ModelObj: RepairBaseAddRepairModel,apiUrl,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiPostAreaUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/areas/'+ModelObj.RB_areaId+'/repairs';
    let body = 
    {
      itemXREF: ModelObj.RB_itemXRef,
      vendorPPU: ModelObj.RB_vendorPPU,
      quantity: ModelObj.RB_quantity,
      comments: ModelObj.RB_comments,
      description: ModelObj.RB_description
    }
    return this._http
      .post<any>(apiPostAreaUrl, body, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public getRepairData(orderId, areaId,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+orderId+'/areas/'+areaId+'/repairs?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public deleteAction(path,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiDeleteUrl = 'https://cors-anywhere.herokuapp.com/' + path + '?api_key=' + apiKey;
    return this._http.get(apiDeleteUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public generatePdf(ModelObj: RepairBaseAddRoomModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/reports/pdf?api_key' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  public generateXml(ModelObj: RepairBaseAddRoomModel,apiUrl,apiKey,auth){
    let headers = new HttpHeaders({ "Accept": "application/json" });
    headers = headers.append('Authorization', auth);
    let apiGetUrl = apiUrl + '/api/v1/orders/'+ModelObj.RB_OrderID+'/reports/xml?api_key=' + apiKey;
    return this._http.get(apiGetUrl, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  private apiPostUrl = BaseUrl + environment.RepairBase.RepairBaseProfitOverHead;
  public AddProfitOverhead(ModelObj: RepairBaseAddRoomModel) {
    var ANYDTO: any = {};
    ANYDTO.Rep_PKeyID = 0;
    ANYDTO.Rep_OrderId = ModelObj.RB_OrderID;
    ANYDTO.Rep_Profit = ModelObj.RB_Profit;
    ANYDTO.Rep_Overhead = ModelObj.RB_OverHead;
    ANYDTO.Rep_IsActive = true;
    ANYDTO.Rep_IsDelete = false;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiPostUrl, ANYDTO, { headers: headers })
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
          resolve(canvas.toDataURL());
        }
      }

      fr.readAsDataURL(file);
    });
  }

  public async POSTPhotosUpdate(Modelobj: RepairBaseAddImgModel) {
    var StrEditDTO: any = {};

    StrEditDTO.docx = Modelobj.documentx;

    let ANYDTO: any = {};
    ANYDTO.Rep_Base_OrderId = Modelobj.Rep_Base_OrderId;
    ANYDTO.Rep_Base_RepairAreaId = Modelobj.Rep_Base_RepairAreaId;
    ANYDTO.Rep_Base_RepairId = Modelobj.Rep_Base_RepairId;
    ANYDTO.Rep_Base_Doc_File_Path = Modelobj.Rep_Base_Doc_File_Path;
    ANYDTO.Rep_Base_Doc_File_Name = Modelobj.Rep_Base_Doc_File_Name;
    ANYDTO.Rep_Base_Doc_File_Size = Modelobj.Rep_Base_Doc_File_Size;
    ANYDTO.Rep_Base_Doc_Folder_Name = "RepairBase";
    ANYDTO.Rep_Base_Doc_Type = 1;
    ANYDTO.Rep_Base_IsActive = 1;
    ANYDTO.Rep_Base_IsDelete = 0;

    if (Modelobj.Rep_Base_Doc_File_Name == null) {
      ANYDTO.Rep_Base_Doc_File_Name = StrEditDTO.docx.name;
    }

    ANYDTO.Type = 1;
    ANYDTO.Image = StrEditDTO.docx;

    const uploadapi = environment.cloudUrl + 'uploadrepairbaseimage';
    // const Image = await this.readFile(StrEditDTO.docx, 640, 480);
    // ANYDTO.Image = Image;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http.post<any>(uploadapi, ANYDTO, { headers: headers }).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }
}
