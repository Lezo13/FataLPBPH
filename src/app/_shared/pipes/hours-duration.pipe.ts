import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../utils';

@Pipe({
    name: 'hoursToDuration',
    standalone: false
})
export class HoursDurationPipe implements PipeTransform {
  transform(hours: number): string {
    return DateUtils.convertHoursToDuration(hours);
  }
}
