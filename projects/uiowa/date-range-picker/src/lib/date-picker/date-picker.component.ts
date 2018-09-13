import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateNativeAdapter } from '../services/NgbDateNativeAdapter';
import { NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateNativeParserFormatter } from '../services/ngb-date-native-parser-formatter';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    { provide: NgbDateNativeParserFormatter, useClass: NgbDateParserFormatter }
  ]
})
export class DatePickerComponent implements OnInit {
  @Input()
  date: Date;

  @Output()
  dateChange = new EventEmitter<Date>();

  ngbDate: NgbDate;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  ngOnInit() {
    this.ngbDate = this.dateAdapter.fromModel(this.date);
  }

  onDateChange(date: NgbDate) {
    this.dateChange.emit(this.dateAdapter.toModel(date));
  }
}
