import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoPendenteComponent } from './locacao-pendente.component';

describe('LocacaoPendenteComponent', () => {
  let component: LocacaoPendenteComponent;
  let fixture: ComponentFixture<LocacaoPendenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocacaoPendenteComponent]
    });
    fixture = TestBed.createComponent(LocacaoPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
