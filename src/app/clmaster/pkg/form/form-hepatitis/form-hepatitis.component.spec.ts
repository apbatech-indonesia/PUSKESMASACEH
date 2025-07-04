import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHepatitisComponent } from './form-hepatitis.component';

describe('FormHepatitisComponent', () => {
  let component: FormHepatitisComponent;
  let fixture: ComponentFixture<FormHepatitisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHepatitisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHepatitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
