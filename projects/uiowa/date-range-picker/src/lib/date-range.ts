export class DateRange {
  constructor(public start: Date = null, public end: Date = null) {}

  static nextDays(n: number): DateRange {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + n);
    return new DateRange(start, end);
  }

  static nextTwoWeeks(): DateRange {
    return DateRange.nextDays(14);
  }

  static nextMonth(): DateRange {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    return new DateRange(start, end);
  }
}
