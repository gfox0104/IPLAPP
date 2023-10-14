import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workOrderSearchPipe',
})
export class WorkOrderSearchPipe implements PipeTransform {
  transform(value: any[], args: string): any[] {
    if (!value) {
      return value;
    }
    if (!args) {
      return value;
    }
    args = args.toLowerCase();
    return value.filter((item) => {
      return (
        // item.address1.toLowerCase().includes(args) ||
        // item.Client_Company_Name.toLowerCase().includes(args) ||
        item.IPLNO.includes(args) //||
        
      );
    });
  }
}
