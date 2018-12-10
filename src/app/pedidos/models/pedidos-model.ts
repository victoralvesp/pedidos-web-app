import { ValorMonetario } from './valor-monetario';

export class Pedido {
  Id: number;
  Itens: ItemDePedido[];
  IdCliente: Number;

  constructor() {
    this.Id = 0;
    this.Itens = [new ItemDePedido()];
    this.IdCliente = 0;
  }
}

export class ItemDePedido {
  Id: number;
  IdProduto: number;
  PrecoUnitario: ValorMonetario;
  Quantidade: number;
  Rentabilidade: Rentabilidade;

  constructor() {
    this.Id = 0;
    this.IdProduto = 0;
    this.PrecoUnitario = null;
    this.Quantidade = 0;
    this.Rentabilidade = null;
  }
}

export enum Rentabilidade {
  Otima,
  Boa,
  Ruim
}

