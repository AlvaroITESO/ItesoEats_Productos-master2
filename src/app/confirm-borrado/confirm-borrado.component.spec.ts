import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBorradoComponent } from './confirm-borrado.component';

describe('ConfirmBorradoComponent', () => {
  let component: ConfirmBorradoComponent;
  let fixture: ComponentFixture<ConfirmBorradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBorradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
