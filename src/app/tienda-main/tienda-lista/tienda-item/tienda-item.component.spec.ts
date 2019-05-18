import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaItemComponent } from './tienda-item.component';

describe('TiendaItemComponent', () => {
  let component: TiendaItemComponent;
  let fixture: ComponentFixture<TiendaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
