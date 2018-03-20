import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../date-range';
import { NgbDateNativeAdapter } from '../services/NgbDateNativeAdapter';
import { equals, before, after } from '../services/NgbDateStructUtils';

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit {
  @Input() dateRange: DateRange;
  @Output() dateRangeChanged = new EventEmitter<DateRange>();
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  ngOnInit() {
    this.fromDate = this.dateAdapter.fromModel(this.dateRange.start);
    this.toDate = this.dateAdapter.fromModel(this.dateRange.end);
  }
  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.dateRange.end = this.dateAdapter.toModel(this.toDate);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
      this.dateRange.end = null;
    }
    this.dateRangeChanged.emit(this.dateRange);
  }

  isHovered = date =>
    this.fromDate &&
    !this.toDate &&
    this.hoveredDate &&
    after(date, this.fromDate) &&
    before(date, this.hoveredDate)

  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  isWeekend = date => {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
  isInFuture = date => after(date, this.toDate);
}
