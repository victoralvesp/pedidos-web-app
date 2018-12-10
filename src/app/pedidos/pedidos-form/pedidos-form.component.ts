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
      cliente: this._fb.control('', [Validators.required]),
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
    if (this.pedido.id > 0) {
      this.atualizaForm();
    }
  }

  ngAfterContentChecked() {
    this.pedidosForm.updateValueAndValidity();
  }

  atualizaForm(): void {
    this.pedidosForm.patchValue({
      cliente: this.clienteSelecionado.id,
      itens: this.pedido.itens.map(item => this.converteParaFormDeItem(item))
    });
  }

  private carregarListaDeClientes(clientes: Cliente[]): void {
    this.listaDeClientes = clientes;
    if (this.pedido.idCliente) {
      this.clienteSelecionado = clientes.find(cl => cl.id === this.pedido.idCliente);
    }
  }


  adicionarItem() {
    this.pedido.itens = [...this.pedido.itens, new ItemDePedido() ];
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

    this.pedido.idCliente = pedidoValue.cliente;
    this.pedido.itens = pedidoValue.itens.map(item =>  this.converteParaItem(item));

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
    item.id = itemFormValue.id;
    item.idProduto = itemFormValue.produto;
    item.precoUnitario = new ValorMonetario(itemFormValue.precoUnitario);
    item.quantidade = itemFormValue.quantidade;
    item.rentabilidade = itemFormValue.rentabilidade;

    return item;
  }

  converteParaFormDeItem(item: ItemDePedido): any {
    return {
      id: item.id,
      idProduto: item.idProduto,
      precoUnitario: item.precoUnitario.valor,
      quantidade: item.quantidade,
      rentabilidade: item.rentabilidade
    };
  }

}
