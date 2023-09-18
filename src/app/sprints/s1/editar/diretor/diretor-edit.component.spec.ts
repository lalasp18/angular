import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretorEditComponent } from './diretor-edit.component';

describe('DiretorEditComponent', () => {
  let component: DiretorEditComponent;
  let fixture: ComponentFixture<DiretorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretorEditComponent]
    });
    fixture = TestBed.createComponent(DiretorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
