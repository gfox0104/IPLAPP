import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { Task } from './task-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  public Errorcall;
  private token: any;
  Task: Task = new Task();
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Accounting.GetTaskMasterList;
  private apiUrlGetTask = BaseUrl + environment.Accounting.GetAccTask;
  private apiUrlDelete = BaseUrl + environment.Accounting.DeleteAccTask;
  private apiUrlPostTask = BaseUrl + environment.Accounting.CreateAccTask;

  public GetTaskall() {
    this.Task.Type = 1;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(this.Task);
    return this._http
      .post<any>(this.apiUrlGet, body, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public CreateUpdateTask(task: Task) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(task);
    return this._http
      .post<any>(this.apiUrlPostTask, body, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetTask(Id: number) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGetTask + '?Id=' + Id, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  public DeleteTask(Id: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);

    return this._http
      .get<any>(this.apiUrlDelete + '?Id=' + Id, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
