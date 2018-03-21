import { __extends } from 'tslib';
import { Injectable, Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

var DateRange = /** @class */ (function () {
    function DateRange() {
        this.start = new Date();
        this.end = new Date();
        this.end.setDate(this.end.getDate() + 14);
    }
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
var DateRangePickerComponent = /** @class */ (function () {
    function DateRangePickerComponent(dateAdapter) {
        var _this = this;
        this.dateAdapter = dateAdapter;
        this.dateRangeChanged = new EventEmitter();
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
        this.isInFuture = function (date) { return after(date, _this.toDate); };
    }
    DateRangePickerComponent.prototype.ngOnInit = function () {
        this.fromDate = this.dateAdapter.fromModel(this.dateRange.start);
        this.toDate = this.dateAdapter.fromModel(this.dateRange.end);
    };
    DateRangePickerComponent.prototype.onDateChange = function (date) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
            this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
        }
        else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
            this.dateRange.end = this.dateAdapter.toModel(this.toDate);
        }
        else {
            this.toDate = null;
            this.fromDate = date;
            this.dateRange.start = this.dateAdapter.toModel(this.fromDate);
            this.dateRange.end = null;
        }
        this.dateRangeChanged.emit(this.dateRange);
    };
    return DateRangePickerComponent;
}());
DateRangePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-range-picker',
                template: "<ngb-datepicker #dp ngModel (ngModelChange)=\"onDateChange($event)\"\n  [displayMonths]=\"2\"\n  [dayTemplate]=\"t\"\n  [showWeekNumbers]=\"false\"\n  [firstDayOfWeek]=\"7\">\n</ngb-datepicker>\n<ng-template #t let-date=\"date\" let-focused=\"focused\">\n  <span class=\"custom-day\"\n    [class.focused]=\"focused\"\n    [class.range]=\"isFrom(date) || isTo(date) || isInside(date) || isHovered(date)\"\n    [class.faded]=\"isHovered(date) || isInside(date)\"\n    [class.weekend]=\"isWeekend(date)\"\n    (mouseenter)=\"hoveredDate = date\" (mouseleave)=\"hoveredDate = null\">\n    {{ date.day }}\n  </span>\n</ng-template>\n",
                styles: [".custom-day{text-align:center;padding:.185rem .25rem;display:inline-block;height:2rem;width:2rem}.custom-day.focused{background-color:#e6e6e6}.custom-day.range,.custom-day:hover{background-color:#0275d8;color:#fff}.custom-day.faded{background-color:rgba(2,117,216,.5)}.custom-day.weekend{color:#ff6e6e}"]
            },] },
];
DateRangePickerComponent.ctorParameters = function () { return [
    { type: NgbDateNativeAdapter, },
]; };
DateRangePickerComponent.propDecorators = {
    "dateRange": [{ type: Input },],
    "dateRangeChanged": [{ type: Output },],
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

export { DateRangePickerModule, DateRangePickerComponent, DateRange, NgbDateNativeAdapter, equals, before, after };
//# sourceMappingURL=fbis-date-range-picker.js.map
