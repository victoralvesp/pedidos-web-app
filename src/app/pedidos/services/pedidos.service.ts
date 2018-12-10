import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';
import { Pedido, Rentabilidade } from '../models/pedidos-model';
import { map, concatMap, delay, mapTo } from 'rxjs/operators';
import { ValorMonetario } from '../models/valor-monetario';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  MockCliente = <Cliente> {
    id: 1,
    nome: 'Darti Veider'
  };
  MockProduto = <Produto> {
    id: 1,
    nome: 'Millenium',
    multiplo: 2,
    precoSugerido: new ValorMonetario(90)
  };



  private clientesSub = new BehaviorSubject<Cliente[]>([this.MockCliente]);
  clientes$ = this.clientesSub.asObservable();
  loadingClientes$ = new BehaviorSubject<boolean>(false);
  private produtosSub = new BehaviorSubject<Produto[]>([this.MockProduto]);
  produtos$ = this.produtosSub.asObservable();
  loadingProdutos$ = new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService) {
    this.clientesSub.subscribe(() => this.loadingClientes$.next(false));
    this.produtosSub.subscribe(() => this.loadingProdutos$.next(false));
  }


  getClientes(): Observable<Cliente[]> {
    this.loadingClientes$.next(true);
    // this.httpService.getObs('clientes').subscribe(clientes => this.clientesSub.next(clientes));

    of('dummy').pipe(delay(2000)).subscribe(() => {
      this.loadingClientes$.next(false);
      this.clientesSub.next([this.MockCliente, {...this.MockCliente, nome: 'Luque'} ]);
    });

    return this.clientesSub.asObservable();
  }
  getProdutos(): Observable<Produto[]> {
    this.loadingProdutos$.next(true);
    // this.httpService.getObs('produtos').subscribe(prods => this.produtosSub.next(prods));

    of('dummy').pipe(delay(2000)).subscribe(() => {
      const produto = new Produto();
      produto.nome = 'Teste';
      produto.id = 1;
      produto.precoSugerido = new ValorMonetario(10);
      produto.multiplo = 2;
      this.produtosSub.next([produto, produto]);
      this.loadingProdutos$.next(false);
    });

    return this.produtosSub.asObservable();
  }

  calcularRentablidade(precoSugerido: ValorMonetario, precoUnitario: string): Observable<Rentabilidade> {
    // return this.httpService.getObs('rentabilidade', { precoSugerido: precoSugerido, precoUnitario: precoUnitario }).pipe(
    //   map((r) => Rentabilidade[Rentabilidade[r.id]])
    // );

    return of('delay').pipe(delay(5000), mapTo(Rentabilidade.Boa));

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
    return of(pedido).pipe(delay(1000), mapTo(pedido));
  }

  adicionarPedido(pedido: Pedido): Observable<Pedido> {
    const pedidoAdicionado = new Pedido();
    pedidoAdicionado.id = 10;
    pedidoAdicionado.idCliente = pedido.idCliente;
    pedidoAdicionado.itens = pedido.itens;
    // return this.httpService.postObs(`pedidos`, pedido);
    return of(pedido).pipe(delay(1000), mapTo(pedidoAdicionado));
  }



}
