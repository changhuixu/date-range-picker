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

  static createDateRange(start: any, end: any): DateRange {
    let startDate = null;
    let endDate = null;
    if (DateRange.isValidDate(start)) {
      startDate = new Date(start);
    }
    if (DateRange.isValidDate(end)) {
      endDate = new Date(end);
    }
    return new DateRange(startDate, endDate);
  }

  static isValidDate(value: any): boolean {
    if (!value) {
      return false;
    }

    switch (typeof value) {
      case 'number':
        return true;
      case 'string':
        return !isNaN(Date.parse(value));
      case 'object':
        if (value instanceof Date) {
          return !isNaN(value.getTime());
        }
        break;
      default:
        return false;
    }
  }
}
