# DateRangePicker

An Angular library of Date Range Picker. Dependencies: Angular, ng-bootstrap, Bootstrap 4 (css)

[![Build Status](https://img.shields.io/travis/changhuixu/date-range-picker/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/changhuixu/date-range-picker)
[![npm](https://img.shields.io/npm/v/@uiowa/date-range-picker.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/date-range-picker)

## [Demo](https://date-range-picker.firebaseapp.com)

## Models

- `DateRange`: an object represents a date range, includes start date and end date. e.g.,

```typescript
const d1 = new DateRange();
const d2 = new DateRange(new Date(), new Date(2018, 9, 10));
const d3 = DateRange.nextTwoWeeks();
const d4 = DateRange.nextDays(10);
const d5 = DateRange.nextMonth();
```

## Components

- `<date-picker></date-picker>`: a wrapper of ng-bootstrap date picker

- `<date-range-picker></date-range-picker>`: a date range picker based on ng-bootstrap

## Usage

```typescript
import { DateRangePickerModule } from '@uiowa/date-range-picker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...,
    DateRangePickerModule,
    ...
    ],
  providers: [],
  bootstrap: [AppComponent]
})
```

```html
// in your component.html
<date-range-picker [(dateRange)]="dateRange" [maxDate]="maxDate"></date-range-picker>
<date-picker [(date)]="date"></date-picker>
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
  date: Date;
  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 20);
  }
}
```
