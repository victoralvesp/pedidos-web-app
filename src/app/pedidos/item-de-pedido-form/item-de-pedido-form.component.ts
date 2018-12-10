import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ItemDePedido, Rentabilidade } from '../models/pedidos-model';
import { FormGroup } from '@angular/forms';
import { PedidosService } from '../services/pedidos.service';
import { Produto } from '../models/produto.model';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mapTo, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-de-pedido-form',
  templateUrl: './item-de-pedido-form.component.html',
  styleUrls: ['./item-de-pedido-form.component.scss']
})
export class ItemDePedidoFormComponent implements OnInit {

  @Input() itemForm: FormGroup;
  @Input() parentForm: FormGroup;
  loadingProdutos: any;
  listaDeProdutos: Produto[];
  item: ItemDePedido;
  rentabilidadeCarregada = new BehaviorSubject<boolean>(false);
  private _produtoSelecionado: Produto;

  get produtoSelecionado(): Produto {
    return this._produtoSelecionado;
  }
  set produtoSelecionado(value: Produto) {
    if (this._produtoSelecionado !== value) {
      this._produtoSelecionado = value;
      if (value) {
        let multiplo = 1;
        if (value.multiplo) {
          multiplo = value.multiplo;
        }
        this.configuraChecagemDeRentabilidade();
        this.atualizaFormulario({
          precoUnitario: value.precoSugerido.valor,
          quantidade: multiplo,
          idProduto: value.id
        });

        this.inputPreco.nativeElement.dispatchEvent(new Event('onchange'));
      }
    }
  }

  @ViewChild('inputPreco') inputPreco: ElementRef;

  constructor(private _pedidosService: PedidosService) { }

  ngOnInit() {
    this._pedidosService.loadingProdutos$.subscribe(loading => this.loadingProdutos = loading);
    this._pedidosService.produtos$.subscribe(produtos => this.carregarListaDeProdutos(produtos));

    this.itemForm.updateValueAndValidity();

    this.item = this.itemForm.value;
  }
  configuraChecagemDeRentabilidade(): void {
    const rentObs = fromEvent(this.inputPreco.nativeElement, 'onchange')
                    .pipe(debounceTime(200), distinctUntilChanged(),
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
    this.parentForm.updateValueAndValidity();
  }

  private carregarListaDeProdutos(produtos: Produto[]): any {
    this.listaDeProdutos = produtos;
    if (this.item && this.item.idProduto > 0) {
      const idProduto = this.item.idProduto;
      this.produtoSelecionado = produtos.find(prod => prod.id === idProduto);
    }
  }
}
