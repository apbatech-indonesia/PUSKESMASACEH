import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHatiComponent } from './form-hati.component';

describe('FormHatiComponent', () => {
  let component: FormHatiComponent;
  let fixture: ComponentFixture<FormHatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
