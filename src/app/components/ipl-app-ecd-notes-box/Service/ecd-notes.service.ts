import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { environment } from 'src/environments/environment';
import { EcdNoteFilter, ECDNotesObject } from '../dist/ecd_notes_model'

@Injectable({
  providedIn: 'root'
})
export class EcdNotesService {
  public Errorcall;
  private token: any;
  baseUrl = environment.domain

  constructor(private _http: HttpClient, private _Route: Router) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private getEcdNoteslist = BaseUrl + environment.WorkOrder.GetECDNoteList;
  public GetEcdNoteList(EcdNoteFilter : EcdNoteFilter) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.ECD_Note_WorkOrderId = EcdNoteFilter.ECD_Note_WorkOrderId;
    ANYDTO.ECD_Note_pkeyID = EcdNoteFilter.ECD_Note_pkeyID;
    ANYDTO.Type = EcdNoteFilter.Type;
    return this._http
      .post<any>(this.getEcdNoteslist, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }
  private post_ecd_note = BaseUrl + environment.WorkOrder.PostEcdNotes;
  public PostECDNoteData(ecdNotesObject : ECDNotesObject) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    var ANYDTO: any = {};
    ANYDTO.ECD_Note_WorkOrderId = ecdNotesObject.ECD_Note_WorkOrderId;
    ANYDTO.ECD_Note_pkeyID = ecdNotesObject.ECD_Note_pkeyID;
    ANYDTO.ECD_Note_Date = ecdNotesObject.ECD_Note_Date;
    ANYDTO.ECD_Note_Comment = ecdNotesObject.ECD_Note_Comment;
    ANYDTO.Type = ecdNotesObject.Type;
    return this._http
      .post<any>(this.post_ecd_note, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        })
      );
  }
}
