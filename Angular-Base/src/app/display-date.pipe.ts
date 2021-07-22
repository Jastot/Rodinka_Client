import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayDate'
})
export class DisplayDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    var wrapper = (v:number)=>v.toString().length<2?`0${v}`:v.toString();
    var d = new Date(value);
    var s = `${wrapper(d.getDay())}/${wrapper(d.getMonth())}/${d.getFullYear()} ${wrapper(d.getHours())}:${wrapper(d.getMinutes())}`;
    return s;
  }

}
