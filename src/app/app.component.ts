import { Component } from '@angular/core';
import { DateRange } from '../date-range-picker/date-range';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  dateRange = new DateRange();
}
