import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
declare const equals: (one: NgbDateStruct, two: NgbDateStruct) => boolean;
declare const before: (one: NgbDateStruct, two: NgbDateStruct) => boolean;
declare const after: (one: NgbDateStruct, two: NgbDateStruct) => boolean;
declare const format: (d: NgbDateStruct) => string;
export { equals, before, after, format };
