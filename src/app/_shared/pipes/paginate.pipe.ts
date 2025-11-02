/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paginate',
    standalone: false
})
export class PaginatePipe implements PipeTransform {

  transform(items: Record<string, any>[], currentPage: number, pageSize: number): Record<string, any>[] | undefined {
    const start = (currentPage - 1) * pageSize;
    const end = (currentPage - 1) * pageSize + pageSize;
    return items.slice(start, end);
  }
}
