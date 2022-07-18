import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  NgbDate,
  NgbDateNativeAdapter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() id = '';
  @Input()
  date: Date | null = null;
  @Input()
  disabled = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() isInvalid = false;

  @Output()
  dateChange = new EventEmitter<Date>();

  ngbDate: NgbDate | null = null;
  ngbMinDate!: NgbDateStruct;
  ngbMaxDate!: NgbDateStruct;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  ngOnInit() {
    this.ngbDate = NgbDate.from(this.dateAdapter.fromModel(this.date));
    if (!this.id) {
      this.id = `date-picker-` + Math.random().toString(36).substring(4);
    }
    if (this.minDate) {
      this.ngbMinDate = this.dateAdapter.fromModel(new Date(this.minDate)) || {
        year: 1900,
        month: 1,
        day: 1,
      };
    }
    if (this.maxDate) {
      this.ngbMaxDate = this.dateAdapter.fromModel(new Date(this.maxDate)) || {
        year: 2099,
        month: 12,
        day: 31,
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  onDateChange(date: NgbDate) {
    const newDate = this.dateAdapter.toModel(date);
    if (newDate) this.dateChange.emit(newDate);
  }

  isWeekend(date: NgbDate) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
  isDisabled = (date: NgbDate) =>
    date.after(this.ngbMaxDate) || date.before(this.ngbMinDate);
}
