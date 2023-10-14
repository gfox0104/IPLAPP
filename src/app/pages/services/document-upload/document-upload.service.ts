import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseUrl } from '../../../services/apis/rest-api';
import { CommonDocumentUploadModel } from './document-upload-model';
import { HomepageServices } from '../../home/home.service';

@Injectable({
  providedIn: "root"
})
export class CommonDocumentServices {
  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // add document
  public CommonDocumentUpdate(DocumentmodelObj: CommonDocumentUploadModel) {
    var StrEditDTO: any = {};
    StrEditDTO.docx = DocumentmodelObj.documentx;

    var data = new FormData();
    const pkeyId = DocumentmodelObj.Common_UserId.toString();

    for (var i = 0; i < StrEditDTO.docx.length; i++) {
      data.append(pkeyId, StrEditDTO.docx[i]);
    }

    const uploadapi = BaseUrl + "/api/RESTIPLUPLOAD/PostUserDocumentData";

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, data).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }
  
  // add document user Image Background
  public ImageBackgroundUpdate(DocumentmodelObj: CommonDocumentUploadModel) {
    var StrEditDTO: any = {};
    StrEditDTO.docx = DocumentmodelObj.documentx;
    var data = new FormData();
    const pkeyId = DocumentmodelObj.Common_pkeyID.toString();

    for (var i = 0; i < StrEditDTO.docx.length; i++) {
      data.append(pkeyId, StrEditDTO.docx[i]);
    }

    const uploadapi = BaseUrl + "/api/RESTIPLUPLOAD/PostUserDocumentUserImageBackground";

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(uploadapi, data).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }

  // get document user
  private apiUrluserDoc = BaseUrl + "/api/RESTIPLUPLOAD/GetUserDocumentMasterData";

  public GetUserDocument(Modelobj: CommonDocumentUploadModel) {
    var GetDocDTO: any = {};
    GetDocDTO.User_Doc_pkeyID = 0;
    GetDocDTO.User_Doc_UserID = Modelobj.Common_pkeyID;
    GetDocDTO.Type = 3;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrluserDoc, GetDocDTO, { headers: headers })
      .pipe(tap(data => {
        return data;
      }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Delete User DocumentMasterData document user
  private apiUrluserDoc2 = BaseUrl + "/api/RESTIPLUPLOAD/DeleteUserDocumentMasterData";

  public DeleteUserDocumentMasterData(Modelobj: CommonDocumentUploadModel) {
    var GetDocDTO: any = {};
    GetDocDTO.User_Doc_pkeyID = Modelobj.Common_pkeyID;
    GetDocDTO.Type = 4;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrluserDoc2, GetDocDTO, { headers: headers })
      .pipe(tap(data => {
        return data;
      }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // common handler
  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User Found..!');
    } else {
      alert("Invalid Request..");
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
