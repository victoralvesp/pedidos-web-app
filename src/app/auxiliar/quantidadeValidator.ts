import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const quantidadeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const quantidade = control.get('quantidade');
  const multiplo = control.get('multiplo');

  return quantidade && quantidade.value &&
         multiplo && multiplo.value
         && (quantidade.value === 0 ||
           quantidade.value % multiplo.value !== 0) ? { 'quantidadeInvalida': true } : null;
};
