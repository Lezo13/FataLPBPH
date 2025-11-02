export interface ToggleChipOption<TVal> {
  displayName: string;
  name: string;
  value: TVal;
  disabled?: boolean;
  hidden?: boolean;
}
