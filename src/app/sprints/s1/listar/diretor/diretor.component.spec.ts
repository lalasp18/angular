import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoresComponent } from './diretor.component';

describe('DiretoresComponent', () => {
  let component: DiretoresComponent;
  let fixture: ComponentFixture<DiretoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretoresComponent]
    });
    fixture = TestBed.createComponent(DiretoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
