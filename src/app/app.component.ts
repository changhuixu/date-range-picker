import { Component, OnInit } from '@angular/core';
// import { DateRange } from 'projects/uiowa/date-range-picker/src/public-api';
import { DateRange } from '@uiowa/date-range-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dateRange = new DateRange(new Date(2018, 1, 1), new Date(2018, 1, 31));
  dateRange1 = DateRange.nextTwoWeeks();
  dateRange2 = DateRange.nextMonth();
  maxDate = new Date();
  dateRange3 = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 9));
  dateRange4 = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 9));
  dateRange5 = new DateRange(new Date(2018, 9, 1), null);
  dateRange6 = new DateRange(null, new Date(2018, 9, 1));
  dateRange7 = new DateRange(new Date('sssss'), new Date('aaaa'));

  date8 = new Date(2018, 0, 24);

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);
  }

  changedate() {
    this.dateRange4 = new DateRange(
      new Date(2018, 9, 1),
      new Date(2018, 9, 19)
    );
  }
}
