import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
// import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { DateRangePickerModule } from 'projects/uiowa/date-range-picker/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbDatepickerModule, DateRangePickerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
