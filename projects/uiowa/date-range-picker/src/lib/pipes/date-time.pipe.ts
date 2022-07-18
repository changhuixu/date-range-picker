import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
  transform(d: Date, ...args: unknown[]): string {
    if (!d) {
      return 'NA';
    }

    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString();
    const day = d.getDate().toString();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year} ${hours
      .toString()
      .padStart(2, '0')}:${minutes.padStart(2, '0')} ${meridiem}`;
  }
}
