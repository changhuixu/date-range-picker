import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbDateParserFormatter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgbDateNativeParserFormatter } from './services/ngb-date-native-parser-formatter';
import { DateTimePipe } from './pipes/date-time.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  declarations: [DateRangePickerComponent, DatePickerComponent, DateTimePipe],
  providers: [
    NgbDateNativeAdapter,
    { provide: NgbDateParserFormatter, useClass: NgbDateNativeParserFormatter },
  ],
  exports: [DateRangePickerComponent, DatePickerComponent, DateTimePipe],
})
export class DateRangePickerModule {}
