import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  model,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbDateNativeAdapter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DateRange, isValidDate } from '../models/date-range';

@Component({
  selector: 'date-range-picker',
  imports: [FormsModule, NgbInputDatepicker],
  providers: [NgbDateNativeAdapter],
  templateUrl: './date-range-picker.html',
  styleUrl: './date-range-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePicker implements AfterViewInit {
  idFromInput = input('', { alias: 'id' });
  id = computed(
    () => this.idFromInput() || `date-range-picker-` + Math.random().toString(36).substring(4)
  );
  dateRange = model<DateRange>(new DateRange());
  fromDate = linkedSignal<NgbDate | null>(() =>
    this.dateRange().start
      ? NgbDate.from(this.dateAdapter.fromModel(this.dateRange().start)!)
      : null
  );
  toDate = linkedSignal<NgbDate | null>(() =>
    this.dateRange().end ? NgbDate.from(this.dateAdapter.fromModel(this.dateRange().end)!) : null
  );
  minDate = input<Date | undefined>();
  min = computed(() =>
    this.minDate() ? NgbDate.from(this.dateAdapter.fromModel(this.minDate()!)!) : null
  );
  max = computed(() =>
    this.maxDate() ? NgbDate.from(this.dateAdapter.fromModel(this.maxDate()!)!) : null
  );
  maxDate = input<Date | undefined>();
  disabled = input(false);
  hoveredDate: NgbDate | null = null;

  private dp = viewChild(NgbInputDatepicker);

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  ngAfterViewInit(): void {
    this.formatInputText();
    if (this.fromDate()) {
      this.dp()!.startDate = {
        year: this.fromDate()!.year,
        month: this.fromDate()!.month,
      };
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateRange'] || changes['disabled']) {
      this.ngAfterViewInit();
    }
  }
  onDateChange(date: NgbDate, dp: NgbInputDatepicker) {
    if (!this.fromDate() && !this.toDate()) {
      this.fromDate.set(date);
    } else if (this.fromDate() && !this.toDate() && date.after(this.fromDate())) {
      this.toDate.set(date);
      dp.close();
    } else {
      this.toDate.set(null);
      this.fromDate.set(date);
    }
    this.dateRange.set(
      new DateRange(
        this.dateAdapter.toModel(this.fromDate()),
        this.dateAdapter.toModel(this.toDate())
      )
    );
    this.formatInputText();
  }

  formatInputText = computed(() => {
    let text = '';
    if (
      this.dateRange().start &&
      this.dateRange().end &&
      isValidDate(this.dateRange().start!) &&
      isValidDate(this.dateRange().end!)
    ) {
      text = `${this.dateRange().start!.toLocaleDateString()} - ${this.dateRange().end!.toLocaleDateString()}`;
    }
    return text;
  });

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate()) &&
      date.before(this.hoveredDate)
    );
  }

  isInside = (date: NgbDate) => date.after(this.fromDate()) && date.before(this.toDate());
  isFrom = (date: NgbDate) => date.equals(this.fromDate());
  isTo = (date: NgbDate) => date.equals(this.toDate());
  isWeekend(date: NgbDate) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
  isDisabled = (date: NgbDate) => date.after(this.max()) || date.before(this.min());
  isInFuture = (date: NgbDate) => date.after(this.toDate());
}
