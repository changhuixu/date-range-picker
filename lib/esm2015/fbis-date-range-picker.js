import { Injectable, Component, Input, Output, EventEmitter, ElementRef, NgModule } from '@angular/core';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateRange {
    /**
     * @param {?=} start
     * @param {?=} end
     */
    constructor(start = null, end = null) {
        this.start = start;
        this.end = end;
    }
    /**
     * @return {?}
     */
    static nextTwoWeeks() {
        const /** @type {?} */ start = new Date();
        const /** @type {?} */ end = new Date();
        end.setDate(end.getDate() + 14);
        return new DateRange(start, end);
    }
    /**
     * @return {?}
     */
    static nextMonth() {
        const /** @type {?} */ start = new Date();
        const /** @type {?} */ end = new Date();
        end.setMonth(end.getMonth() + 1);
        return new DateRange(start, end);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Native Date adapter for Ngb DatePicker
 */
class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        if (!date || !date.getFullYear) {
            const /** @type {?} */ today = new Date();
            return {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            };
        }
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        if (!date) {
            return new Date(-8640000000000000); // min-date
        }
        return new Date(date.year, date.month - 1, date.day);
    }
}
NgbDateNativeAdapter.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgbDateNativeAdapter.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const equals = (one, two) => one &&
    two &&
    two.year === one.year &&
    two.month === one.month &&
    two.day === one.day;
const before = (one, two) => !one || !two
    ? false
    : one.year === two.year
        ? one.month === two.month
            ? one.day === two.day ? false : one.day < two.day
            : one.month < two.month
        : one.year < two.year;
const after = (one, two) => !one || !two
    ? false
    : one.year === two.year
        ? one.month === two.month
            ? one.day === two.day ? false : one.day > two.day
            : one.month > two.month
        : one.year > two.year;
const format = (d) => `${d.month}/${d.day}/${d.year}`;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateRangePickerComponent {
    /**
     * @param {?} dateAdapter
     * @param {?} elRef
     */
    constructor(dateAdapter, elRef) {
        this.dateAdapter = dateAdapter;
        this.elRef = elRef;
        this.dateRangeChange = new EventEmitter();
        this.onFirstSelection = true;
        this.isHovered = date => this.fromDate &&
            !this.toDate &&
            this.hoveredDate &&
            after(date, this.fromDate) &&
            before(date, this.hoveredDate);
        this.isInside = date => after(date, this.fromDate) && before(date, this.toDate);
        this.isFrom = date => equals(date, this.fromDate);
        this.isTo = date => equals(date, this.toDate);
        this.isWeekend = date => {
            const /** @type {?} */ d = new Date(date.year, date.month - 1, date.day);
            return d.getDay() === 0 || d.getDay() === 6;
        };
        this.isDisabled = date => after(date, this.max) || before(date, this.min);
        this.isInFuture = date => after(date, this.toDate);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.fromDate = this.dateAdapter.fromModel(this.dateRange.start);
        this.toDate = this.dateAdapter.fromModel(this.dateRange.end);
        this.min = this.minDate ? this.dateAdapter.fromModel(this.minDate) : null;
        this.max = this.maxDate ? this.dateAdapter.fromModel(this.maxDate) : null;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.input = this.elRef.nativeElement.querySelector('input');
    }
    /**
     * @param {?} date
     * @param {?} dp
     * @return {?}
     */
    onDateChange(date, dp) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
            this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
        }
        else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
            this.dateRange.end = this.dateAdapter.toModel(this.toDate);
            dp.close();
        }
        else {
            this.toDate = null;
            this.fromDate = date;
            this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
            this.dateRange.end = null;
        }
        this.input.value = this.formatInputText();
        this.dateRangeChange.emit(this.dateRange);
    }
    /**
     * @return {?}
     */
    formatInputText() {
        return `${this.fromDate ? format(this.fromDate) : ''} - ${this.toDate ? format(this.toDate) : ''}`;
    }
}
DateRangePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-range-picker',
                template: `<div class="input-group">
  <input ngbDatepicker #dp="ngbDatepicker" type="text" class="form-control" style="max-width:200px;" readonly
    [autoClose]="false"
    [displayMonths]="2"
    [dayTemplate]="t"
    [showWeekNumbers]="false"
    [markDisabled]="isDisabled"
    [firstDayOfWeek]="7"
    (focus)="dp.toggle()"
    (dateSelect)="onDateChange($event, dp)">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" (click)="dp.toggle()" type="button">
      <i class="fa fa-calendar" aria-label="date-picker-calendar"></i>
    </button>
  </div>
</div>
<ng-template #t let-date="date" let-focused="focused" let-disabled="disabled">
  <span class="custom-day"
    [class.focused]="focused"
    [class.range]="isFrom(date) || isTo(date) || isInside(date) || isHovered(date)"
    [class.faded]="isHovered(date) || isInside(date)"
    [class.weekend]="isWeekend(date)"
    [class.disabled]="disabled"
    (mouseenter)="hoveredDate = date" (mouseleave)="hoveredDate = null">
    {{ date.day }}
  </span>
</ng-template>
`,
                styles: [`.custom-day{text-align:center;padding:.185rem .25rem;display:inline-block;height:2rem;width:2rem}.custom-day.focused{background-color:#e6e6e6}.custom-day.range,.custom-day:hover{background-color:#0275d8;color:#fff}.custom-day.faded{background-color:rgba(2,117,216,.5)}.custom-day.weekend{color:#ff6e6e}.custom-day.disabled{color:#c8cdd2}`]
            },] },
];
/** @nocollapse */
DateRangePickerComponent.ctorParameters = () => [
    { type: NgbDateNativeAdapter, },
    { type: ElementRef, },
];
DateRangePickerComponent.propDecorators = {
    "dateRange": [{ type: Input },],
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "dateRangeChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateRangePickerModule {
}
DateRangePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, NgbModule],
                declarations: [DateRangePickerComponent],
                providers: [NgbDateNativeAdapter],
                exports: [DateRangePickerComponent]
            },] },
];
/** @nocollapse */
DateRangePickerModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { DateRangePickerModule, DateRangePickerComponent, DateRange, NgbDateNativeAdapter, equals, before, after, format };
//# sourceMappingURL=fbis-date-range-picker.js.map
