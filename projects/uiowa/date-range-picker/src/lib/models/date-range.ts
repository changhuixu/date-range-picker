/**
 * DateRange Type represents start date and end date.
 */
export class DateRange {
  /**
   * Examples:
 ```typescript
const d1 = new DateRange();
const d2 = new DateRange(new Date(), new Date(2018, 9, 10));
 ```
   * @param start [Optional] Start Date. Default: null.
   * @param end [Optional] End Date. Default: null
   */
  constructor(public start: Date = null, public end: Date = null) {}

  /**
   * Examples:
 ```typescript
const d1 = DateRange.nextDays(7);
// a date range of next week since today
 ```
   * @param n Number of days after today.
   */
  static nextDays(n: number): DateRange {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + n);
    return new DateRange(start, end);
  }

  /**
   * Examples:
 ```typescript
const d1 = DateRange.nextTwoWeeks();
// a date range of next two weeks since today
 ```
   */
  static nextTwoWeeks(): DateRange {
    return DateRange.nextDays(14);
  }

  /**
   * Examples:
 ```typescript
const d1 = DateRange.nextMonth();
// a date range of next month since today
 ```
   */
  static nextMonth(): DateRange {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    return new DateRange(start, end);
  }

    /**
   * Examples:
 ```typescript
const d1 = DateRange.lastMonth();
// a date range of last month till today
 ```
   */
  static lastMonth(): DateRange {
    const start = new Date();
    const end = new Date();
    start.setMonth(start.getMonth() - 1);
    return new DateRange(start, end);
  }

  /**
   * Examples:
 ```typescript
const d1 = DateRange.create({});
 ```
   * @param start start date of range you're creating
   * @param end end date of range you're creating
   */
  static create(start: any, end: any): DateRange {
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

  /**
   * Examples:
 ```typescript
const isValid = DateRange.isValidDate(new Date());
 ```
   * @param value date you want to verify as date
   */
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
