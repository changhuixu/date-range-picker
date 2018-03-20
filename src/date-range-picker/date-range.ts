export class DateRange {
  public start: Date;
  public end: Date;

  constructor() {
    this.start = new Date();
    this.end = new Date();
    this.end.setDate(this.end.getDate() + 14);
  }
}
