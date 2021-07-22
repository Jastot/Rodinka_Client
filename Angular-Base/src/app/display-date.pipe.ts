import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
@Pipe({
  name: 'displayDate'
})
export class DisplayDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    var wrapper = (v:number)=>v.toString().length<2?`0${v}`:v.toString();
    var d = new Date(value);
    var s = `${wrapper(d.getDay())}/${wrapper(d.getMonth())}/${d.getFullYear()} ${wrapper(d.getHours())}:${wrapper(d.getMinutes())}`;
    return formatDate(value, 'dd/MM/yyyy, HH:mm', 'en_US');
  }

}
