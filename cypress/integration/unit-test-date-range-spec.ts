import { DateRange } from '../../projects/uiowa/date-range-picker/src/lib/models/date-range';

describe('Unit Test DateRange Model Class', () => {
  before(() => {
    expect(DateRange, 'DateRange').to.be.a('function');
  });

  context('isValidDate() tests', () => {
    it('String as Date should be false', () => {
      const actual = DateRange.isValidDate('aaaaa');
      expect(actual).to.be.false;
    });
    it('null as Date should be false', () => {
      const actual = DateRange.isValidDate(null);
      expect(actual).to.be.false;
    });
    it('empty as Date should be false', () => {
      const actual = DateRange.isValidDate(NaN);
      expect(actual).to.be.false;
    });
    it('Some Date as Date should be true', () => {
      const actual = DateRange.isValidDate(new Date());
      expect(actual).to.be.true;
    });
    it('Some Defined Date as Date should be true', () => {
      const actual = DateRange.isValidDate(new Date(2018, 0, 1));
      expect(actual).to.be.true;
    });
    it('Some number as Date should be true', () => {
      const actual = DateRange.isValidDate(123);
      expect(actual).to.be.true;
    });
  });

  context('create() tests', () => {
    const date1 = new Date(2018, 0, 1);
    const date2 = new Date(2018, 0, 15);
    it('Create Date Range with null and null should return null and null', () => {
      const actual = DateRange.create(null, null);
      expect(actual.start).to.be.null;
      expect(actual.end).to.be.null;
    });
    it('Create Date Range with string and string should return null and null', () => {
      const actual = DateRange.create('a', 'b');
      expect(actual.start).to.be.null;
      expect(actual.end).to.be.null;
    });
    it('Create Date Range with date and null should return date and null', () => {
      const actual = DateRange.create(date1, null);
      expect(actual.start.toString()).to.equal(date1.toString());
      expect(actual.end).to.be.null;
    });
    it('Create Date Range with null and date should return null and date', () => {
      const actual = DateRange.create(null, date1);
      expect(actual.start).to.be.null;
      expect(actual.end.toString()).to.equal(date1.toString());
    });
    it('Create Date Range with date and date should return date and date', () => {
      const actual = DateRange.create(date1, date2);
      expect(actual.start.toString()).to.equal(date1.toString());
      expect(actual.end.toString()).to.equal(date2.toString());
    });
  });
});
