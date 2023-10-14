
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
import { HomepageServices } from '../../home/home.service';
import { ContractorMemoModel } from './contractor-mass.model';

@Injectable({
  providedIn: "root"
})
export class ContractorMemoServices{
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
 
    
}