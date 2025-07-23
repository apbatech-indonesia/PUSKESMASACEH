import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTuberkulosisComponent } from './form-tuberkulosis.component';

describe('FormTuberkulosisComponent', () => {
  let component: FormTuberkulosisComponent;
  let fixture: ComponentFixture<FormTuberkulosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTuberkulosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTuberkulosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
