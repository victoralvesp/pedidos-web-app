import { ValorMonetario } from './valor-monetario';

export class Pedido {
  id: number;
  itens: ItemDePedido[];
  idCliente: Number;

  constructor() {
    this.itens = [new ItemDePedido()];
  }
}

export class ItemDePedido {
  id: number;
  idProduto: number;
  precoUnitario: ValorMonetario;
  quantidade: number;
  rentabilidade: Rentabilidade;
}

export enum Rentabilidade {
  Otima,
  Boa,
  Ruim
}

