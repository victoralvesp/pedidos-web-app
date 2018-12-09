import { ValorMonetario } from './valor-monetario';

export class Produto {
  id: number;
  nome: String;
  precoSugerido: ValorMonetario;
  multiplo?: number;
}
