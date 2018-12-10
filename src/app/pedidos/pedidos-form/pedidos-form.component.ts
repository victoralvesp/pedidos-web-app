import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { ItemDePedido, Pedido } from '../models/pedidos-model';
import { PedidosService } from '../services/pedidos.service';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValorMonetario } from '../models/valor-monetario';
import { rentabilidadeValidator } from '../../auxiliar/rentabilidadeValidator';
import { quantidadeValidator } from '../../auxiliar/quantidadeValidator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.scss']
})
export class PedidosFormComponent implements OnInit, AfterContentChecked {

  @Input() pedido: Pedido;
  loadingClientes: boolean;
  loadingProdutos: boolean;
  listaDeClientes: Cliente[];
  listaDeProdutos: Produto[];
  pedidosForm: FormGroup;
  clienteSelecionado: Cliente;
  invalidControls: any[];
  salvando = false;


  constructor(private _fb: FormBuilder, private _pedidosService: PedidosService,
              private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._pedidosService.loadingClientes$.subscribe(loading => this.loadingClientes = loading);
    this._pedidosService.clientes$.subscribe(clientes => this.carregarListaDeClientes(clientes));
    this.pedidosForm = this.createForm();

    this.checaEAtualizaFormulario();
  }

  createForm(): FormGroup {
    return this._fb.group({
      cliente: this._fb.control(undefined, [Validators.required]),
      itens: this._fb.array([this.criaFormItem()], [Validators.required])
    });
  }
  criaFormItem(): FormGroup {
    return this._fb.group({
      id: this._fb.control(0),
      idProduto: this._fb.control(''),
      produto: this._fb.control(undefined, [Validators.required]),
      precoUnitario: this._fb.control('', [Validators.required]),
      quantidade: this._fb.control('', [Validators.required]),
      multiplo: this._fb.control(''),
      rentabilidade: this._fb.control('', rentabilidadeValidator())
    }, { validator: quantidadeValidator });
  }

  private checaEAtualizaFormulario() {
    if (this.pedido.Id > 0) {
      this.atualizaForm();
    }
  }

  ngAfterContentChecked() {
    this.pedidosForm.updateValueAndValidity();
  }

  atualizaForm(): void {
    this.pedidosForm.patchValue({
      cliente: this.clienteSelecionado.Id,
      itens: this.pedido.Itens.map(item => this.converteParaFormDeItem(item))
    });
  }

  private carregarListaDeClientes(clientes: Cliente[]): void {
    this.listaDeClientes = clientes;
    if (this.pedido.IdCliente) {
      this.clienteSelecionado = clientes.find(cl => cl.Id === this.pedido.IdCliente);
    }
  }


  adicionarItem() {
    this.pedido.Itens = [...this.pedido.Itens, new ItemDePedido() ];
    const control = <FormArray>this.pedidosForm.controls['itens'];
    control.controls.push(this.criaFormItem());
    control.updateValueAndValidity();
    this.pedidosForm.updateValueAndValidity();
  }


  removerItem(i: number) {
    // this.pedido.itens = [ ...this.pedido.itens.filter(it => it !== item) ];
    const control = <FormArray>this.pedidosForm.controls['itens'];
    control.removeAt(i);
    control.updateValueAndValidity();
    this.pedidosForm.updateValueAndValidity();
  }

  salvarPedido() {
    const pedidoValue = this.pedidosForm.value;

    this.pedido.IdCliente = pedidoValue.cliente;
    this.pedido.Itens = pedidoValue.itens.map(item =>  this.converteParaItem(item));

    this.salvando = true;
    this._pedidosService.salvarPedido(this.pedido).subscribe(() => {
      this.salvando = false;
      this.pedido = new Pedido();
      this.pedidosForm = this.createForm();
      this._router.navigate([`pedidos`], { relativeTo: this._route.root });
    });
  }

  converteParaItem(itemFormValue: any): any {
    const item = new ItemDePedido();
    item.Id = itemFormValue.id;
    item.IdProduto = itemFormValue.produto;
    item.PrecoUnitario = new ValorMonetario(itemFormValue.precoUnitario);
    item.Quantidade = itemFormValue.quantidade;
    item.Rentabilidade = itemFormValue.rentabilidade;

    return item;
  }

  converteParaFormDeItem(item: ItemDePedido): any {
    return {
      id: item.Id,
      idProduto: item.IdProduto,
      precoUnitario: item.PrecoUnitario.Valor,
      quantidade: item.Quantidade,
      rentabilidade: item.Rentabilidade
    };
  }

}
