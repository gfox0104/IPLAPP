import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageSearchPipe',
})
export class MessageSearchPipe implements PipeTransform {
  transform(value: any[], args: string): any[] {
    if (!value) {
      return value;
    }
    if (!args) {
      return value;
    }

    args = args.toLowerCase();
    return value.filter((item) => {
      return item.name.toLowerCase().includes(args) || item.message.toLowerCase().includes(args);
    });
  }
}
