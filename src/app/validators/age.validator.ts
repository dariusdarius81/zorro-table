// src/app/validators/age.validator.ts
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ageValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      control.value !== undefined &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { ageRange: true };
    }
    return null;
  };
}
