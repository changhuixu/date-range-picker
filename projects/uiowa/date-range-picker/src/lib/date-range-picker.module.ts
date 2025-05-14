import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbDateNativeAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DateTimePipe } from './pipes/date-time.pipe';
import { NgbDateNativeParserFormatter } from './services/ngb-date-native-parser-formatter';

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
