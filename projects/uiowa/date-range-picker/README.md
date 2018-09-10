# DateRangePicker

An Angular library of Date Range Picker. Dependencies: Angular, ng-bootstrap, Bootstrap 4 (css)

## Demo

<https://stackblitz.com/github/changhuixu/date-range-picker>

## Usage

```html
// in your component.html
<date-range-picker [(dateRange)]="dateRange" [maxDate]="maxDate"></date-range-picker>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { DateRange } from '@uiowa/date-range-picker';

@Component({
  ...
})
export class AppComponent implements OnInit {
  dateRange = new DateRange();
  maxDate = new Date();

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);
  }
}

```
