import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class NativeDateParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = new Date(value);
      if (date instanceof Date && !isNaN(date.valueOf())) {
        return {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? new Date(date.year, date.month - 1, date.day).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      : '';
  }
}
