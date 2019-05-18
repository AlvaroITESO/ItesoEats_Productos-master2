import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaListaComponent } from './tienda-lista.component';

describe('TiendaListaComponent', () => {
  let component: TiendaListaComponent;
  let fixture: ComponentFixture<TiendaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
