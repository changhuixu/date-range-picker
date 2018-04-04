import { Component, OnInit } from '@angular/core';
import { DateRange } from '../date-range-picker/date-range';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  dateRange = new DateRange();
  dateRange1 = DateRange.nextTwoWeeks();
  dateRange2 = DateRange.nextMonth();
  maxDate = new Date();

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);
  }
}
