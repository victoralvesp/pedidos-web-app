import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
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
export class ItemDePedidoFormComponent implements OnInit {

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
          idProduto: value.Id
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
    if (value.Multiplo) {
      multiplo = value.Multiplo;
      this.mensagemQuantidadeInvalida = `Quantidade é obrigatória e deve ser múltiplo de ${multiplo}`;
    }
    return multiplo;
  }

  private definePrecoAUtilizar(value: Produto) {
    let preco = value.PrecoSugerido.Valor;
    if (this.item.Id > 0 && this.item.IdProduto === value.Id) {
      preco = this.item.PrecoUnitario.Valor;
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
    item.Id = itemFormValue.id;
    item.IdProduto = itemFormValue.idProduto;
    item.PrecoUnitario = new ValorMonetario(itemFormValue.precoUnitario);
    item.Quantidade = itemFormValue.quantidade;

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
                                                const precoUnitario = this.tratarPrecoUnitario();
                                                const precoSugerido = this.produtoSelecionado.PrecoSugerido;
                                                return this._pedidosService.calcularRentablidade(precoSugerido, precoUnitario);
                                          }));
    rentObs.subscribe(((rent) => {
      this.rentabilidadeCarregada.next(true);
      this.atualizaFormulario({ rentabilidade: Rentabilidade[rent] });
    }).bind(this));

  }

  private tratarPrecoUnitario() {
    const valorEmString: String = this.inputPreco.nativeElement.value;
    const valorEmCulturaEN = valorEmString.replace(/\./g, '').replace(',', '.');
    const precoUnitarioValor = +parseFloat(valorEmCulturaEN).toFixed(2);
    const precoUnitario = new ValorMonetario(precoUnitarioValor);
    return precoUnitario;
  }

  private atualizaFormulario(patch: any) {
    this.itemForm.patchValue(patch);
    this.itemForm.updateValueAndValidity();
  }

  private carregarListaDeProdutos(produtos: Produto[]): any {
    this.listaDeProdutos = produtos;
    if (this.item && this.item.IdProduto > 0) {
      const idProduto = this.item.IdProduto;
      this.produtoSelecionado = produtos.find(prod => prod.Id === idProduto);
    }
  }
}
