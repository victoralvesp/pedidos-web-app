import { Component, OnInit } from '@angular/core';
import { Pedido } from '../models/pedidos-model';
import { PedidosService } from '../services/pedidos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar-pedido',
  templateUrl: './alterar-pedido.component.html',
  styleUrls: ['./alterar-pedido.component.scss']
})
export class AlterarPedidoComponent implements OnInit {

  pedido: Pedido;
  pedidoCarregado = false;
  currentId: number;

  constructor(private _pedidosService: PedidosService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.subscribeParaObterPedido(+params['id']);
    });
  }
  subscribeParaObterPedido(id: number) {
    if (!this.currentId || this.currentId !== id) {
      this.currentId = id;
      this.pedidoCarregado = false;
      this._pedidosService.getPedido(id).subscribe(pedido => {
      this.pedido = pedido;
      this.pedidoCarregado = true;
    });
    }
  }

}
