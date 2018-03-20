import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '../date-range-picker/date-range-picker.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    DateRangePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
