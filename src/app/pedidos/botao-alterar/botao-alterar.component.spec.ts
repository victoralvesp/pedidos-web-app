import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoAlterarComponent } from './botao-alterar.component';

describe('BotaoAlterarComponent', () => {
  let component: BotaoAlterarComponent;
  let fixture: ComponentFixture<BotaoAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoAlterarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
