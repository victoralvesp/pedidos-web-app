import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';
import { AlterarPedidoComponent } from './alterar-pedido/alterar-pedido.component';
import { ItemDePedidoFormComponent } from './item-de-pedido-form/item-de-pedido-form.component';
import { PedidosService } from './services/pedidos.service';

@NgModule({
  declarations: [
     PedidosComponent,
     PedidosFormComponent,
     NovoPedidoComponent,
     AlterarPedidoComponent,
     ItemDePedidoFormComponent
    ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ],
  providers: [
    PedidosService
  ]
})
export class PedidosModule { }
