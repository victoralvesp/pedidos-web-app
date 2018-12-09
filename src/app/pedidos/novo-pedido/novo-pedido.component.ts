import { Component, OnInit } from '@angular/core';
import { Pedido, ItemDePedido } from '../models/pedidos-model';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent implements OnInit {

  pedido: Pedido;


  constructor() {
    console.log("Teste!!!");
    this.pedido = new Pedido();
    this.pedido.itens = [ new ItemDePedido() ];
  }

  ngOnInit() {
  }

}
