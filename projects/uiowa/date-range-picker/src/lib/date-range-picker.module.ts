import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgbDateNativeAdapter } from './services/NgbDateNativeAdapter';
import { NgbDateNativeParserFormatter } from './services/ngb-date-native-parser-formatter';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule],
  declarations: [DateRangePickerComponent, DatePickerComponent],
  providers: [
    NgbDateNativeAdapter,
    { provide: NgbDateParserFormatter, useClass: NgbDateNativeParserFormatter }
  ],
  exports: [DateRangePickerComponent, DatePickerComponent]
})
export class DateRangePickerModule {}
