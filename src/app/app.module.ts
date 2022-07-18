import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
// import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { DateRangePickerModule } from 'projects/uiowa/date-range-picker/src/public-api';

import { DateTimeInputComponent } from './date-time-input/date-time-input.component';

@NgModule({
  declarations: [AppComponent, DateTimeInputComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NgbDatepickerModule,
    DateRangePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
