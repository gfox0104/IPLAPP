import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalpoint'
  //pure:false
})
export class DecimalPointPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  //there are to types of pipe pure and inpure
  //inpure pipe will triger any operation is done like clik, mouse event etc.
  //but 99 % papes are make at pure pipe  

  constructor(private _decimalPipe: DecimalPipe) {
  }

  transform(value: any): any {
    //debugger
    return  this._decimalPipe.transform(value,"1.2-2");
  }

}
