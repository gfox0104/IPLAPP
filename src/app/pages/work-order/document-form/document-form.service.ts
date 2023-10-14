
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { DocumentAndFormsDTO, FileMasterModel } from './document-form-model';
import { environment } from '../../../../environments/environment';
import { HomepageServices } from '../../home/home.service';

@Injectable({
  providedIn: "root"
})

export class DocumentAndFormsServices {
  public token: any;
  baseUrl = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = this.baseUrl + "api/formdocs/PostAddFolderDetails";
  public FolderdataPost(Modelobj: DocumentAndFormsDTO) {
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

    if (Modelobj.Fold_Pkey_Id != 0) {
      ANYDTO.Type = 2;
    } else {
      ANYDTO.Type = 1;
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

  readDoc(file: any) {
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

  async uploadDocument(Modelobj: FileMasterModel) {
    var ANYDTO: any = {};
    ANYDTO.Fold_File_Pkey_Id = Modelobj.Fold_File_Pkey_Id;
    ANYDTO.Fold_File_ParentId = Modelobj.Fold_File_ParentId;
    ANYDTO.Fold_File_Role_Folder_Id = Modelobj.Fold_File_Role_Folder_Id;
    ANYDTO.Fold_File_Name = Modelobj.FileData.name;
    ANYDTO.Fold_File_Local_Path = Modelobj.Fold_File_Local_Path;
    ANYDTO.Fold_File_Bucket_Name = Modelobj.Fold_File_Bucket_Name;
    ANYDTO.Fold_File_ProjectId = Modelobj.Fold_File_ProjectId;
    ANYDTO.Fold_File_Object_Name = Modelobj.Fold_File_Object_Name;
    ANYDTO.Fold_File_Folder_Name = Modelobj.Fold_File_Folder_Name;
    ANYDTO.Fold_File_IsActive = Modelobj.Fold_File_IsActive;
    ANYDTO.Fold_File_IsDelete = Modelobj.Fold_File_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;

    const uploadapi = 'https://us-central1-rare-lambda-245821.cloudfunctions.net/app/uploadDocument';
    // const uploadapi = 'http://localhost:5000/uploadDocument';
    const request = {
      document_name: Modelobj.FileData.name,
      document: null
    }
    const doc = await this.readDoc(Modelobj.FileData);
    request.document = doc;
    return this._http.post<any>(uploadapi, request, ANYDTO).pipe(
      tap(data => {
        return data;
      })
    );
  }

  ////////////get parent folder data

  private apiUrlget = this.baseUrl + "api/formdocs/GetFileFolderData";
  public GetParentFolder(Modelobj: DocumentAndFormsDTO) {
    var ANYDTO: any = {};
    ANYDTO.Fold_Pkey_Id = Modelobj.Fold_Pkey_Id;

    if (Modelobj.Fold_Pkey_Id != 0) {
      ANYDTO.Type = 2;
    }
    else {
      ANYDTO.Type = 1;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlget, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }), 
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlsget = this.baseUrl + "api/formdocs/GetParentFolderDetails";
  public GetsingleParentFolder(Modelobj: DocumentAndFormsDTO) {
    var ANYDTO: any = {};
    ANYDTO.Fold_Pkey_Id = Modelobj.Fold_Pkey_Id;
    
    if (Modelobj.Fold_Pkey_Id != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlsget, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  ////// get edit data for file
  private apiUrlfget = this.baseUrl + "api/formdocs/GetEditFileData";
  public GetFileeditDetails(Modelobj: FileMasterModel) {
    var ANYDTO: any = {};
    ANYDTO.Fold_File_Pkey_Id = Modelobj.Fold_File_Pkey_Id;

    if (Modelobj.Fold_File_Pkey_Id != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlfget, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //update file details
  private apiUrluget = this.baseUrl + "api/formdocs/UpdateFileMasterData";
  public UpdateFileDetails(Modelobj: FileMasterModel) {
    ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Fold_File_Pkey_Id = Modelobj.Fold_File_Pkey_Id;
    ANYDTO.Fold_File_ParentId = Modelobj.Fold_File_ParentId;
    ANYDTO.Fold_File_Role_Folder_Id = Modelobj.Fold_File_Role_Folder_Id;
    ANYDTO.Fold_File_Name = Modelobj.Fold_File_Object_Name;
    ANYDTO.Fold_File_Local_Path = Modelobj.Fold_File_Local_Path;
    ANYDTO.Fold_File_Bucket_Name = Modelobj.Fold_File_Bucket_Name;
    ANYDTO.Fold_File_ProjectId = Modelobj.Fold_File_ProjectId;
    ANYDTO.Fold_File_Object_Name = Modelobj.Fold_File_Object_Name;
    ANYDTO.Fold_File_Folder_Name = Modelobj.Fold_File_Folder_Name;
    ANYDTO.Fold_File_Desc = Modelobj.Fold_File_Desc;
    ANYDTO.Fold_File_IsActive = true;
    ANYDTO.Fold_File_IsDelete = false;
    ANYDTO.AutoAssinArray = Modelobj.AutoAssinArray;
    ANYDTO.Fold_Auto_Assine_PkeyId = Modelobj.Fold_Auto_Assine_PkeyId;
    ANYDTO.Fold_Is_AutoAssign = Modelobj.Fold_Is_AutoAssign;

    if (Modelobj.Fold_File_Pkey_Id != 0) {
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrluget, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //Add file Auto-Assign details
  private apiUrlAutoAssign = this.baseUrl + "api/formdocs/AddUpdateFileAutoAssignReference";
  public AddUpdateFileAutoAssignReference(Modelobj: FileMasterModel) {
    ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Fold_File_Pkey_Id = Modelobj.Fold_File_Pkey_Id;
    ANYDTO.Fold_File_ParentId = Modelobj.Fold_File_ParentId;
    ANYDTO.Fold_File_Role_Folder_Id = Modelobj.Fold_File_Role_Folder_Id;
    ANYDTO.Fold_File_Name = Modelobj.Fold_File_Object_Name;
    ANYDTO.Fold_File_Local_Path = Modelobj.Fold_File_Local_Path;
    ANYDTO.Fold_File_Bucket_Name = Modelobj.Fold_File_Bucket_Name;
    ANYDTO.Fold_File_ProjectId = Modelobj.Fold_File_ProjectId;
    ANYDTO.Fold_File_Object_Name = Modelobj.Fold_File_Object_Name;
    ANYDTO.Fold_File_Folder_Name = Modelobj.Fold_File_Folder_Name;
    ANYDTO.Fold_File_Desc = Modelobj.Fold_File_Desc;
    ANYDTO.Fold_File_IsActive = true;
    ANYDTO.Fold_File_IsDelete = false;
    ANYDTO.AutoAssinArray = Modelobj.AutoAssinArray;
    ANYDTO.Fold_Auto_Assine_PkeyId = Modelobj.Fold_Auto_Assine_PkeyId;
    ANYDTO.Fold_Is_AutoAssign = Modelobj.Fold_Is_AutoAssign;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlAutoAssign, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // delete folder
 private deleteFolderUrl = this.baseUrl + "api/formdocs/PostAddFolderDetails";
 public DeleteFolder(Modelobj: DocumentAndFormsDTO) {
  var ANYDTO: any = {};
  ANYDTO.Fold_Pkey_Id = Modelobj.Fold_Pkey_Id;
   ANYDTO.Type = 4;

   let headers = new HttpHeaders({ "Content-Type": "application/json" });
   headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
   return this._http
     .post<any>(this.deleteFolderUrl, ANYDTO, { headers: headers })
     .pipe(
       tap(data => {
         return data;
       }),
       catchError(this.xHomepageServices.CommonhandleError)
     );
 }

 // delete file
 private deleteApiUrl = this.baseUrl + "api/formdocs/UpdateFileMasterData";
 public DeleteFile(Modelobj: FileMasterModel) {
  var ANYDTO: any = {};
  ANYDTO.Fold_File_Pkey_Id = Modelobj.Fold_File_Pkey_Id;
   ANYDTO.Type = 4;

   let headers = new HttpHeaders({ "Content-Type": "application/json" });
   headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
   return this._http
     .post<any>(this.deleteApiUrl, ANYDTO, { headers: headers })
     .pipe(
       tap(data => {
         return data;
       }),
       catchError(this.xHomepageServices.CommonhandleError)
     );
 }

}
