import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValuesValidator(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isMatched =
      control.parent && control.value === control.parent.get(fieldName)?.value;
    return isMatched ? null : { matched: false };
  };
}
