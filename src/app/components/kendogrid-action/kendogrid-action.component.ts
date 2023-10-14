import { Component } from '@angular/core';

@Component({
  selector: 'iplapp-kendogrid-action',
  template: `
              <kendo-grid-column-group class="action" title="Action" [locked]="true">
              <kendo-grid-column width="40" [style]="{'text-align': 'center'}">
                <ng-template kendoGridHeaderTemplate let-dataItem let-columnIndex="columnIndex">
                  <div>
                    <input type="checkbox" (change)="checkRowAll()" />
                  </div>
                </ng-template>
                <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex" filter="boolean">
                  <div>
                    <input type="checkbox" (change)="checkRow(dataItem)" />
                  </div>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column width="80" class="text-center" [headerStyle]="{'text-align': 'center'}">
                <ng-template kendoGridHeaderTemplate let-dataItem let-columnIndex="columnIndex" >
                  <iplapp-loading-button title="Copy" [isSubmitted]="isSubmitted"
                  ></iplapp-loading-button>
                </ng-template>
                <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex">
                  <iplapp-loading-button title="Copy" [isSubmitted]="isSubmitted"
                    (onButtonClick)="copyBidItem(dataItem)"></iplapp-loading-button>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column width="100" class="text-center" [headerStyle]="{'text-align': 'center'}">
                <ng-template kendoGridHeaderTemplate let-dataItem let-columnIndex="columnIndex">
                  <iplapp-loading-button title="Approve" [isSubmitted]="isSubmitted"
                    (onButtonClick)="approveSelected()"></iplapp-loading-button>
                </ng-template>
                <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex">
                  <button class="btn btn-primary btn-sm" (click)="approve(dataItem)"
                    [disabled]="dataItem.Task_Bid_Status_val === 'Approved'">
                    Approve</button>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column title="Reject" width="90"  class="text-center" [headerStyle]="{'text-align': 'center'}">
                <ng-template kendoGridHeaderTemplate let-dataItem let-columnIndex="columnIndex">
                  <iplapp-loading-button title="Reject" [isSubmitted]="isSubmitted"
                    (onButtonClick)="rejectSelected()"></iplapp-loading-button>
                </ng-template>
                <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex">
                  <button class="btn btn-primary btn-sm">Reject</button>
                </ng-template>
              </kendo-grid-column>
            </kendo-grid-column-group>
            `
})

export class IplAppKendoAction {

  isSubmitted: boolean;
  checkRowAll() {

  }

  checkRow(dataItem) {
    
  }

  copyBidItem(dataItem) {

  }

  approveSelected() {
    
  }

  approve(dataItem) {

  }

  rejectSelected() {

  }
}