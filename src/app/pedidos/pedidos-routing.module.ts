import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosComponent } from './pedidos.component';
import { NovoPedidoComponent } from './novo-pedido/novo-pedido.component';
import { AlterarPedidoComponent } from './alterar-pedido/alterar-pedido.component';


const childRoutes: Routes = [
    { path: '', component: NovoPedidoComponent },
    { path: ':id', component: AlterarPedidoComponent }
];

const routes: Routes = [
    { path: '', component: PedidosComponent, children: childRoutes}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
