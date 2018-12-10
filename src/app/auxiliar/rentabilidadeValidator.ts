import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Rentabilidade } from '../pedidos/models/pedidos-model';

export function rentabilidadeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const rentabilidade = control ? control.value : undefined;
    return rentabilidade && rentabilidade !== null
      && !(rentabilidade === Rentabilidade[Rentabilidade.Boa]
      || rentabilidade === Rentabilidade[Rentabilidade.Otima]) ? { 'rentabilidadeInvalida': true} : null;
  };
}


