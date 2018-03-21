import { OnInit, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../date-range';
import { NgbDateNativeAdapter } from '../services/NgbDateNativeAdapter';
export declare class DateRangePickerComponent implements OnInit {
    private readonly dateAdapter;
    dateRange: DateRange;
    dateRangeChanged: EventEmitter<DateRange>;
    hoveredDate: NgbDateStruct;
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    constructor(dateAdapter: NgbDateNativeAdapter);
    ngOnInit(): void;
    onDateChange(date: NgbDateStruct): void;
    isHovered: (date: any) => boolean;
    isInside: (date: any) => boolean;
    isFrom: (date: any) => boolean;
    isTo: (date: any) => boolean;
    isWeekend: (date: any) => boolean;
    isInFuture: (date: any) => boolean;
}
