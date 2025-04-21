import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTekananGulaComponent } from './form-tekanan-gula.component';

describe('FormTekananGulaComponent', () => {
  let component: FormTekananGulaComponent;
  let fixture: ComponentFixture<FormTekananGulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTekananGulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTekananGulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
