import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DateTimeInputComponent implements OnInit, OnChanges {
  @Input() id = '';
  @Input() date = new Date();
  @Input() min?: Date;
  @Input() max?: Date;
  @Input() isInvalid = false;
  @Output() dateChange = new EventEmitter<Date>();

  datePart = new Date();
  hours = 0;
  minutes = 0;
  meridiem: 'AM' | 'PM' = 'AM';
  hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  minuteOptions = [0, 15, 30, 45];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['date']) {
      const newDate = new Date(changes['date'].currentValue);
      const hours = newDate.getHours();
      this.minutes = newDate.getMinutes();
      this.meridiem = hours >= 12 ? 'PM' : 'AM';
      this.hours = hours % 12 || 12;
    }
  }

  updateTime() {
    let hour = 0;
    if (this.hours === 12) {
      hour = this.meridiem === 'AM' ? 0 : 12;
    } else {
      hour = this.meridiem === 'AM' ? this.hours : this.hours + 12;
    }

    const newDate = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      hour,
      this.minutes,
      0
    );
    this.dateChange.emit(newDate);
  }

  updateMeridiem() {
    this.meridiem = this.meridiem === 'AM' ? 'PM' : 'AM';
    this.updateTime();
  }
}
