import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloEditComponent } from './titulo-edit.component';

describe('TituloEditComponent', () => {
  let component: TituloEditComponent;
  let fixture: ComponentFixture<TituloEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TituloEditComponent]
    });
    fixture = TestBed.createComponent(TituloEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
