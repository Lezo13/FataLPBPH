import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: false
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, max = 30, ellipsis = '...'): string {
    return value.length > max ? value.substr(0, max) + ellipsis : value;
  }
}
