import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbInputDatepicker, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../date-range';
import { NgbDateNativeAdapter } from '../services/NgbDateNativeAdapter';
import { equals, before, after, format } from '../services/NgbDateStructUtils';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit, AfterViewInit {
  @Input() dateRange: DateRange;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Output() dateRangeChange = new EventEmitter<DateRange>();
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  min: NgbDateStruct | null;
  max: NgbDateStruct | null;
  onFirstSelection = true;
  @ViewChild('dp', {read: ElementRef}) private inputElRef: ElementRef;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter, private elRef: ElementRef) {}

  ngOnInit() {
    this.fromDate = this.dateAdapter.fromModel(this.dateRange.start);
    this.toDate = this.dateAdapter.fromModel(this.dateRange.end);
    this.min = this.minDate ? this.dateAdapter.fromModel(this.minDate) : null;
    this.max = this.maxDate ? this.dateAdapter.fromModel(this.maxDate) : null;
  }
  ngAfterViewInit() {
    this.input = this.elRef.nativeElement.querySelector('input');
    this.input.value = this.formatInputText();
  }
  onDateChange(date: NgbDateStruct, dp: NgbInputDatepicker) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.dateRange.end = this.dateAdapter.toModel(this.toDate);
      dp.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
      this.dateRange.end = null;
    }
    this.inputElRef.nativeElement.value = this.formatInputText();
    this.dateRangeChange.emit(this.dateRange);
  }

  formatInputText() {
    return `${this.fromDate ? format(this.fromDate) : ''} - ${this.toDate ? format(this.toDate) : ''}`;
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
  isDisabled = date => after(date, this.max) || before(date, this.min);
  isInFuture = date => after(date, this.toDate);
}
