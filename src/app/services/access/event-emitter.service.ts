import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeCommonClientResultComponentFunction = new EventEmitter();
  invokeCommonMessageComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onApproveButtonClick() {
    this.invokeCommonClientResultComponentFunction.emit();
  }
  multiMessage(data){
    this.invokeCommonClientResultComponentFunction.emit();
  }
}