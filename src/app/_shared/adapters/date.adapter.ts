/* eslint-disable no-param-reassign */
import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateAdapter extends NgbDateAdapter<Date> {
    fromModel(value: Date): NgbDateStruct {
        if (!value || value === null) {
            return null;
        }

        if (typeof value === 'string') {
            value = new Date(value);
        }

        const result: NgbDateStruct = {
            year: value.getFullYear(),
            month: value.getMonth() + 1,
            day: value.getDate()
        };

        return result;
    }

    toModel(date: NgbDateStruct): Date {
        if (!date || date === null) {
            return null;
        }

        //// Parses correctly however the time is set to local timezone.
        //// Get the hours difference, and add/subtract it to the local time hour
        const hoursOffset: number = new Date().getTimezoneOffset() / 60;
        const result: Date = new Date(date.year, date.month - 1, date.day, -1 * hoursOffset);
        return result;
    }
}
