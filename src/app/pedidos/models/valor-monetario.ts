export interface Moeda {
  Unidade: string;
  Name: string;
  Id: string;
}

export class ValorMonetario {
  Moeda: Moeda;
  Valor: number;
  constructor(valor: number, moeda?: Moeda) {
    if (moeda) {
        this.Moeda = moeda;
    } else {
      this.Moeda = REAL;
    }
    if (valor) {
      this.Valor = valor;
    } else {
      this.Valor = 0;
    }
  }
}

const REAL = { Unidade: '', Name: '', Id: 'BRL' };
export const VALOR_MONETARIO_NULO = new ValorMonetario(0, REAL);
