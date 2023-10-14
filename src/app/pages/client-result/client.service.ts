import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ClientService {
  statusData = new BehaviorSubject<any>(null);
  statusDataObserble = this.statusData.asObservable();
  bidData = new BehaviorSubject<boolean>(false);
  bidDataObserble = this.bidData.asObservable();
  updateHeader = new BehaviorSubject<any>(null);
  updateHeaderObserble = this.updateHeader.asObservable();

  setStatusData(param) {
    this.statusData.next(param);
  }

  setBidData() {
    this.bidData.next(true);
  }

  setUpdateHeader(workorder) {
    this.updateHeader.next(workorder);
  }

}
