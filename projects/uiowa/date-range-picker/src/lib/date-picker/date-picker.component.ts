import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgbDate, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() id = '';
  @Input()
  date: Date | null = null;
  @Input()
  disabled = false;

  @Output()
  dateChange = new EventEmitter<Date>();

  ngbDate: NgbDate | null = null;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  ngOnInit() {
    this.ngbDate = NgbDate.from(this.dateAdapter.fromModel(this.date));
    if (!this.id) {
      this.id = `date-picker-` + Math.random().toString(36).substring(4);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'] || changes['disabled']) {
      this.ngOnInit();
    }
  }

  onDateChange(date: NgbDate) {
    const newDate = this.dateAdapter.toModel(date);
    if (newDate) this.dateChange.emit(newDate);
  }

  isWeekend(date: NgbDate) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }
}
