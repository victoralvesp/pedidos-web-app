import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-botao-alterar',
  templateUrl: './botao-alterar.component.html',
  styleUrls: ['./botao-alterar.component.scss']
})
export class BotaoAlterarComponent implements OnInit {

  formHabilitado = false;

  @ViewChild('idProduto') idProduto: ElementRef;

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  acao() {
    if (!this.formHabilitado) {
      this.formHabilitado = true;
    } else {
      const id = this.idProduto.nativeElement.value;
      this._router.navigate([`pedidos/${id}`], { relativeTo: this._route.root });
    }
  }

}
