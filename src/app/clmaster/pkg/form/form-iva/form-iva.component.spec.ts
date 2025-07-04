import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIvaComponent } from './form-iva.component';

describe('FormIvaComponent', () => {
  let component: FormIvaComponent;
  let fixture: ComponentFixture<FormIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
