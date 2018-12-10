import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';
import { AlterarPedidoComponent } from './alterar-pedido/alterar-pedido.component';
import { ItemDePedidoFormComponent } from './item-de-pedido-form/item-de-pedido-form.component';
import { PedidosService } from './services/pedidos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
     PedidosComponent,
     PedidosFormComponent,
     NovoPedidoComponent,
     AlterarPedidoComponent,
     ItemDePedidoFormComponent,
     SelectComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PedidosRoutingModule,
    NgSelectModule
  ],
  providers: [
    PedidosService
  ]
})
export class PedidosModule { }
