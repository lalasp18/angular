import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtorEditComponent } from './ator-edit.component';

describe('AtorEditComponent', () => {
  let component: AtorEditComponent;
  let fixture: ComponentFixture<AtorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtorEditComponent]
    });
    fixture = TestBed.createComponent(AtorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
