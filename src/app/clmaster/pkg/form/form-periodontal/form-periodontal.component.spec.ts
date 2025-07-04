import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPeriodontalComponent } from './form-periodontal.component';

describe('FormPeriodontalComponent', () => {
  let component: FormPeriodontalComponent;
  let fixture: ComponentFixture<FormPeriodontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPeriodontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPeriodontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
