import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPpokPumaComponent } from './form-ppok-puma.component';

describe('FormPpokPumaComponent', () => {
  let component: FormPpokPumaComponent;
  let fixture: ComponentFixture<FormPpokPumaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPpokPumaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPpokPumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
