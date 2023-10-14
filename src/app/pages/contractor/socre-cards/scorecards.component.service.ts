import { Injectable } from '@angular/core';
import { throwError } from "rxjs";
import { catchError,map, tap } from "rxjs/operators";
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ScoreCardsModel } from './scorecards.component-model';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseUrl } from '../../../services/apis/rest-api';

// @Injectable({
//     providedIn: 'root'
// })

export abstract class DataListNestedGridService extends BehaviorSubject<GridDataResult> {
    public loading: boolean;
    public token:any;
   

    constructor(
        private http: HttpClient,
        protected tableName: string
    ) {
        super(null);
        var currentUser = JSON.parse(localStorage.getItem('TOKEN'));
     //this.token = currentUser.token; // your token
     this.token = currentUser;
    }
    private apiUrlGet = BaseUrl + environment.Resources.CurrentScoreCard;
    public query(state: any): void {
        this.fetch(this.tableName, state)
            .subscribe(x => super.next(x));
    }

    protected fetch(tableName: string, state: any): Observable<GridDataResult> {
        var AnyDTO: any = {};
    
    AnyDTO.Wo_Con_FScore_PkeyID = 1;
    AnyDTO.Type = 1;//Modelobjinfo.Type;

        const queryStr = `${toODataString(state)}&$count=true`;
        this.loading = true;
        let headers = new HttpHeaders ({"content-Type": "application/json"});
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http
            //.get(`${this.BASE_URL}${tableName}?${queryStr}`)
            
            .post(this.apiUrlGet,AnyDTO,{ headers: headers})
            .pipe(
                map(response => (<GridDataResult>{
                    data: response['value'],
                    total: parseInt(response['@odata.count'], 10)
                })),
                tap(() => this.loading = false)
            );
    }
}

@Injectable()
export class ProductsService extends DataListNestedGridService {
    constructor(http: HttpClient) { super(http, 'Products'); }

    public queryForCategory({ Um_PKeyId }: { Um_PKeyId: number }, state?: any): void {
        ////dfebugger
        this.query(Object.assign({}, state, {
            filter: {
                filters: [{
                    field: 'Um_PKeyId', operator: 'eq', value: Um_PKeyId
                }],
                logic: 'and'
            }
        }));
    }

    public queryForProductName(ProductName: string, state?: any): void {
        this.query(Object.assign({}, state, {
            filter: {
                filters: [{
                    field: 'ProductName', operator: 'contains', value: ProductName
                }],
                logic: 'and'
            }
        }));
    }

}

@Injectable()
export class CategoriesService extends DataListNestedGridService {
    constructor(http: HttpClient) { super(http, 'Categories'); }

    queryAll(st?: any): Observable<GridDataResult> {
        const state = Object.assign({}, st);
        delete state.skip;
        delete state.take;

        return this.fetch(this.tableName, state);
    }
}
