import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSirosisHatiComponent } from './form-sirosis-hati.component';

describe('FormSirosisHatiComponent', () => {
  let component: FormSirosisHatiComponent;
  let fixture: ComponentFixture<FormSirosisHatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSirosisHatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSirosisHatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
