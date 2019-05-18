import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCrearComponent } from './producto-crear.component';

describe('ProductoCrearComponent', () => {
  let component: ProductoCrearComponent;
  let fixture: ComponentFixture<ProductoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
