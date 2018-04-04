export class DateRange {
  constructor(public start: Date = null, public end: Date = null) {}

  static nextTwoWeeks(): DateRange {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 14);
    return new DateRange(start, end);
  }

  static nextMonth(): DateRange {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    return new DateRange(start, end);
  }
}
