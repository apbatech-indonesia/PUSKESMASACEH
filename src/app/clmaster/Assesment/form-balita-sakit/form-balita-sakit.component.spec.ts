import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBalitaSakitComponent } from './form-balita-sakit.component';

describe('FormBalitaSakitComponent', () => {
  let component: FormBalitaSakitComponent;
  let fixture: ComponentFixture<FormBalitaSakitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBalitaSakitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBalitaSakitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
