import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../utils';

@Pipe({
    name: 'humanizeDate',
    standalone: false
})
export class HumanizeDatePipe implements PipeTransform {
  transform(value: Date): string {
    return DateUtils.readableTimeStamp(value);
  }
}
