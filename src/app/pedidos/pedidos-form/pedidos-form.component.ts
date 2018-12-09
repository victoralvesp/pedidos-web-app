import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDePedido, Pedido } from '../models/pedidos-model';
import { PedidosService } from '../services/pedidos.service';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.scss']
})
export class PedidosFormComponent implements OnInit {

  @Input() pedido: Pedido;
  _loadingClientes: boolean;
  _loadingProdutos: boolean;
  listaDeClientes: Cliente[];
  listaDeProdutos: Produto[];


  constructor(private _fb: FormBuilder, private _pedidosService: PedidosService) { }

  ngOnInit() {
    this._pedidosService.loadingClientes$.subscribe(loading => this._loadingClientes = loading);
    this._pedidosService.clientes$.subscribe(clientes => this.carregarListaDeClientes(clientes));
    this._pedidosService.loadingProdutos$.subscribe(loading => this._loadingProdutos = loading);
    this._pedidosService.produtos$.subscribe(produtos => this.carregarListaDeProdutos(produtos));
  }

  private carregarListaDeClientes(clientes: Cliente[]): void {
    this.listaDeClientes = clientes;
  }
  private carregarListaDeProdutos(produtos: Produto[]): any {
    this.listaDeProdutos = produtos;
  }

  adicionarItem() {
    this.pedido.itens = [...this.pedido.itens, new ItemDePedido() ];
  }


  removerItem(item: ItemDePedido) {
    this.pedido.itens = [ ...this.pedido.itens.filter(it => it !== item) ];
  }

}
