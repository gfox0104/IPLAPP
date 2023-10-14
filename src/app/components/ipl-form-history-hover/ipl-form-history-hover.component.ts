import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ipl-form-history-hover',
  template: `
                <table class="table-bordered">
                  <thead>
                    <tr>
                      <th>Old Value</th>
                      <th></th>
                      <th>Modified By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of HistoryData">
                      <td *ngIf="item[ColumnName][KeyName]!=undefined">{{item[ColumnName][KeyName]}}</td>
                      <td *ngIf="item[ColumnName][KeyName]!=undefined"></td>
                      <td *ngIf="item[ColumnName][KeyName]!=undefined">{{item.ModifiedBy}}</td>
                    </tr>
                    <tr *ngIf="HistoryData.length==0">
                      <td colspan='2'>
                        No previous records found
                      </td>
                    </tr>
                  </tbody>
                </table>

            `,
  styles: [``]
  // templateUrl: './ipl-form-history-hover.component.html',
  // styleUrls: ['./ipl-form-history-hover.component.scss']
})
export class IplFormHistoryHoverComponent implements OnInit {

  @Input() HistoryData;
  @Input() ColumnName;
  @Input() KeyName;
  constructor() { }

  ngOnInit(): void {

    // debugger;
    // if(this.HistoryData.length>0)
    // {
    //   console.log("HistoryList",this.HistoryData);
    //   console.log("ColumnName",this.ColumnName);
    //   console.log("KeyName",this.KeyName);
    // }
  }

}
