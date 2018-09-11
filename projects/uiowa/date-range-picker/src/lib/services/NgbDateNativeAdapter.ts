import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

/**
 * Native Date adapter for Ngb DatePicker
 */
@Injectable()
export class NgbDateNativeAdapter {
  fromModel(date: Date): NgbDate {
    return date instanceof Date
      ? new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      : null;
  }

  toModel(date: NgbDate): Date {
    return date && date.year && date.month
      ? new Date(date.year, date.month - 1, date.day, 12)
      : null;
  }
}
