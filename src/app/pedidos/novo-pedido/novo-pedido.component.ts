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
    this.pedido = new Pedido();
  }

  ngOnInit() {
  }

}
