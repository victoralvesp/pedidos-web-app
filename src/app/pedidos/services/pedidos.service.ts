import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';
import { Pedido, Rentabilidade, ItemDePedido } from '../models/pedidos-model';
import { map, concatMap, delay, mapTo } from 'rxjs/operators';
import { ValorMonetario } from '../models/valor-monetario';

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
    this.httpService.getObs('clientes/').subscribe(clientes => {
      this.clientesSub.next(clientes);
    });

    return this.clientesSub.asObservable();
  }
  getProdutos(): Observable<Produto[]> {
    this.loadingProdutos$.next(true);
    this.httpService.getObs('produtos/').subscribe(prods => this.produtosSub.next(prods));

    return this.produtosSub.asObservable();
  }

  getPedido(idPedido: Number): Observable<Pedido> {
    return this.httpService.getObs(`pedidos/${idPedido}`);

  }

  calcularRentablidade(precoSugerido: ValorMonetario, precoUnitario: ValorMonetario): Observable<Rentabilidade> {
    const precoSugeridoString = this.converteEmString(precoSugerido);
    const precoUnitarioString = this.converteEmString(precoUnitario);
    return this.httpService.getObs('pedidos/rentabilidade',
                    { precoSugerido: precoSugeridoString, precoUnitario: precoUnitarioString }).pipe(
      map((r) => Rentabilidade[Rentabilidade[r.id]])
    );

  }
  private converteEmString(valorMonetario: ValorMonetario) {
    return `"${valorMonetario.Valor} ${valorMonetario.Moeda.Id}"`;
  }

  salvarPedido(pedido: Pedido): Observable<Pedido> {
    if (pedido.Id > 0) {
      return this.alterarPedido(pedido);
    } else {
      return this.adicionarPedido(pedido);
    }
  }

  alterarPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpService.putObs(`pedidos/${pedido.Id}`, pedido);
  }

  adicionarPedido(pedido: Pedido): Observable<Pedido> {
    return this.httpService.postObs(`pedidos/`, pedido);
  }

}
