import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSputumTbcComponent } from './form-sputum-tbc.component';

describe('FormSputumTbcComponent', () => {
  let component: FormSputumTbcComponent;
  let fixture: ComponentFixture<FormSputumTbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSputumTbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSputumTbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
