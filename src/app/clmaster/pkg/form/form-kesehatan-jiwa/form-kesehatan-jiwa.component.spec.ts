import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKesehatanJiwaComponent } from './form-kesehatan-jiwa.component';

describe('FormKesehatanJiwaComponent', () => {
  let component: FormKesehatanJiwaComponent;
  let fixture: ComponentFixture<FormKesehatanJiwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormKesehatanJiwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKesehatanJiwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
