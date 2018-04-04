export declare class DateRange {
    start: Date;
    end: Date;
    constructor(start?: Date, end?: Date);
    static nextTwoWeeks(): DateRange;
    static nextMonth(): DateRange;
}
