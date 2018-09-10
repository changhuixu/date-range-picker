import { Component, OnInit } from '@angular/core';
import { DateRange } from '@uiowa/date-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  dateRange = new DateRange(new Date(2018, 1, 1), new Date(2018, 1, 31));
  dateRange1 = DateRange.nextTwoWeeks();
  dateRange2 = DateRange.nextMonth();
  dateRange3 = new DateRange();
  dateRange4 = new DateRange(
    new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
    null
  );
  dateRange5 = new DateRange(
    null,
    new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
  );
  maxDate = new Date();

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);
  }
}
