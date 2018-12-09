import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const childRoutes: Routes = [
  { path: 'pedidos', loadChildren: './pedidos/pedidos.module#PedidosModule' }
];

const routes: Routes = [
    { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
    { path: '',  children: childRoutes }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
