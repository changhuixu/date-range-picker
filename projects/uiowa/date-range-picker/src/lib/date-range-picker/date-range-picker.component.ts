import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgbInputDatepicker, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../models/date-range';
import { NgbDateNativeAdapter } from '../services/NgbDateNativeAdapter';

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit, OnChanges {
  @Input()
  dateRange: DateRange;
  @Input()
  minDate?: Date;
  @Input()
  maxDate?: Date;
  @Input()
  disabled?= false;
  @Output()
  dateRangeChange = new EventEmitter<DateRange>();
  hoveredDate: NgbDate;

  private fromDate: NgbDate;
  private toDate: NgbDate;
  private min: NgbDate | null;
  private max: NgbDate | null;
  @ViewChild('dp', { read: ElementRef, static: true })
  private inputElRef: ElementRef;
  @ViewChild('dp', { static: true })
  private dp: NgbInputDatepicker;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) { }

  ngOnInit() {
    this.fromDate = this.dateAdapter.fromModel(this.dateRange.start);
    this.toDate = this.dateAdapter.fromModel(this.dateRange.end);
    this.min = this.minDate ? this.dateAdapter.fromModel(this.minDate) : null;
    this.max = this.maxDate ? this.dateAdapter.fromModel(this.maxDate) : null;
    this.inputElRef.nativeElement.value = this.formatInputText();
    if (this.fromDate) {
      this.dp.startDate = {
        year: this.fromDate.year,
        month: this.fromDate.month
      };
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dateRange || changes.disabled) {
      this.ngOnInit();
    }
  }

  onDateChange(date: NgbDate, dp: NgbInputDatepicker) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
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

  private formatInputText(): string {
    if (
      this.dateRange.start &&
      this.dateRange.end &&
      DateRange.isValidDate(this.dateRange.start) &&
      DateRange.isValidDate(this.dateRange.end)
    ) {
      return `${this.dateRange.start.toLocaleDateString()} - ${this.dateRange.end.toLocaleDateString()}`;
    }
    return '';
  }

  isHovered(date) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside = date => date.after(this.fromDate) && date.before(this.toDate);
  isFrom = date => date.equals(this.fromDate);
  isTo = date => date.equals(this.toDate);
  isWeekend(date: NgbDate) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
  isDisabled = date => date.after(this.max) || date.before(this.min);
  isInFuture = date => date.after(this.toDate);
}
