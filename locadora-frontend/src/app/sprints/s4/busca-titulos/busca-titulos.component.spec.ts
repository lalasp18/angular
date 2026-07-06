import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaTitulosComponent } from './busca-titulos.component';

describe('BuscaTitulosComponent', () => {
  let component: BuscaTitulosComponent;
  let fixture: ComponentFixture<BuscaTitulosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscaTitulosComponent]
    });
    fixture = TestBed.createComponent(BuscaTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
