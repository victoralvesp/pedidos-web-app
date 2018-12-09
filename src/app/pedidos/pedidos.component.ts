import { Component, OnInit } from '@angular/core';
import { PedidosService } from './services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(private _pedidosService: PedidosService) {
  }

  ngOnInit() {
    this._pedidosService.getClientes();
    this._pedidosService.getProdutos();
  }

}
