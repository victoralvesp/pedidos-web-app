import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private _mensagensSub = new EventEmitter<Number>();

  public readonly mensagens$ = this._mensagensSub.asObservable();

  constructor() {
    this._mensagensSub.pipe(distinctUntilChanged(), debounceTime(5000)).subscribe(() => this._mensagensSub.next(null));
  }

  PushPedidoSalvo(Id: number): Observable<Number> {
    this._mensagensSub.next(Id);

    return this.mensagens$;
  }
}
