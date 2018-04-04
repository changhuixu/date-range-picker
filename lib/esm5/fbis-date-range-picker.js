import { __extends } from 'tslib';
import { Injectable, Component, Input, Output, EventEmitter, ElementRef, NgModule } from '@angular/core';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

var DateRange = /** @class */ (function () {
    function DateRange(start, end) {
        if (start === void 0) { start = null; }
        if (end === void 0) { end = null; }
        this.start = start;
        this.end = end;
    }
    DateRange.nextTwoWeeks = function () {
        var start = new Date();
        var end = new Date();
        end.setDate(end.getDate() + 14);
        return new DateRange(start, end);
    };
    DateRange.nextMonth = function () {
        var start = new Date();
        var end = new Date();
        end.setMonth(end.getMonth() + 1);
        return new DateRange(start, end);
    };
    return DateRange;
}());
var NgbDateNativeAdapter = /** @class */ (function (_super) {
    __extends(NgbDateNativeAdapter, _super);
    function NgbDateNativeAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgbDateNativeAdapter.prototype.fromModel = function (date) {
        if (!date || !date.getFullYear) {
            var today = new Date();
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
    };
    NgbDateNativeAdapter.prototype.toModel = function (date) {
        if (!date) {
            return new Date(-8640000000000000);
        }
        return new Date(date.year, date.month - 1, date.day);
    };
    return NgbDateNativeAdapter;
}(NgbDateAdapter));
NgbDateNativeAdapter.decorators = [
    { type: Injectable },
];
NgbDateNativeAdapter.ctorParameters = function () { return []; };
var equals = function (one, two) { return one &&
    two &&
    two.year === one.year &&
    two.month === one.month &&
    two.day === one.day; };
var before = function (one, two) { return !one || !two
    ? false
    : one.year === two.year
        ? one.month === two.month
            ? one.day === two.day ? false : one.day < two.day
            : one.month < two.month
        : one.year < two.year; };
var after = function (one, two) { return !one || !two
    ? false
    : one.year === two.year
        ? one.month === two.month
            ? one.day === two.day ? false : one.day > two.day
            : one.month > two.month
        : one.year > two.year; };
var format = function (d) { return d.month + "/" + d.day + "/" + d.year; };
var DateRangePickerComponent = /** @class */ (function () {
    function DateRangePickerComponent(dateAdapter, elRef) {
        var _this = this;
        this.dateAdapter = dateAdapter;
        this.elRef = elRef;
        this.dateRangeChange = new EventEmitter();
        this.onFirstSelection = true;
        this.isHovered = function (date) { return _this.fromDate &&
            !_this.toDate &&
            _this.hoveredDate &&
            after(date, _this.fromDate) &&
            before(date, _this.hoveredDate); };
        this.isInside = function (date) { return after(date, _this.fromDate) && before(date, _this.toDate); };
        this.isFrom = function (date) { return equals(date, _this.fromDate); };
        this.isTo = function (date) { return equals(date, _this.toDate); };
        this.isWeekend = function (date) {
            var d = new Date(date.year, date.month - 1, date.day);
            return d.getDay() === 0 || d.getDay() === 6;
        };
        this.isDisabled = function (date) { return after(date, _this.max) || before(date, _this.min); };
        this.isInFuture = function (date) { return after(date, _this.toDate); };
    }
    DateRangePickerComponent.prototype.ngOnInit = function () {
        this.fromDate = this.dateAdapter.fromModel(this.dateRange.start);
        this.toDate = this.dateAdapter.fromModel(this.dateRange.end);
        this.min = this.minDate ? this.dateAdapter.fromModel(this.minDate) : null;
        this.max = this.maxDate ? this.dateAdapter.fromModel(this.maxDate) : null;
    };
    DateRangePickerComponent.prototype.ngAfterViewInit = function () {
        this.input = this.elRef.nativeElement.querySelector('input');
    };
    DateRangePickerComponent.prototype.onDateChange = function (date, dp) {
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
    };
    DateRangePickerComponent.prototype.formatInputText = function () {
        return (this.fromDate ? format(this.fromDate) : '') + " - " + (this.toDate ? format(this.toDate) : '');
    };
    return DateRangePickerComponent;
}());
DateRangePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-range-picker',
                template: "<div class=\"input-group\">\n  <input ngbDatepicker #dp=\"ngbDatepicker\" type=\"text\" class=\"form-control\" style=\"max-width:200px;\" readonly\n    [autoClose]=\"false\"\n    [displayMonths]=\"2\"\n    [dayTemplate]=\"t\"\n    [showWeekNumbers]=\"false\"\n    [markDisabled]=\"isDisabled\"\n    [firstDayOfWeek]=\"7\"\n    (focus)=\"dp.toggle()\"\n    (dateSelect)=\"onDateChange($event, dp)\">\n  <div class=\"input-group-append\">\n    <button class=\"btn btn-outline-secondary\" (click)=\"dp.toggle()\" type=\"button\">\n      <i class=\"fa fa-calendar\" aria-label=\"date-picker-calendar\"></i>\n    </button>\n  </div>\n</div>\n<ng-template #t let-date=\"date\" let-focused=\"focused\" let-disabled=\"disabled\">\n  <span class=\"custom-day\"\n    [class.focused]=\"focused\"\n    [class.range]=\"isFrom(date) || isTo(date) || isInside(date) || isHovered(date)\"\n    [class.faded]=\"isHovered(date) || isInside(date)\"\n    [class.weekend]=\"isWeekend(date)\"\n    [class.disabled]=\"disabled\"\n    (mouseenter)=\"hoveredDate = date\" (mouseleave)=\"hoveredDate = null\">\n    {{ date.day }}\n  </span>\n</ng-template>\n",
                styles: [".custom-day{text-align:center;padding:.185rem .25rem;display:inline-block;height:2rem;width:2rem}.custom-day.focused{background-color:#e6e6e6}.custom-day.range,.custom-day:hover{background-color:#0275d8;color:#fff}.custom-day.faded{background-color:rgba(2,117,216,.5)}.custom-day.weekend{color:#ff6e6e}.custom-day.disabled{color:#c8cdd2}"]
            },] },
];
DateRangePickerComponent.ctorParameters = function () { return [
    { type: NgbDateNativeAdapter, },
    { type: ElementRef, },
]; };
DateRangePickerComponent.propDecorators = {
    "dateRange": [{ type: Input },],
    "minDate": [{ type: Input },],
    "maxDate": [{ type: Input },],
    "dateRangeChange": [{ type: Output },],
};
var DateRangePickerModule = /** @class */ (function () {
    function DateRangePickerModule() {
    }
    return DateRangePickerModule;
}());
DateRangePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, NgbModule],
                declarations: [DateRangePickerComponent],
                providers: [NgbDateNativeAdapter],
                exports: [DateRangePickerComponent]
            },] },
];
DateRangePickerModule.ctorParameters = function () { return []; };

export { DateRangePickerModule, DateRangePickerComponent, DateRange, NgbDateNativeAdapter, equals, before, after, format };
//# sourceMappingURL=fbis-date-range-picker.js.map
