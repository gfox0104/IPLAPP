import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountingServices {
  constructor() {}
  Payment_Method = [];
  GetDateFormat(date) {
    var month = (date.getMonth() + 1).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return date.getFullYear() + '-' + month + '-' + day;
  }
  RemoveWhiteSpace(str: string) {
    if (!str) return str;
    return str.replace(/^\s+/g, '');
  }
  RestrictSpecialChar(event) {
    var k;
    k = event.keyCode;
    if (event.which === 32 && !event.target.value.length) {
      event.preventDefault();
    }
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      k == 46 ||
      (k >= 48 && k <= 57)
    );
  }
  OnlyNumberAnddotallow(event) {
    var k;
    k = event.keyCode;
    if (event.which === 32 && !event.target.value.length) {
      event.preventDefault();
    }
    return (event.keyCode > 47 && event.keyCode < 58) || event.keyCode == 46;
  }
  DateCompare(FormDate) {
    // this function is good for dates > 01/01/1970

    let CurrentDate = new Date();
    let b = new Date(FormDate);

    let msDateA = Date.UTC(
      CurrentDate.getFullYear(),
      CurrentDate.getMonth() + 1,
      CurrentDate.getDate()
    );
    let msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

    if (Number(msDateA) < Number(msDateB)) return -1;
    // lt
    else if (Number(msDateA) == Number(msDateB)) return 0;
    // eq
    else if (Number(msDateA) > Number(msDateB)) return 1;
    // gt
    else return null; // error
  }
  GetPayment_Method_List() {
    return (this.Payment_Method = [
      {
        Id: 1,
        Type: 'American Express',
      },
      {
        Id: 2,
        Type: 'Cash',
      },
      {
        Id: 3,
        Type: 'Check',
      },
      {
        Id: 4,
        Type: 'Diners Club',
      },
      {
        Id: 5,
        Type: 'Discover',
      },
      {
        Id: 6,
        Type: 'MasterCard',
      },
      {
        Id: 7,
        Type: 'Visa',
      },
    ]);
  }
  getLastYearDate(): Date {
    var d = new Date();
    var pastYear = d.getFullYear() - 1;
    d.setFullYear(pastYear);
    return d;
  }
  GetLastSixMonthDate(): Date {
    var d = new Date();
    //console.log(d.toLocaleDateString());
    d.setMonth(d.getMonth() - 6);
    return d;
  }
  GetLastThreeMonthDate(): Date {
    var d = new Date();
    //console.log(d.toLocaleDateString());
    d.setMonth(d.getMonth() - 3);
    return d;
  }
  getNowUTC(ConvertDate: Date) {
    const now = ConvertDate;
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }
  GetDateFormater(date) {
    var month = (date.getMonth() + 1).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + date.getFullYear();
  }
}
