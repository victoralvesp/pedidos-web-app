import { ValorMonetario } from './valor-monetario';

export class Pedido {
  Id: number;
  Itens: ItemDePedido[];
  IdCliente: Number;

  constructor() {
    this.Itens = [new ItemDePedido()];
  }
}

export class ItemDePedido {
  Id: number;
  IdProduto: number;
  PrecoUnitario: ValorMonetario;
  Quantidade: number;
  Rentabilidade: Rentabilidade;
}

export enum Rentabilidade {
  Otima,
  Boa,
  Ruim
}

