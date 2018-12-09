export interface Moeda {
  unidade: string;
  name: string;
  id: string;
}

export class ValorMonetario {
  moeda: Moeda;
  valor: number;
  constructor(moeda: Moeda, valor: number) {
    if (moeda) {
        this.moeda = moeda;
    } else {
      this.moeda = REAL;
    }
    if (valor) {
      this.valor = valor;
    } else {
      this.valor = 0;
    }
  }
}

const REAL = { unidade: '', name: '', id: 'BRL' };
export const VALOR_MONETARIO_NULO = new ValorMonetario(REAL, 0);
