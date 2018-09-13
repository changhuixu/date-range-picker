import { DateRange } from './date-range';

describe('isValidDate() tests', () => {
  it('String as Date should be false', () => {
    const actual = DateRange.isValidDate('aaaaa');
    expect(actual).toBe(false);
  });
  it('null as Date should be false', () => {
    const actual = DateRange.isValidDate(null);
    expect(actual).toBe(false);
  });
  it('empty as Date should be false', () => {
    const actual = DateRange.isValidDate(NaN);
    expect(actual).toBe(false);
  });
  it('Some Date as Date should be true', () => {
    const actual = DateRange.isValidDate(new Date());
    expect(actual).toBe(true);
  });
  it('Some Defined Date as Date should be true', () => {
    const actual = DateRange.isValidDate(new Date(2018, 0, 1));
    expect(actual).toBe(true);
  });
  it('Some number as Date should be true', () => {
    const actual = DateRange.isValidDate(123);
    expect(actual).toBe(true);
  });
});

describe('create() tests', () => {
  const date1 = new Date(2018, 0, 1);
  const date2 = new Date(2018, 0, 15);
  it('Create Date Range with null and null should return null and null', () => {
    const actual = DateRange.create(null, null);
    expect(actual.start).toBe(null);
    expect(actual.end).toBe(null);
  });
  it('Create Date Range with string and string should return null and null', () => {
    const actual = DateRange.create('a', 'b');
    expect(actual.start).toBe(null);
    expect(actual.end).toBe(null);
  });
  it('Create Date Range with date and null should return date and null', () => {
    const actual = DateRange.create(date1, null);
    expect(actual.start).toEqual(date1);
    expect(actual.end).toBe(null);
  });
  it('Create Date Range with null and date should return null and date', () => {
    const actual = DateRange.create(null, date1);
    expect(actual.start).toBe(null);
    expect(actual.end).toEqual(date1);
  });
  it('Create Date Range with date and date should return date and date', () => {
    const actual = DateRange.create(date1, date2);
    expect(actual.start).toEqual(date1);
    expect(actual.end).toEqual(date2);
  });
});
