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
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputTextModule } from 'primeng/inputtext';
import { NgSelectModule } from '@ng-select/ng-select';
import { BotaoAlterarComponent } from './botao-alterar/botao-alterar.component';
import { MensagemService } from './mensagem.service';

@NgModule({
  declarations: [
     PedidosComponent,
     PedidosFormComponent,
     NovoPedidoComponent,
     AlterarPedidoComponent,
     ItemDePedidoFormComponent,
     SelectComponent,
     BotaoAlterarComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PedidosRoutingModule,
    NgSelectModule,
    CurrencyMaskModule,
    InputTextModule
  ],
  providers: [
    PedidosService,
    MensagemService
  ]
})
export class PedidosModule { }
