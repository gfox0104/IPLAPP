import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';

import { environment } from "src/environments/environment";
import { IplRegisterModel, RegisterState } from "./user-register.model";

@Injectable({
  providedIn: "root"
})
export class IplRegisterService {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router,) {
  }

  private apiUrl = BaseUrl + environment.Login.userRegisterstate;

public DropdownGet() {
  //debugger

  let ANYDTO: any = {};

  ANYDTO.IPL_StateID = 0;
  ANYDTO.Type = 1;
  let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this._http
      .post<any>(this.apiUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      
      );
}
private apiUrlurcounty= BaseUrl + environment.Login.userRegistercounty;
public UserregisterCountyDetails(Modelobj:RegisterState) {
  //debugger
  var ANYDTO: any = {};
  ANYDTO.IPL_StateID = Modelobj.IPL_StateID
  ANYDTO.Type = 2


  let headers = new HttpHeaders({ "Content-Type": "application/json" });
 
  return this._http
    .post<any>(this.apiUrlurcounty, ANYDTO, { headers: headers })
    .pipe(
      tap(data => {
      
        return data;
      }),
    
    );
}

  private apiUrlPost = BaseUrl + environment.Login.userRegister;
  public UserRegisterPost(ModelObj: IplRegisterModel) {
    //debugger
    var anydTo: any = {};
    anydTo.IPL_Company_PkeyId = ModelObj.IPL_Company_PkeyId;
    anydTo.IPL_Company_Name = ModelObj.IPL_Company_Name;
    anydTo.IPL_Company_Address = ModelObj.IPL_Company_Address;
    anydTo.IPL_Company_Mobile = ModelObj.IPL_Company_Mobile;
    anydTo.IPL_Company_City = ModelObj.IPL_Company_City;
    anydTo.IPL_Company_State = ModelObj.IPL_Company_State;
    anydTo.IPL_Company_PinCode = ModelObj.IPL_Company_PinCode;
    anydTo.IPL_Company_IsActive = ModelObj.IPL_Company_IsActive;
    anydTo.IPL_Company_IsDelete = ModelObj.IPL_Company_IsDelete;
    anydTo.IPL_Company_County = ModelObj.IPL_Company_County;
    anydTo.IPL_Contact_Name = ModelObj.User_FirstName;
    anydTo.IPL_Company_Email = ModelObj.IPL_Company_Email;
    anydTo.IPL_Company_Company_Link = ModelObj.IPL_Company_Company_Link;
    anydTo.IPL_Company_ID = ModelObj.IPL_Company_ID;
    anydTo.IPL_Company_Phone = ModelObj.IPL_Company_Phone;

    anydTo.User_pkeyID = ModelObj.User_pkeyID;
    anydTo.User_FirstName = ModelObj.User_FirstName;
    anydTo.User_LastName = ModelObj.User_LastName;
    anydTo.User_Address = ModelObj.User_Address;
    anydTo.User_City = ModelObj.User_City;
    anydTo.User_State = ModelObj.User_State;
    anydTo.User_Zip = ModelObj.User_Zip;
    anydTo.User_CellNumber = ModelObj.User_CellNumber;
    anydTo.User_CompanyName = ModelObj.User_CompanyName;
    anydTo.User_LoginName = ModelObj.User_LoginName;
    anydTo.User_Password = ModelObj.User_Password;
    anydTo.User_Email = ModelObj.User_Email;
    anydTo.User_IsActive = ModelObj.User_IsActive;
    anydTo.User_IsDelete = ModelObj.User_IsDelete;
    anydTo.IPL_County = ModelObj.IPL_County;
    anydTo.Type = ModelObj.Type;
   
     
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    // headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPost, anydTo, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
      );
  }
}
