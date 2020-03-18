import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl):  ValidationErrors | null {
  // One uppercase at least
  const passwordRegex = RegExp('^[0-9]{1}#[A-Z0-9]+$');
  const valid = passwordRegex.test(control.value);

  const errors = {
    reference: {
      rules: 'Commence par un chiffre puis # puis majuscules ou chiffres'
    }
  };

  return !valid ? errors : null;
}