import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLeherRahimComponent } from './form-leher-rahim.component';

describe('FormLeherRahimComponent', () => {
  let component: FormLeherRahimComponent;
  let fixture: ComponentFixture<FormLeherRahimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLeherRahimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLeherRahimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
