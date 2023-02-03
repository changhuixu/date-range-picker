import { DateRange } from '../../projects/uiowa/date-range-picker/src/lib/models/date-range';

describe('Unit Test DateRange Model Class', () => {
  beforeEach(() => {
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
      expect(actual.start!.toString()).to.equal(date1.toString());
      expect(actual.end).to.be.null;
    });
    it('Create Date Range with null and date should return null and date', () => {
      const actual = DateRange.create(null, date1);
      expect(actual.start).to.be.null;
      expect(actual.end!.toString()).to.equal(date1.toString());
    });
    it('Create Date Range with date and date should return date and date', () => {
      const actual = DateRange.create(date1, date2);
      expect(actual.start!.toString()).to.equal(date1.toString());
      expect(actual.end!.toString()).to.equal(date2.toString());
    });
  });

  context('equals() tests', () => {
    const date1 = new Date(2018, 0, 1, 12);
    const date2 = new Date(2018, 0, 1, 6);
    const date3 = new Date(2018, 0, 15);
    const a1 = new DateRange(date1, date3);
    const a2 = new DateRange(date2, date3);
    const b1 = new DateRange(null, null);
    const b2 = new DateRange(null, null);
    const c1 = new DateRange(date1, null);
    const c2 = new DateRange(date1, null);
    const d1 = new DateRange(null, date3);
    const d2 = new DateRange(null, date3);
    const e1 = new DateRange(null, new Date());
    const e2 = new DateRange(null, new Date());
    const f1 = new DateRange(null, date3);
    const f2 = new DateRange(null, new Date());
    const g1 = new DateRange(new Date(), date3);
    const g2 = new DateRange(null, new Date());
    it('should correctly test equality', () => {
      expect(a1.equals(a2)).to.be.true;
      expect(b1.equals(b2)).to.be.true;
      expect(c1.equals(c2)).to.be.true;
      expect(d1.equals(d2)).to.be.true;
      expect(e1.equals(e2)).to.be.true;
      expect(f1.equals(f2)).to.be.false;
      expect(g1.equals(g2)).to.be.false;
    });
  });
});
