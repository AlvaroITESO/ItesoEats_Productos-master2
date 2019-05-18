import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaMainComponent } from './tienda-main.component';

describe('TiendaMainComponent', () => {
  let component: TiendaMainComponent;
  let fixture: ComponentFixture<TiendaMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
