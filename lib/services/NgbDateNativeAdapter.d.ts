import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
/**
 * Native Date adapter for Ngb DatePicker
 */
export declare class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
    fromModel(date: Date): NgbDateStruct;
    toModel(date: NgbDateStruct): Date;
}
