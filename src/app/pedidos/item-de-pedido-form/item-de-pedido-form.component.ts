import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ItemDePedido, Rentabilidade } from '../models/pedidos-model';
import { FormGroup } from '@angular/forms';
import { PedidosService } from '../services/pedidos.service';
import { Produto } from '../models/produto.model';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mapTo, switchMap } from 'rxjs/operators';
import { ValorMonetario } from '../models/valor-monetario';

@Component({
  selector: 'app-item-de-pedido-form',
  templateUrl: './item-de-pedido-form.component.html',
  styleUrls: ['./item-de-pedido-form.component.scss']
})
export class ItemDePedidoFormComponent implements OnInit, AfterViewInit {

  MENSAGEM_QUANTIDADE_INVALIDA_PADRAO = 'Quantidade é obrigatória';
  @Input() itemForm: FormGroup;
  loadingProdutos: any;
  listaDeProdutos: Produto[];
  item: ItemDePedido;
  rentabilidadeCarregada = new BehaviorSubject<boolean>(false);
  private _produtoSelecionado: Produto;
  mensagemQuantidadeInvalida: string;

  get produtoSelecionado(): Produto {
    return this._produtoSelecionado;
  }
  set produtoSelecionado(value: Produto) {
    if (this._produtoSelecionado !== value) {
      this._produtoSelecionado = value;
      if (value) {
        const multiplo = this.configuraMultiploEMensagemDeQuantidade(value);
        const precoUnitarioAUtilizar = this.definePrecoAUtilizar(value);

        this.atualizaFormulario({
          precoUnitario: precoUnitarioAUtilizar,
          quantidade: multiplo,
          multiplo: multiplo,
          idProduto: value.id
        });

        this.configuraChecagemDeRentabilidade();
        this.inputPreco.nativeElement.dispatchEvent(new Event('keyup'));
      }
    }
  }

  @ViewChild('inputPreco') inputPreco: ElementRef;

  constructor(private _pedidosService: PedidosService) {
    this.mensagemQuantidadeInvalida = this.MENSAGEM_QUANTIDADE_INVALIDA_PADRAO;
  }

  private configuraMultiploEMensagemDeQuantidade(value: Produto) {
    let multiplo = 1;
    this.mensagemQuantidadeInvalida = this.MENSAGEM_QUANTIDADE_INVALIDA_PADRAO;
    if (value.multiplo) {
      multiplo = value.multiplo;
      this.mensagemQuantidadeInvalida = `Quantidade é obrigatória e deve ser múltiplo de ${multiplo}`;
    }
    return multiplo;
  }

  private definePrecoAUtilizar(value: Produto) {
    let preco = value.precoSugerido.valor;
    if (this.item.id > 0 && this.item.idProduto === value.id) {
      preco = this.item.precoUnitario.valor;
    }
    return preco;
  }

  ngOnInit() {
    this.atualizaModelo();
    this._pedidosService.loadingProdutos$.subscribe(loading => this.loadingProdutos = loading);
    this._pedidosService.produtos$.subscribe(produtos => this.carregarListaDeProdutos(produtos));

    this.itemForm.updateValueAndValidity();

  }
  private atualizaModelo() {
    this.item = this.converteParaItem(this.itemForm.value);
  }

  private converteParaItem(itemFormValue: any): any {
    const item = new ItemDePedido();
    item.id = itemFormValue.id;
    item.idProduto = itemFormValue.idProduto;
    item.precoUnitario = new ValorMonetario(itemFormValue.precoUnitario);
    item.quantidade = itemFormValue.quantidade;

    return item;
  }

  configuraChecagemDeRentabilidade(): void {
    const eventoPrecoChange = fromEvent(this.inputPreco.nativeElement, 'keyup');
    eventoPrecoChange.subscribe(() => {
                                        this.rentabilidadeCarregada.next(false);
                                        this.atualizaFormulario({ rentabilidade: 'Calculando' });
                                      });
    const rentObs = eventoPrecoChange.pipe(debounceTime(200), distinctUntilChanged(),
                                           switchMap(() => {
                                                const precoUnitario = parseFloat(this.inputPreco.nativeElement.value).toFixed(2);
                                                const precoSugerido = this.produtoSelecionado.precoSugerido;
                                                return this._pedidosService.calcularRentablidade(precoSugerido, precoUnitario);
                                          }));
    rentObs.subscribe(((rent) => {
      this.rentabilidadeCarregada.next(true);
      this.atualizaFormulario({ rentabilidade: Rentabilidade[rent] });
      console.log(this.itemForm.controls['precoUnitario'].valid);
      console.log(this.rentabilidadeCarregada);
    }).bind(this));

  }

  private atualizaFormulario(patch: any) {
    this.itemForm.patchValue(patch);
    this.itemForm.updateValueAndValidity();
  }

  private carregarListaDeProdutos(produtos: Produto[]): any {
    this.listaDeProdutos = produtos;
    if (this.item && this.item.idProduto > 0) {
      const idProduto = this.item.idProduto;
      this.produtoSelecionado = produtos.find(prod => prod.id === idProduto);
    }
  }
}
