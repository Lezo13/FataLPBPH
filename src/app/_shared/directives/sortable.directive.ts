/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */

import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SortingDirection } from '../enums';
import { SortColumn, SortDirection, SortEvent } from '../models';

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    },
    standalone: false
})
export class NgbdSortableHeaderDirective {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();

  rotate(): void {
    const rotate: {[key: string]: SortDirection} = {
      [SortingDirection.ascending]: SortingDirection.descending,
      [SortingDirection.descending]: SortingDirection.default,
      [SortingDirection.default]: SortingDirection.ascending
    };
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
