import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormThoraxTbcComponent } from './form-thorax-tbc.component';

describe('FormThoraxTbcComponent', () => {
  let component: FormThoraxTbcComponent;
  let fixture: ComponentFixture<FormThoraxTbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormThoraxTbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormThoraxTbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
