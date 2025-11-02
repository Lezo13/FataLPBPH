import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';
import { PASSWORD_VALIDATION_CONSTRAINTS } from '../constants/validations';
import { PasswordConstraint } from '../models';

@Directive({
    selector: '[appPasswordValidation]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true }],
    standalone: false
})


export class PasswordValidationDirective implements Validator {
  /**
   * Used for validating the password field
   *
   * @param control control.value contains the current value of the input
   * @returns null if valid, PasswordConstraint object if invalid
   */
  validate(control: AbstractControl): PasswordConstraint | null {
    // For each constraint defined
    for (const passwordConstraint of PASSWORD_VALIDATION_CONSTRAINTS){
      // check if it satisfies the constraint
      if (!passwordConstraint.pattern.test(control.value)) {
        return passwordConstraint;
      }
    }
    return null;
  }
}
