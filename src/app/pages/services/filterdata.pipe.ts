import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
  //pure:false
})
export class FilterdataPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  //there are to types of pipe pure and inpure
  //inpure pipe will triger any operation is done like clik, mouse event etc.
  //but 99 % papes are make at pure pipe
  transform(valueList: any[], text: string): any {
    //console.log('we are in transform Method');
    if(valueList.length==0)
    {
      return null;
    }
    if(!text){
      return valueList;
    }

    return valueList.filter(e => e.Id.toString().includes(text.toLowerCase())||
     e.Name.toString().toLowerCase().includes(text.toLowerCase())||
     e.Location.toString().toLowerCase().includes(text.toLowerCase())||
     e.Salary.toString().toLowerCase().includes(text.toLowerCase())
     
    
    );
    
  }

}
