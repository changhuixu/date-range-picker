import { DatePipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  DatePicker,
  DateRange,
  DateRangePicker,
} from '../../projects/uiowa/date-range-picker/src/public-api';
import { DateTimeInput } from './date-time-input/date-time-input';

@Component({
  selector: 'app-root',
  imports: [DatePicker, DateRangePicker, DateTimeInput, JsonPipe, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  dateRange = new DateRange(new Date(2018, 1, 1), new Date(2018, 1, 31));
  dateRange1 = DateRange.nextTwoWeeks();
  dateRange2 = DateRange.nextMonth();
  maxDate = new Date();
  dateRange3 = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 9));
  dateRange4 = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 9));
  dateRange5 = new DateRange(new Date(2018, 9, 1), null);
  dateRange6 = new DateRange(null, new Date(2018, 9, 1));
  dateRange7 = new DateRange(new Date('sssss'), new Date('aaaa'));

  min8 = new Date(2018, 0, 15);
  date8 = new Date(2018, 0, 24);
  date10: Date | null = new Date(2022, 7, 24);
  date9 = new Date(2022, 6, 24, 22, 45, 42);
  min9 = new Date(2022, 6, 23);
  invalid = false;

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);
  }

  changeDate() {
    this.dateRange4 = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 19));
  }

  changeDate2() {
    this.date9 = new Date(2022, 7, 13, 12, 30, 42);
  }
}
