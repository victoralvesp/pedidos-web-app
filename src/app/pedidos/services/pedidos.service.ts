import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';
import { Pedido } from '../models/pedidos-model';
import { map, concatMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private clientesSub = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSub.asObservable();
  loadingClientes$ = new BehaviorSubject<boolean>(false);
  private produtosSub = new BehaviorSubject<Produto[]>([]);
  produtos$ = this.produtosSub.asObservable();
  loadingProdutos$ = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService) {
    this.clientesSub.subscribe(() => this.loadingClientes$.next(false));
    this.produtosSub.subscribe(() => this.loadingProdutos$.next(false));
  }


  getClientes(): Observable<Cliente[]> {
    this.loadingClientes$.next(true);
    this.httpService.getObs('clientes').subscribe(clientes => this.clientesSub.next(clientes));

    return this.clientesSub.asObservable();
  }
  getProdutos(): Observable<Produto[]> {
    this.loadingProdutos$.next(true);
    this.httpService.getObs('produtos').subscribe(prods => this.produtosSub.next(prods));

    return this.produtosSub.asObservable();
  }

  salvarPedido(pedido: Pedido) {
    if (pedido.id > 0) {
      this.alterarPedido(pedido);
    } else {
      this.adicionarPedido(pedido);
    }
  }

  alterarPedido(pedido: Pedido): Observable<Pedido> {
    // return this.httpService.putObs(`pedidos/${pedido.id}`, pedido);
    return of(pedido).pipe(delay(1000));
  }

  adicionarPedido(pedido: Pedido): Observable<Pedido> {
    // return this.httpService.postObs(`pedidos`, pedido);
    return of(pedido).pipe(delay(1000));
  }
}
