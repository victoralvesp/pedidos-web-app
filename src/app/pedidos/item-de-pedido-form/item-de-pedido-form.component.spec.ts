import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDePedidoFormComponent } from './item-de-pedido-form.component';

describe('ItemDePedidoFormComponent', () => {
  let component: ItemDePedidoFormComponent;
  let fixture: ComponentFixture<ItemDePedidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDePedidoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDePedidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
