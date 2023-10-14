import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { SaveTemplateModel, SaveMailModel, MassTemplateModel } from './memo-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { ScoreCardsModel } from '../socre-cards/scorecards.component-model';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class MemoServices {
  public Errorcall;
  private token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Resources.GetMemo;
  public GetContractorData(Modelobj: SaveTemplateModel) {
    var ANYDTO: any = {};

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }

  private apiUrlPost = BaseUrl + environment.Resources.SaveMailTemplate;
  public SaveMailTemplate(Modelobj: SaveTemplateModel) {
    var ANYDTO: any = {};
    ANYDTO.TemplateName = Modelobj.ST_name;
    ANYDTO.MailContent = Modelobj.ST_content;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPost, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
  private apiMailSavePost = BaseUrl + environment.Resources.EmailFileUpload;

  public SaveMail(Modelobj: SaveMailModel) {
     var ANYDTO: any = {};
     ANYDTO.Mass_Email_PkeyId= Modelobj.ST_user_id;
     ANYDTO.Mass_Email_Group_ID=  Modelobj.ST_group;
     ANYDTO.Mass_Email_Schedule_Time=  Modelobj.ST_dateTime;
     ANYDTO.Mass_Email_Subject= Modelobj.ST_subject;
     ANYDTO.Mass_Email_From=  Modelobj.ST_email_from;
     ANYDTO.Mass_Email_Message= Modelobj.ST_content;
     ANYDTO.Mass_Email_IsActive= Modelobj.ST_active;
     ANYDTO.Mass_Email_IsDelete= Modelobj.ST_delete;
     ANYDTO.filename= Modelobj.filename;
     ANYDTO.filepath= Modelobj.filepath;



  // var form = new FormData();
  //   form.append("Mass_Email_PkeyId", Modelobj.ST_user_id.toString());
  //   form.append("Mass_Email_Group_ID",  Modelobj.ST_group.toString());
  //   form.append("Mass_Email_Schedule_Time",  Modelobj.ST_dateTime.toString());
  //   form.append("Mass_Email_Subject", Modelobj.ST_subject.toString());
  //   form.append("Mass_Email_From",  Modelobj.ST_email_from.toString());
  //   form.append("Mass_Email_Message", Modelobj.ST_content.toString());
  //   form.append("Mass_Email_IsActive", Modelobj.ST_active.toString());
  //   form.append("Mass_Email_IsDelete", Modelobj.ST_delete.toString());
  //   form.append("ST_fileName", Modelobj.ST_fileName.toString());
  //   form.append("ST_filePath", Modelobj.ST_filePath.toString());

    let headers = new HttpHeaders({"mimetype": "application/json"});
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .post<any>(this.apiMailSavePost, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
          //console.log(data)
        }),
        catchError(this.xHomepageServices.CommonhandleError)

      );
  }
//Add MAss template
private apiUrladdmt = BaseUrl + environment.Resources.AddMassTemplate;
public AddMassTemplate(Modelobj: MassTemplateModel) {
  ////dfebugger
  //console.log('template',Modelobj);
  var ANYDTO: any = {};
  ANYDTO.Mass_Template_PkeyId = Modelobj.Mass_Template_PkeyId;
  ANYDTO.Mass_Template_Subject = Modelobj.Mass_Template_Subject;
  ANYDTO.Mass_Template_Contant = Modelobj.Mass_Template_Contant;
  ANYDTO.Mass_Template_IsActive = Modelobj.Mass_Template_IsActive;
  ANYDTO.Mass_Template_IsDelete = Modelobj.Mass_Template_IsDelete;
  ANYDTO.Type = Modelobj.Type;
  let headers = new HttpHeaders({ "Content-Type": "application/json" });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  return this._http
    .post<any>(this.apiUrladdmt, ANYDTO, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
}
//get mass Template data
private apiUrlgetmt = BaseUrl + environment.Resources.GetMassTemplate;
public GetMassTemplate(Modelobj: MassTemplateModel) {
  ////dfebugger
  var ANYDTO: any = {};
  ANYDTO.Mass_Template_PkeyId = Modelobj.Mass_Template_PkeyId;
  ANYDTO.Type =  1;
  let headers = new HttpHeaders({ "Content-Type": "application/json" });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  return this._http
    .post<any>(this.apiUrlgetmt, ANYDTO, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
}




  private apiUrlGetq = BaseUrl + "api/RESTIPL/FinalScoreCardDetail";
  public ViewFinalScoreCardDetails(Modelobj: ScoreCardsModel) {
    var ANYDTO: any = {};
    ANYDTO.Type =  2;
    var obj = {
      Wo_Con_FScore_Month: Modelobj.Wo_Con_FScore_Month,
      Wo_Con_FScore_Year: Modelobj.Wo_Con_FScore_Year,
      Wo_Con_FScore_ConID: Modelobj.Wo_Con_FScore_ConID,
    };

    ANYDTO.FilterData = JSON.stringify(obj);


    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetq, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlGetc = BaseUrl + "api/RESTIPL/CurrentScoreCardDetail";
  public currentMonthdata(Modelobj: ScoreCardsModel) {
    var ANYDTO: any = {};
    ANYDTO.Type =  Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetc, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlGetd = BaseUrl + "api/RESTIPL/FinalScoreCardDropDown";
  public FinalScoreCardDropDown() {
    ////dfebugger
    var ANYDTO: any = {};
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetd,ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //child data
  private apiUrlGetch = BaseUrl + "api/RESTIPL/getScoreChildData";
  public childscoredata(Modelobj: ScoreCardsModel) {
    var ANYDTO: any = {};
    ANYDTO.Wo_Con_Score_FScorePkeyId =  Modelobj.Wo_Con_FScore_PkeyID;
    ANYDTO.Type =  1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetch, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
