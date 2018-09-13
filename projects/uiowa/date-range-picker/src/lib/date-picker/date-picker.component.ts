import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { NgbDateNativeAdapter } from '../services/NgbDateNativeAdapter';
import {
  NgbDateParserFormatter,
  NgbDatepicker,
  NgbDate
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../services/ngb-date-fr-parser-formatter';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }
  ]
})
export class DatePickerComponent implements OnInit {
  @Input()
  date: Date;

  @Output()
  dateChange = new EventEmitter<Date>();

  @ViewChild('d')
  private dp: NgbDatepicker;

  ngbDate: NgbDate;

  constructor(private readonly dateAdapter: NgbDateNativeAdapter) {}

  ngOnInit() {
    this.ngbDate = this.dateAdapter.fromModel(this.date);
  }

  onDateChange(date: NgbDate, dp: NgbDatepicker) {
    this.dateChange.emit(this.dateAdapter.toModel(date));
  }
}
