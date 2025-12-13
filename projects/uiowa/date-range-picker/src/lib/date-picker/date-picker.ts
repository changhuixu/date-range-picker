import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDateNativeAdapter,
  NgbDateParserFormatter,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { NativeDateParserFormatter } from '../native-date-parser-formatter';

@Component({
  selector: 'date-picker',
  imports: [FormsModule, NgbInputDatepicker],
  providers: [
    NgbDateNativeAdapter,
    { provide: NgbDateParserFormatter, useClass: NativeDateParserFormatter },
  ],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker {
  idFromInput = input('', { alias: 'id' });
  id = computed(
    () => this.idFromInput() || `date-picker-` + Math.random().toString(36).substring(4)
  );
  date = model<Date | null>(null);
  disabled = input(false);
  minDate = input<Date>();
  ngbMinDate = computed(() => {
    const min = this.minDate();
    return min ? this.dateAdapter.fromModel(min)! : { year: 2000, month: 1, day: 1 };
  });
  maxDate = input<Date>();
  ngbMaxDate = computed(() => {
    const max = this.maxDate();
    return max ? this.dateAdapter.fromModel(max)! : { year: 2099, month: 12, day: 31 };
  });
  isInvalid = input(false);
  allowClear = input(false);

  ngbDate = linkedSignal<NgbDate | null>(() =>
    this.date() ? NgbDate.from(this.dateAdapter.fromModel(this.date()!)) : null
  );
  today = inject(NgbCalendar).getToday();

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  onDateChange(date: NgbDate) {
    const newDate = this.dateAdapter.toModel(date);
    if (newDate) this.date.set(newDate);
  }

  isWeekend(date: NgbDate) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
  isDisabled = (date: NgbDate) => date.after(this.ngbMaxDate()) || date.before(this.ngbMinDate());
}
