import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleChipOption } from 'src/app/_shared/models';
import { ObjectUtils } from 'src/app/_shared/utils';

@Component({
  selector: 'app-toggle-chip',
  standalone: false,
  templateUrl: './toggle-chip.component.html',
  styleUrl: './toggle-chip.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleChipComponent),
      multi: true
    }
  ]
})
export class ToggleChipComponent implements ControlValueAccessor {

  @Input() options: ToggleChipOption<unknown>[] = [];
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() multiple: boolean = true;
  @Input() required: boolean = false;

  selectedOptions: ToggleChipOption<unknown>[] = [];
  onChanged: Function = (value) => { };
  onTouched: Function = () => { };
  touched: boolean = false;
  disabled: boolean = false;

  selectOption(option: ToggleChipOption<unknown>): void {
    const isSelected: boolean = this.selectedOptions.some(o => o.value === option.value);

    if (isSelected) {
      if (this.required && this.selectedOptions?.length <= 1)
        return;

      this.selectedOptions = this.selectedOptions.filter(o => o.value !== option.value);
    }
    else {
      if (!this.multiple && this.selectedOptions?.length > 1)
        return;

      this.selectedOptions.push(option);
    }

    this.markAsTouched();
    this.onChanged(this.selectedOptions);
  }

  getSizeClass(): string {
    let sizeClass = 'chip-md';

    switch (this.size) {
      case 'small':
        sizeClass = 'chip-sm';
        break;
      case 'medium':
      default:
        sizeClass = 'chip-md';
        break;
      case 'large':
        sizeClass = 'chip-lg';
        break;
    }

    return sizeClass;
  }

  isSelected(option: ToggleChipOption<unknown>): boolean {
    if (ObjectUtils.isEmpty(this.selectedOptions))
      return false;
    
    return this.selectedOptions.some(o => o.value === option.value);
  }

  writeValue(value: ToggleChipOption<unknown>[]): void {
    this.selectedOptions = value;
  }
  registerOnChange(onChanged: Function): void {
    this.onChanged = onChanged;
  }
  registerOnTouched(onTouched: Function): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
