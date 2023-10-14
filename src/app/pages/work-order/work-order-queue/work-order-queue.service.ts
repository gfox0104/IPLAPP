import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WorkOrderQueueService {
  dataItem: any;
  saveDataItem(dataItem) {
    this.dataItem = dataItem;
  }

  getDataItem() {
    return  this.dataItem;
  }
}
