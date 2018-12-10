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

  MockCliente = <Cliente> {
    Id: 1,
    Nome: 'Darti Veider'
  };
  MockProduto = <Produto> {
    Id: 1,
    Nome: 'Millenium',
    Multiplo: 2,
    PrecoSugerido: new ValorMonetario(90)
  };



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

  calcularRentablidade(precoSugerido: ValorMonetario, precoUnitario: string): Observable<Rentabilidade> {
    return this.httpService.getObs('rentabilidade', { precoSugerido: precoSugerido, precoUnitario: precoUnitario }).pipe(
      map((r) => Rentabilidade[Rentabilidade[r.id]])
    );

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
