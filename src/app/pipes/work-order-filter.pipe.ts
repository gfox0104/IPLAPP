import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workOrderfilter'
})

export class WorkOrderFilterPipe implements PipeTransform {
  transform(items: Array<any>, filter: [{key: string}]): Array<any> {
    return items.filter(item => {
      let notMatchingField = filter.find(e => item[e.key] !== filter[e.key]);

      return !notMatchingField; // true if matches all fields
    });
  }
}
