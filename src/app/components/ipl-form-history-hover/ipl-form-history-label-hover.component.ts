import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ipl-form-history-label-hover',
  template: `

                <span class="fa fa-clock pcrHistoryIcon"
                [ngbPopover]="HistoryDetailsModal" #ControlId="ngbPopover" placement="auto" [autoClose]="true"
                triggers="mouseenter" (mouseleave)="ControlId.close()"></span>

                <ng-template #HistoryDetailsModal>
                  <table class="table-bordered">
                    <thead>
                      <tr>
                        <th>Old Value</th>
                        <th></th>
                        <th>Modified By</th>
                      </tr>
                    </thead>
                      <tbody *ngIf="IsNoColumn;else other_content">
                          <ng-container *ngFor="let item of HistoryList">
                            <tr *ngIf="item[KeyName]!=undefined && item[KeyName]!=null">
                              <td>{{item[KeyName]}}</td>
                              <td></td>
                              <td>{{item.ModifiedBy}}</td>
                            </tr>
                          </ng-container>
                      </tbody>
                      <ng-template #other_content>
                        <tbody *ngIf="!IsSubColumn">
                          <ng-container *ngFor="let item of HistoryList">
                            <tr *ngIf="item[ColumnName][KeyName]!=undefined">
                              <td>{{item[ColumnName][KeyName]}}</td>
                              <td></td>
                              <td>{{item.ModifiedBy}}</td>
                            </tr>
                          </ng-container>
                        </tbody>
                        <tbody *ngIf="IsSubColumn">
                          <ng-container *ngFor="let item of HistoryList">
                            <tr *ngIf="item[ColumnName][SubColumnName][item[this.ColumnName][this.SubColumnName].length-1][KeyName]!=undefined">
                              <td>{{item[ColumnName][SubColumnName][item[this.ColumnName][this.SubColumnName].length-1][KeyName]}}</td>
                              <td></td>
                              <td>{{item.ModifiedBy}}</td>
                            </tr>
                          </ng-container>
                        </tbody>
                      </ng-template>


                  </table>
                </ng-template>

            `,
  styles: [``]
  // templateUrl: './ipl-form-history-hover.component.html',
  // styleUrls: ['./ipl-form-history-hover.component.scss']
})
export class IplFormHistoryLabelHoverComponent implements OnInit {

  @Input() HistoryList;
  @Input() IsNoColumn=false;
  @Input() ColumnName;
  @Input() KeyName;

  @Input() IsSubColumn=false;
  @Input() SubColumnName;
  constructor() { }

  ngOnInit(): void {
    // if(this.HistoryList.length>0)
    // {
    //   if(this.IsNoColumn)
    //   {
    //     debugger;
    //     console.log("HistoryList",this.HistoryList);
    //     console.log("ColumnName",this.ColumnName);
    //     console.log("KeyName",this.SubColumnName);
    //     console.log("KeyName",this.KeyName);
    //   }
    // }
  }
}
