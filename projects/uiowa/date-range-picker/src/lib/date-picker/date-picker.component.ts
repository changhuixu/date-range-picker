import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgbDateNativeAdapter } from '../services/NgbDateNativeAdapter';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input()
  date: Date;
  @Input()
  disabled ? = false;

  @Output()
  dateChange = new EventEmitter<Date>();

  ngbDate: NgbDate;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  ngOnInit() {
    this.ngbDate = this.dateAdapter.fromModel(this.date);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date || changes.disabled) {
      this.ngOnInit();
    }
  }

  onDateChange(date: NgbDate) {
    this.dateChange.emit(this.dateAdapter.toModel(date));
  }
}
