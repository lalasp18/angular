import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoDevolvidaComponent } from './locacao-devolvida.component';

describe('LocacaoDevolvidaComponent', () => {
  let component: LocacaoDevolvidaComponent;
  let fixture: ComponentFixture<LocacaoDevolvidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocacaoDevolvidaComponent]
    });
    fixture = TestBed.createComponent(LocacaoDevolvidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
