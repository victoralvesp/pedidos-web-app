import { Component, OnInit } from '@angular/core';
import { PedidosService } from './services/pedidos.service';
import { MensagemService } from './mensagem.service';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  mensagem = new BehaviorSubject<number>(null);

  constructor(private _pedidosService: PedidosService, private _mensagemService: MensagemService) {
  }

  ngOnInit() {
    this._pedidosService.getClientes();
    this._pedidosService.getProdutos();
    this._mensagemService.mensagens$.subscribe(this.mensagem);
  }

}
