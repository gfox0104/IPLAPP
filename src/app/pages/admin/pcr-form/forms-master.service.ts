
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from './../../home/home.service';
import { formDocumentModel, formsMasterModel, formsQuestionAnswersModel, importFormModel, TmpFbFormModel } from './forms-master.model';
import {environment} from '../../../../environments/environment'
import { AddPcrFormModel } from "../../client-result/client-result/client-result-model";
import { debug } from "console";
@Injectable({
    providedIn: "root"
})

export class FormsMasterServices {

    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
        this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }

    private apiUrlIPLDROPDOWN = BaseUrl + environment.Admin.GetFormsDrd;
    public GetIPLDropdowmnData(FormId: number) {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.type = '1';
        ANYDTO.userid = '1';
        ANYDTO.FormId = FormId;
        return this._http
            .post<any>(this.apiUrlIPLDROPDOWN, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlFormsMasterData = BaseUrl + environment.Admin.PostForm;
    public PostFormsMasterData(ModelObj: formsMasterModel) {
        //debugger
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlFormsMasterData, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlFormQuestionAnswer = BaseUrl + environment.Admin.PostQuestion;
    public PostQuestionAnswer(ModelObj: Array<formsQuestionAnswersModel>) {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlFormQuestionAnswer, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlGetformsMaster = BaseUrl + environment.Admin.GetForm;
    public GetformsMaster(type: number, fromId?: number) {
        //debugger
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.Type = type;

        if (type == 2) {
            ANYDTO.FormId = fromId;
        }
        return this._http
            .post<any>(this.apiUrlGetformsMaster, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }




    private apiUrlGetformsPreviewData = BaseUrl + environment.Admin.GetPreview;
    public GetformsPreviewData(resultType: number, fromId?: number, WorkOrderId?: number, address?: string) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};

        ANYDTO.Type = resultType;
        ANYDTO.FormId = fromId;
        ANYDTO.WorkOrderId = WorkOrderId;
        ANYDTO.Address = address;

        return this._http
            .post<any>(this.apiUrlGetformsPreviewData, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlDeleteFilte = BaseUrl + environment.Admin.DeleteFilter;
    public DeleteFilter(filterId: number) {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.WO_FilterId = filterId;
        ANYDTO.Type = 3;
        return this._http
            .post<any>(this.apiUrlDeleteFilte, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlDeleteForm = BaseUrl + environment.Admin.DeleteForm;
    public DeleteForm(formId: number) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.FormId = formId;
        ANYDTO.Type = 3;
        return this._http
            .post<any>(this.apiUrlDeleteForm, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlDeleteEditQuestionItems = BaseUrl + environment.Admin.DeleteEditQuestion;

    public DeleteEditQuestionItems(ModelObj: any) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

        return this._http
            .post<any>(this.apiUrlDeleteEditQuestionItems, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlCopyForm = BaseUrl + environment.Admin.CopyForm;
    public CopyForm(formId: number) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.FormId = formId;
        return this._http
            .post<any>(this.apiUrlCopyForm, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlQuestionMasterData = BaseUrl + environment.Admin.PostQuestionDetails;
    public PostQuestionMasterData(ModelObj: any) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlQuestionMasterData, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlUpdateQuestionData = BaseUrl + environment.Admin.UpdateQuestionStatus;
    public UpdateQuestionData(ModelObj: any) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlUpdateQuestionData, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private ApiUrlGetFormQuestion = BaseUrl + environment.Admin.GetFormQuestion;
    public GetFormQuestion(questionId, type) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.type = type;
        ANYDTO.userid = '1';
        ANYDTO.QuestionId = questionId;
        return this._http
            .post<any>(this.ApiUrlGetFormQuestion, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlUpdateQuestion = BaseUrl + environment.Admin.UpdateQuestion;
    public UpdateQuestion(ModelObj: formsMasterModel) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlUpdateQuestion, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlOptionupdate = BaseUrl + environment.Admin.PostOptions;
    public PostOptions(ModelObj: formsMasterModel) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlOptionupdate, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlPhotoRule = BaseUrl + environment.Admin.PostPhotoRules;
    public PostPhotoRule(ModelObj: formsMasterModel) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlPhotoRule, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlAlertsRule = BaseUrl + environment.Admin.PostAlertRules;
    public PostAlertsRule(ModelObj: formsMasterModel) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlAlertsRule, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlFieldRule = BaseUrl + environment.Admin.PostFieldRules;
    public PostFieldRule(ModelObj: formsMasterModel) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlFieldRule, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlActionRule = BaseUrl + environment.Admin.PostActionRules;
    public PostActionRule(ModelObj: formsMasterModel) {

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
            .post<any>(this.apiUrlActionRule, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }

    private apiUrlUpdateFormStatus = BaseUrl + environment.Admin.UpdateFormStatus;
    public PostUpdateFormStatus(formId: number, Type: number) {




        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.FormId = formId;
        ANYDTO.Type = Type;
        return this._http
            .post<any>(this.apiUrlUpdateFormStatus, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }
    // get document list
  private docUrl = BaseUrl + environment.Admin.GetFormDocument;
  public GetFormDocumentData(Modelobj: formDocumentModel) {

    let ANYDTO: any = {};
    ANYDTO.FMFI_Pkey = Modelobj.FMFI_Pkey;
    ANYDTO.FMFI_FormId = Modelobj.FMFI_FormId;
    ANYDTO.Type = 3;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.docUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // update document
  private docpostUrl = BaseUrl + environment.Admin.UpdateFormDocument;
  public UpdateFormDocumentData(Modelobj: formDocumentModel) {
      //debugger
    let ANYDTO: any = {};
    ANYDTO.FMFI_Pkey = Modelobj.FMFI_Pkey;
    ANYDTO.FMFI_FormId = Modelobj.FMFI_FormId;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.docpostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  // import Pcr form
  private formpostUrl = BaseUrl + environment.Admin.ImportPCRForm;
  public ImportPCRFormData(Modelobj: importFormModel) {
    let ANYDTO: any = {};
    ANYDTO.Imtr_FromId = Modelobj.Imtr_FromId;
    ANYDTO.Imtr_FileName = Modelobj.Imtr_FileName;
    ANYDTO.Imtr_FilePath = Modelobj.Imtr_FilePath;
    ANYDTO.Imtr_File = Modelobj.Imtr_File;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.formpostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Add que pdf field
  private pdfpostUrl = BaseUrl + environment.Admin.AddUpdateQuePDFField;
  public AddUpdateQuePDFFieldData(FileId: number) {
    let ANYDTO: any = {};
    ANYDTO.FMFI_Pkey = FileId;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.pdfpostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get FB Form template list
  private apifbFormGet = BaseUrl + environment.Admin.GetFBFormList;

  public GetAdminFormList(type: number,importFrom_Id:number , fromId?: number) {
    // debugger
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.Type = type;
    ANYDTO.Fb_Dynamic_ImportFrom_Id =importFrom_Id
    if (type == 2) {
        ANYDTO.FormId = fromId;
    }
    return this._http
        .post<any>(this.apifbFormGet, ANYDTO, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            }),
            catchError(this.xHomepageServices.CommonhandleError)
        );
  }
  public GetWorkOrdersFormList(type: number,workOrderID:number , fromId?: number) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.Type = type;
    ANYDTO.workOrder_ID =workOrderID
    if (type == 2) {
        ANYDTO.FormId = fromId;
    }
    return this._http
        .post<any>(this.apifbFormGet, ANYDTO, { headers: headers })
        .pipe(
            tap(data => {
                return data;
            }),
            catchError(this.xHomepageServices.CommonhandleError)
        );
  }
  public GetFBFormTemplateList(type: number, fromId?: number) {
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      var ANYDTO: any = {};
      ANYDTO.Type = type;
      if (type == 2) {
          ANYDTO.FormId = fromId;
      }
      return this._http
          .post<any>(this.apifbFormGet, ANYDTO, { headers: headers })
          .pipe(
              tap(data => {
                  return data;
              }),
              catchError(this.xHomepageServices.CommonhandleError)
          );
  }
     // Update FB Form Status
  private fbUpdateUrl = BaseUrl + environment.Admin.UpdateFBFormStatus;
  public UpdateFBFormStatus(ModelObj: TmpFbFormModel) {
    let ANYDTO: any = {};
    ANYDTO.Fb_Dynamic_pkeyID = ModelObj.Fb_Dynamic_pkeyID;
    ANYDTO.Type = ModelObj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.fbUpdateUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Add Form-Wo Relation
  private apiUrladdForm = BaseUrl + environment.Admin.AddFormWoRelation;
  public AddFormWoRelation(formId: string,woId: number) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.Fwo_PCRFormId = formId;
    ANYDTO.Fwo_WoId = woId;
    ANYDTO.Type = 5;
    return this._http
      .post<any>(this.apiUrladdForm, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOSTWT =  BaseUrl + environment.Admin.PostFbDynamicDetail;

  public PostFbDynamicDetail(param: any) {
//   debugger;
    var ANYDTO: any = {};
    ANYDTO.Fb_Dynamic_List = param;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTWT, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Add Pcr Form for Wo
  private apiUrlpcrForm = BaseUrl + environment.Admin.AddFormWoRelation;
  public AddPcrForm(model : AddPcrFormModel) {
    // debugger
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.Fwo_PCRFormId = model.Pcr_FormId;
    ANYDTO.Fwo_WoId = model.Pcr_FormWoId;
    ANYDTO.Type =model.Type;
    ANYDTO.Fwo_IsActive = true;
    ANYDTO.Fwo_IsOfficeResult = model.Fwo_IsOfficeResult;
    ANYDTO.Fwo_IsFieldResult = model.Fwo_IsFieldResult;
    ANYDTO.Fwo_IsPcrAdd = model.fwo_IsPcrAdd;
    ANYDTO.IsDynamicForm = model.IsDynamicForm;

    return this._http
      .post<any>(this.apiUrlpcrForm, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiAddFilterFormMaster = BaseUrl + environment.Admin.AddFilterFormMaster;
    public AddFilterFormMaster(ModelObj: formsMasterModel) {
        //debugger
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        var ANYDTO: any = {};
        ANYDTO.Form_Filter_FormName = ModelObj.FormName;
        ANYDTO.Form_Filter_FormIsActive = ModelObj.Form_IsActive;
        ANYDTO.Form_Filter_FormIsRequired = ModelObj.IsRequired;
        ANYDTO.Form_Filter_FormIsFieldResult = ModelObj.FieldResults;
        ANYDTO.Form_Filter_FormIsOfficeResult = ModelObj.OfficeResults;
        ANYDTO.Form_Filter_FormIsPublished= ModelObj.Published;
        ANYDTO.Form_Filter_FormAddedby = ModelObj.FormAddedby;
        ANYDTO.Form_Filter_FormVersion = ModelObj.Form_Version_No;
        ANYDTO.Type = ModelObj.Type;
        return this._http
            .post<any>(this.apiAddFilterFormMaster, ANYDTO, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }


    private apiUrlGet = BaseUrl + environment.Admin.GetUserDataForCompany;
    public ViewUserData() {
     //debugger;
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlGet,{}, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }
    private apiUrlGetformsMasterFilter = BaseUrl + environment.Admin.GetFormFilter;
    public GetformsMasterFilter(ModelObj: formsMasterModel) {
        //debugger
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);


        return this._http
            .post<any>(this.apiUrlGetformsMasterFilter, ModelObj, { headers: headers })
            .pipe(
                tap(data => {
                    return data;
                }),
                catchError(this.xHomepageServices.CommonhandleError)
            );
    }
  private apiUrlpcrFormGenerate = BaseUrl + environment.Admin.GeneratePdfDocumentForForm;
    public GeneratePdfVersionDocument(model : AddPcrFormModel) {
      // debugger
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      var ANYDTO: any = {};
      ANYDTO.Fwo_PCRFormId = model.Pcr_FormId;
      ANYDTO.Fwo_WoId = model.Pcr_FormWoId;
      ANYDTO.Type =model.Type;
      return this._http
        .post<any>(this.apiUrlpcrFormGenerate, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }




}
