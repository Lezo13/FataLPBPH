/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(items: Record<string, any>[], searchInput: string, properties: string[]): Record<string, any>[] | undefined {
    if (!searchInput || searchInput === '') {
      return items;
    }

    const filteredItems = items.filter(item => {
      if (item) {
        const values: string[] = properties.map(prop => (item[prop] as string).toLowerCase());
        return values.some(value => value.includes(searchInput.toLowerCase()));
      }

      return false;
    });

    return filteredItems;
  }
}
