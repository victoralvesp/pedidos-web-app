import { ValorMonetario } from './valor-monetario';

export class Produto {
  Id: number;
  Nome: String;
  PrecoSugerido: ValorMonetario;
  Multiplo?: number;
}
