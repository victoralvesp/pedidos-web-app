import { Component, OnInit, Input } from '@angular/core';
import { ItemDePedido } from '../models/pedidos-model';

@Component({
  selector: 'app-item-de-pedido-form',
  templateUrl: './item-de-pedido-form.component.html',
  styleUrls: ['./item-de-pedido-form.component.scss']
})
export class ItemDePedidoFormComponent implements OnInit {

  @Input() itemDePedido: ItemDePedido;

  constructor() { }

  ngOnInit() {
  }

}
