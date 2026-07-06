import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacaoEditComponent } from './locacao-edit.component';

describe('LocacaoEditComponent', () => {
  let component: LocacaoEditComponent;
  let fixture: ComponentFixture<LocacaoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocacaoEditComponent]
    });
    fixture = TestBed.createComponent(LocacaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
