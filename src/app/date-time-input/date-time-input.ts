import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from '../../../projects/uiowa/date-range-picker/src/public-api';

@Component({
  selector: 'date-time-input',
  imports: [FormsModule, DatePicker],
  templateUrl: './date-time-input.html',
  styleUrl: './date-time-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeInput {
  idFromInput = input('', { alias: 'id' });
  id = computed(
    () => this.idFromInput() || `date-time-input-` + Math.random().toString(36).substring(4)
  );
  t = signal<Date>(new Date());
  date = input(new Date());
  min = input<Date>();
  max = input<Date>();
  isInvalid = input(false);
  dateChange = output<Date>();

  datePart = new Date();
  hours = 0;
  minutes = 0;
  meridiem = signal<'AM' | 'PM'>('AM');
  hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  minuteOptions = [0, 15, 30, 45];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['date']) {
      const newDate = new Date(changes['date'].currentValue);
      const hours = newDate.getHours();
      this.minutes = newDate.getMinutes();
      this.meridiem.set(hours >= 12 ? 'PM' : 'AM');
      this.hours = hours % 12 || 12;
    }
  }

  updateTime() {
    let hour = 0;
    if (this.hours === 12) {
      hour = this.meridiem() === 'AM' ? 0 : 12;
    } else {
      hour = this.meridiem() === 'AM' ? this.hours : this.hours + 12;
    }

    const newDate = new Date(
      this.date().getFullYear(),
      this.date().getMonth(),
      this.date().getDate(),
      hour,
      this.minutes,
      0
    );
    this.dateChange.emit(newDate);
  }

  updateMeridiem() {
    this.meridiem.set(this.meridiem() === 'AM' ? 'PM' : 'AM');
    this.updateTime();
  }
}
