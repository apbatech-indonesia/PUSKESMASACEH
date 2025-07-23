import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTekananDarahComponent } from './form-tekanan-darah.component';

describe('FormTekananDarahComponent', () => {
  let component: FormTekananDarahComponent;
  let fixture: ComponentFixture<FormTekananDarahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTekananDarahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTekananDarahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
