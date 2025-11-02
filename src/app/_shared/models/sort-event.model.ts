import { SortingDirection } from '../enums';

export type SortColumn = string;
export type SortDirection = SortingDirection.ascending | SortingDirection.descending | SortingDirection.default | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
