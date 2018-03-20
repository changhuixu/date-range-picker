import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * Native Date adapter for Ngb DatePicker
 */
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    if (!date || !date.getFullYear) {
      const today = new Date();
      return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      };
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  toModel(date: NgbDateStruct): Date {
    if (!date) {
      return new Date(-8640000000000000); // min-date
    }
    return new Date(date.year, date.month - 1, date.day);
  }
}
