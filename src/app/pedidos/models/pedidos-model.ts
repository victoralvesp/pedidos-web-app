import { ValorMonetario } from './valor-monetario';

export class Pedido {
  id: number;
  itens: ItemDePedido[];
  idCliente: Number;
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

